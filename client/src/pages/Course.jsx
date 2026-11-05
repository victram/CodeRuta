import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Spinner from '../components/Spinner.jsx';
import { useTrackTheme } from '../useTrackTheme.js';

// Desplazamiento horizontal de cada nodo para dibujar un camino en zigzag.
const OFFSETS = [0, 52, 84, 52, 0, -52, -84, -52];

function PathNode({ lesson, index, color }) {
  const navigate = useNavigate();
  const [hint, setHint] = useState(false);
  const isExam = lesson.kind === 'exam';
  const icon = lesson.status === 'locked' ? (isExam ? '🏆' : '🔒') : lesson.status === 'completed' ? (isExam ? '🏆' : '✓') : isExam ? '🏆' : '★';

  function open() {
    if (lesson.status === 'locked') {
      setHint(true);
      setTimeout(() => setHint(false), 1800);
      return;
    }
    navigate(`/leccion/${lesson.id}`);
  }

  return (
    <div className="node-wrap" style={{ transform: `translateX(${OFFSETS[index % OFFSETS.length]}px)` }}>
      {lesson.status === 'current' && <div className="start-bubble">{isExam ? '¡EXAMEN!' : 'EMPEZAR'}</div>}
      <button
        className={`node node-${lesson.status} ${isExam ? 'node-exam' : ''}`}
        style={lesson.status === 'current' ? { '--node': color } : undefined}
        onClick={open}
        aria-label={`${lesson.title} (${lesson.status === 'locked' ? 'bloqueada' : lesson.status === 'completed' ? 'completada' : 'disponible'})`}
      >
        {icon}
      </button>
      <div className="node-label">
        {lesson.title}
        {isExam && lesson.best_score != null && <span className="muted small"> · mejor {Math.round(lesson.best_score * 100)}%</span>}
      </div>
      {hint && <div className="node-hint">Completa la lección anterior para desbloquearla</div>}
    </div>
  );
}

export default function Course() {
  const { id } = useParams();
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCourse(null);
    api.course(id, user.id).then(setCourse).catch((e) => setError(e.message));
  }, [id, user.id]);

  useTrackTheme(course?.track_color);

  if (error) return <div className="page"><p className="error">{error}</p><Link to="/">← Volver</Link></div>;
  if (!course) return <Spinner />;

  const pct = course.total ? Math.round((course.done / course.total) * 100) : 0;

  return (
    <div className="page page-narrow">
      <Link to="/" className="back-link">
        ← Todas las rutas
      </Link>
      <header className="course-header" style={{ '--course': course.color }}>
        <div className="course-header-icon">{course.icon}</div>
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="progress-row">
            <div className="progress progress-light">
              <span style={{ width: `${pct}%` }} />
            </div>
            <strong>
              {course.done}/{course.total}
            </strong>
          </div>
        </div>
      </header>

      {course.status !== 'active' && <p className="card muted">Este curso estará disponible muy pronto. 🚧</p>}

      {course.units.map((u, ui) => (
        <section key={u.id} className="unit">
          <div className="unit-banner" style={{ background: course.color }}>
            <span className="unit-kicker">Unidad {ui + 1}</span>
            <h2>{u.title}</h2>
            <p>{u.description}</p>
          </div>
          <div className="path">
            {u.lessons.map((l, li) => (
              <PathNode key={l.id} lesson={l} index={li} color={course.color} />
            ))}
          </div>
        </section>
      ))}

      {course.status === 'active' && (
        <p className="muted small center">Pronto habrá más unidades en este curso. ¡Sigue practicando! 🚀</p>
      )}
    </div>
  );
}
