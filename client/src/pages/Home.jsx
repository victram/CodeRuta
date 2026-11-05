import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Spinner from '../components/Spinner.jsx';
import TrackLogo from '../components/TrackLogo.jsx';

function percentage(done, total) {
  return total ? Math.round((done / total) * 100) : 0;
}

function TrackIndexRow({ track, index, active, onToggle }) {
  const total = track.courses.reduce((sum, course) => sum + Number(course.total || 0), 0);
  const done = track.courses.reduce((sum, course) => sum + Number(course.done || 0), 0);
  const pct = percentage(done, total);

  return (
    <button
      type="button"
      className={`editorial-route ${active ? 'is-active' : ''}`}
      style={{ '--track': track.color }}
      onClick={onToggle}
      aria-expanded={active}
      aria-controls={`route-detail-${track.id}`}
    >
      <span className="editorial-route-number">{String(index + 1).padStart(2, '0')}</span>
      <TrackLogo id={track.id} color={track.color} className="editorial-route-logo" />
      <span className="editorial-route-main">
        <span className="editorial-route-title">{track.title}</span>
        <span className="editorial-route-progress">
          <span className="editorial-route-bar"><span style={{ width: `${pct}%` }} /></span>
          <span>{pct}%</span>
        </span>
      </span>
      <span className="editorial-route-symbol" aria-hidden="true">{active ? '−' : '∨'}</span>
    </button>
  );
}

function RouteDetail({ track }) {
  const activeCourses = track.courses.filter((course) => course.status === 'active');
  const total = activeCourses.reduce((sum, course) => sum + Number(course.total || 0), 0);
  const done = activeCourses.reduce((sum, course) => sum + Number(course.done || 0), 0);
  const pct = percentage(done, total);
  const current = activeCourses.find((course) => course.done > 0 && course.done < course.total)
    ?? activeCourses.find((course) => course.done < course.total)
    ?? activeCourses[0];

  return (
    <section id={`route-detail-${track.id}`} className="editorial-detail" style={{ '--track': track.color }} key={track.id}>
      <div className="editorial-detail-heading">
        <TrackLogo id={track.id} color={track.color} className="editorial-detail-logo" />
        <div>
          <span className="editorial-kicker">Ruta seleccionada</span>
          <h2>{track.title}</h2>
        </div>
      </div>

      <p className="editorial-detail-description">{track.description}</p>

      <div className="editorial-total-progress">
        <div><strong>Tu progreso</strong><strong style={{ color: track.color }}>{pct}%</strong></div>
        <span><span style={{ width: `${pct}%` }} /></span>
        <small>{done} de {total} lecciones completadas</small>
      </div>

      {current && (
        <div className="editorial-current">
          <span className="editorial-kicker">Siguiente curso</span>
          <div className="editorial-current-head">
            <span className="editorial-course-mark" style={{ color: current.color }}>{current.icon}</span>
            <div><h3>{current.title}</h3><p>{current.description}</p></div>
          </div>
          <div className="editorial-current-progress">
            <span><span style={{ width: `${percentage(current.done, current.total)}%`, background: current.color }} /></span>
            <small>{percentage(current.done, current.total)}%</small>
          </div>
        </div>
      )}

      <div className="editorial-course-list">
        <div className="editorial-course-list-title"><strong>Cursos de la ruta</strong><span>{track.courses.length}</span></div>
        {track.courses.map((course, index) => {
          const coursePct = percentage(course.done, course.total);
          const content = (
            <>
              <span className="editorial-course-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="editorial-course-icon" style={{ color: course.color }}>{course.icon}</span>
              <span className="editorial-course-name"><strong>{course.title}</strong><small>{course.status === 'active' ? `${coursePct}% completado` : 'Próximamente'}</small></span>
              <span className="editorial-course-arrow" aria-hidden="true">→</span>
            </>
          );
          return course.status === 'active' ? (
            <Link className="editorial-course-row" to={`/curso/${course.id}`} key={course.id}>{content}</Link>
          ) : (
            <div className="editorial-course-row is-disabled" key={course.id}>{content}</div>
          );
        })}
      </div>

      <div className="editorial-detail-actions">
        {current && <Link className="editorial-continue" to={`/curso/${current.id}`}><span>{current.done ? 'Continuar' : 'Empezar'}</span><span aria-hidden="true">→</span></Link>}
        <Link className="editorial-roadmap-link" to="/roadmap">Ver roadmap</Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { user } = useUser();
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState('');
  const [activeTrackId, setActiveTrackId] = useState(() => localStorage.getItem('coderuta.activeTrack') || undefined);

  useEffect(() => {
    api.tracks(user.id).then(setTracks).catch((e) => setError(e.message));
  }, [user.id]);

  const selectedTrack = useMemo(() => {
    if (!tracks?.length) return null;
    return tracks.find((track) => track.id === activeTrackId) ?? tracks[0];
  }, [activeTrackId, tracks]);

  useEffect(() => {
    if (tracks?.length && activeTrackId === undefined) setActiveTrackId(tracks[0].id);
  }, [activeTrackId, tracks]);

  function toggleTrack(id) {
    setActiveTrackId((current) => {
      const next = current === id ? null : id;
      if (next) localStorage.setItem('coderuta.activeTrack', next);
      else localStorage.removeItem('coderuta.activeTrack');
      return next;
    });
  }

  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!tracks) return <Spinner />;

  const allCourses = tracks.flatMap((track) => track.courses);
  const completedLessons = allCourses.reduce((sum, course) => sum + Number(course.done || 0), 0);
  const totalLessons = allCourses.reduce((sum, course) => sum + Number(course.total || 0), 0);

  return (
    <div className="page home-editorial-page">
      <header className="editorial-intro">
        <div>
          <span className="editorial-kicker">Tu catálogo de aprendizaje</span>
          <h1>Explora tus rutas</h1>
          <p>Elige un tema, revisa tu avance y continúa exactamente donde lo dejaste.</p>
        </div>
        <div className="editorial-summary" aria-label="Resumen de progreso">
          <div><strong>{tracks.length}</strong><span>rutas</span></div>
          <div><strong>{completedLessons}</strong><span>completadas</span></div>
          <div><strong>{percentage(completedLessons, totalLessons)}%</strong><span>progreso</span></div>
        </div>
      </header>

      <div className="editorial-layout">
        <section className="editorial-index" aria-label="Rutas de aprendizaje">
          {tracks.map((track, index) => (
            <TrackIndexRow key={track.id} track={track} index={index} active={selectedTrack?.id === track.id && activeTrackId !== null} onToggle={() => toggleTrack(track.id)} />
          ))}
        </section>

        <div className={`editorial-detail-shell ${activeTrackId === null ? 'is-empty' : ''}`}>
          {activeTrackId !== null && selectedTrack ? <RouteDetail track={selectedTrack} /> : (
            <div className="editorial-empty"><span>∨</span><h2>Selecciona una ruta</h2><p>Abre cualquiera de los temas para ver sus cursos y tu progreso.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}
