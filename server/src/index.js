import express from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { db } from './db.js';
import { seedContent } from './seed.js';
import { getUser, addXp, lastNDays, EXAM_PASS, EXAM_SIZE } from './game.js';

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

const PLACEMENT_DIFFICULTIES = [
  { id: 'easy', label: 'Inicial', ratio: 0.18 },
  { id: 'medium', label: 'Intermedia', ratio: 0.52 },
  { id: 'hard', label: 'Avanzada', ratio: 0.86 },
];

const placementTimeLimit = (type, difficulty, prompt) => {
  if (type === 'choice') {
    const base = { easy: 15, medium: 25, hard: 40 }[difficulty];
    return base + (String(prompt).length > 70 ? 10 : 0);
  }
  if (difficulty === 'easy') return 45;
  if (difficulty === 'medium') return 90;
  return 300;
};

function placementPool() {
  return db
    .prepare(
      `SELECT e.*, l.id AS lesson_id, l.title AS lesson_title,
              u.title AS unit_title, u.position AS unit_position,
              c.id AS course_id, c.title AS course_title, c.position AS course_position,
              t.id AS track_id, t.title AS track_title, t.icon AS track_icon,
              t.color AS track_color, t.position AS track_position
       FROM exercises e
       JOIN lessons l ON l.id = e.lesson_id
       JOIN units u ON u.id = l.unit_id
       JOIN courses c ON c.id = u.course_id
       JOIN tracks t ON t.id = c.track_id
       WHERE l.kind = 'lesson' AND c.status = 'active'
       ORDER BY t.position, c.position, u.position, l.position, e.position`
    )
    .all();
}

function buildPlacementItems() {
  const byTrack = new Map();
  for (const row of placementPool()) {
    if (!byTrack.has(row.track_id)) byTrack.set(row.track_id, []);
    byTrack.get(row.track_id).push(row);
  }

  const selected = [];
  for (const rows of byTrack.values()) {
    const used = new Set();
    const addAt = (difficulty, ratio, extra = false) => {
      let index = Math.round((rows.length - 1) * ratio);
      while (used.has(index) && index < rows.length - 1) index++;
      while (used.has(index) && index > 0) index--;
      used.add(index);
      const row = rows[index];
      selected.push({
        ...toExercise(row),
        lessonId: row.lesson_id,
        lessonTitle: row.lesson_title,
        unitTitle: row.unit_title,
        courseId: row.course_id,
        courseTitle: row.course_title,
        trackId: row.track_id,
        trackTitle: row.track_title,
        trackIcon: row.track_icon,
        trackColor: row.track_color,
        trackPosition: row.track_position,
        curriculumOrder: index,
        difficulty: difficulty.id,
        difficultyLabel: difficulty.label,
        timeLimit: placementTimeLimit(row.type, difficulty.id, row.prompt),
        extra,
      });
    };

    PLACEMENT_DIFFICULTIES.forEach((difficulty) => addAt(difficulty, difficulty.ratio));
    if (rows[0]?.track_id === 'english') {
      addAt(PLACEMENT_DIFFICULTIES[0], 0.32, true);
      addAt(PLACEMENT_DIFFICULTIES[1], 0.68, true);
      addAt(PLACEMENT_DIFFICULTIES[2], 0.97, true);
    }
  }

  const rank = { easy: 0, medium: 1, hard: 2 };
  return selected.sort((a, b) => rank[a.difficulty] - rank[b.difficulty] || a.trackPosition - b.trackPosition || Number(a.extra) - Number(b.extra));
}

function placementLevel(trackId, correct, total) {
  if (trackId === 'english') {
    if (correct >= 6) return 'C1';
    if (correct >= 4) return 'B2';
    if (correct >= 3) return 'B1';
    if (correct >= 2) return 'A2';
    return 'A1';
  }
  const ratio = total ? correct / total : 0;
  if (ratio >= 0.99) return 'Avanzado';
  if (ratio >= 0.66) return 'Intermedio';
  if (ratio > 0) return 'Básico';
  return 'Inicial';
}

