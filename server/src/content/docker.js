import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'docker',
  title: 'Docker y DevOps',
  icon: '🐳',
  color: '#1c7ed6',
  level: 'Intermedio',
  description: 'Contenedores, CI/CD y despliegue: cómo llevar tu código a producción.',
  units: [
    unit('Contenedores con Docker', 'Imágenes, contenedores, Dockerfile y Docker Compose.', [
      lesson(
        '¿Qué es Docker?',
        [
          card('"En mi máquina funciona"', 'Docker empaqueta tu app **con todo lo que necesita** (sistema, librerías, configuración) en un **contenedor**. Así funciona igual en tu PC, en el de tu compañero y en el servidor.'),
          card('Imagen y contenedor', '- **Imagen**: la plantilla (como una clase)\n- **Contenedor**: una imagen en ejecución (como un objeto)\n\nLas imágenes se descargan de **Docker Hub**.', `docker pull nginx\ndocker run -d -p 8080:80 nginx\ndocker ps          # contenedores en marcha\ndocker stop <id>`),
        ],
        [
          choice('¿Qué problema resuelve Docker?', ['Diseñar webs', 'Que la app funcione igual en cualquier máquina', 'Escribir tests', 'Crear bases de datos'], 1),
          match('Une cada concepto', [['Imagen', 'Plantilla de la app'], ['Contenedor', 'Imagen en ejecución'], ['Docker Hub', 'Registro de imágenes'], ['docker ps', 'Ver contenedores activos']]),
          fill('Ejecuta un contenedor', 'docker ___ -d -p 3000:3000 mi-app', 'run', ['run', 'start', 'exec', 'go']),
          choice('En -p 8080:80, ¿qué es 8080?', ['El puerto dentro del contenedor', 'El puerto de tu máquina', 'La versión', 'El id'], 1),
          choice('¿Un contenedor es una máquina virtual completa?', ['Sí', 'No, comparte el núcleo del sistema y es mucho más ligero', 'Solo en Windows', 'Solo en la nube'], 1),
        ]
      ),
      lesson(
        'El Dockerfile',
        [
          card('Receta de una imagen', 'Un `Dockerfile` describe paso a paso cómo construir la imagen.', `FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]`),
          card('Instrucciones clave', '- `FROM`: imagen base\n- `WORKDIR`: carpeta de trabajo\n- `COPY`: copia archivos\n- `RUN`: ejecuta al **construir**\n- `CMD`: ejecuta al **arrancar** el contenedor\n\nSe construye con `docker build -t mi-app .`'),
        ],
        [
          order('Ordena el Dockerfile', ['FROM node:22-alpine', 'WORKDIR /app', 'COPY . .', 'RUN npm install', 'CMD ["node", "index.js"]']),
          fill('Imagen base', '___ python:3.12-slim', 'FROM', ['FROM', 'BASE', 'IMAGE', 'USE']),
          choice('¿Diferencia entre RUN y CMD?', ['Ninguna', 'RUN se ejecuta al construir; CMD al arrancar el contenedor', 'CMD es para Windows', 'RUN es obsoleto'], 1),
          fill('Construye la imagen', 'docker ___ -t mi-app .', 'build', ['build', 'make', 'create', 'compile']),
          choice('¿Para qué sirve .dockerignore?', ['Para ignorar errores', 'Para no copiar archivos como node_modules a la imagen', 'Para borrar imágenes', 'Para logs'], 1),
        ]
      ),
      lesson(
        'Docker Compose',
        [
          card('Varios contenedores', 'Una app real tiene varias piezas: API, base de datos, caché… **Docker Compose** las define en un archivo `compose.yaml` y las arranca juntas.', `services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secreto\n    volumes:\n      - datos:/var/lib/postgresql/data\nvolumes:\n  datos:`),
          card('Volúmenes', 'Los contenedores son **efímeros**: si los borras, se pierden sus datos. Un **volumen** guarda los datos fuera del contenedor.\n\n`docker compose up -d` arranca todo; `docker compose down` lo para.'),
        ],
        [
          fill('Arranca todos los servicios', 'docker compose ___ -d', 'up', ['up', 'start', 'run', 'go']),
          choice('¿Para qué sirve un volumen?', ['Subir el volumen del audio', 'Guardar datos que sobreviven al contenedor', 'Abrir puertos', 'Crear imágenes'], 1),
          choice('¿Qué hace depends_on: [db]?', ['Borra db', 'Arranca db antes que este servicio', 'Copia db', 'Nada'], 1),
          choice('¿Qué archivo usa Docker Compose?', ['Dockerfile', 'compose.yaml', 'package.json', 'docker.ini'], 1),
          match('Une cada comando', [['docker compose up', 'Arrancar servicios'], ['docker compose down', 'Parar y quitar'], ['docker compose logs', 'Ver registros'], ['docker compose ps', 'Ver estado']]),
        ]
      ),
    ]),
    unit('Despliegue moderno', 'CI/CD, la nube y buenas prácticas de producción.', [
      lesson(
        'CI/CD con GitHub Actions',
        [
          card('Integración y despliegue continuos', '- **CI** (integración continua): cada push ejecuta tests automáticamente\n- **CD** (despliegue continuo): si todo pasa, se publica solo\n\nAsí detectas errores pronto y despliegas sin miedo.'),
          card('Un workflow', 'En GitHub, los workflows viven en `.github/workflows/*.yml`.', `name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n      - run: npm ci\n      - run: npm test`),
        ],
        [
          choice('¿Qué es CI?', ['Copiar imágenes', 'Ejecutar tests automáticamente con cada cambio', 'Un lenguaje', 'Un servidor'], 1),
          fill('Carpeta de los workflows', '.github/___/ci.yml', 'workflows', ['workflows', 'actions', 'ci', 'pipelines']),
          order('Ordena los pasos del workflow', ['Descargar el código (checkout)', 'Instalar Node', 'Instalar dependencias', 'Ejecutar tests']),
          choice('on: [push] significa…', ['Se ejecuta al hacer push', 'Se ejecuta cada hora', 'Nunca se ejecuta', 'Solo manual'], 0),
          choice('¿Qué es CD?', ['Un disco', 'Desplegar automáticamente lo que pasa los tests', 'Comentar código', 'Crear ramas'], 1),
        ]
      ),
      lesson(
        'La nube',
        [
          card('Dónde desplegar', '- **PaaS** (Render, Railway, Fly.io, Heroku): subes el código y ellos lo ejecutan\n- **Frontend estático** (Vercel, Netlify, GitHub Pages)\n- **Cloud** (AWS, Azure, Google Cloud): máxima flexibilidad, más complejidad\n- **Serverless**: funciones que se ejecutan solo cuando se llaman; pagas por uso'),
          card('Escalar', '- **Vertical**: una máquina más potente\n- **Horizontal**: más máquinas, con un **balanceador de carga** delante\n\nUna **CDN** sirve tus archivos estáticos desde servidores cercanos al usuario.'),
        ],
        [
          match('Une cada servicio con su tipo', [['Vercel', 'Frontend / estático'], ['Render', 'PaaS para backend'], ['AWS Lambda', 'Serverless'], ['AWS EC2', 'Máquinas virtuales en la nube']]),
          choice('¿Qué es serverless?', ['No hay servidores en absoluto', 'Funciones que el proveedor ejecuta bajo demanda y pagas por uso', 'Un lenguaje', 'Un tipo de base de datos'], 1),
          choice('Añadir más servidores detrás de un balanceador es escalar…', ['Verticalmente', 'Horizontalmente', 'Diagonalmente', 'No es escalar'], 1),
          choice('¿Para qué sirve una CDN?', ['Guardar contraseñas', 'Servir archivos estáticos desde servidores cercanos al usuario', 'Compilar código', 'Hacer backups'], 1),
          choice('Para una web de React sin backend, lo más sencillo es…', ['Un clúster de Kubernetes', 'Un hosting estático como Vercel o Netlify', 'Un servidor físico', 'Una base de datos'], 1),
        ]
      ),
      lesson(
        'Producción: buenas prácticas',
        [
          card('The Twelve-Factor App', 'Ideas clave para apps en la nube:\n\n- Configuración en **variables de entorno**\n- La app no guarda estado en disco local (usa BD o almacenamiento externo)\n- **Logs** a la salida estándar\n- Mismo código en todos los entornos (dev, staging, prod)'),
          card('Observabilidad', '- **Logs**: qué ha pasado\n- **Métricas**: números (peticiones/s, errores, CPU)\n- **Alertas**: aviso cuando algo va mal\n- **Health check**: un endpoint `/health` que diga si la app está viva'),
        ],
        [
          choice('¿Dónde debe ir la configuración (claves, URLs)?', ['En el código', 'En variables de entorno', 'En un comentario', 'En el README'], 1),
          match('Une cada concepto', [['Logs', 'Qué ha pasado'], ['Métricas', 'Números en el tiempo'], ['Alertas', 'Avisos automáticos'], ['/health', 'Comprobar si la app está viva']]),
          choice('¿Qué es un entorno de staging?', ['El de producción', 'Una copia de producción para probar antes de publicar', 'El portátil del desarrollador', 'Un backup'], 1),
          choice('¿Por qué la app no debe guardar archivos en el disco local del contenedor?', ['Es más lento', 'Se pierden al reiniciar o escalar el contenedor', 'Está prohibido', 'Ocupa mucho'], 1),
          fill('Endpoint de salud', 'app.get("/___", (req, res) => res.send("ok"));', 'health', ['health', 'salud', 'vivo', 'server']),
        ]
      ),
    ]),
  ],
};
