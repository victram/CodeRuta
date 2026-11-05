# 🧭 CodeRuta

Aprende paso a paso con diagnóstico inicial, lecciones cortas, ejercicios interactivos, exámenes, XP, rachas y un roadmap mensual.

Funciona **100 % en local** con una base de datos SQLite.

## Arrancar

Necesitas **Node.js 22.13 o superior** (usa el SQLite integrado `node:sqlite`, sin compilar nada).

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3001

Para una versión "de producción" (un solo servidor en http://localhost:3001):

```bash
npm run build
npm start
```

## App de escritorio (Electron)

CodeRuta también funciona como aplicación de escritorio para Windows. Electron arranca el servidor Express dentro de la app y abre una ventana con la interfaz: no hace falta navegador ni internet.

```bash
npm run desktop   # compila la interfaz y abre la app de escritorio
npm run dist      # genera el instalador: release/CodeRuta-Setup-<versión>.exe
npm run icon      # regenera build/icon.png
```

- Los datos se guardan en `%APPDATA%\CodeRuta\data\coderuta.db`, así que sobreviven a actualizaciones y reinstalaciones.
- El instalador no está firmado: la primera vez Windows SmartScreen puede avisar. Pulsa "Más información" → "Ejecutar de todas formas".
- Para publicar una versión nueva, sube `version` en `package.json` y ejecuta `npm run dist`.

## Estructura

```
desktop/main.cjs            Proceso principal de Electron (app de escritorio)
build/icon.png              Icono de la app
server/                     Backend: Node + Express + SQLite
  src/index.js              Endpoints de la API
  src/db.js                 Esquema de la base de datos
  src/game.js               Reglas: XP, niveles y rachas
  src/seed.js               Carga el contenido en SQLite
  src/content/              📚 TODO el contenido de aprendizaje
    index.js                Mapa de rutas → cursos
    html.js, css.js, …      Un archivo por curso
  data/coderuta.db          Base de datos (se crea sola)

client/                     Frontend: React + Vite
  src/pages/                Inicio, Roadmap, Curso, Lección, Perfil, Bienvenida
  src/components/           Ejercicios, barra superior, teoría…
  src/exercises.js          Corrección de ejercicios
```

## Ruta de aprendizaje

14 rutas · 39 cursos · 108 unidades · 321 lecciones · 1.665 ejercicios (49 retos de código) · 108 exámenes.

| Ruta | Cursos |
|---|---|
| 🖥️ Frontend | HTML · CSS · JavaScript · TypeScript · React |
| 🛠️ Backend | Python · Java · Spring Boot · Node.js + Express · SQL · APIs REST · Docker y DevOps · Git |
| 🧮 Ciencias de la computación | Estructuras de datos · Algoritmos |
| 📊 Análisis de datos | Python para datos (NumPy/pandas) · Estadística y visualización |
| 🤖 Inteligencia Artificial | Fundamentos de IA · Machine Learning · Programar con IA · Gana dinero con IA |
| 💼 Entrevistas técnicas | Problemas de entrevista · Preguntas técnicas y de diseño |
| 🛡️ Ciberseguridad | Novato · Principiante · Profesional |
| 📱 Desarrollo móvil | Kotlin y Android · Flutter y React Native |
| 🧪 Testing y QA | Fundamentos de testing · Automatización de pruebas |
| ☁️ Cloud computing | Linux y redes para cloud · AWS y Azure esencial |
| 🎮 Videojuegos | Fundamentos y Unity · Unreal Engine y C++ |
| 🌐 Full stack | Next.js y PostgreSQL · Arquitectura full stack |
| 🏗️ Ingeniería de software | Código limpio y patrones · Arquitectura y equipos |
| 🇬🇧 Inglés | Inglés práctico desde A1 hasta C1 |

| Curso | Temas |
|---|---|
| HTML | Estructura, textos, enlaces, imágenes · Formularios, validación, HTML semántico |
| CSS | Selectores, colores, modelo de caja · Flexbox, Grid, responsive |
| JavaScript | Variables, condicionales, bucles · Funciones, arrays, objetos · 💻 retos prácticos (FizzBuzz…) |
| TypeScript | Tipos, uniones, interfaces · Funciones tipadas, genéricos, utility types |
| React | JSX, props, useState · Listas, formularios, useEffect |
| Python | Variables, condicionales, listas · Funciones, diccionarios, f-strings, errores |
| Java | Sintaxis, bucles, arrays · POO, herencia, interfaces, colecciones · Excepciones, streams, records |
| Spring Boot | Controladores REST, inyección de dependencias · JPA, validación, configuración, seguridad, tests |
| Node.js | Express, rutas y JSON · Middleware, CRUD con SQLite, errores y .env |
| SQL | SELECT, INSERT/UPDATE/DELETE, JOIN · CREATE TABLE, relaciones, búsquedas avanzadas |
| APIs | HTTP, REST, fetch · Paginación, autenticación, CORS |
| Docker y DevOps | Imágenes, Dockerfile, Compose · CI/CD, la nube, producción |
| Git | Commits, ramas, GitHub · Deshacer cambios, buenos commits, trabajo en equipo |
| Estructuras de datos 💻 | Arrays, pilas, colas, listas enlazadas · Hash maps, árboles, grafos, heaps |
| Algoritmos 💻 | Big O, búsqueda, ordenación · Recursión, dos punteros, ventana deslizante, programación dinámica |
| Python para datos | NumPy, DataFrames, filtros · Limpieza, groupby, merge y pivot |
| Estadística 💻 | Media/mediana, dispersión, correlación · Gráficos, Matplotlib/Seaborn, storytelling y BI |
| Fundamentos de IA | IA/ML/deep learning, tipos de aprendizaje · LLMs, limitaciones, ética |
| Machine Learning 💻 | Regresión, train/test, métricas · scikit-learn, preparar datos, redes neuronales |
| Programar con IA 💻 | Prompting, técnicas, asistentes de código · APIs de modelos, embeddings y RAG, agentes |
| Gana dinero con IA 💻 | Modelos de negocio, automatización, micro-SaaS · Validar, precios y costes, legal y ética |
| Problemas de entrevista 💻 | Método, Two Sum, strings, paréntesis · Kadane, búsqueda binaria, árboles |
| Preguntas técnicas | POO y SOLID, JS y web, bases de datos · Diseño de sistemas, STAR, CV y oferta |
| Ciberseguridad: Novato 💻 | Contraseñas, 2FA, phishing · Malware y copias, Wi-Fi, privacidad e ingeniería social |
| Ciberseguridad: Principiante 💻 | Tríada CIA, redes, criptografía · Inyección SQL, XSS, autenticación segura |
| Ciberseguridad: Profesional 💻 | Hacking ético y legalidad, pentesting, OWASP Top 10 · DevSecOps y nube, SIEM, respuesta a incidentes y carrera |
| Kotlin y Android | Kotlin, Android Studio y ciclo de vida · Compose, ViewModel, Room y proyecto móvil |
| Flutter y React Native | Desarrollo multiplataforma · APIs, pruebas, accesibilidad y publicación |
| Fundamentos de testing | Casos de prueba, bugs y regresión · Pruebas de APIs y proyecto QA |
| Automatización de pruebas | Vitest, integración y Playwright · CI, fiabilidad y pipeline de calidad |
| Linux y redes para cloud | Consola, administración y redes · Virtualización, almacenamiento y servidor seguro |
| AWS y Azure esencial | Servicios, redes e identidad · Escalabilidad, costes, observabilidad y despliegue |
| Fundamentos y Unity | Game loop, C# y escenas · Movimiento, interfaz, sonido y juego 2D |
| Unreal Engine y C++ | Editor, Blueprints y C++ · Interacción, IA, rendimiento y prototipo 3D |
| Next.js y PostgreSQL | Renderizado, datos y migraciones · Autenticación, server actions y despliegue |
| Arquitectura full stack | Capas, seguridad y rendimiento · Observabilidad, CI/CD y proyecto SaaS |
| Código limpio y patrones | Refactorización, SOLID y patrones · Arquitectura, revisión y deuda técnica |
| Arquitectura y equipos | Diseño de sistemas y ADR · Gestión ágil, entrega fiable y proyecto final |
| Inglés A1–C1 | Presentaciones y rutinas · Pasado y planes · Comunicación independiente, profesional y avanzada |

💻 = incluye retos prácticos de código.

Cada **curso** tiene **unidades**; cada unidad tiene **lecciones** (teoría + ~5 ejercicios) y termina con un **examen** de 10 preguntas mezcladas (aprobado con 80 %). Las lecciones se desbloquean en orden.

### Reglas del juego

- Antes de acceder al catálogo puedes realizar una **prueba de nivel de 45 actividades**, con diagnóstico y avance automático, o elegir **Comenzar desde 0**.
- Las preguntas disponen de 15 a 50 segundos según longitud y dificultad; los ejercicios prácticos tienen 45 segundos, 1 minuto y medio o 5 minutos.
- **XP**: 10 por lección (+5 si es perfecta), 20 por examen (+10 si es perfecto), 5 por repetir o practicar.
- **Racha**: días seguidos con al menos una actividad.
- **Meta diaria**: 10 / 20 / 30 / 50 XP.
- Los ejercicios fallados se repiten al final de la lección.
- El **roadmap** coloca una etapa pendiente por día y se reorganiza automáticamente con el progreso.
- En los **retos de código**, al repetir se conserva lo que escribiste.

## Añadir contenido

Edita o crea un archivo en `server/src/content/`. Al guardar, el servidor recarga el contenido automáticamente **sin borrar el progreso** de nadie (también puedes forzarlo con `npm run seed`).

Tipos de ejercicio:

```js
{ type: 'choice', prompt: '¿…?', code: 'opcional', options: ['A', 'B', 'C'], answer: 1, explanation: '…' }
{ type: 'fill',   prompt: 'Completa…', code: 'let x ___ 5;', answer: '=', options: ['=', '==', ':'] }
{ type: 'order',  prompt: 'Ordena…', lines: ['línea 1', 'línea 2', 'línea 3'] }   // en el orden correcto
{ type: 'match',  prompt: 'Une…', pairs: [['GET', 'Leer'], ['POST', 'Crear']] }
{ type: 'code',   prompt: 'Escribe suma(a, b)…', starter: 'function suma(a, b) {
}', solution: '…',
  tests: [{ call: 'suma(2, 3)', expected: 5 }], hint: 'opcional' }
```

Los **retos de código** (JavaScript) se ejecutan en el navegador dentro de un Web Worker con límite de 2 s. Al cargar el contenido, el servidor ejecuta la `solution` de cada reto contra sus `tests`: si no los pasa, te avisa.

Los cursos nuevos usan los atajos de `server/src/content/_helpers.js` (`card`, `choice`, `fill`, `order`, `match`, `reto`, `lesson`, `unit`), que generan estos mismos objetos con menos texto.

Para activar un curso "Próximamente" basta con añadirle `units: [...]`.

Al arrancar se valida el contenido: si un ejercicio está mal formado, el servidor te dice exactamente cuál.

## Siguientes pasos

- [x] Unidad 2 de cada curso de frontend y backend
- [x] Java, Spring Boot, TypeScript, Docker y DevOps
- [x] Estructuras de datos, algoritmos y entrevistas técnicas
- [x] Análisis de datos
- [x] Ruta de Inteligencia Artificial (incluye cómo ganar dinero con IA)
- [x] Retos de código que se ejecutan y corrigen en el navegador
- [x] Ruta de Ciberseguridad en 3 niveles: novato, principiante y profesional
- [x] Unidad avanzada de cada curso original
- [x] Rutas de móvil, testing, cloud, videojuegos, full stack e ingeniería de software
- [ ] Logros/insignias y repaso inteligente de los fallos