function advanceFromPlacement(userId, items, responseMap) {
  let advanced = 0;
  const byTrack = new Map();
  for (const item of items) {
    if (!byTrack.has(item.trackId)) byTrack.set(item.trackId, []);
    byTrack.get(item.trackId).push(item);
  }

  const insert = db.prepare(
    `INSERT INTO progress (user_id, lesson_id, best_score, attempts, completed_at) VALUES (?, ?, 1, 0, ?)
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       best_score = MAX(best_score, 1), completed_at = COALESCE(completed_at, excluded.completed_at)`
  );

  for (const [trackId, trackItems] of byTrack) {
    let checkpoint = null;
    for (const difficulty of PLACEMENT_DIFFICULTIES) {
      const band = trackItems.filter((item) => item.difficulty === difficulty.id);
      const correctItems = band.filter((item) => responseMap.get(item.id));
      if (!band.length || correctItems.length / band.length < 0.5) break;
      checkpoint = correctItems.reduce((best, item) => (item.curriculumOrder > best.curriculumOrder ? item : best), correctItems[0]);
    }
    if (!checkpoint) continue;

    const lessons = db
      .prepare(
        `SELECT l.id FROM lessons l
         JOIN units u ON u.id = l.unit_id
         JOIN courses c ON c.id = u.course_id
         WHERE c.track_id = ?
         ORDER BY c.position, u.position, l.position`
      )
      .all(trackId);
    const checkpointIndex = lessons.findIndex((lesson) => lesson.id === checkpoint.lessonId);
    const completedAt = new Date().toISOString();
    for (const lesson of lessons.slice(0, checkpointIndex + 1)) {
      const existed = db.prepare('SELECT completed_at FROM progress WHERE user_id = ? AND lesson_id = ?').get(userId, lesson.id)?.completed_at;
      insert.run(userId, lesson.id, completedAt);
      if (!existed) advanced++;
    }
  }
  return advanced;
}

// ---------- usuarios ----------
app.get('/api/users', (req, res) => {
  res.json(db.prepare('SELECT id, name, avatar, xp FROM users ORDER BY id').all());
});

