import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';
import Exercise from '../components/Exercise.jsx';
import RichText from '../components/RichText.jsx';
import CodeBlock from '../components/CodeBlock.jsx';
import Spinner from '../components/Spinner.jsx';
import { heartTitle } from '../components/TopBar.jsx';
import { isCorrect, isReady, solutionText } from '../exercises.js';
import { runCode, runPassed } from '../codeRunner.js';

export default function LessonPlayer({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('loading'); // theory | intro | play | saving | result | noHearts
  const [step, setStep] = useState(0);
  const [queue, setQueue] = useState([]); // índices de ejercicios pendientes (los fallados se repiten al final)
  const [pos, setPos] = useState(0);
  const [value, setValue] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [firstTry, setFirstTry] = useState({}); // índice → acertó a la primera
  const [solved, setSolved] = useState(0);
  const [result, setResult] = useState(null);
  const checkedRef = useRef(false);
  const [drafts, setDrafts] = useState({}); // código escrito en cada reto, para no perderlo al repetirlo
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let alive = true;
    setPhase('loading');
    const load = mode === 'practice' ? api.practice(user.id) : api.lesson(id);
    load
      .then((d) => {
        if (!alive) return;
        setData(d);
        setQueue(d.exercises.map((_, i) => i));
        const kind = d.lesson.kind;
        if (kind === 'lesson' && user.hearts <= 0) setPhase('noHearts');
        else if (d.lesson.theory?.length) setPhase('theory');
        else setPhase(kind === 'exam' ? 'intro' : 'play');
      })
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [id, mode, user.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const kind = data?.lesson.kind;
  const exitTo = data?.lesson.courseId ? `/curso/${data.lesson.courseId}` : '/';
  const exIdx = queue[pos];
  const ex = data?.exercises[exIdx];
  const ready = ex ? isReady(ex, value) : false;

  async function check() {
    if (feedback || !ready || checkedRef.current) return;
    checkedRef.current = true; // evita dobles comprobaciones si se pulsa Enter muy rápido

    let ok;
    let run = null;
    if (ex.type === 'code') {
      setDrafts((d) => ({ ...d, [exIdx]: value }));
      setRunning(true);
      run = await runCode(value, ex.tests);
      setRunning(false);
      ok = runPassed(run);
    } else {
      ok = isCorrect(ex, value);
    }

    setFeedback({ correct: ok, run });
    if (!(exIdx in firstTry)) setFirstTry((f) => ({ ...f, [exIdx]: ok }));
    if (ok) {
      setSolved((n) => n + 1);
      return;
    }
    if (kind !== 'exam') setQueue((q) => [...q, exIdx]);
    // Los retos de código no quitan vidas: equivocarse programando es parte de aprender.
    if (kind === 'lesson' && ex.type !== 'code') {
      setUser((u) => ({ ...u, hearts: Math.max(0, u.hearts - 1) }));
      api.loseHeart(user.id).then(setUser).catch(() => {});
    }
  }

  function next() {
    if (!checkedRef.current) return;
    if (kind === 'lesson' && user.hearts <= 0) return setPhase('noHearts');
    if (pos + 1 >= queue.length) return finish();
    checkedRef.current = false;
    setPos((p) => p + 1);
    setValue(drafts[queue[pos + 1]] ?? null);
    setFeedback(null);
  }

  async function finish() {
    setPhase('saving');
    const total = data.exercises.length;
    const correct = Object.values(firstTry).filter(Boolean).length;
    try {
      const r =
        kind === 'practice'
          ? await api.completePractice({ userId: user.id, correct, total })
          : await api.completeLesson(data.lesson.id, { userId: user.id, correct, total });
      setUser(r.user);
      setResult({ ...r, correct, total });
      setPhase('result');
    } catch (e) {
      setError(e.message);
    }
  }

  // Enter = comprobar / continuar
  useEffect(() => {
    if (phase !== 'play') return;
    const onKey = (e) => {
      if (e.key !== 'Enter') return;
      // En el editor de código, Enter es un salto de línea; Ctrl/Cmd + Enter comprueba.
      if (e.target.tagName === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault(); // evita que Enter "pulse" además el botón enfocado
      feedback ? next() : check();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (error) {
    return (
      <div className="center-screen">
        <div className="card narrow-card center">
          <div className="big-emoji">😕</div>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }
  if (phase === 'loading' || phase === 'saving') return <Spinner fullscreen />;

  if (phase === 'noHearts') {
    return (
      <div className="center-screen">
        <div className="card narrow-card center">
          <div className="big-emoji">💔</div>
          <h2>¡Te quedaste sin vidas!</h2>
          <p className="muted">Recuperas 1 vida cada 30 minutos ({heartTitle(user).toLowerCase()}). También puedes ganar una vida practicando lo que ya sabes.</p>
          <div className="stack">
            <Link to="/practica" className="btn btn-primary btn-lg">
              🏋️ Practicar (+1 ❤️)
            </Link>
            <Link to={exitTo} className="btn btn-outline">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { lesson } = data;

  if (phase === 'theory') {
    const card = lesson.theory[step];
    const last = step === lesson.theory.length - 1;
    return (
      <div className="lesson-shell">
        <LessonTop onClose={() => navigate(exitTo)} progress={(step + 1) / lesson.theory.length} color="var(--info)" label="Teoría" />
        <div className="lesson-body">
          <div className="theory-card card">
            <span className="exercise-type">
              📖 Teoría · {step + 1}/{lesson.theory.length}
            </span>
            <h2>{card.title}</h2>
            <RichText text={card.body} />
            {card.code && <CodeBlock code={card.code} />}
          </div>
        </div>
        <footer className="lesson-footer">
          <div className="footer-inner">
            <button className="btn btn-outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              ← Atrás
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => (last ? setPhase(kind === 'exam' ? 'intro' : 'play') : setStep((s) => s + 1))}>
              {last ? '¡A practicar!' : 'Siguiente'}
            </button>
          </div>
        </footer>
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="center-screen">
        <div className="card narrow-card center">
          <div className="big-emoji">🏆</div>
          <h2>{lesson.title}</h2>
          <p className="muted">
            {data.exercises.length} preguntas de toda la unidad. Necesitas un <strong>{Math.round(lesson.passMark * 100)}%</strong> para aprobar. En los
            exámenes no pierdes vidas.
          </p>
          <div className="stack">
            <button className="btn btn-primary btn-lg" onClick={() => setPhase('play')}>
              Empezar examen
            </button>
            <Link to={exitTo} className="btn btn-outline">
              Ahora no
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round(result.score * 100);
    const failed = !result.passed;
    return (
      <div className="center-screen">
        <div className="card narrow-card center result">
          <div className="big-emoji pop">{failed ? '📚' : kind === 'exam' ? '🏆' : pct === 100 ? '🌟' : '🎉'}</div>
          <h2>
            {failed
              ? '¡Casi! Necesitas un ' + Math.round(result.passMark * 100) + '%'
              : kind === 'exam'
                ? '¡Examen aprobado!'
                : kind === 'practice'
                  ? '¡Práctica completada!'
                  : '¡Lección completada!'}
          </h2>
          {failed && <p className="muted">Repasa las lecciones de la unidad y vuelve a intentarlo. ¡Tú puedes!</p>}
          <div className="result-stats">
            <div className="stat stat-xp">
              <span>XP</span>
              <strong>+{result.xpGained}</strong>
            </div>
            <div className={`stat ${pct >= 80 ? 'stat-good' : 'stat-meh'}`}>
              <span>Aciertos</span>
              <strong>{pct}%</strong>
            </div>
            {result.heartGained && (
              <div className="stat stat-heart">
                <span>Vida</span>
                <strong>+1 ❤️</strong>
              </div>
            )}
          </div>
          <div className="stack">
            {failed ? (
              <button className="btn btn-primary btn-lg" onClick={() => window.location.reload()}>
                Reintentar examen
              </button>
            ) : (
              <Link to={exitTo} className="btn btn-primary btn-lg">
                Continuar
              </Link>
            )}
            {failed && (
              <Link to={exitTo} className="btn btn-outline">
                Volver al curso
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // phase === 'play'
  const total = data.exercises.length;
  const done = kind === 'exam' ? pos + (feedback ? 1 : 0) : solved;
  const solution = feedback && !feedback.correct ? solutionText(ex) : null;

  return (
    <div className="lesson-shell">
      <LessonTop
        onClose={() => navigate(exitTo)}
        progress={done / total}
        color={kind === 'exam' ? 'var(--gold)' : 'var(--success)'}
        hearts={kind === 'lesson' ? user.hearts : null}
        heartTitle={heartTitle(user)}
        label={kind === 'exam' ? `${Math.min(pos + 1, total)}/${total}` : null}
      />
      <div className="lesson-body">
        <Exercise key={`${pos}-${exIdx}`} ex={ex} value={value} onChange={setValue} locked={!!feedback} />
      </div>
      <footer className={`lesson-footer ${feedback ? (feedback.correct ? 'is-ok' : 'is-bad') : ''}`}>
        <div className="footer-inner">
          <div className="feedback">
            {feedback && (
              <>
                <strong className="feedback-title">
                  {feedback.correct ? (feedback.run ? '¡Todas las pruebas pasan! 🎉' : '¡Correcto! 🎉') : 'No es correcto 😅'}
                </strong>
                {feedback.run && <RunReport run={feedback.run} />}
                {solution && (
                  <div className="feedback-solution">
                    <span>{ex.type === 'code' ? 'Una solución posible:' : 'Respuesta correcta:'}</span>
                    <pre>{solution}</pre>
                  </div>
                )}
                {ex.explanation && <p className="feedback-expl">{ex.explanation}</p>}
                {!feedback.correct && kind !== 'exam' && <p className="small">Volverá a aparecer al final.</p>}
              </>
            )}
          </div>
          <button
            className={`btn btn-lg ${feedback && !feedback.correct ? 'btn-danger' : 'btn-success'}`}
            disabled={(!feedback && !ready) || running}
            onClick={feedback ? next : check}
          >
            {feedback ? 'Continuar' : running ? 'Ejecutando…' : ex.type === 'code' ? 'Ejecutar pruebas' : 'Comprobar'}
          </button>
        </div>
      </footer>
    </div>
  );
}

function RunReport({ run }) {
  if (run.timedOut) return <p className="run-error">⏱️ Tiempo agotado: ¿hay un bucle infinito?</p>;
  if (run.error) return <p className="run-error">⚠️ {run.error}</p>;
  return (
    <div className="run-report">
      {run.results.map((r, i) => (
        <div key={i} className={r.pass ? 'run-pass' : 'run-fail'}>
          {r.pass ? '✓' : '✗'} <code>{r.call}</code> → <code>{r.got}</code>
          {!r.pass && <span className="small"> (esperado {r.expected})</span>}
        </div>
      ))}
      {run.logs?.length > 0 && <pre className="run-logs">{run.logs.join('\n')}</pre>}
    </div>
  );
}

function LessonTop({ onClose, progress, color, hearts, heartTitle: title, label }) {
  return (
    <div className="lesson-top">
      <button className="icon-btn" onClick={onClose} aria-label="Salir de la lección">
        ✕
      </button>
      <div className="progress progress-lg grow">
        <span style={{ width: `${Math.round(progress * 100)}%`, background: color }} />
      </div>
      {label && <span className="lesson-label">{label}</span>}
      {hearts != null && (
        <span className="chip chip-heart" title={title}>
          ❤️ {hearts}
        </span>
      )}
    </div>
  );
}
