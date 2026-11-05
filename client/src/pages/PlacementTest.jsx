import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Exercise from '../components/Exercise.jsx';
import Spinner from '../components/Spinner.jsx';
import { isCorrect, isReady } from '../exercises.js';
import { runCode, runPassed } from '../codeRunner.js';

const storageKey = (attemptId) => `coderuta.placement.${attemptId}`;

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = String(seconds % 60).padStart(2, '0');
  return min ? `${min}:${sec}` : `${seconds}s`;
};

export default function PlacementTest() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(user.placementCompleted ? 'loading-result' : 'intro');
  const [attempt, setAttempt] = useState(null);
  const [position, setPosition] = useState(0);
  const [responses, setResponses] = useState([]);
  const [value, setValue] = useState(null);
  const [remaining, setRemaining] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);
  const lockedRef = useRef(false);
  const finishRef = useRef(null);

  useEffect(() => {
    if (!user.placementCompleted) return;
    api.placementResult(user.id).then((saved) => {
      setResult(saved);
      setPhase('result');
    }).catch(() => setPhase('intro'));
  }, [user.id, user.placementCompleted]);

  async function start() {
    setError('');
    setPhase('loading');
    try {
      const data = await api.startPlacement(user.id);
      let saved = null;
      try {
        saved = JSON.parse(localStorage.getItem(storageKey(data.attemptId)));
      } catch {
        saved = null;
      }
      setAttempt(data);
      setPosition(Math.min(saved?.position ?? 0, data.items.length - 1));
      setResponses(Array.isArray(saved?.responses) ? saved.responses : []);
      setValue(null);
      setFeedback(null);
      lockedRef.current = false;
      setPhase('test');
    } catch (err) {
      setError(err.message);
      setPhase('intro');
    }
  }

  async function startFromZero() {
    setError('');
    setPhase('loading');
    try {
      const skipped = await api.skipPlacement(user.id);
      setUser(skipped.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
      setPhase('intro');
    }
  }

  const item = attempt?.items[position];

  function persist(nextPosition, nextResponses) {
    try {
      localStorage.setItem(storageKey(attempt.attemptId), JSON.stringify({ position: nextPosition, responses: nextResponses }));
    } catch {
      // Si no hay almacenamiento, la prueba sigue funcionando durante esta sesión.
    }
  }

  async function complete(nextResponses) {
    setPhase('saving');
    try {
      const completed = await api.completePlacement({ userId: user.id, attemptId: attempt.attemptId, responses: nextResponses });
      try {
        localStorage.removeItem(storageKey(attempt.attemptId));
      } catch {
        // nada
      }
      setResult(completed);
      setUser(completed.user);
      setPhase('result');
    } catch (err) {
      setError(err.message);
      setPhase('save-error');
    }
  }

  function finishItem(correct, timedOut = false) {
    if (lockedRef.current || !item) return;
    lockedRef.current = true;
    const nextResponses = [...responses, { exerciseId: item.id, correct, timedOut }];
    setResponses(nextResponses);
    setFeedback({ correct, timedOut });

    window.setTimeout(() => {
      if (position + 1 >= attempt.items.length) {
        complete(nextResponses);
        return;
      }
      const nextPosition = position + 1;
      persist(nextPosition, nextResponses);
      setPosition(nextPosition);
      setValue(null);
      setFeedback(null);
      lockedRef.current = false;
    }, 650);
  }
  finishRef.current = finishItem;

  useEffect(() => {
    if (phase !== 'test' || !item || feedback) return;
    setRemaining(item.timeLimit);
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          window.setTimeout(() => finishRef.current?.(false, true), 0);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [feedback, item, phase, position]);

  async function answer() {
    if (!item || feedback || running || !isReady(item, value)) return;
    if (item.type === 'code') {
      setRunning(true);
      const run = await runCode(value, item.tests);
      setRunning(false);
      finishItem(runPassed(run));
    } else {
      finishItem(isCorrect(item, value));
    }
  }

  if (phase === 'loading' || phase === 'loading-result' || phase === 'saving') return <Spinner fullscreen />;

  if (phase === 'save-error') {
    return (
      <div className="center-screen">
        <div className="card narrow-card center">
          <div className="big-emoji">📡</div>
          <h2>No se pudo guardar todavía</h2>
          <p className="muted">{error}</p>
          <button className="btn btn-primary btn-lg" onClick={() => complete(responses)}>Reintentar guardado</button>
        </div>
      </div>
    );
  }

  if (phase === 'result' && result) {
    return (
      <div className="placement-shell placement-results">
        <header className="placement-brand">🧭 <strong>CodeRuta</strong></header>
        <section className="placement-result-head card">
          <span className="eyebrow">Diagnóstico completado</span>
          <h1>Tu mapa de nivel</h1>
          <p>Has acertado <strong>{result.correct} de {result.total}</strong>. Hemos adelantado {result.advancedLessons} etapas que ya dominas.</p>
          <div className="placement-result-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')}>Elegir una ruta →</button>
            <button className="btn btn-outline" onClick={() => { setResult(null); setPhase('intro'); }}>Repetir prueba</button>
          </div>
        </section>
        <div className="placement-level-grid">
          {result.tracks.map((track) => (
            <article className="placement-level card" key={track.id} style={{ '--level-color': track.color }}>
              <div className="placement-level-title">
                <span>{track.icon}</span>
                <div><h2>{track.title}</h2><small>{track.correct}/{track.total} correctas</small></div>
                <strong>{track.level}</strong>
              </div>
              {track.review.length ? (
                <div className="placement-review">
                  <span>Conviene repasar</span>
                  {track.review.slice(0, 3).map((entry) => <Link key={entry.lesson} to={`/curso/${entry.courseId}`}>{entry.lesson}</Link>)}
                </div>
              ) : <p className="placement-mastered">✓ Bloque dominado</p>}
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="placement-shell placement-intro">
        <header className="placement-brand">🧭 <strong>CodeRuta</strong></header>
        <section className="placement-intro-card card">
          <div className="placement-intro-icon">🎯</div>
          <span className="eyebrow">Antes de elegir tu ruta</span>
          <h1>Descubramos tu nivel</h1>
          <p className="muted">45 pruebas rápidas recorrerán programación, datos, IA, seguridad, cloud, inglés y el resto de áreas.</p>
          <div className="placement-rules">
            <div><strong>15–50 s</strong><span>Preguntas</span></div>
            <div><strong>45 s</strong><span>Ejercicio inicial</span></div>
            <div><strong>1:30 min</strong><span>Intermedio</span></div>
            <div><strong>5 min</strong><span>Avanzado</span></div>
          </div>
          <p className="small muted">Responde sin ayuda externa. Si no lo sabes, deja que termine el tiempo: el objetivo es crear un plan honesto, no sacar una nota.</p>
          {error && <p className="error">{error}</p>}
          <div className="placement-entry-actions">
            <button className="btn btn-primary btn-lg" onClick={start}>Mirar mi nivel →</button>
            <button className="btn btn-outline btn-lg" onClick={startFromZero}>Comenzar desde 0</button>
          </div>
        </section>
      </div>
    );
  }

  const progress = ((position + (feedback ? 1 : 0)) / attempt.total) * 100;
  return (
    <div className="placement-test">
      <header className="placement-test-head">
        <span className="placement-brand">🧭 <strong>CodeRuta</strong></span>
        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
        <strong>{position + 1}/{attempt.total}</strong>
      </header>
      <main className="placement-test-body">
        <div className="placement-question-head">
          <span className="muted small">Pregunta cronometrada</span>
          <span className={`placement-timer ${remaining <= 5 ? 'is-urgent' : ''}`}>⏱ {formatTime(remaining)}</span>
        </div>
        <Exercise ex={item} value={value} onChange={setValue} locked={!!feedback} />
      </main>
      <footer className={`placement-footer ${feedback ? (feedback.correct ? 'is-ok' : 'is-bad') : ''}`}>
        <div>{feedback && <strong>{feedback.timedOut ? 'Tiempo agotado' : feedback.correct ? 'Correcto' : 'Respuesta registrada'}</strong>}</div>
        <div className="placement-answer-actions">
          <button className="btn btn-outline btn-lg" disabled={!!feedback || running} onClick={() => finishItem(false)}>No sé</button>
          <button className="btn btn-primary btn-lg" disabled={!isReady(item, value) || !!feedback || running} onClick={answer}>
            {running ? 'Ejecutando…' : 'Responder'}
          </button>
        </div>
      </footer>
    </div>
  );
}
