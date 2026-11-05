import { addTopicToLesson, expandedUnit } from './_expanded-helpers.js';

const additions = {
  html: ['Accesibilidad y herramientas del navegador', 'HTML inclusivo, multimedia y herramientas de inspección.', [
    ['HTML accesible', 'Texto alternativo, labels y navegación por teclado', 'ARIA: cuándo usarlo y cuándo evitarlo'],
    ['Multimedia y metadatos', 'Audio y vídeo', 'Metadatos, favicon y SEO básico'],
    ['DevTools y proyecto HTML', 'Inspeccionar y depurar elementos', '[Proyecto] Página de presentación accesible'],
  ]],
  css: ['CSS moderno y proyectos', 'Movimiento, variables y composición responsive.', [
    ['Animaciones y transiciones', 'transition, transform y keyframes', 'Preferencias de movimiento reducido'],
    ['Variables y CSS escalable', 'Custom properties y temas', 'Organización y reutilización de estilos'],
    ['Proyecto responsive', 'Cabecera, tarjetas y formulario', '[Proyecto] Landing adaptable a móvil y escritorio'],
  ]],
  javascript: ['El navegador y JavaScript asíncrono', 'DOM, asincronía, almacenamiento y un proyecto interactivo.', [
    ['DOM y eventos', 'querySelector y modificación de elementos', 'addEventListener, bubbling y delegación'],
    ['Promesas y async/await', 'Promesas y tratamiento de errores', 'fetch y JSON'],
    ['Almacenamiento y proyecto', 'localStorage y sessionStorage', '[Proyecto] Lista de tareas con filtros y persistencia'],
  ]],
  typescript: ['TypeScript aplicado a aplicaciones', 'Tipos para APIs, React y configuración profesional.', [
    ['Tipar APIs y respuestas', 'Tipos para datos externos', 'Validación en tiempo de ejecución'],
    ['TypeScript con React', 'Tipar props, eventos y estado', 'Componentes genéricos básicos'],
    ['Proyecto TypeScript', 'Configuración de tsconfig', '[Proyecto] Gestor de tareas tipado'],
  ]],
  react: ['React para aplicaciones reales', 'Navegación, estado compartido, pruebas y proyecto.', [
    ['Navegación con React Router', 'Rutas y parámetros', 'Rutas protegidas: concepto'],
    ['Estado compartido y hooks', 'Context API y useReducer', 'Hooks personalizados'],
    ['Tests y proyecto React', 'Pruebas con Vitest y React Testing Library', '[Proyecto] Aplicación de notas con API'],
  ]],
  python: ['Python para aplicaciones', 'Paquetes, archivos, pruebas y herramientas de terminal.', [
    ['Módulos y entornos virtuales', 'import, paquetes y pip', 'venv y dependencias'],
    ['Archivos y pruebas', 'CSV, JSON y pathlib', 'pytest y depuración'],
    ['Proyecto Python', 'Argumentos de terminal', '[Proyecto] Gestor de gastos en archivos JSON'],
  ]],
  java: ['Java profesional', 'Colecciones avanzadas, concurrencia, pruebas y arquitectura.', [
    ['Genéricos y colecciones avanzadas', 'Tipos parametrizados', 'Comparable, Comparator y mapas'],
    ['Concurrencia y pruebas', 'Threads y ExecutorService: fundamentos', 'JUnit y Mockito: introducción'],
    ['Proyecto Java', 'Organización por paquetes y capas', '[Proyecto] Gestor de biblioteca con persistencia'],
  ]],
  springboot: ['Seguridad y calidad en Spring Boot', 'Autenticación, pruebas de API y despliegue.', [
    ['Autenticación con Spring Security', 'Sesiones, roles y permisos', 'JWT: fundamentos y riesgos'],
    ['Tests de API', 'JUnit, Mockito y MockMvc', 'Pruebas de integración con base de datos'],
    ['Despliegue de una API', 'PostgreSQL y migraciones', '[Proyecto] API REST de reservas con documentación'],
  ]],
  node: ['APIs Node listas para producción', 'Identidad, validación, pruebas y operación segura.', [
    ['Autenticación y autorización', 'Hash de contraseñas', 'Sesiones, JWT y permisos'],
    ['Testing y validación', 'Validación con esquemas', 'Tests con Vitest o Jest y Supertest'],
    ['Proyecto de API', 'Logging, seguridad y rate limiting', '[Proyecto] API de inventario con PostgreSQL'],
  ]],
  sql: ['SQL intermedio y rendimiento', 'Consultas avanzadas, consistencia y optimización.', [
    ['Consultas avanzadas', 'Subconsultas y CTE', 'Funciones de ventana'],
    ['Transacciones e índices', 'ACID, commit y rollback', 'EXPLAIN e índices'],
    ['Proyecto de datos', 'Modelado y normalización', '[Proyecto] Base de datos de tienda con informes'],
  ]],
  apis: ['Diseño y prueba de APIs', 'Contratos, robustez, seguridad e integración.', [
    ['Documentar con OpenAPI', 'Swagger y contratos', 'Ejemplos de peticiones y respuestas'],
    ['Robustez y seguridad', 'Idempotencia y reintentos', 'Rate limiting, validación y errores'],
    ['Integración frontend-backend', 'Pruebas con clientes HTTP', '[Proyecto] Consumir una API con autenticación'],
  ]],
  docker: ['Entrega y observabilidad', 'Sistemas, monitorización y despliegue automatizado.', [
    ['Linux para despliegues', 'Terminal, procesos y permisos', 'SSH y variables de entorno'],
    ['Monitorización básica', 'Logs, métricas y alertas', 'Health checks'],
    ['Proyecto de despliegue', 'Pipeline de tests y publicación', '[Proyecto] Desplegar una API con Docker Compose'],
  ]],
  git: ['Colaboración profesional', 'Ramas, revisiones, automatización y trabajo compartido.', [
    ['Estrategias de branching', 'Feature branches y trunk-based development', 'Resolver conflictos reales'],
    ['Revisión y automatización', 'Code review y protección de ramas', 'GitHub Actions para comprobaciones'],
    ['Proyecto colaborativo', 'Issues y pull requests', '[Proyecto] Contribución a un repositorio compartido'],
  ]],
  estructuras: ['Aplicaciones y problemas', 'Recorridos, selección de estructuras e implementación.', [
    ['Recorridos de árboles y grafos', 'DFS y BFS', 'Búsqueda por niveles'],
    ['Estructuras según el problema', 'Trade-offs de memoria y tiempo', 'Elegir mapas, heaps y colas'],
    ['Laboratorio de estructuras', 'Implementar estructuras sin librerías', '[Proyecto] Visualizador de recorridos'],
  ]],
  algoritmos: ['Técnicas avanzadas', 'Backtracking, estrategias voraces, grafos y entrenamiento.', [
    ['Backtracking', 'Exploración de decisiones', 'Poda de soluciones'],
    ['Greedy y grafos', 'Cuándo funciona una estrategia voraz', 'Caminos mínimos: introducción'],
    ['Entrenamiento de algoritmos', 'Casos límite y pruebas automatizadas', '[Proyecto] Resolver y explicar una batería de problemas'],
  ]],
  pandas: ['Datos reales y automatización', 'Fuentes heterogéneas, tiempo y análisis reproducible.', [
    ['Obtener y validar datos', 'CSV, Excel, JSON y APIs', 'Esquemas y calidad de datos'],
    ['Fechas y series temporales', 'Datetime y resampling', 'Tendencias y estacionalidad'],
    ['Proyecto de análisis', 'Notebook reproducible', '[Proyecto] Análisis de ventas con pandas'],
  ]],
  estadistica: ['Estadística aplicada y BI', 'Inferencia, experimentación y comunicación visual.', [
    ['Probabilidad e inferencia', 'Distribuciones y muestreo', 'Intervalos de confianza'],
    ['Hipótesis y experimentos', 'p-valor y errores tipo I/II', 'Pruebas A/B básicas'],
    ['Informes y dashboards', 'Introducción a Power BI', '[Proyecto] Panel con conclusiones y límites'],
  ]],
  'ia-fundamentos': ['IA generativa con criterio', 'Arquitecturas, evaluación, privacidad y análisis crítico.', [
    ['Arquitecturas actuales', 'Transformers a nivel conceptual', 'Modelos de texto e imagen'],
    ['Evaluar respuestas', 'Exactitud, robustez y sesgos', 'Privacidad y datos sensibles'],
    ['Proyecto de fundamentos', 'Comparar resultados y registrar errores', '[Proyecto] Ficha crítica de un caso de uso'],
  ]],
  'ia-ml': ['ML de extremo a extremo', 'Pipelines, redes neuronales y evaluación reproducible.', [
    ['Pipelines y validación', 'Cross-validation y pipelines', 'Evitar data leakage'],
    ['Redes neuronales prácticas', 'Tensores y entrenamiento con PyTorch', 'Hiperparámetros'],
    ['Proyecto de ML', 'Métricas y seguimiento de experimentos', '[Proyecto] Clasificador con informe de evaluación'],
  ]],
  'ia-programar': ['Aplicaciones IA fiables', 'Recuperación, seguridad, observabilidad y evaluación.', [
    ['RAG en producción', 'Vector stores y búsqueda híbrida', 'Evaluación de recuperación y respuestas'],
    ['Seguridad y observabilidad', 'Prompt injection y límites de herramientas', 'Coste, latencia y trazas'],
    ['Proyecto con IA', 'Tests y datasets de evaluación', '[Proyecto] Asistente documental con fuentes'],
  ]],
  'ia-negocio': ['Operar un producto de IA', 'Clientes, cumplimiento, costes y validación comercial.', [
    ['Adquisición de clientes', 'Canales, demo y propuesta de valor', 'Medir conversión'],
    ['Operaciones y cumplimiento', 'Protección de datos y contratos', 'Soporte y seguimiento de costes'],
    ['Proyecto de negocio', 'Validación con usuarios reales', '[Proyecto] MVP, presupuesto y plan comercial'],
  ]],
  'entrevistas-codigo': ['Pruebas técnicas realistas', 'Depuración, problemas progresivos y comunicación.', [
    ['Debugging bajo presión', 'Leer errores y reproducir fallos', 'Escribir tests de regresión'],
    ['Problemas de dificultad progresiva', 'Dos punteros, hash maps y árboles', 'Justificar complejidad temporal y espacial'],
    ['Simulación de entrevista', 'Cronómetro y explicación verbal', '[Proyecto] Resolver un caso y defender la solución'],
  ]],
  'entrevistas-teoria': ['Entrevista profesional completa', 'Revisión, diseño y presentación profesional.', [
    ['Code review y refactorización', 'Detectar problemas de mantenimiento', 'Proponer mejoras con trade-offs'],
    ['Diseño aplicado', 'Diseño de API y datos', 'Escalabilidad básica y seguridad'],
    ['Presentación profesional', 'Portfolio, STAR y preguntas al entrevistador', '[Proyecto] Simulación completa con rúbrica'],
  ]],
  'ciber-novato': ['Seguridad cotidiana práctica', 'Protección de dispositivos, cuentas y hábitos.', [
    ['Dispositivos seguros', 'Actualizaciones y permisos', 'Copias de seguridad y recuperación'],
    ['Navegación y cuentas', 'Passkeys y MFA resistentes al phishing', 'Permisos de aplicaciones'],
    ['Proyecto de higiene digital', 'Checklist personal sin recopilar secretos', '[Proyecto] Plan básico de protección'],
  ]],
  'ciber-principiante': ['Linux, redes y seguridad API', 'Consola, defensa de APIs y laboratorio autorizado.', [
    ['Linux y consola', 'Permisos, usuarios y procesos', 'Logs y comandos de red'],
    ['Seguridad de APIs', 'Autorización por objeto y rate limits', 'Gestión de secretos y validación'],
    ['Laboratorio controlado', 'Entornos locales de práctica', '[Proyecto] Detectar y corregir fallos en una app vulnerable local'],
  ]],
  'ciber-profesional': ['Operación defensiva', 'Vulnerabilidades, monitorización y respuesta autorizada.', [
    ['Gestión de vulnerabilidades', 'Inventario, severidad y priorización', 'Escaneo autorizado y verificación'],
    ['Monitorización y respuesta', 'SIEM: fundamentos y correlación', 'Contención, evidencias y postmortem'],
    ['Proyecto de defensa', 'Threat modeling y controles', '[Proyecto] Informe de auditoría de un laboratorio propio'],
  ]],
};

