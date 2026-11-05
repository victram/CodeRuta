# 🧭 CodeRuta

Aprende a programar paso a paso, como en una app de idiomas: lecciones cortas con teoría fácil, ejercicios interactivos, exámenes por unidad, XP, rachas y vidas.

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
  src/game.js               Reglas: XP, niveles, rachas, vidas
  src/seed.js               Carga el contenido en SQLite
  src/content/              📚 TODO el contenido de aprendizaje
    index.js                Mapa de rutas → cursos
    html.js, css.js, …      Un archivo por curso
  data/coderuta.db          Base de datos (se crea sola)

client/                     Frontend: React + Vite
  src/pages/                Inicio, Curso (camino), Lección, Perfil, Bienvenida
  src/components/           Ejercicios, barra superior, teoría…
  src/exercises.js          Corrección de ejercicios
```

## Ruta de aprendizaje

7 rutas · 23 cursos · 47 unidades · 143 lecciones · 715 ejercicios (43 retos de código) · 47 exámenes.

| Ruta | Cursos |
|---|---|
| 🖥️ Frontend | HTML · CSS · JavaScript · TypeScript · React |
| 🛠️ Backend | Python · Java · Spring Boot · Node.js + Express · SQL · APIs REST · Docker y DevOps · Git |
| 🧮 Ciencias de la computación | Estructuras de datos · Algoritmos |
| 📊 Análisis de datos | Python para datos (NumPy/pandas) · Estadística y visualización |
| 🤖 Inteligencia Artificial | Fundamentos de IA · Machine Learning · Programar con IA · Gana dinero con IA |
| 💼 Entrevistas técnicas | Problemas de entrevista · Preguntas técnicas y de diseño |
| 🛡️ Ciberseguridad | Novato · Principiante · Profesional (🔒 próximamente) |

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

💻 = incluye retos prácticos de código.

Cada **curso** tiene **unidades**; cada unidad tiene **lecciones** (teoría + ~5 ejercicios) y termina con un **examen** de 10 preguntas mezcladas (aprobado con 80 %). Las lecciones se desbloquean en orden.

### Reglas del juego

- **XP**: 10 por lección (+5 si es perfecta), 20 por examen (+10 si es perfecto), 5 por repetir o practicar.
- **Vidas**: 5. Pierdes una por fallo en lecciones (no en exámenes ni práctica). Recuperas 1 cada 30 min, o +1 al completar una práctica.
- **Racha**: días seguidos con al menos una actividad.
- **Meta diaria**: 10 / 20 / 30 / 50 XP.
- Los ejercicios fallados se repiten al final de la lección.
- Los **retos de código** no quitan vidas; al repetirlos se conserva lo que escribiste.

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
- [ ] Ruta de Ciberseguridad en 3 niveles: novato, principiante y profesional
- [ ] Unidad 3 de los cursos base (JS asíncrono y DOM, React Router, POO en Python…)
- [ ] Logros/insignias y repaso inteligente de los fallos
