import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Spinner from '../components/Spinner.jsx';

const WEEKDAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

function startOfDay(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calendarDays(month) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const gridStart = addDays(first, -mondayOffset);
  return Array.from({ length: 42 }, (_, index) => addDays(gridStart, index));
}

const monthTitle = (date) => {
  const text = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  return text.charAt(0).toUpperCase() + text.slice(1);
};

function RoadmapEvent({ item, completed = false }) {
  return (
    <Link
      to={`/leccion/${item.id}`}
      className={`roadmap-event ${completed ? 'is-completed' : ''} ${item.kind === 'exam' ? 'is-exam' : ''}`}
      style={{ '--event': item.color }}
      title={`${item.course_title} · ${item.title}`}
    >
      <span>{completed ? '✓' : item.kind === 'exam' ? '🏆' : item.icon}</span>
      <span>{item.title}</span>
    </Link>
  );
}

export default function Roadmap() {
  const { user } = useUser();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [month, setMonth] = useState(() => startOfDay());

  useEffect(() => {
    api.roadmap(user.id).then(setData).catch((err) => setError(err.message));
  }, [user.id, user.xp]);

  const model = useMemo(() => {
    if (!data) return null;
    const today = startOfDay();
    const completed = new Map();
    const pending = [];

    for (const item of data.items) {
      if (item.completed_at) {
        const key = dateKey(new Date(item.completed_at));
        completed.set(key, [...(completed.get(key) ?? []), item]);
      } else {
        pending.push(item);
      }
    }

    const planned = new Map();
    pending.forEach((item, index) => planned.set(dateKey(addDays(today, index)), item));
    return { today, completed, pending, planned };
  }, [data]);

  if (error) return <div className="page"><p className="error">{error}</p></div>;
  if (!data || !model) return <Spinner />;

  const days = calendarDays(month);
  const pct = data.total ? Math.round((data.completed / data.total) * 100) : 0;
  const next = model.pending[0];
  const isCurrentMonth = month.getMonth() === model.today.getMonth() && month.getFullYear() === model.today.getFullYear();

  function moveMonth(amount) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  }

  return (
    <div className="page roadmap-page">
      <section className="roadmap-hero card">
        <div>
          <span className="eyebrow">Tu plan de aprendizaje</span>
          <h1>Roadmap mensual 🗓️</h1>
          <p className="muted">Una sesión cada día. Lo completado queda en verde y tu siguiente paso se reorganiza automáticamente.</p>
        </div>
        <div className="roadmap-progress">
          <strong>{pct}%</strong>
          <span className="muted small">{data.completed} de {data.total} etapas</span>
          <div className="progress progress-lg">
            <span style={{ width: `${pct}%` }} />
          </div>
        </div>
      </section>

      <div className="roadmap-layout">
        <section className="calendar card">
          <header className="calendar-head">
            <button className="icon-btn" onClick={() => moveMonth(-1)} aria-label="Mes anterior">←</button>
            <div>
              <h2>{monthTitle(month)}</h2>
              {!isCurrentMonth && <button className="calendar-today" onClick={() => setMonth(startOfDay())}>Volver a hoy</button>}
            </div>
            <button className="icon-btn" onClick={() => moveMonth(1)} aria-label="Mes siguiente">→</button>
          </header>

          <div className="calendar-grid calendar-weekdays">
            {WEEKDAYS.map((day) => <span key={day}>{day}</span>)}
          </div>
          <div className="calendar-grid calendar-body">
            {days.map((day) => {
              const key = dateKey(day);
              const done = model.completed.get(key) ?? [];
              const plan = model.planned.get(key);
              const outside = day.getMonth() !== month.getMonth();
              const today = key === dateKey(model.today);
              return (
                <article key={key} className={`calendar-day ${outside ? 'is-outside' : ''} ${today ? 'is-today' : ''}`}>
                  <div className="calendar-date">
                    <span>{day.getDate()}</span>
                    {today && <small>HOY</small>}
                  </div>
                  <div className="calendar-events">
                    {done.slice(0, 1).map((item) => <RoadmapEvent key={`done-${item.id}`} item={item} completed />)}
                    {done.length > 1 && <span className="calendar-more">+{done.length - 1} completadas</span>}
                    {plan && <RoadmapEvent item={plan} />}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="roadmap-sidebar">
          <section className="card next-step-card">
            <span className="eyebrow">Siguiente etapa</span>
            {next ? (
              <>
                <div className="next-step-icon" style={{ background: next.color }}>{next.icon}</div>
                <h2>{next.title}</h2>
                <p className="muted small">{next.course_title} · {next.unit_title}</p>
                <Link className="btn btn-primary btn-block" to={`/leccion/${next.id}`}>Empezar ahora →</Link>
              </>
            ) : (
              <>
                <div className="next-step-icon">🏆</div>
                <h2>¡Roadmap completado!</h2>
                <p className="muted">Has terminado todas las etapas disponibles.</p>
              </>
            )}
          </section>

          <section className="card roadmap-legend">
            <h3>Leyenda</h3>
            <p><span className="legend-dot done" /> Completado</p>
            <p><span className="legend-dot planned" /> Planificado</p>
            <p><span className="legend-dot exam" /> Examen de unidad</p>
            <p className="muted small">El plan propone una etapa diaria desde hoy. Si avanzas más rápido, el calendario se adapta.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
