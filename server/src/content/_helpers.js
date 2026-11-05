// Atajos para escribir contenido más rápido. Producen los mismos objetos que el formato largo.
//
//  card(título, cuerpo, código?)                     → tarjeta de teoría
//  choice(pregunta, opciones, índiceCorrecto, extra?) → extra: { code, explanation }
//  fill(pregunta, códigoCon___, respuesta, opciones?, extra?)
//  order(pregunta, líneasEnOrden, extra?)
//  match(pregunta, [[a, b], ...], extra?)
//  reto(pregunta, códigoInicial, pruebas, solución, extra?)  → reto práctico en JavaScript
//      pruebas: [['suma(2, 3)', 5], ...]   (llamada, valor esperado)
//      extra: { hint, explanation }

export const card = (title, body, code) => (code ? { title, body, code } : { title, body });

export const choice = (prompt, options, answer, extra = {}) => ({ type: 'choice', prompt, options, answer, ...extra });

export const fill = (prompt, code, answer, options, extra = {}) => ({
  type: 'fill',
  prompt,
  code,
  answer,
  ...(options ? { options } : {}),
  ...extra,
});

export const order = (prompt, lines, extra = {}) => ({ type: 'order', prompt, lines, ...extra });

export const match = (prompt, pairs, extra = {}) => ({ type: 'match', prompt, pairs, ...extra });

export const reto = (prompt, starter, tests, solution, extra = {}) => ({
  type: 'code',
  prompt,
  starter,
  tests: tests.map(([call, expected]) => ({ call, expected })),
  solution,
  ...extra,
});

export const lesson = (title, theory, exercises) => ({ title, theory, exercises });
export const unit = (title, description, lessons) => ({ title, description, lessons });
