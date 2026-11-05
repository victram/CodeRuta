// Reglas del juego: vidas, rachas, niveles y XP.
import { db } from './db.js';

export const MAX_HEARTS = 5;
export const HEART_REGEN_MS = 30 * 60 * 1000; // 1 vida cada 30 minutos
export const EXAM_PASS = 0.8; // 80 % para aprobar un examen
export const EXAM_SIZE = 10; // preguntas por examen

const pad = (n) => String(n).padStart(2, '0');
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return dayKey(d);
}
export const lastNDays = (n) => Array.from({ length: n }, (_, i) => daysAgo(n - 1 - i));

// Nivel L empieza en 25·L·(L-1) XP → 1:0, 2:50, 3:150, 4:300, 5:500…
const xpForLevel = (l) => 25 * l * (l - 1);
export function levelInfo(xp) {
  let level = 1;
  while (xp >= xpForLevel(level + 1)) level++;
  const base = xpForLevel(level);
  return { level, levelXp: xp - base, levelSize: xpForLevel(level + 1) - base };
}

const selectUser = db.prepare('SELECT * FROM users WHERE id = ?');

// Aplica la regeneración de vidas y corta la racha si se saltó un día.
function sync(row) {
  let { hearts, streak } = row;
  let at = row.hearts_updated_at ?? Date.now();
  let changed = false;

  if (hearts < MAX_HEARTS) {
    const gained = Math.floor((Date.now() - at) / HEART_REGEN_MS);
    if (gained > 0) {
      hearts = Math.min(MAX_HEARTS, hearts + gained);
      at = hearts >= MAX_HEARTS ? Date.now() : at + gained * HEART_REGEN_MS;
      changed = true;
    }
  }
  if (streak > 0 && row.last_active !== dayKey() && row.last_active !== daysAgo(1)) {
    streak = 0;
    changed = true;
  }
  if (changed) {
    db.prepare('UPDATE users SET hearts = ?, hearts_updated_at = ?, streak = ? WHERE id = ?').run(hearts, at, streak, row.id);
  }
  return { ...row, hearts, hearts_updated_at: at, streak };
}

function toPublic(u) {
  const todayXp = db
    .prepare('SELECT COALESCE(SUM(amount), 0) AS xp FROM xp_log WHERE user_id = ? AND day = ?')
    .get(u.id, dayKey()).xp;
  return {
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    xp: u.xp,
    ...levelInfo(u.xp),
    hearts: u.hearts,
    maxHearts: MAX_HEARTS,
    nextHeartIn: u.hearts < MAX_HEARTS ? Math.max(0, u.hearts_updated_at + HEART_REGEN_MS - Date.now()) : null,
    streak: u.streak,
    bestStreak: u.best_streak,
    dailyGoal: u.daily_goal,
    todayXp,
    playedToday: u.last_active === dayKey(),
  };
}

export function getUser(id) {
  const row = selectUser.get(id);
  return row ? toPublic(sync(row)) : null;
}

export function addXp(userId, amount, source) {
  const u = sync(selectUser.get(userId));
  const today = dayKey();
  let streak = u.streak;
  if (u.last_active !== today) streak = u.last_active === daysAgo(1) ? u.streak + 1 : 1;

  db.prepare(
    'UPDATE users SET xp = xp + ?, streak = ?, best_streak = MAX(best_streak, ?), last_active = ? WHERE id = ?'
  ).run(amount, streak, streak, today, userId);
  if (amount > 0) {
    db.prepare('INSERT INTO xp_log (user_id, day, amount, source) VALUES (?, ?, ?, ?)').run(userId, today, amount, source);
  }
  return getUser(userId);
}

export function loseHeart(userId) {
  const row = selectUser.get(userId);
  if (!row) return null;
  const u = sync(row);
  if (u.hearts > 0) {
    const at = u.hearts >= MAX_HEARTS ? Date.now() : u.hearts_updated_at;
    db.prepare('UPDATE users SET hearts = ?, hearts_updated_at = ? WHERE id = ?').run(u.hearts - 1, at, userId);
  }
  return getUser(userId);
}

export function gainHeart(userId) {
  const u = sync(selectUser.get(userId));
  if (u.hearts < MAX_HEARTS) db.prepare('UPDATE users SET hearts = ? WHERE id = ?').run(u.hearts + 1, userId);
  return getUser(userId);
}