const lessonTopics = {
  html: {
    '¿Qué es HTML?': ['DOM: qué es y cómo se relaciona con HTML', 'Inspeccionar el documento con DevTools'],
    Formularios: ['Atributos name, action y method'],
    'HTML semántico': ['Accesibilidad: landmarks y jerarquía de encabezados'],
  },
  css: {
    'Qué es CSS y los selectores': ['Especificidad, cascada y herencia'],
    'El modelo de caja': ['box-sizing: border-box'],
    'Diseño responsive': ['Mobile first y puntos de ruptura'],
  },
  javascript: {
    'Variables y tipos': ['let, const y alcance de bloque'],
    Funciones: ['Scope, closures y callbacks'],
    Arrays: ['reduce, find, some y every'],
    Objetos: ['Desestructuración y spread/rest'],
  },
  typescript: {
    'Interfaces y type': ['Tipos estructurales y readonly'],
    'Narrowing y utility types': ['unknown frente a any; type guards'],
  },
  react: {
    'Estado con useState': ['Inmutabilidad del estado'],
    'useEffect y datos de una API': ['Dependencias y limpieza de efectos', 'Estados de carga y error'],
  },
  python: {
    'Listas y bucles': ['Comprensiones de listas'],
    'f-strings y errores': ['Lectura y escritura de archivos'],
  },
  java: {
    'Clases y objetos': ['Constructores y modificadores de acceso'],
    'Interfaces y colecciones': ['Map, Set y List; genéricos'],
    'Lambdas y Streams': ['Operaciones map, filter y collect'],
  },
  springboot: {
    'Servicios e inyección de dependencias': ['DTO y separación de responsabilidades'],
    'Configuración, seguridad y tests': ['Perfiles de entorno y variables secretas'],
  },
  node: {
    'Servidor con Express': ['Nociones de asincronía en Node'],
    'CRUD con una base de datos': ['Consultas parametrizadas'],
  },
  sql: {
    'JOIN y agregados': ['GROUP BY y HAVING'],
    'Crear tablas': ['Claves primarias y foráneas'],
  },
  apis: {
    Autenticación: ['Sesiones frente a tokens'],
    'CORS y buenas prácticas': ['Validación de entrada y límites de peticiones'],
  },
  docker: {
    'CI/CD con GitHub Actions': ['Ejecución de pruebas antes de desplegar'],
    'Producción: buenas prácticas': ['Variables de entorno y gestión de secretos'],
  },
  git: {
    Ramas: ['Merge frente a rebase'],
    'Trabajo en equipo': ['Revisiones de código'],
  },
  estructuras: {
    'Arrays y strings': ['Coste de acceso, inserción y eliminación'],
    'Grafos y heaps': ['BFS y DFS'],
  },
  algoritmos: {
    'Complejidad: Big O': ['Complejidad espacial'],
    'Programación dinámica': ['Elegir estado y transición'],
  },
  pandas: {
    DataFrames: ['Importación de CSV y Excel'],
    'Limpieza de datos': ['Valores nulos y duplicados'],
  },
  estadistica: {
    'Correlación y causalidad': ['Variables de confusión'],
    'Elegir el gráfico': ['Gráficos engañosos y escalas'],
  },
  'ia-fundamentos': {
    '¿Qué es un LLM?': ['Transformers y atención: visión conceptual'],
    Limitaciones: ['Sesgos, verificación y datos desactualizados'],
  },
  'ia-ml': {
    'Entrenamiento y test': ['Conjunto de validación y fuga de datos'],
    'Métricas de clasificación': ['Matriz de confusión y F1'],
  },
  'ia-programar': {
    'Usar la API de un modelo': ['Salidas estructuradas y manejo de errores'],
    'Embeddings y RAG': ['Recuperación, fragmentación y evaluación'],
    'Agentes y herramientas': ['Permisos y confirmación de acciones'],
  },
  'ia-negocio': {
    'Validar la idea': ['Entrevistas con usuarios y MVP'],
    'Precios y costes': ['Margen, costes variables y punto de equilibrio'],
  },
  'entrevistas-codigo': {
    'Cómo afrontar un problema': ['Comunicar decisiones durante la resolución'],
    'Árboles y recursión': ['Casos de prueba y límites'],
  },
  'entrevistas-teoria': {
    'Diseño de sistemas': ['Requisitos funcionales y no funcionales'],
    'CV, portfolio y la oferta': ['Cómo explicar decisiones técnicas'],
  },
  'ciber-novato': {
    'Contraseñas seguras': ['Passkeys y gestores de contraseñas'],
    Phishing: ['Verificar enlaces y remitentes sin abrirlos'],
  },
  'ciber-principiante': {
    'Redes para seguridad': ['DNS, TCP/UDP y TLS'],
    'Autenticación segura': ['Contraseñas con hash y sal'],
  },
  'ciber-profesional': {
    'OWASP Top 10 y vulnerabilidades': ['OWASP Top 10:2025 y riesgos de control de acceso'],
    'Monitorización y detección': ['Lectura básica de logs y alertas'],
  },
};

export function expandExistingCourses(tracks) {
  const courses = new Map(tracks.flatMap((track) => track.courses).map((course) => [course.id, course]));

  for (const [courseId, [title, description, lessons]] of Object.entries(additions)) {
    const course = courses.get(courseId);
    if (!course) throw new Error(`No se encontró el curso ${courseId}`);
    course.units.push(expandedUnit(title, description, lessons));
  }

  for (const [courseId, entries] of Object.entries(lessonTopics)) {
    const course = courses.get(courseId);
    for (const [lessonTitle, topics] of Object.entries(entries)) {
      for (const topic of topics) addTopicToLesson(course, lessonTitle, topic);
    }
  }
}
