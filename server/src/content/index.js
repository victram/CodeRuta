// ============================================================
//  MAPA DE RUTAS DE APRENDIZAJE
//  Ruta (track) → Cursos → Unidades → Lecciones → Ejercicios
//  Cada unidad termina automáticamente con un examen (80 % para aprobar).
//
//  Para añadir contenido: edita/crea un archivo de curso en esta carpeta.
//  Al guardar, el servidor recarga el contenido sin borrar el progreso.
// ============================================================
import html from './html.js';
import css from './css.js';
import javascript from './javascript.js';
import react from './react.js';
import python from './python.js';
import node from './node.js';
import sql from './sql.js';
import apis from './apis.js';
import git from './git.js';

export const tracks = [
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    icon: '🖥️',
    color: '#e8590c',
    description: 'Todo lo que ves en la pantalla: estructura, estilo e interactividad.',
    courses: [html, css, javascript, react],
  },
  {
    id: 'backend',
    title: 'Desarrollo Backend',
    icon: '🛠️',
    color: '#2f9e44',
    description: 'Lo que pasa detrás: servidores, bases de datos, APIs y control de versiones.',
    courses: [python, node, sql, apis, git],
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    icon: '🤖',
    color: '#7048e8',
    status: 'coming_soon',
    description: 'Entiende la IA, úsala para programar y aprende a ganar dinero con ella.',
    courses: [
      { id: 'ia-fundamentos', title: 'Fundamentos de IA', icon: '🧠', color: '#7048e8', level: 'Desde cero', description: 'Qué es la IA, modelos de lenguaje y cómo funcionan.' },
      { id: 'ia-programar', title: 'Programar con IA', icon: '🧑‍💻', color: '#7048e8', level: 'Intermedio', description: 'Prompts, asistentes de código y APIs de IA.' },
      { id: 'ia-negocio', title: 'Gana dinero con IA', icon: '💸', color: '#7048e8', level: 'Intermedio', description: 'Productos, servicios y automatizaciones que puedes vender.' },
    ],
  },
  {
    id: 'ciberseguridad',
    title: 'Ciberseguridad',
    icon: '🛡️',
    color: '#1971c2',
    status: 'coming_soon',
    description: 'Protege sistemas y datos en tres niveles: novato, principiante y profesional.',
    courses: [
      { id: 'ciber-novato', title: 'Novato', icon: '🔰', color: '#1971c2', level: 'Nivel 1', description: 'Contraseñas, phishing y hábitos seguros.' },
      { id: 'ciber-principiante', title: 'Principiante', icon: '🔐', color: '#1971c2', level: 'Nivel 2', description: 'Redes, cifrado y vulnerabilidades web comunes.' },
      { id: 'ciber-profesional', title: 'Profesional', icon: '🕵️', color: '#1971c2', level: 'Nivel 3', description: 'Pentesting ético, OWASP y respuesta a incidentes.' },
    ],
  },
];
