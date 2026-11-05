import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Spinner from '../components/Spinner.jsx';

const GOALS = [
  { xp: 10, label: 'Relajado' },
  { xp: 20, label: 'Normal' },
  { xp: 30, label: 'Serio' },
  { xp: 50, label: 'Intenso' },
];

const weekday = (day) => new Date(`${day}T00:00:00`).toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');

export default function Profile() {
  const { user, setUser, logout } = useUser();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.stats(user.id).then(setStats).catch(() => setStats({ error: true }));
  }, [user.id, user.xp]);

  async function changeGoal(xp) {
    setUser(await api.updateUser(user.id, { dailyGoal: xp }));
  }

  if (!stats) return <Spinner />;

  const levelPct = Math.round((user.levelXp / user.levelSize) * 100);

  return (
    <div className="page page-narrow">
      <section className="profile-head card">
        <div className="avatar-xl">{user.avatar}</div>
        <div className="grow">
          <h1>{user.name}</h1>
          <p className="muted">
            Nivel {user.level} · {user.levelXp}/{user.levelSize} XP para el nivel {user.level + 1}
          </p>
          <div className="progress progress-lg">
            <span style={{ width: `${levelPct}%`, background: 'var(--gold)' }} />
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-emoji">🔥</span>
          <strong>{user.streak}</strong>
          <span className="muted small">Racha actual</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🏅</span>
          <strong>{user.bestStreak}</strong>
          <span className="muted small">Mejor racha</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">⭐</span>
          <strong>{user.xp}</strong>
          <span className="muted small">XP total</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">📘</span>
          <strong>{stats.lessons ?? 0}</strong>
          <span className="muted small">Lecciones</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🏆</span>
          <strong>{stats.exams ?? 0}</strong>
          <span className="muted small">Exámenes</span>
        </div>
        <div className="stat-card">
          <span className="stat-emoji">🌟</span>
          <strong>{stats.perfect ?? 0}</strong>
          <span className="muted small">Perfectas</span>
        </div>
      </section>

      {stats.week && (
        <section className="card">
          <h2>Últimos 7 días</h2>
          <div className="week">
            {stats.week.map((d) => (
              <div key={d.day} className={`day ${d.xp >= user.dailyGoal ? 'day-goal' : d.xp > 0 ? 'day-some' : ''}`}>
                <span className="day-name">{weekday(d.day)}</span>
                <span className="day-dot">{d.xp >= user.dailyGoal ? '🔥' : d.xp > 0 ? '•' : ''}</span>
                <span className="small muted">{d.xp} XP</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {stats.courses?.length > 0 && (
        <section className="card">
          <h2>Tus cursos</h2>
          <div className="course-progress-list">
            {stats.courses.map((c) => (
              <Link key={c.id} to={`/curso/${c.id}`} className="course-progress">
                <span className="course-icon sm" style={{ background: c.color }}>
                  {c.icon}
                </span>
                <span className="grow">
                  <strong>{c.title}</strong>
                  <div className="progress">
                    <span style={{ width: `${Math.round((c.done / c.total) * 100)}%`, background: c.color }} />
                  </div>
                </span>
                <span className="small muted">
                  {c.done}/{c.total}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="card">
        <h2>Meta diaria</h2>
        <div className="goal-picker">
          {GOALS.map((g) => (
            <button key={g.xp} className={`goal-option ${user.dailyGoal === g.xp ? 'active' : ''}`} onClick={() => changeGoal(g.xp)}>
              <strong>{g.label}</strong>
              <span className="small muted">{g.xp} XP/día</span>
            </button>
          ))}
        </div>
      </section>

      <button className="btn btn-outline btn-block" onClick={logout}>
        Cambiar de perfil
      </button>
    </div>
  );
}
