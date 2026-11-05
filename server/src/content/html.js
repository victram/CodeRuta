// Tipos de ejercicio:
//  choice → { prompt, code?, options: [...], answer: índice }
//  fill   → { prompt, code: 'texto con ___', answer: 'x' | ['x','y'], options?: [...] }
//  order  → { prompt, lines: [... en el orden correcto] }
//  match  → { prompt, pairs: [[izquierda, derecha], ...] }
// Todos admiten "explanation" (se muestra tras responder).
export default {
  id: 'html',
  title: 'HTML',
  icon: '🧱',
  color: '#e8590c',
  level: 'Desde cero',
  description: 'La estructura de cualquier página web: etiquetas, textos, enlaces e imágenes.',
  units: [
    {
      title: 'Tu primera página web',
      description: 'Etiquetas, estructura, textos, enlaces, imágenes y listas.',
      lessons: [
        {
          title: '¿Qué es HTML?',
          theory: [
            {
              title: 'HTML es el esqueleto de la web',
              body: 'HTML (HyperText Markup Language) describe la **estructura** de una página: títulos, párrafos, imágenes, enlaces…\n\nNo es un lenguaje de programación: es un lenguaje de **marcado**. Usa **etiquetas** que envuelven el contenido.',
              code: `<p>Hola, mundo</p>`,
            },
            {
              title: 'Anatomía de una etiqueta',
              body: 'La mayoría de etiquetas tienen una apertura `<p>` y un cierre `</p>`. El cierre lleva una barra `/`.\n\nAlgunas no tienen cierre, como `<br>` (salto de línea) o `<img>` (imagen).',
              code: `<h1>Esto es un título</h1>\nLínea uno<br>Línea dos`,
            },
            {
              title: 'Estructura de un documento',
              body: '`<head>` guarda información sobre la página (título de la pestaña, estilos…). `<body>` contiene todo lo que **se ve**.',
              code: `<!DOCTYPE html>\n<html>\n  <head>\n    <title>Mi página</title>\n  </head>\n  <body>\n    <h1>¡Hola!</h1>\n  </body>\n</html>`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué significa HTML?',
              options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyper Transfer Machine Language'],
              answer: 0,
            },
            {
              type: 'choice',
              prompt: '¿Qué tipo de lenguaje es HTML?',
              options: ['De programación', 'De marcado', 'De bases de datos', 'Un sistema operativo'],
              answer: 1,
              explanation: 'HTML marca la estructura del contenido; no tiene lógica como un lenguaje de programación.',
            },
            {
              type: 'fill',
              prompt: 'Completa la etiqueta de cierre',
              code: '<p>Hola</___>',
              answer: 'p',
              options: ['p', 'h1', 'body', 'br'],
              explanation: 'El cierre repite el nombre de la etiqueta con una barra: </p>.',
            },
            {
              type: 'choice',
              prompt: '¿Dónde va el contenido visible de la página?',
              options: ['<head>', '<body>', '<title>', '<!DOCTYPE>'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la estructura básica',
              lines: ['<html>', '  <body>', '    <h1>Hola</h1>', '  </body>', '</html>'],
              explanation: 'Las etiquetas se cierran en orden inverso al que se abren.',
            },
          ],
        },
        {
          title: 'Títulos, párrafos y enlaces',
          theory: [
            {
              title: 'Títulos y párrafos',
              body: 'Hay 6 niveles de título: de `<h1>` (el más importante) a `<h6>`. Usa un solo `<h1>` por página.\n\nLos párrafos de texto van en `<p>`.',
              code: `<h1>Título principal</h1>\n<h2>Subtítulo</h2>\n<p>Esto es un párrafo.</p>`,
            },
            {
              title: 'Enlaces y atributos',
              body: '`<a>` crea un enlace. El atributo `href` indica a dónde lleva.\n\nLos **atributos** dan información extra a una etiqueta y siempre van en la etiqueta de apertura: `nombre="valor"`.',
              code: `<a href="https://example.com">Visitar web</a>`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuál es el título más importante?',
              options: ['<h6>', '<h1>', '<head>', '<title>'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué etiqueta crea un párrafo?',
              options: ['<p>', '<para>', '<text>', '<pr>'],
              answer: 0,
            },
            {
              type: 'fill',
              prompt: 'Completa el atributo del enlace',
              code: '<a ___="https://google.com">Google</a>',
              answer: 'href',
              options: ['href', 'src', 'link', 'url'],
              explanation: 'href (hypertext reference) es la dirección a la que lleva el enlace.',
            },
            {
              type: 'choice',
              prompt: '¿Qué es un atributo?',
              options: ['Una etiqueta de cierre', 'Información extra dentro de la etiqueta de apertura', 'Un comentario', 'Un tipo de archivo'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada etiqueta con su uso',
              pairs: [
                ['<h1>', 'Título principal'],
                ['<p>', 'Párrafo'],
                ['<a>', 'Enlace'],
                ['<br>', 'Salto de línea'],
              ],
            },
          ],
        },
        {
          title: 'Imágenes y listas',
          theory: [
            {
              title: 'Imágenes',
              body: '`<img>` muestra una imagen y no tiene cierre.\n\n- `src`: la ruta de la imagen\n- `alt`: texto alternativo que la describe (accesibilidad y por si no carga)',
              code: `<img src="gato.jpg" alt="Un gato naranja durmiendo">`,
            },
            {
              title: 'Listas',
              body: '`<ul>` es una lista sin orden (viñetas) y `<ol>` una lista ordenada (números). Cada elemento va dentro de `<li>`.',
              code: `<ul>\n  <li>Pan</li>\n  <li>Leche</li>\n</ul>\n\n<ol>\n  <li>Abrir el editor</li>\n  <li>Escribir HTML</li>\n</ol>`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué atributo indica la ruta de la imagen?',
              options: ['href', 'alt', 'src', 'link'],
              answer: 2,
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve el atributo alt?',
              options: ['Cambia el tamaño', 'Describe la imagen con texto', 'Añade un borde', 'Convierte la imagen en enlace'],
              answer: 1,
              explanation: 'Los lectores de pantalla leen el alt, y también se muestra si la imagen no carga.',
            },
            {
              type: 'fill',
              prompt: 'Completa el elemento de la lista',
              code: '<ol>\n  <___>Primero</li>\n</ol>',
              answer: 'li',
              options: ['li', 'ul', 'ol', 'item'],
            },
            {
              type: 'choice',
              prompt: '¿Qué lista muestra números?',
              options: ['<ul>', '<ol>', '<li>', '<list>'],
              answer: 1,
              explanation: 'ol = ordered list (lista ordenada). ul = unordered list.',
            },
            {
              type: 'order',
              prompt: 'Ordena la lista de pasos',
              lines: ['<ol>', '  <li>Paso 1</li>', '  <li>Paso 2</li>', '</ol>'],
            },
          ],
        },
      ],
    },
    {
      title: 'Formularios y HTML semántico',
      description: 'Recoge datos del usuario y organiza la página con significado.',
      lessons: [
        {
          title: 'Formularios',
          theory: [
            {
              title: 'Pedir datos al usuario',
              body: '`<form>` agrupa los campos de un formulario. Dentro van los `<input>` (campos), los `<label>` (etiquetas) y un `<button>` para enviar.',
              code: `<form>\n  <label for="nombre">Nombre</label>\n  <input id="nombre" name="nombre">\n  <button type="submit">Enviar</button>\n</form>`,
            },
            {
              title: 'label + input',
              body: 'El atributo `for` del `<label>` debe coincidir con el `id` del `<input>`. Así, al pulsar la etiqueta se activa el campo, y los lectores de pantalla saben qué es cada campo.\n\n`name` es el nombre con el que se envía el dato al servidor.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué etiqueta agrupa los campos de un formulario?',
              options: ['<input>', '<form>', '<fieldset>', '<label>'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Conecta la etiqueta con el campo',
              code: '<label ___="email">Email</label>\n<input id="email">',
              answer: 'for',
              options: ['for', 'id', 'name', 'to'],
              explanation: 'for apunta al id del campo.',
            },
            {
              type: 'choice',
              prompt: '¿Qué atributo indica con qué nombre se envía el dato?',
              options: ['id', 'name', 'value', 'class'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el formulario',
              lines: ['<form>', '  <input name="usuario">', '  <button type="submit">Entrar</button>', '</form>'],
            },
            {
              type: 'choice',
              prompt: '¿Qué tipo de botón envía el formulario?',
              options: ['type="send"', 'type="submit"', 'type="go"', 'type="form"'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Tipos de campo y validación',
          theory: [
            {
              title: 'Tipos de input',
              body: 'El atributo `type` cambia el tipo de campo:\n\n- `text`: texto normal\n- `email`: correo electrónico\n- `password`: oculta lo que escribes\n- `number`: solo números\n- `checkbox`: casilla de marcar',
              code: `<input type="email">\n<input type="password">\n<input type="checkbox"> Acepto`,
            },
            {
              title: 'Validación sin JavaScript',
              body: '- `required`: el campo es obligatorio\n- `placeholder`: texto de ejemplo dentro del campo\n- `min` / `max`: límites para números\n\nEl navegador no deja enviar el formulario si algo no cumple las reglas.',
              code: `<input type="number" min="1" max="10" required>\n<input type="email" placeholder="tu@correo.com">`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué tipo de input oculta lo que escribes?',
              options: ['hidden', 'password', 'secret', 'text'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Haz que el campo sea obligatorio',
              code: '<input type="email" ___>',
              answer: 'required',
              options: ['required', 'needed', 'must', 'validate'],
            },
            {
              type: 'match',
              prompt: 'Une cada type con su uso',
              pairs: [
                ['email', 'Correo electrónico'],
                ['number', 'Solo números'],
                ['checkbox', 'Casilla de marcar'],
                ['password', 'Contraseña'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve placeholder?',
              options: ['Es el valor enviado', 'Texto de ejemplo dentro del campo', 'Hace el campo obligatorio', 'Cambia el color'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué atributos limitan un input de tipo number?',
              options: ['from / to', 'min / max', 'start / end', 'low / high'],
              answer: 1,
            },
          ],
        },
        {
          title: 'HTML semántico',
          theory: [
            {
              title: 'Etiquetas con significado',
              body: 'Las etiquetas **semánticas** describen qué es cada parte de la página. Ayudan a Google, a la accesibilidad y a entender tu propio código.\n\n- `<header>`: cabecera\n- `<nav>`: menú de navegación\n- `<main>`: contenido principal\n- `<footer>`: pie de página',
              code: `<header>\n  <nav>…</nav>\n</header>\n<main>\n  <article>…</article>\n</main>\n<footer>© 2026</footer>`,
            },
            {
              title: 'section, article y div',
              body: '- `<section>`: una sección temática\n- `<article>`: contenido independiente (un post, una noticia)\n- `<div>`: una caja **sin** significado, solo para agrupar y dar estilo',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué etiqueta contiene el menú de navegación?',
              options: ['<menu>', '<nav>', '<header>', '<links>'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cuántos <main> debería tener una página?',
              options: ['Ninguno', 'Uno', 'Uno por sección', 'Los que quieras'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada etiqueta con su parte de la página',
              pairs: [
                ['<header>', 'Cabecera'],
                ['<main>', 'Contenido principal'],
                ['<article>', 'Un post o noticia'],
                ['<footer>', 'Pie de página'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué etiqueta NO tiene significado semántico?',
              options: ['<section>', '<article>', '<div>', '<nav>'],
              answer: 2,
            },
            {
              type: 'order',
              prompt: 'Ordena la estructura de la página',
              lines: ['<header>Mi blog</header>', '<main>Posts</main>', '<footer>Contacto</footer>'],
            },
          ],
        },
      ],
    },
  ],
};
