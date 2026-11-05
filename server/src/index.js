import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './db.js';
import { seedContent } from './seed.js';
import { getUser, addXp, loseHeart, gainHeart, lastNDays, EXAM_PASS, EXAM_SIZE } from './game.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.API_PORT) || 3001;

seedContent();

const app = express();
app.use(express.json());

// ---------- utilidades ----------
const parseJSON = (s, fallback) => {
  try {
    return JSON.parse(s);
  } catch {
    return fallback;
  }
};
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const toExercise = (row) => ({
  id: row.id,
  type: row.type,
  prompt: row.prompt,
  explanation: row.explanation,
  ...parseJSON(row.data, {}),
});
const notFound = (res, what = 'Recurso') => res.status(404).json({ error: `${what} no encontrado` });
function readScore(body) {
  const total = Math.max(1, Math.floor(Number(body?.total) || 0));
  const correct = Math.min(total, Math.max(0, Math.floor(Number(body?.correct) || 0)));
  return { total, correct, score: correct / total };
}

// ---------- usuarios ----------
app.get('/api/users', (req, res) => {
  res.json(db.prepare('SELECT id, name, avatar, xp FROM users ORDER BY id').all());
});

app.post('/api/users', (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, 30);
  if (!name) return res.status(400).json({ error: 'Escribe un nombre' });
  const avatar = String(req.body?.avatar ?? '🙂').slice(0, 8);
  const r = db.prepare('INSERT INTO users (name, avatar, hearts_updated_at) VALUES (?, ?, ?)').run(name, avatar, Date.now());
  res.status(201).json(getUser(Number(r.lastInsertRowid)));
});

app.get('/api/users/:id', (req, res) => {
  const user = getUser(Number(req.params.id));
  return user ? res.json(user) : notFound(res, 'Usuario');
});

app.patch('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!getUser(id)) return notFound(res, 'Usuario');
  const { name, avatar, dailyGoal } = req.body ?? {};
  if (typeof name === 'string' && name.trim()) db.prepare('UPDATE users SET name = ? WHERE id = ?').run(name.trim().slice(0, 30), id);
  if (typeof avatar === 'string' && avatar) db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(avatar.slice(0, 8), id);
  if ([10, 20, 30, 50].includes(dailyGoal)) db.prepare('UPDATE users SET daily_goal = ? WHERE id = ?').run(dailyGoal, id);
  res.json(getUser(id));
});

app.post('/api/users/:id/hearts/lose', (req, res) => {
  const user = loseHeart(Number(req.params.id));
  return user ? res.json(user) : notFound(res, 'Usuario');
});

const courseProgressSql = `
  SELECT c.*,
    (SELECT COUNT(*) FROM lessons l JOIN units u ON u.id = l.unit_id WHERE u.course_id = c.id) AS total,
    (SELECT COUNT(*) FROM progress p
       JOIN lessons l ON l.id = p.lesson_id
       JOIN units u ON u.id = l.unit_id
      WHERE u.course_id = c.id AND p.user_id = ? AND p.completed_at IS NOT NULL) AS done
  FROM courses c ORDER BY c.position`;

app.get('/api/users/:id/stats', (req, res) => {
  const id = Number(req.params.id);
  const user = getUser(id);
  if (!user) return notFound(res, 'Usuario');

  const days = lastNDays(7);
  const rows = db
    .prepare('SELECT day, SUM(amount) AS xp FROM xp_log WHERE user_id = ? AND day >= ? GROUP BY day')
    .all(id, days[0]);
  const week = days.map((day) => ({ day, xp: rows.find((r) => r.day === day)?.xp ?? 0 }));

  const counts = db
    .prepare(
      `SELECT
         SUM(CASE WHEN l.kind = 'lesson' THEN 1 ELSE 0 END) AS lessons,
         SUM(CASE WHEN l.kind = 'exam' THEN 1 ELSE 0 END) AS exams,
         SUM(CASE WHEN p.best_score >= 1 THEN 1 ELSE 0 END) AS perfect
       FROM progress p JOIN lessons l ON l.id = p.lesson_id
       WHERE p.user_id = ? AND p.completed_at IS NOT NULL`
    )
    .get(id);

  const courses = db
    .prepare(courseProgressSql)
    .all(id)
    .filter((c) => c.done > 0);

  res.json({
    user,
    week,
    lessons: counts.lessons ?? 0,
    exams: counts.exams ?? 0,
    perfect: counts.perfect ?? 0,
    courses,
  });
});

// ---------- rutas y cursos ----------
app.get('/api/tracks', (req, res) => {
  const userId = Number(req.query.userId) || 0;
  const tracks = db.prepare('SELECT * FROM tracks ORDER BY position').all();
  const courses = db.prepare(courseProgressSql).all(userId);
  res.json(tracks.map((t) => ({ ...t, courses: courses.filter((c) => c.track_id === t.id) })));
});

