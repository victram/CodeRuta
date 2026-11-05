import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// En la app de escritorio, Electron indica la carpeta de datos del usuario (AppData).
const dataDir = process.env.CODERUTA_DATA_DIR || path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, 'coderuta.db'));

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS meta (
    key   TEXT PRIMARY KEY,
    value TEXT
  );

  -- ===== Contenido (se regenera desde server/src/content) =====
  CREATE TABLE IF NOT EXISTS tracks (
    id          TEXT PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    icon        TEXT,
    color       TEXT,
    position    INTEGER NOT NULL,
    status      TEXT NOT NULL DEFAULT 'active'
  );

  CREATE TABLE IF NOT EXISTS courses (
    id          TEXT PRIMARY KEY,
    track_id    TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    icon        TEXT,
    color       TEXT,
    level       TEXT,
    position    INTEGER NOT NULL,
    status      TEXT NOT NULL DEFAULT 'active'
  );

  CREATE TABLE IF NOT EXISTS units (
    id          TEXT PRIMARY KEY,
    course_id   TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    position    INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id       TEXT PRIMARY KEY,
    unit_id  TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
    kind     TEXT NOT NULL DEFAULT 'lesson', -- 'lesson' | 'exam'
    title    TEXT NOT NULL,
    position INTEGER NOT NULL,
    theory   TEXT NOT NULL DEFAULT '[]'      -- JSON con las tarjetas de teoría
  );

  CREATE TABLE IF NOT EXISTS exercises (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    lesson_id   TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,               -- 'choice' | 'fill' | 'order' | 'match'
    prompt      TEXT NOT NULL,
    data        TEXT NOT NULL,               -- JSON con opciones/respuesta
    explanation TEXT,
    position    INTEGER NOT NULL
  );

  -- ===== Usuarios y progreso (nunca se borran al recargar contenido) =====
  CREATE TABLE IF NOT EXISTS users (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    name              TEXT NOT NULL,
    avatar            TEXT,
    xp                INTEGER NOT NULL DEFAULT 0,
    streak            INTEGER NOT NULL DEFAULT 0,
    best_streak       INTEGER NOT NULL DEFAULT 0,
    last_active       TEXT,
    daily_goal        INTEGER NOT NULL DEFAULT 30,
    created_at        TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  -- lesson_id sin clave foránea a propósito: el progreso sobrevive a las recargas de contenido.
  CREATE TABLE IF NOT EXISTS progress (
    user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id    TEXT NOT NULL,
    best_score   REAL NOT NULL DEFAULT 0,
    attempts     INTEGER NOT NULL DEFAULT 0,
    completed_at TEXT,
    PRIMARY KEY (user_id, lesson_id)
  );

  CREATE TABLE IF NOT EXISTS xp_log (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    day     TEXT NOT NULL,
    amount  INTEGER NOT NULL,
    source  TEXT
  );

  CREATE INDEX IF NOT EXISTS idx_xp_log_user_day ON xp_log(user_id, day);

  CREATE TABLE IF NOT EXISTS placement_attempts (
    id           TEXT PRIMARY KEY,
    user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    items        TEXT NOT NULL,
    started_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS placement_results (
    user_id      INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    result       TEXT NOT NULL,
    completed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
