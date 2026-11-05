import { useMemo, useState } from 'react';
import { shuffle } from '../exercises.js';
import CodeBlock from './CodeBlock.jsx';

const looksLikeCode = (s) => /[<>{}()[\]=;#*"'.:_%]|^[a-z]+[A-Z]/.test(s);

function Choice({ ex, value, onChange, locked }) {
  const order = useMemo(() => shuffle(ex.options.map((_, i) => i)), [ex]);
  return (
    <div className="options">
      {order.map((i, k) => {
        let cls = 'option';
        if (value === i) cls += ' selected';
        if (locked && i === ex.answer) cls += ' correct';
        if (locked && value === i && i !== ex.answer) cls += ' wrong';
        return (
          <button key={i} className={cls} disabled={locked} onClick={() => onChange(i)}>
            <span className="option-key">{k + 1}</span>
            <span className={looksLikeCode(ex.options[i]) ? 'mono' : ''}>{ex.options[i]}</span>
          </button>
        );
      })}
    </div>
  );
}

function Fill({ ex, value, onChange, locked }) {
  const [before, after] = ex.code.split('___');
  const bank = useMemo(() => (ex.options ? shuffle(ex.options) : null), [ex]);
  return (
    <>
      <CodeBlock>
        {before}
        {bank ? (
          <span className={`slot ${value ? 'filled' : ''}`}>{value || '    '}</span>
        ) : (
          <input
            className="slot-input"
            value={value ?? ''}
            disabled={locked}
            autoFocus
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: `${Math.max(4, (value ?? '').length + 1)}ch` }}
          />
        )}
        {after}
      </CodeBlock>
      {bank && (
        <div className="word-bank">
          {bank.map((w) => (
            <button key={w} className={`word ${value === w ? 'used' : ''}`} disabled={locked} onClick={() => onChange(value === w ? null : w)}>
              {w}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

function Order({ ex, value, onChange, locked }) {
  const pool = useMemo(() => {
    const idx = ex.lines.map((_, i) => i);
    let s = shuffle(idx);
    for (let tries = 0; tries < 10 && s.every((v, i) => v === i); tries++) s = shuffle(idx);
    return s;
  }, [ex]);
  const picked = value ?? [];
  return (
    <div className="order">
      <div className="order-answer" style={{ minHeight: ex.lines.length * 52 + 28 }}>
        {picked.length === 0 && <span className="muted small">Toca las líneas en el orden correcto</span>}
        {picked.map((i) => (
          <button key={i} className="line" disabled={locked} onClick={() => onChange(picked.filter((p) => p !== i))}>
            {ex.lines[i]}
          </button>
        ))}
      </div>
      <div className="order-pool">
        {pool.map((i) =>
          picked.includes(i) ? (
            <span key={i} className="line ghost">
              {ex.lines[i]}
            </span>
          ) : (
            <button key={i} className="line" disabled={locked} onClick={() => onChange([...picked, i])}>
              {ex.lines[i]}
            </button>
          )
        )}
      </div>
    </div>
  );
}

function Match({ ex, onChange, locked }) {
  const right = useMemo(() => shuffle(ex.pairs.map((_, i) => i)), [ex]);
  const [sel, setSel] = useState({ left: null, right: null });
  const [matched, setMatched] = useState([]);
  const [wrong, setWrong] = useState(null);
  const [mistakes, setMistakes] = useState(0);

  function pick(side, i) {
    if (locked || matched.includes(i)) return;
    const next = { ...sel, [side]: i };
    if (next.left == null || next.right == null) return setSel(next);
    if (next.left === next.right) {
      const m = [...matched, i];
      setMatched(m);
      if (m.length === ex.pairs.length) onChange({ done: true, mistakes });
    } else {
      setMistakes((n) => n + 1);
      setWrong(next);
      setTimeout(() => setWrong(null), 500);
    }
    setSel({ left: null, right: null });
  }

  const cls = (side, i) => {
    let c = 'match-item';
    if (matched.includes(i)) c += ' matched';
    else if (wrong && wrong[side] === i) c += ' wrong';
    else if (sel[side] === i) c += ' selected';
    return c;
  };

  return (
    <div className="match-grid">
      <div className="match-col">
        {ex.pairs.map((p, i) => (
          <button key={i} className={cls('left', i)} onClick={() => pick('left', i)}>
            <span className={looksLikeCode(p[0]) ? 'mono' : ''}>{p[0]}</span>
          </button>
        ))}
      </div>
      <div className="match-col">
        {right.map((i) => (
          <button key={i} className={cls('right', i)} onClick={() => pick('right', i)}>
            <span className={looksLikeCode(ex.pairs[i][1]) ? 'mono' : ''}>{ex.pairs[i][1]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const typeLabel = {
  choice: 'Elige la respuesta',
  fill: 'Completa el hueco',
  order: 'Ordena las líneas',
  match: 'Une las parejas',
};

export default function Exercise({ ex, value, onChange, locked }) {
  const Comp = { choice: Choice, fill: Fill, order: Order, match: Match }[ex.type];
  return (
    <div className="exercise">
      <span className="exercise-type">{typeLabel[ex.type]}</span>
      <h2 className="prompt">{ex.prompt}</h2>
      {ex.code && ex.type !== 'fill' && <CodeBlock code={ex.code} />}
      {Comp ? <Comp ex={ex} value={value} onChange={onChange} locked={locked} /> : <p>Tipo de ejercicio no soportado.</p>}
    </div>
  );
}
