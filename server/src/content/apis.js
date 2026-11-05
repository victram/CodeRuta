export default {
  id: 'apis',
  title: 'APIs REST y HTTP',
  icon: '🔌',
  color: '#c2255c',
  level: 'Intermedio',
  description: 'Cómo se comunican el frontend y el backend: HTTP, REST y fetch.',
  units: [
    {
      title: 'Frontend y backend hablan',
      description: 'Peticiones HTTP, diseño REST y consumir APIs con fetch.',
      lessons: [
        {
          title: 'Cómo funciona HTTP',
          theory: [
            {
              title: 'Cliente y servidor',
              body: 'Cuando abres una web, tu navegador (el **cliente**) envía una **petición** HTTP a un **servidor**, y este devuelve una **respuesta**. Así se comunican el frontend y el backend.',
            },
            {
              title: 'Métodos HTTP',
              body: '- `GET`: leer\n- `POST`: crear\n- `PUT` / `PATCH`: actualizar (todo / una parte)\n- `DELETE`: borrar',
            },
            {
              title: 'Códigos de estado',
              body: '- `2xx` éxito: 200 OK, 201 Creado\n- `3xx` redirección\n- `4xx` error del cliente: 400, 401, 404\n- `5xx` error del servidor: 500',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Quién envía la petición HTTP?',
              options: ['El servidor', 'El cliente', 'La base de datos', 'El router'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada método con su acción',
              pairs: [
                ['GET', 'Leer'],
                ['POST', 'Crear'],
                ['PUT', 'Actualizar'],
                ['DELETE', 'Borrar'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué significa un error 404?',
              options: ['Todo OK', 'Recurso no encontrado', 'Error del servidor', 'Recurso creado'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Un código 500 indica…',
              options: ['Error del cliente', 'Error del servidor', 'Redirección', 'Éxito'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Para actualizar solo un campo de un recurso usas…',
              options: ['GET', 'PATCH', 'DELETE', 'OPTIONS'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Diseñar una API REST',
          theory: [
            {
              title: 'Recursos y verbos',
              body: 'REST organiza la API en **recursos** (sustantivos en plural) y usa los métodos HTTP como **verbos**.',
              code: `GET    /libros      → lista de libros\nGET    /libros/7    → el libro 7\nPOST   /libros      → crear un libro\nPUT    /libros/7    → reemplazar el libro 7\nDELETE /libros/7    → borrar el libro 7`,
            },
            {
              title: 'Buenas prácticas',
              body: 'Evita verbos en la URL: ❌ `/obtenerLibros` ✅ `GET /libros`.\n\nResponde en **JSON** y con el código de estado adecuado.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuál es la forma REST correcta de listar usuarios?',
              options: ['GET /getUsers', 'GET /usuarios', 'GET /usuarios/listar', 'POST /verUsuarios'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Borra la tarea 5',
              code: '___ /tareas/5',
              answer: 'DELETE',
              options: ['DELETE', 'REMOVE', 'GET', 'ERASE'],
            },
            {
              type: 'choice',
              prompt: 'Tras crear un recurso correctamente, el código ideal es…',
              options: ['200', '201', '204', '404'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el ciclo petición-respuesta',
              lines: [
                'El cliente envía GET /libros',
                'El servidor consulta la base de datos',
                'El servidor responde 200 con JSON',
                'El cliente muestra los libros',
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué formato de datos es el más usado en APIs REST?',
              options: ['XML', 'JSON', 'CSV', 'PDF'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Consumir una API con fetch',
          theory: [
            {
              title: 'Pedir datos',
              body: 'Desde el frontend usas `fetch` para llamar a la API. Es **asíncrono**: `await` espera la respuesta sin bloquear la página.',
              code: `const res = await fetch("/api/libros");\nconst libros = await res.json();\nconsole.log(libros);`,
            },
            {
              title: 'Enviar datos',
              body: 'Para enviar datos indica el `method`, la cabecera `Content-Type` y el `body` convertido a texto con `JSON.stringify`.',
              code: `await fetch("/api/libros", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ titulo: "Dune" }),\n});`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué función del navegador llama a una API?',
              options: ['fetch()', 'get()', 'ajax()', 'http()'],
              answer: 0,
            },
            {
              type: 'fill',
              prompt: 'Convierte la respuesta en datos',
              code: 'const datos = await res.___();',
              answer: 'json',
              options: ['json', 'parse', 'data', 'object'],
            },
            {
              type: 'choice',
              prompt: '¿Qué hace JSON.stringify(obj)?',
              options: ['Convierte texto en objeto', 'Convierte un objeto en texto JSON', 'Envía la petición', 'Valida el JSON'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve await?',
              options: ['Repetir código', 'Esperar el resultado de una operación asíncrona', 'Cancelar una petición', 'Crear una variable'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Crea una nota nueva',
              code: 'fetch("/api/notas", { method: "___" })',
              answer: 'POST',
              options: ['POST', 'GET', 'NEW', 'CREATE'],
            },
          ],
        },
      ],
    },
    {
      title: 'APIs profesionales',
      description: 'Parámetros, autenticación, CORS y buenas prácticas.',
      lessons: [
        {
          title: 'Parámetros y paginación',
          theory: [
            {
              title: 'Query params',
              body: 'Lo que va después de `?` en la URL son los **parámetros de consulta**, separados por `&`. Se usan para filtrar, ordenar y paginar.',
              code: `GET /productos?categoria=libros&orden=precio\nGET /productos?pagina=2&limite=20`,
            },
            {
              title: 'Paginación',
              body: 'Si hay miles de resultados, no los envíes todos: devuélvelos por **páginas**. Así la API es rápida y el frontend también.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: 'En /buscar?q=gatos, ¿qué es q?',
              options: ['La ruta', 'Un parámetro de consulta', 'Una cabecera', 'El método'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Añade un segundo parámetro',
              code: '/productos?pagina=2___limite=10',
              answer: '&',
              options: ['&', '?', ',', '+'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve paginar?',
              options: ['Para que la API sea más segura', 'Para no enviar miles de resultados de golpe', 'Para ordenar alfabéticamente', 'Para cachear'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cuál es la forma REST de filtrar libros por autor?',
              options: ['GET /libros?autor=borges', 'POST /filtrarLibros', 'GET /libros/filtrar/autor', 'DELETE /libros?autor=borges'],
              answer: 0,
            },
            {
              type: 'choice',
              prompt: 'En Express, ¿dónde lees ?pagina=2?',
              options: ['req.params.pagina', 'req.query.pagina', 'req.body.pagina', 'req.pagina'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Autenticación',
          theory: [
            {
              title: '¿Quién eres?',
              body: '- **Autenticación**: comprobar quién eres (login)\n- **Autorización**: comprobar qué puedes hacer (permisos)\n\nTras el login, el servidor te da un **token**, y lo envías en cada petición.',
            },
            {
              title: 'Tokens en la cabecera',
              body: 'El token suele ir en la cabecera `Authorization` con el formato `Bearer <token>`. Un tipo muy común es **JWT**. Si falta o no es válido, la API responde **401**.',
              code: `fetch("/api/perfil", {\n  headers: { Authorization: "Bearer eyJhbGciOi..." },\n});`,
            },
          ],
          exercises: [
            {
              type: 'match',
              prompt: 'Une cada concepto con su significado',
              pairs: [
                ['Autenticación', 'Quién eres'],
                ['Autorización', 'Qué puedes hacer'],
                ['Token', 'Prueba de que iniciaste sesión'],
                ['401', 'No autenticado'],
              ],
            },
            {
              type: 'fill',
              prompt: 'Completa la cabecera',
              code: 'Authorization: ___ eyJhbGciOi...',
              answer: 'Bearer',
              options: ['Bearer', 'Token', 'Basic', 'Key'],
            },
            {
              type: 'choice',
              prompt: 'Un usuario normal intenta borrar a otro usuario sin permiso. ¿Qué código?',
              options: ['200', '401', '403', '404'],
              answer: 2,
              explanation: '403 Forbidden: sabemos quién eres, pero no tienes permiso.',
            },
            {
              type: 'choice',
              prompt: '¿Qué significa JWT?',
              options: ['Java Web Tool', 'JSON Web Token', 'JavaScript Web Test', 'Just Wait Time'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cómo deben guardarse las contraseñas en la base de datos?',
              options: ['Tal cual', 'Cifradas con un hash (bcrypt, argon2)', 'En Base64', 'En un archivo de texto'],
              answer: 1,
            },
          ],
        },
        {
          title: 'CORS y buenas prácticas',
          theory: [
            {
              title: 'CORS',
              body: 'Por seguridad, el navegador bloquea las peticiones a **otro dominio** salvo que ese servidor lo permita con cabeceras **CORS**. Por eso a veces ves errores de CORS al llamar a una API desde otra web.',
              code: `Access-Control-Allow-Origin: https://miweb.com`,
            },
            {
              title: 'Buenas prácticas',
              body: '- **Valida** siempre los datos que llegan\n- Usa **HTTPS**\n- **Versiona** la API: `/api/v1/…`\n- **Documenta** los endpoints (por ejemplo con OpenAPI/Swagger)\n- Limita las peticiones (**rate limiting**) para evitar abusos',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué bloquea CORS?',
              options: ['Peticiones del servidor a la BD', 'Peticiones del navegador a otro dominio no permitido', 'Todos los GET', 'Las imágenes'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Versiona la API',
              code: 'GET /api/___/usuarios',
              answer: 'v1',
              options: ['v1', 'new', 'latest', 'one'],
            },
            {
              type: 'choice',
              prompt: '¿Por qué hay que validar los datos que llegan?',
              options: ['No hace falta', 'Porque el cliente puede enviar cualquier cosa, incluso datos maliciosos', 'Para que pesen menos', 'Para ordenarlos'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué es rate limiting?',
              options: ['Comprimir respuestas', 'Limitar cuántas peticiones puede hacer un cliente', 'Ordenar resultados', 'Cachear datos'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada práctica con su objetivo',
              pairs: [
                ['HTTPS', 'Cifrar la comunicación'],
                ['Validación', 'Rechazar datos incorrectos'],
                ['Versionado', 'Cambiar sin romper clientes'],
                ['Documentación', 'Que otros sepan usarla'],
              ],
            },
          ],
        },
      ],
    },
  ],
};
