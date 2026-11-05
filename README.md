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

| Ruta | Cursos | Estado |
|---|---|---|
| 🖥️ Frontend | HTML → CSS → JavaScript → React | ✅ Unidades 1 y 2 de cada curso |
| 🛠️ Backend | Python, Node.js + Express, SQL, APIs REST, Git | ✅ Unidades 1 y 2 de cada curso |

Total: 9 cursos, 18 unidades, 54 lecciones, 270 ejercicios y 18 exámenes.

| Curso | Unidad 1 | Unidad 2 |
|---|---|---|
| HTML | Estructura, textos, enlaces, imágenes, listas | Formularios, validación, HTML semántico |
| CSS | Selectores, colores, modelo de caja | Flexbox, Grid, responsive |
| JavaScript | Variables, condicionales, bucles | Funciones, arrays, objetos |
| React | JSX, props, useState | Listas y key, formularios, useEffect |
| Python | Variables, condicionales, listas y bucles | Funciones, diccionarios, f-strings y errores |
| Node.js | Node, npm, Express, rutas y JSON | Middleware, CRUD con SQLite, errores y .env |
| SQL | SELECT, INSERT/UPDATE/DELETE, JOIN | CREATE TABLE, relaciones, búsquedas avanzadas |
| APIs | HTTP, REST, fetch | Paginación, autenticación, CORS y buenas prácticas |
| Git | Commits, ramas, GitHub | Deshacer cambios, buenos commits, trabajo en equipo |
| 🤖 Inteligencia Artificial | Fundamentos, Programar con IA, Gana dinero con IA | 🔒 Próximamente |
| 🛡️ Ciberseguridad | Novato, Principiante, Profesional | 🔒 Próximamente |

Cada **curso** tiene **unidades**; cada unidad tiene **lecciones** (teoría + 5 ejercicios) y termina con un **examen** de 10 preguntas mezcladas (aprobado con 80 %). Las lecciones se desbloquean en orden.

### Reglas del juego

- **XP**: 10 por lección (+5 si es perfecta), 20 por examen (+10 si es perfecto), 5 por repetir o practicar.
- **Vidas**: 5. Pierdes una por fallo en lecciones (no en exámenes ni práctica). Recuperas 1 cada 30 min, o +1 al completar una práctica.
- **Racha**: días seguidos con al menos una actividad.
- **Meta diaria**: 10 / 20 / 30 / 50 XP.
- Los ejercicios fallados se repiten al final de la lección.

## Añadir contenido

Edita o crea un archivo en `server/src/content/`. Al guardar, el servidor recarga el contenido automáticamente **sin borrar el progreso** de nadie (también puedes forzarlo con `npm run seed`).

Tipos de ejercicio:

```js
{ type: 'choice', prompt: '¿…?', code: 'opcional', options: ['A', 'B', 'C'], answer: 1, explanation: '…' }
{ type: 'fill',   prompt: 'Completa…', code: 'let x ___ 5;', answer: '=', options: ['=', '==', ':'] }
{ type: 'order',  prompt: 'Ordena…', lines: ['línea 1', 'línea 2', 'línea 3'] }   // en el orden correcto
{ type: 'match',  prompt: 'Une…', pairs: [['GET', 'Leer'], ['POST', 'Crear']] }
```

Para activar un curso "Próximamente" basta con añadirle `units: [...]`.

Al arrancar se valida el contenido: si un ejercicio está mal formado, el servidor te dice exactamente cuál.

## Siguientes pasos

- [x] Unidad 2 de cada curso de frontend y backend
- [ ] Unidad 3 (JS asíncrono y DOM, TypeScript, React Router, POO en Python, despliegue…)
- [ ] Ruta de Inteligencia Artificial (incluye cómo ganar dinero con IA)
- [ ] Ruta de Ciberseguridad en 3 niveles: novato, principiante y profesional
- [ ] Ejercicios de escribir código y ejecutarlo en el navegador
- [ ] Logros/insignias y repaso inteligente de los fallos
