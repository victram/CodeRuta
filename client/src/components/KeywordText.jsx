const KEYWORDS = [
  'accesibilidad', 'algoritmo', 'argumento', 'array', 'async', 'atributo', 'autenticación', 'autorización',
  'backtracking', 'base de datos', 'callback', 'clase', 'cloud', 'colección', 'componente', 'condicional',
  'constante', 'constructor', 'contenedor', 'cookie', 'CSS', 'dataframe', 'depuración', 'diccionario', 'DOM',
  'Docker', 'endpoint', 'estado', 'evento', 'excepción', 'fetch', 'flexbox', 'función', 'genérico', 'Git',
  'grid', 'HTML', 'HTTP', 'índice', 'interfaz', 'Java', 'JavaScript', 'JSON', 'JWT', 'Kotlin', 'lista',
  'LLM', 'método', 'middleware', 'modelo', 'Node.js', 'objeto', 'OpenAPI', 'parámetro', 'promesa', 'Python',
  'React', 'recursión', 'repositorio', 'responsive', 'REST', 'ruta', 'selector', 'servidor', 'SQL', 'stream',
  'TypeScript', 'variable', 'bucle', 'API', 'BFS', 'DFS', 'CI/CD', 'CRUD', 'ORM', 'POO', 'RAG', 'SOLID',
  'present simple', 'past simple', 'past continuous', 'present perfect', 'first conditional', 'second conditional',
  'modal', 'passive', 'comparative', 'A1', 'A2', 'B1', 'B2', 'C1',
];

const escaped = KEYWORDS.sort((a, b) => b.length - a.length).map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const parts = new RegExp(`(\\*\\*[^*]+\\*\\*|\`[^\`]+\`|“[^”]+”|"[^"]+"|\\b(?:${escaped.join('|')})\\b|\\b[A-Z][A-Z0-9+.#/-]{1,}\\b)`, 'gi');

export default function KeywordText({ children }) {
  const text = String(children ?? '');
  return text.split(parts).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <strong key={index}><code>{part.slice(1, -1)}</code></strong>;
    if ((part.startsWith('“') && part.endsWith('”')) || (part.startsWith('"') && part.endsWith('"'))) {
      return <strong key={index}>{part}</strong>;
    }
    if (new RegExp(`^(?:${escaped.join('|')})$`, 'i').test(part) || /^[A-Z][A-Z0-9+.#/-]{1,}$/.test(part)) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
}