app.get('/api/courses/:id', (req, res) => {
  const userId = Number(req.query.userId) || 0;
  const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(req.params.id);
  if (!course) return notFound(res, 'Curso');

  const units = db.prepare('SELECT * FROM units WHERE course_id = ? ORDER BY position').all(course.id);
  const lessons = db
    .prepare(
      `SELECT l.id, l.unit_id, l.kind, l.title, p.best_score, p.attempts, p.completed_at,
              (SELECT COUNT(*) FROM exercises e WHERE e.lesson_id = l.id) AS exercise_count
       FROM lessons l
       JOIN units u ON u.id = l.unit_id
       LEFT JOIN progress p ON p.lesson_id = l.id AND p.user_id = ?
       WHERE u.course_id = ?
       ORDER BY u.position, l.position`
    )
    .all(userId, course.id);

  // Desbloqueo secuencial: cada lección se abre al completar la anterior.
  let prevDone = true;
  const withStatus = lessons.map((l) => {
    const done = !!l.completed_at;
    const status = done ? 'completed' : prevDone ? 'current' : 'locked';
    prevDone = done;
    return { ...l, status };
  });

  res.json({
    ...course,
    total: withStatus.length,
    done: withStatus.filter((l) => l.status === 'completed').length,
    units: units.map((u) => ({ ...u, lessons: withStatus.filter((l) => l.unit_id === u.id) })),
  });
});

// ---------- lecciones y exámenes ----------
app.get('/api/lessons/:id', (req, res) => {
  const lesson = db
    .prepare(
      `SELECT l.*, u.title AS unit_title, u.course_id, c.title AS course_title, c.color, c.icon
       FROM lessons l
       JOIN units u ON u.id = l.unit_id
       JOIN courses c ON c.id = u.course_id
       WHERE l.id = ?`
    )
    .get(req.params.id);
  if (!lesson) return notFound(res, 'Lección');

  let exercises;
  if (lesson.kind === 'exam') {
    const pool = db
      .prepare(
        `SELECT e.* FROM exercises e JOIN lessons l ON l.id = e.lesson_id
         WHERE l.unit_id = ? AND l.kind = 'lesson'`
      )
      .all(lesson.unit_id);
    exercises = shuffle(pool).slice(0, EXAM_SIZE).map(toExercise);
  } else {
    exercises = db.prepare('SELECT * FROM exercises WHERE lesson_id = ? ORDER BY position').all(lesson.id).map(toExercise);
  }

  res.json({
    lesson: {
      id: lesson.id,
      kind: lesson.kind,
      title: lesson.title,
      unitTitle: lesson.unit_title,
      courseId: lesson.course_id,
      courseTitle: lesson.course_title,
      color: lesson.color,
      icon: lesson.icon,
      theory: parseJSON(lesson.theory, []),
      passMark: EXAM_PASS,
    },
    exercises,
  });
});

app.post('/api/lessons/:id/complete', (req, res) => {
  const userId = Number(req.body?.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');
  const lesson = db.prepare('SELECT * FROM lessons WHERE id = ?').get(req.params.id);
  if (!lesson) return notFound(res, 'Lección');

  const { score } = readScore(req.body);
  const isExam = lesson.kind === 'exam';
  const passed = isExam ? score >= EXAM_PASS : true;
  const prev = db.prepare('SELECT * FROM progress WHERE user_id = ? AND lesson_id = ?').get(userId, lesson.id);
  const firstTime = passed && !prev?.completed_at;

  let xpGained = 2; // por intentarlo
  if (passed) {
    xpGained = firstTime ? (isExam ? 20 : 10) : 5;
    if (firstTime && score === 1) xpGained += isExam ? 10 : 5; // bonus por perfecto
  }

  db.prepare(
    `INSERT INTO progress (user_id, lesson_id, best_score, attempts, completed_at) VALUES (?, ?, ?, 1, ?)
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       best_score = MAX(best_score, excluded.best_score),
       attempts = attempts + 1,
       completed_at = COALESCE(completed_at, excluded.completed_at)`
  ).run(userId, lesson.id, score, passed ? new Date().toISOString() : null);

  const user = addXp(userId, xpGained, isExam ? 'exam' : 'lesson');
  res.json({ passed, score, xpGained, firstTime, passMark: EXAM_PASS, user });
});

// ---------- práctica (repaso de lecciones completadas) ----------
app.get('/api/practice', (req, res) => {
  const userId = Number(req.query.userId);
  const pool = db
    .prepare(
      `SELECT e.* FROM exercises e
       JOIN progress p ON p.lesson_id = e.lesson_id AND p.user_id = ? AND p.completed_at IS NOT NULL`
    )
    .all(userId);
  if (!pool.length) return res.status(400).json({ error: 'Completa al menos una lección para poder practicar.' });

  res.json({
    lesson: { id: 'practice', kind: 'practice', title: 'Práctica de repaso', icon: '🏋️', color: '#6c4cf5', theory: [] },
    exercises: shuffle(pool).slice(0, 8).map(toExercise),
  });
});

app.post('/api/practice/complete', (req, res) => {
  const userId = Number(req.body?.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');
  const { score } = readScore(req.body);
  const xpGained = score >= 0.6 ? 5 : 2;
  gainHeart(userId);
  const user = addXp(userId, xpGained, 'practice');
  res.json({ passed: true, score, xpGained, heartGained: true, user });
});

app.use('/api', (req, res) => notFound(res, 'Endpoint'));

// ---------- frontend compilado (npm run build) ----------
const dist = path.join(__dirname, '..', '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => console.log(`🚀 API de CodeRuta en http://localhost:${PORT}`));
