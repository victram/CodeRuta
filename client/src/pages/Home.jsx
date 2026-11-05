import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Spinner from '../components/Spinner.jsx';

function CourseCard({ course }) {
  const pct = course.total ? Math.round((course.done / course.total) * 100) : 0;
  const body = (
    <>
      <div className="course-icon" style={{ background: course.color }}>
        {course.icon}
      </div>
      <div className="course-info">
        <div className="course-title-row">
          <h3>{course.title}</h3>
          {course.level && <span className="badge">{course.level}</span>}
        </div>
        <p className="muted small">{course.description}</p>
        {course.status === 'active' ? (
          <div className="progress-row">
            <div className="progress">
              <span style={{ width: `${pct}%`, background: course.color }} />
            </div>
            <span className="small muted">{pct}%</span>
          </div>
        ) : (
          <span className="badge badge-soon">🔒 Próximamente</span>
        )}
      </div>
    </>
  );
  return course.status === 'active' ? (
    <Link to={`/curso/${course.id}`} className="course-card">
      {body}
    </Link>
  ) : (
    <div className="course-card disabled">{body}</div>
  );
}

export default function Home() {
  const { user } = useUser();
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.tracks(user.id).then(setTracks).catch((e) => setError(e.message));
  }, [user.id]);

  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!tracks) return <Spinner />;

  const goalPct = Math.min(100, Math.round((user.todayXp / user.dailyGoal) * 100));
  const courses = tracks.flatMap((t) => t.courses).filter((c) => c.status === 'active');
  const next = courses.find((c) => c.done > 0 && c.done < c.total) ?? courses.find((c) => c.done < c.total);

  return (
    <div className="page">
      <section className="hero card">
        <div className="hero-text">
          <h1>
            ¡Hola, {user.name}! <span aria-hidden>{user.avatar}</span>
          </h1>
          <p className="muted">
            {user.todayXp >= user.dailyGoal
              ? '¡Meta diaria cumplida! Sigue así 💪'
              : user.playedToday
                ? 'Buen trabajo hoy. ¡Un poco más para tu meta!'
                : 'Una lección al día mantiene viva tu racha 🔥'}
          </p>
          <div className="goal">
            <div className="goal-label">
              <span>Meta diaria</span>
              <strong>
                {user.todayXp} / {user.dailyGoal} XP
              </strong>
            </div>
            <div className="progress progress-lg">
              <span style={{ width: `${goalPct}%` }} />
            </div>
          </div>
        </div>
        <div className="hero-actions">
          {next && (
            <Link className="btn btn-primary btn-lg" to={`/curso/${next.id}`}>
              {next.done ? 'Continuar' : 'Empezar'} {next.title} →
            </Link>
          )}
          <Link className="btn btn-outline" to="/practica">
            🏋️ Practicar {user.hearts < user.maxHearts ? '(+1 ❤️)' : ''}
          </Link>
        </div>
      </section>

      {tracks.map((t) => (
        <section key={t.id} className={`track ${t.status === 'coming_soon' ? 'track-soon' : ''}`}>
          <header className="track-header">
            <span className="track-icon" style={{ background: t.color }}>
              {t.icon}
            </span>
            <div>
              <h2>
                {t.title} {t.status === 'coming_soon' && <span className="badge badge-soon">Próximamente</span>}
              </h2>
              <p className="muted">{t.description}</p>
            </div>
          </header>
          <div className="course-grid">
            {t.courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