app.post('/api/users', (req, res) => {
  const name = String(req.body?.name ?? '').trim().slice(0, 30);
  if (!name) return res.status(400).json({ error: 'Escribe un nombre' });
  const avatar = String(req.body?.avatar ?? '🙂').slice(0, 8);
  const r = db.prepare('INSERT INTO users (name, avatar) VALUES (?, ?)').run(name, avatar);
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

// ---------- prueba de nivel ----------
app.post('/api/placement/start', (req, res) => {
  const userId = Number(req.body?.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');

  const pending = db
    .prepare('SELECT id, items, started_at FROM placement_attempts WHERE user_id = ? AND completed_at IS NULL ORDER BY started_at DESC LIMIT 1')
    .get(userId);
  if (pending) {
    const items = parseJSON(pending.items, []);
    return res.json({ attemptId: pending.id, startedAt: pending.started_at, total: items.length, items });
  }

  const items = buildPlacementItems();
  const id = crypto.randomUUID();
  const startedAt = new Date().toISOString();
  db.prepare('INSERT INTO placement_attempts (id, user_id, items, started_at) VALUES (?, ?, ?, ?)').run(id, userId, JSON.stringify(items), startedAt);
  res.status(201).json({ attemptId: id, startedAt, total: items.length, items });
});

app.get('/api/placement/result', (req, res) => {
  const userId = Number(req.query.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');
  const row = db.prepare('SELECT result, completed_at FROM placement_results WHERE user_id = ?').get(userId);
  if (!row) return notFound(res, 'Resultado');
  res.json({ ...parseJSON(row.result, {}), completedAt: row.completed_at });
});

app.post('/api/placement/skip', (req, res) => {
  const userId = Number(req.body?.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');
  const tracks = db.prepare('SELECT id, title, icon, color FROM tracks ORDER BY position').all().map((track) => ({
    ...track,
    level: track.id === 'english' ? 'A1' : 'Inicial',
    correct: 0,
    total: 0,
    review: [],
  }));
  const result = { correct: 0, total: 0, advancedLessons: 0, skipped: true, tracks };
  const completedAt = new Date().toISOString();
  db.exec('BEGIN');
  try {
    db.prepare('UPDATE placement_attempts SET completed_at = ? WHERE user_id = ? AND completed_at IS NULL').run(completedAt, userId);
    db.prepare(
      `INSERT INTO placement_results (user_id, result, completed_at) VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET result = excluded.result, completed_at = excluded.completed_at`
    ).run(userId, JSON.stringify(result), completedAt);
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  res.json({ ...result, user: getUser(userId) });
});

app.post('/api/placement/complete', (req, res) => {
  const userId = Number(req.body?.userId);
  const attemptId = String(req.body?.attemptId ?? '');
  if (!getUser(userId)) return notFound(res, 'Usuario');
  const attempt = db.prepare('SELECT * FROM placement_attempts WHERE id = ? AND user_id = ?').get(attemptId, userId);
  if (!attempt) return notFound(res, 'Prueba');
  if (attempt.completed_at) {
    const saved = db.prepare('SELECT result FROM placement_results WHERE user_id = ?').get(userId);
    return saved ? res.json({ ...parseJSON(saved.result, {}), user: getUser(userId) }) : notFound(res, 'Resultado');
  }

  const items = parseJSON(attempt.items, []);
  const responseMap = new Map(
    (Array.isArray(req.body?.responses) ? req.body.responses : []).map((response) => [Number(response.exerciseId), response.correct === true])
  );
  const tracks = [];
  const grouped = new Map();
  for (const item of items) {
    if (!grouped.has(item.trackId)) grouped.set(item.trackId, []);
    grouped.get(item.trackId).push(item);
  }

  for (const [trackId, trackItems] of grouped) {
    const correct = trackItems.filter((item) => responseMap.get(item.id)).length;
    const reviewMap = new Map();
    for (const item of trackItems.filter((entry) => !responseMap.get(entry.id))) {
      reviewMap.set(item.lessonId, { courseId: item.courseId, course: item.courseTitle, lesson: item.lessonTitle });
    }
    tracks.push({
      id: trackId,
      title: trackItems[0].trackTitle,
      icon: trackItems[0].trackIcon,
      color: trackItems[0].trackColor,
      level: placementLevel(trackId, correct, trackItems.length),
      correct,
      total: trackItems.length,
      review: [...reviewMap.values()],
    });
  }

  const correct = [...responseMap.values()].filter(Boolean).length;
  const completedAt = new Date().toISOString();
  let result;

  db.exec('BEGIN');
  try {
    const advancedLessons = advanceFromPlacement(userId, items, responseMap);
    result = { correct, total: items.length, advancedLessons, tracks };
    db.prepare('UPDATE placement_attempts SET completed_at = ? WHERE id = ?').run(completedAt, attemptId);
    db.prepare(
      `INSERT INTO placement_results (user_id, result, completed_at) VALUES (?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET result = excluded.result, completed_at = excluded.completed_at`
    ).run(userId, JSON.stringify(result), completedAt);
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }

  res.json({ ...result, user: getUser(userId) });
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

app.get('/api/roadmap', (req, res) => {
  const userId = Number(req.query.userId);
  if (!getUser(userId)) return notFound(res, 'Usuario');

  const items = db
    .prepare(
      `SELECT l.id, l.kind, l.title, l.position,
              u.title AS unit_title, u.position AS unit_position,
              c.id AS course_id, c.title AS course_title, c.icon, c.color, c.position AS course_position,
              t.id AS track_id, t.title AS track_title, t.position AS track_position,
              p.completed_at, p.best_score
       FROM lessons l
       JOIN units u ON u.id = l.unit_id
       JOIN courses c ON c.id = u.course_id
       JOIN tracks t ON t.id = c.track_id
       LEFT JOIN progress p ON p.lesson_id = l.id AND p.user_id = ?
       WHERE c.status = 'active'
       ORDER BY t.position, c.position, u.position, l.position`
    )
    .all(userId);

  res.json({
    total: items.length,
    completed: items.filter((item) => item.completed_at).length,
    items,
  });
});

app.get('/api/courses/:id', (req, res) => {
  const userId = Number(req.query.userId) || 0;
  const course = db
    .prepare(
      `SELECT c.*, t.color AS track_color, t.title AS track_title
       FROM courses c JOIN tracks t ON t.id = c.track_id
       WHERE c.id = ?`
    )
    .get(req.params.id);
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
      `SELECT l.*, u.title AS unit_title, u.course_id, c.title AS course_title, c.color, c.icon, t.color AS track_color
       FROM lessons l
       JOIN units u ON u.id = l.unit_id
       JOIN courses c ON c.id = u.course_id
       JOIN tracks t ON t.id = c.track_id
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
      trackColor: lesson.track_color,
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
  const user = addXp(userId, xpGained, 'practice');
  res.json({ passed: true, score, xpGained, user });
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

/** Arranca el servidor en 127.0.0.1. Resuelve con el puerto real o rechaza si está ocupado. */
export function startServer(port = PORT) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, '127.0.0.1', () => resolve({ server, port: server.address().port }));
    server.once('error', reject);
  });
}

// `node src/index.js` (modo web): arranca directamente.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer().then(({ port }) => console.log(`🚀 API de CodeRuta en http://localhost:${port}`));
}
