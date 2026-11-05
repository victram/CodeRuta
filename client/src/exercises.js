// Lógica de corrección de los ejercicios (un único sitio para todos los tipos).

const norm = (s) => String(s ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function isReady(ex, value) {
  switch (ex.type) {
    case 'choice':
      return value != null;
    case 'fill':
      return norm(value) !== '';
    case 'order':
      return Array.isArray(value) && value.length === ex.lines.length;
    case 'match':
      return !!value?.done;
    default:
      return false;
  }
}

export function isCorrect(ex, value) {
  switch (ex.type) {
    case 'choice':
      return value === ex.answer;
    case 'fill':
      return [].concat(ex.answer).map(norm).includes(norm(value));
    case 'order':
      return value.map((i) => ex.lines[i]).join('\n') === ex.lines.join('\n');
    case 'match':
      return value.mistakes <= 1; // un fallo se perdona
    default:
      return false;
  }
}

export function solutionText(ex) {
  switch (ex.type) {
    case 'choice':
      return ex.options[ex.answer];
    case 'fill':
      return ex.code.replace('___', [].concat(ex.answer)[0]);
    case 'order':
      return ex.lines.join('\n');
    default:
      return null;
  }
}
