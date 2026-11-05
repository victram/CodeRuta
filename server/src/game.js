// Reglas del juego: rachas, niveles y XP.
import { db } from './db.js';

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

// Corta la racha si se saltó un día.
function sync(row) {
  let { streak } = row;
  let changed = false;
  if (streak > 0 && row.last_active !== dayKey() && row.last_active !== daysAgo(1)) {
    streak = 0;
    changed = true;
  }
  if (changed) {
    db.prepare('UPDATE users SET streak = ? WHERE id = ?').run(streak, row.id);
  }
  return { ...row, streak };
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
    streak: u.streak,
    bestStreak: u.best_streak,
    dailyGoal: u.daily_goal,
    todayXp,
    playedToday: u.last_active === dayKey(),
    placementCompleted: !!db.prepare('SELECT 1 FROM placement_results WHERE user_id = ?').get(u.id),
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
