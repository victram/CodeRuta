// ============================================================
//  MAPA DE RUTAS DE APRENDIZAJE
//  Ruta (track) → Cursos → Unidades → Lecciones → Ejercicios
//  Cada unidad termina automáticamente con un examen (80 % para aprobar).
//
//  Para añadir contenido: edita/crea un archivo de curso en esta carpeta
//  (mira _helpers.js para los atajos). Al guardar, el servidor recarga el
//  contenido sin borrar el progreso.
// ============================================================

// Frontend
import html from './html.js';
import css from './css.js';
import javascript from './javascript.js';
import typescript from './typescript.js';
import react from './react.js';
// Backend
import python from './python.js';
import java from './java.js';
import springboot from './springboot.js';
import node from './node.js';
import sql from './sql.js';
import apis from './apis.js';
import docker from './docker.js';
import git from './git.js';
// Ciencias de la computación
import estructuras from './estructuras.js';
import algoritmos from './algoritmos.js';
// Análisis de datos
import pandas from './pandas.js';
import estadistica from './estadistica.js';
// Inteligencia artificial
import iaFundamentos from './ia-fundamentos.js';
import iaMl from './ia-ml.js';
import iaProgramar from './ia-programar.js';
import iaNegocio from './ia-negocio.js';
// Entrevistas
import entrevistasCodigo from './entrevistas-codigo.js';
import entrevistasTeoria from './entrevistas-teoria.js';

export const tracks = [
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    icon: '🖥️',
    color: '#e8590c',
    description: 'Todo lo que ves en la pantalla: estructura, estilo e interactividad.',
    courses: [html, css, javascript, typescript, react],
  },
  {
    id: 'backend',
    title: 'Desarrollo Backend',
    icon: '🛠️',
    color: '#2f9e44',
    description: 'Servidores, bases de datos, APIs, Java y Spring Boot, contenedores y control de versiones.',
    courses: [python, java, springboot, node, sql, apis, docker, git],
  },
  {
    id: 'computacion',
    title: 'Ciencias de la computación',
    icon: '🧮',
    color: '#0b7285',
    description: 'Estructuras de datos y algoritmos: la base para programar bien y aprobar entrevistas.',
    courses: [estructuras, algoritmos],
  },
  {
    id: 'datos',
    title: 'Análisis de datos',
    icon: '📊',
    color: '#1864ab',
    description: 'Convierte datos en decisiones con Python, pandas, estadística y visualización.',
    courses: [pandas, estadistica],
  },
  {
    id: 'ia',
    title: 'Inteligencia Artificial',
    icon: '🤖',
    color: '#7048e8',
    description: 'Entiende la IA, entrena modelos, construye apps con IA y aprende a ganar dinero con ella.',
    courses: [iaFundamentos, iaMl, iaProgramar, iaNegocio],
  },
  {
    id: 'entrevistas',
    title: 'Entrevistas técnicas',
    icon: '💼',
    color: '#d6336c',
    description: 'Problemas de código, teoría, diseño de sistemas y preguntas de comportamiento.',
    courses: [entrevistasCodigo, entrevistasTeoria],
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
