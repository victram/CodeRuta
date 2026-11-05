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
// Ciberseguridad
import ciberNovato from './ciber-novato.js';
import ciberPrincipiante from './ciber-principiante.js';
import ciberProfesional from './ciber-profesional.js';
// Ampliación 2.0
import { expandExistingCourses } from './expanded-existing.js';
import kotlinAndroid from './kotlin-android.js';
import multiplataforma from './multiplataforma.js';
import testingFundamentos from './testing-fundamentos.js';
import testingAutomatizacion from './testing-automatizacion.js';
import cloudLinux from './cloud-linux.js';
import cloudProveedores from './cloud-proveedores.js';
import unity from './unity.js';
import unreal from './unreal.js';
import nextPostgres from './next-postgres.js';
import fullstackArquitectura from './fullstack-arquitectura.js';
import codigoLimpio from './codigo-limpio.js';
import arquitecturaEquipos from './arquitectura-equipos.js';
import english from './english.js';

const originalTracks = [
  {
    id: 'frontend',
    title: 'Desarrollo Frontend',
    icon: '🖥️',
    color: '#f76707',
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
    color: '#0c8599',
    description: 'Estructuras de datos y algoritmos: la base para programar bien y aprobar entrevistas.',
    courses: [estructuras, algoritmos],
  },
  {
    id: 'datos',
    title: 'Análisis de datos',
    icon: '📊',
    color: '#1c7ed6',
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
    color: '#e03131',
    description: 'Protege sistemas y datos en tres niveles: novato, principiante y profesional.',
    courses: [ciberNovato, ciberPrincipiante, ciberProfesional],
  },
];

expandExistingCourses(originalTracks);

export const tracks = [
  ...originalTracks,
  {
    id: 'movil',
    title: 'Desarrollo móvil',
    icon: '📱',
    color: '#2b8a3e',
    description: 'Crea aplicaciones Android e iOS con tecnologías modernas.',
    courses: [kotlinAndroid, multiplataforma],
  },
  {
    id: 'testing',
    title: 'Testing y QA',
    icon: '🧪',
    color: '#f08c00',
    description: 'Aprende a prevenir, encontrar y corregir errores de software.',
    courses: [testingFundamentos, testingAutomatizacion],
  },
  {
    id: 'cloud',
    title: 'Cloud computing',
    icon: '☁️',
    color: '#1971c2',
    description: 'Infraestructura, servicios cloud, Linux y despliegues.',
    courses: [cloudLinux, cloudProveedores],
  },
  {
    id: 'videojuegos',
    title: 'Desarrollo de videojuegos',
    icon: '🎮',
    color: '#495057',
    description: 'Lógica, motores, física y diseño de juegos.',
    courses: [unity, unreal],
  },
  {
    id: 'fullstack',
    title: 'Desarrollo full stack',
    icon: '🌐',
    color: '#5f3dc4',
    description: 'Integra interfaces, APIs, datos y despliegue en productos completos.',
    courses: [nextPostgres, fullstackArquitectura],
  },
  {
    id: 'ingenieria-software',
    title: 'Ingeniería de software',
    icon: '🏗️',
    color: '#087f5b',
    description: 'Diseña, prueba y mantiene código de calidad en equipo.',
    courses: [codigoLimpio, arquitecturaEquipos],
  },
  {
    id: 'english',
    title: 'Inglés',
    icon: '🇬🇧',
    color: '#4263eb',
    description: 'Comunicación cotidiana y profesional desde A1 hasta C1.',
    courses: [english],
  },
];
