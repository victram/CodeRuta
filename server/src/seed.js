// Carga el contenido de server/src/content en SQLite.
// Se ejecuta solo al arrancar si el contenido cambió. `npm run seed` lo fuerza.
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { db } from './db.js';
import { tracks } from './content/index.js';

function validate(ex, where) {
  const fail = (msg) => {
    throw new Error(`Contenido inválido en ${where}: ${msg}`);
  };
  if (!ex.prompt) fail('falta "prompt"');
  switch (ex.type) {
    case 'choice':
      if (!Array.isArray(ex.options) || ex.options.length < 2) fail('"choice" necesita al menos 2 "options"');
      if (!Number.isInteger(ex.answer) || ex.answer < 0 || ex.answer >= ex.options.length) fail('"answer" fuera de rango');
      break;
    case 'fill': {
      if (!ex.code?.includes('___')) fail('"fill" necesita "___" dentro de "code"');
      const answers = [].concat(ex.answer ?? []);
      if (!answers.length) fail('falta "answer"');
      if (ex.options && !ex.options.some((o) => answers.includes(o))) fail('ninguna opción coincide con "answer"');
      break;
    }
    case 'order':
      if (!Array.isArray(ex.lines) || ex.lines.length < 2) fail('"order" necesita al menos 2 "lines"');
      break;
    case 'match':
      if (!Array.isArray(ex.pairs) || ex.pairs.length < 2) fail('"match" necesita al menos 2 "pairs"');
      break;
    default:
      fail(`tipo de ejercicio desconocido "${ex.type}"`);
  }
}

export function seedContent({ force = false } = {}) {
  const hash = crypto.createHash('sha1').update(JSON.stringify(tracks)).digest('hex');
  const current = db.prepare("SELECT value FROM meta WHERE key = 'content_hash'").get()?.value;
  if (!force && current === hash) return false;

  const insTrack = db.prepare('INSERT INTO tracks (id, title, description, icon, color, position, status) VALUES (?, ?, ?, ?, ?, ?, ?)');
  const insCourse = db.prepare(
    'INSERT INTO courses (id, track_id, title, description, icon, color, level, position, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  const insUnit = db.prepare('INSERT INTO units (id, course_id, title, description, position) VALUES (?, ?, ?, ?, ?)');
  const insLesson = db.prepare('INSERT INTO lessons (id, unit_id, kind, title, position, theory) VALUES (?, ?, ?, ?, ?, ?)');
  const insExercise = db.prepare(
    'INSERT INTO exercises (lesson_id, type, prompt, data, explanation, position) VALUES (?, ?, ?, ?, ?, ?)'
  );

  let lessonCount = 0;
  let exerciseCount = 0;

  db.exec('BEGIN');
  try {
    db.exec('DELETE FROM tracks'); // borra en cascada cursos, unidades, lecciones y ejercicios
    tracks.forEach((t, ti) => {
      insTrack.run(t.id, t.title, t.description ?? null, t.icon ?? null, t.color ?? null, ti, t.status ?? 'active');
      t.courses.forEach((c, ci) => {
        const units = c.units ?? [];
        const status = t.status === 'coming_soon' || !units.length ? 'coming_soon' : 'active';
        insCourse.run(c.id, t.id, c.title, c.description ?? null, c.icon ?? null, c.color ?? null, c.level ?? null, ci, status);

        units.forEach((u, ui) => {
          const unitId = `${c.id}-u${ui + 1}`;
          insUnit.run(unitId, c.id, u.title, u.description ?? null, ui);

          u.lessons.forEach((l, li) => {
            const lessonId = `${unitId}-l${li + 1}`;
            insLesson.run(lessonId, unitId, 'lesson', l.title, li, JSON.stringify(l.theory ?? []));
            lessonCount++;
            l.exercises.forEach((ex, ei) => {
              validate(ex, `${lessonId} (ejercicio ${ei + 1})`);
              const { type, prompt, explanation, ...data } = ex;
              if (type === 'fill') data.answer = [].concat(data.answer);
              insExercise.run(lessonId, type, prompt, JSON.stringify(data), explanation ?? null, ei);
              exerciseCount++;
            });
          });

          // Cada unidad termina con un examen que mezcla ejercicios de sus lecciones.
          insLesson.run(`${unitId}-exam`, unitId, 'exam', `Examen: ${u.title}`, u.lessons.length, '[]');
        });
      });
    });
    db.prepare(
      "INSERT INTO meta (key, value) VALUES ('content_hash', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    ).run(hash);
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }

  console.log(`📚 Contenido cargado: ${tracks.length} rutas, ${lessonCount} lecciones, ${exerciseCount} ejercicios.`);
  return true;
}

// `node src/seed.js` → recarga forzada
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  seedContent({ force: true });
}
