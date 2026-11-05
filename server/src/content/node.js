export default {
  id: 'node',
  title: 'Node.js y Express',
  icon: '🟢',
  color: '#2f9e44',
  level: 'Intermedio',
  description: 'JavaScript en el servidor: crea tu propia API. Recomendado tras JavaScript.',
  units: [
    {
      title: 'Tu primer servidor',
      description: 'Node, npm, módulos, Express, rutas y JSON.',
      lessons: [
        {
          title: '¿Qué es Node.js?',
          theory: [
            {
              title: 'JavaScript fuera del navegador',
              body: 'Node.js permite ejecutar **JavaScript en el servidor**. Con él puedes crear APIs, leer archivos, conectarte a bases de datos…',
              code: `// archivo: hola.js\nconsole.log("Hola desde el servidor");\n\n// En la terminal:\n// node hola.js`,
            },
            {
              title: 'npm, el gestor de paquetes',
              body: '**npm** descarga librerías hechas por otras personas.\n\n- `npm init -y` crea el archivo `package.json`\n- `npm install express` instala Express',
            },
            {
              title: 'Módulos',
              body: 'Divide tu código en **módulos**: archivos que exportan e importan funciones.',
              code: `// math.js\nexport function sumar(a, b) {\n  return a + b;\n}\n\n// app.js\nimport { sumar } from "./math.js";\nconsole.log(sumar(2, 3)); // 5`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué es Node.js?',
              options: ['Un navegador', 'Un entorno para ejecutar JavaScript en el servidor', 'Una base de datos', 'Un framework de CSS'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué comando ejecuta el archivo app.js?',
              options: ['run app.js', 'node app.js', 'npm app.js', 'js app.js'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Instala la librería Express',
              code: 'npm ___ express',
              answer: ['install', 'i'],
              options: ['install', 'get', 'download', 'add'],
            },
            {
              type: 'choice',
              prompt: '¿Qué archivo describe tu proyecto y sus dependencias?',
              options: ['index.html', 'package.json', 'node.config', 'README.md'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Trae la función sumar de otro archivo',
              code: '___ { sumar } from "./math.js";',
              answer: 'import',
              options: ['import', 'include', 'using', 'get'],
            },
          ],
        },
        {
          title: 'Servidor con Express',
          theory: [
            {
              title: 'Hola, Express',
              body: 'Express es el framework web más popular de Node. Creas una app, defines **rutas** y la pones a escuchar en un **puerto**.',
              code: `import express from "express";\n\nconst app = express();\n\napp.get("/", (req, res) => {\n  res.send("¡Hola, mundo!");\n});\n\napp.listen(3000, () => {\n  console.log("Servidor en http://localhost:3000");\n});`,
            },
            {
              title: 'req y res',
              body: '- `req` (request): la **petición** que llega (parámetros, cuerpo, cabeceras)\n- `res` (response): lo que **respondes**: `res.send()`, `res.json()`, `res.status()`',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué método pone el servidor a escuchar?',
              options: ['app.start()', 'app.listen()', 'app.run()', 'app.open()'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué representa req?',
              options: ['La respuesta', 'La petición del cliente', 'La base de datos', 'El puerto'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el servidor mínimo',
              lines: [
                'import express from "express";',
                'const app = express();',
                'app.get("/", (req, res) => res.send("Hola"));',
                'app.listen(3000);',
              ],
            },
            {
              type: 'fill',
              prompt: 'Responde con un texto',
              code: 'app.get("/", (req, res) => {\n  res.___("Bienvenido");\n});',
              answer: 'send',
              options: ['send', 'print', 'log', 'echo'],
            },
            {
              type: 'choice',
              prompt: 'En http://localhost:3000, ¿qué es 3000?',
              options: ['El puerto', 'La ruta', 'La IP', 'El protocolo'],
              answer: 0,
            },
          ],
        },
        {
          title: 'Rutas y JSON',
          theory: [
            {
              title: 'Parámetros y cuerpo',
              body: '`:id` es un **parámetro de ruta** y se lee en `req.params`. `express.json()` permite leer el cuerpo JSON en `req.body`.',
              code: `app.use(express.json());\n\napp.get("/usuarios/:id", (req, res) => {\n  res.json({ id: req.params.id, nombre: "Ana" });\n});\n\napp.post("/usuarios", (req, res) => {\n  const nuevo = req.body;\n  res.status(201).json(nuevo);\n});`,
            },
            {
              title: 'JSON',
              body: 'JSON es el formato estándar para enviar datos entre frontend y backend. Se parece a un objeto de JavaScript, pero las claves van entre comillas dobles.',
              code: `{ "nombre": "Ana", "edad": 30, "activo": true }`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: 'En la ruta /productos/:id, ¿dónde lees el id?',
              options: ['req.body.id', 'req.params.id', 'res.id', 'req.query.id'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué middleware permite leer JSON del cuerpo?',
              options: ['express.json()', 'express.static()', 'express.body()', 'JSON.parse()'],
              answer: 0,
            },
            {
              type: 'fill',
              prompt: 'Responde con JSON',
              code: 'res.___({ ok: true });',
              answer: 'json',
              options: ['json', 'html', 'text', 'xml'],
            },
            {
              type: 'choice',
              prompt: '¿Qué método HTTP usarías para crear un recurso nuevo?',
              options: ['GET', 'POST', 'DELETE', 'HEAD'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada parte con lo que contiene',
              pairs: [
                ['req.params', 'Parámetros de la ruta'],
                ['req.body', 'Datos enviados en el cuerpo'],
                ['req.query', 'Parámetros ?clave=valor'],
                ['res.status()', 'Código de respuesta'],
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Una API completa',
      description: 'Middleware, CRUD, base de datos, errores y configuración.',
      lessons: [
        {
          title: 'Middleware',
          theory: [
            {
              title: 'Funciones intermedias',
              body: 'Un **middleware** es una función que se ejecuta **antes** de llegar a la ruta. Recibe `req`, `res` y `next`. Llama a `next()` para continuar.',
              code: `app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});`,
            },
            {
              title: 'Middlewares típicos',
              body: '- `express.json()`: lee cuerpos JSON\n- `express.static("public")`: sirve archivos (HTML, imágenes…)\n- Tus propios middlewares: registrar peticiones, comprobar si el usuario ha iniciado sesión…',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuándo se ejecuta un middleware registrado con app.use?',
              options: ['Después de responder', 'Antes de llegar a la ruta', 'Solo al arrancar', 'Nunca'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Deja pasar la petición a la siguiente función',
              code: 'app.use((req, res, next) => {\n  ___();\n});',
              answer: 'next',
              options: ['next', 'continue', 'go', 'done'],
            },
            {
              type: 'choice',
              prompt: '¿Qué pasa si un middleware no llama a next() ni responde?',
              options: ['Nada, sigue solo', 'La petición se queda colgada', 'El servidor se apaga', 'Devuelve 200'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué middleware sirve archivos de una carpeta?',
              options: ['express.json()', 'express.static()', 'express.files()', 'express.public()'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada parámetro con su papel',
              pairs: [
                ['req', 'La petición'],
                ['res', 'La respuesta'],
                ['next', 'Pasar al siguiente'],
                ['app.use', 'Registrar middleware'],
              ],
            },
          ],
        },
        {
          title: 'CRUD con una base de datos',
          theory: [
            {
              title: 'CRUD',
              body: '**CRUD** son las 4 operaciones básicas: **C**reate (crear), **R**ead (leer), **U**pdate (actualizar) y **D**elete (borrar). Cada una se corresponde con un método HTTP y un comando SQL.',
            },
            {
              title: 'Express + SQLite',
              body: 'Así guarda datos esta misma app: Node trae SQLite integrado. Usa siempre `?` para los valores: evita la **inyección SQL**.',
              code: `import { DatabaseSync } from "node:sqlite";\nconst db = new DatabaseSync("datos.db");\n\napp.get("/tareas", (req, res) => {\n  res.json(db.prepare("SELECT * FROM tareas").all());\n});\n\napp.post("/tareas", (req, res) => {\n  db.prepare("INSERT INTO tareas (texto) VALUES (?)").run(req.body.texto);\n  res.status(201).json({ ok: true });\n});`,
            },
          ],
          exercises: [
            {
              type: 'match',
              prompt: 'Une cada operación CRUD con su método HTTP',
              pairs: [
                ['Crear', 'POST'],
                ['Leer', 'GET'],
                ['Actualizar', 'PUT / PATCH'],
                ['Borrar', 'DELETE'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Por qué se usa ? en lugar de meter el valor dentro del texto SQL?',
              options: ['Es más corto', 'Evita la inyección SQL', 'Es obligatorio en SQLite', 'Para que vaya más rápido'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Lee todas las filas',
              code: 'db.prepare("SELECT * FROM notas").___()',
              answer: 'all',
              options: ['all', 'get', 'run', 'fetch'],
              explanation: 'all() devuelve todas las filas; get() solo la primera; run() ejecuta sin devolver filas.',
            },
            {
              type: 'choice',
              prompt: '¿Qué significa la D de CRUD?',
              options: ['Data', 'Delete', 'Download', 'Deploy'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la ruta que borra una tarea',
              lines: [
                'app.delete("/tareas/:id", (req, res) => {',
                '  db.prepare("DELETE FROM tareas WHERE id = ?").run(req.params.id);',
                '  res.status(204).end();',
                '});',
              ],
            },
          ],
        },
        {
          title: 'Errores y configuración',
          theory: [
            {
              title: 'Responder errores',
              body: 'Si algo va mal, responde con el **código** correcto y un mensaje claro. Nunca dejes que el servidor se caiga.',
              code: `app.get("/libros/:id", (req, res) => {\n  const libro = buscar(req.params.id);\n  if (!libro) {\n    return res.status(404).json({ error: "Libro no encontrado" });\n  }\n  res.json(libro);\n});`,
            },
            {
              title: 'Variables de entorno',
              body: 'Las contraseñas y claves **no** se escriben en el código. Se leen de variables de entorno con `process.env`, normalmente desde un archivo `.env` que **no** se sube a Git.',
              code: `const PORT = process.env.PORT || 3000;\nconst API_KEY = process.env.API_KEY;`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué código responder si el recurso no existe?',
              options: ['200', '201', '404', '500'],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Lee la variable de entorno',
              code: 'const clave = process.___.SECRET;',
              answer: 'env',
              options: ['env', 'config', 'vars', 'os'],
            },
            {
              type: 'choice',
              prompt: '¿Dónde NO debes guardar una contraseña?',
              options: ['En una variable de entorno', 'Escrita en el código que subes a GitHub', 'En un gestor de secretos', 'En un archivo .env ignorado por Git'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Por qué se usa return antes de res.status(404)…?',
              options: ['Es obligatorio', 'Para no seguir ejecutando y responder dos veces', 'Para cerrar el servidor', 'No hace nada'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Si falla algo inesperado en el servidor, ¿qué código es el adecuado?',
              options: ['400', '404', '500', '301'],
              answer: 2,
            },
          ],
        },
      ],
    },
  ],
};
