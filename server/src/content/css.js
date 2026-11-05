export default {
  id: 'css',
  title: 'CSS',
  icon: '🎨',
  color: '#1c7ed6',
  level: 'Desde cero',
  description: 'Dale estilo a la web: colores, textos, tamaños y espacios.',
  units: [
    {
      title: 'Dale estilo a tu página',
      description: 'Selectores, colores, texto y el modelo de caja.',
      lessons: [
        {
          title: 'Qué es CSS y los selectores',
          theory: [
            {
              title: 'CSS es la ropa de la web',
              body: 'CSS (Cascading Style Sheets) controla el **aspecto**: colores, tamaños, posiciones…\n\nUna regla tiene un **selector** (a quién afecta) y declaraciones `propiedad: valor;` entre llaves.',
              code: `h1 {\n  color: blue;\n  font-size: 32px;\n}`,
            },
            {
              title: 'Tipos de selectores',
              body: '- `p` selecciona por etiqueta\n- `.boton` selecciona por **clase** (con punto)\n- `#menu` selecciona por **id** (con almohadilla)\n- `*` selecciona todo',
              code: `.boton { background: green; }\n#menu { width: 200px; }\n\n/* En el HTML: */\n/* <button class="boton">OK</button> */`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Para qué sirve CSS?',
              options: ['Crear la estructura', 'Dar estilo y aspecto visual', 'Guardar datos', 'Programar el servidor'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué selector apunta a la clase "tarjeta"?',
              options: ['#tarjeta', '.tarjeta', 'tarjeta', '*tarjeta'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Completa la declaración',
              code: 'p {\n  color___ red;\n}',
              answer: ':',
              options: [':', '=', ';', '->'],
              explanation: 'Cada declaración es propiedad: valor; (dos puntos y punto y coma).',
            },
            {
              type: 'choice',
              prompt: '¿Con qué símbolo se selecciona un id?',
              options: ['.', '#', '@', '&'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada selector con lo que selecciona',
              pairs: [
                ['p', 'Todos los párrafos'],
                ['.menu', 'Elementos con clase menu'],
                ['#logo', 'El elemento con id logo'],
                ['*', 'Todos los elementos'],
              ],
            },
          ],
        },
        {
          title: 'Colores y texto',
          theory: [
            {
              title: 'Colores',
              body: 'Puedes escribir colores por nombre (`red`), en hexadecimal (`#ff0000`) o con `rgb(255, 0, 0)`.\n\n`color` cambia el color del **texto** y `background-color` el del **fondo**.',
              code: `body {\n  color: #222222;\n  background-color: #fafafa;\n}`,
            },
            {
              title: 'Texto',
              body: '- `font-size`: tamaño\n- `font-weight: bold`: negrita\n- `text-align: center`: centrar\n- `font-family`: tipo de letra',
              code: `h1 {\n  font-family: Arial, sans-serif;\n  font-size: 40px;\n  text-align: center;\n}`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué propiedad cambia el color del fondo?',
              options: ['color', 'background-color', 'bg', 'fill'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué color es #ffffff?',
              options: ['Negro', 'Blanco', 'Rojo', 'Azul'],
              answer: 1,
              explanation: 'ff es el máximo en rojo, verde y azul a la vez → blanco. #000000 es negro.',
            },
            {
              type: 'fill',
              prompt: 'Centra el texto',
              code: 'h1 {\n  text-align: ___;\n}',
              answer: 'center',
              options: ['center', 'middle', 'centre', 'left'],
            },
            {
              type: 'choice',
              prompt: '¿Qué hace font-weight: bold?',
              options: ['Cursiva', 'Negrita', 'Subrayado', 'Más grande'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la regla CSS',
              lines: ['h1 {', '  color: red;', '}'],
            },
          ],
        },
        {
          title: 'El modelo de caja',
          theory: [
            {
              title: 'Todo es una caja',
              body: 'Cada elemento es una caja con 4 capas, de dentro hacia fuera:\n\n- **content**: el contenido\n- **padding**: relleno interior\n- **border**: el borde\n- **margin**: espacio exterior con otras cajas',
              code: `.caja {\n  padding: 16px;\n  border: 2px solid black;\n  margin: 20px;\n}`,
            },
            {
              title: 'Ancho y alto',
              body: '`width` y `height` definen el tamaño. Con `box-sizing: border-box` el padding y el borde se incluyen **dentro** del ancho: ¡mucho más fácil de calcular!',
              code: `* {\n  box-sizing: border-box;\n}\n.tarjeta {\n  width: 300px;\n  padding: 20px;\n}`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué es el padding?',
              options: ['Espacio exterior', 'Espacio interior entre contenido y borde', 'El borde', 'El color de fondo'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué propiedad separa una caja de las demás por fuera?',
              options: ['padding', 'margin', 'border', 'width'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Añade un borde gris',
              code: '.caja {\n  ___: 1px solid gray;\n}',
              answer: 'border',
              options: ['border', 'margin', 'padding', 'outline-color'],
            },
            {
              type: 'match',
              prompt: 'Une cada capa con su descripción',
              pairs: [
                ['content', 'El contenido'],
                ['padding', 'Relleno interior'],
                ['border', 'Línea del borde'],
                ['margin', 'Espacio exterior'],
              ],
            },
            {
              type: 'choice',
              prompt: 'Con box-sizing: border-box, width: 200px y padding: 20px, ¿cuánto mide el ancho total?',
              options: ['200px', '240px', '220px', '180px'],
              answer: 0,
              explanation: 'Con border-box el padding se resta del interior, así que el total sigue siendo 200px.',
            },
          ],
        },
      ],
    },
    {
      title: 'Maquetación',
      description: 'Coloca elementos con Flexbox y Grid, y adapta tu web al móvil.',
      lessons: [
        {
          title: 'Flexbox',
          theory: [
            {
              title: 'Elementos en fila',
              body: 'Con `display: flex` los hijos de un contenedor se colocan en **fila**. Es la forma más fácil de alinear cosas.\n\n- `justify-content`: reparte en el eje principal (horizontal)\n- `align-items`: alinea en el eje cruzado (vertical)\n- `gap`: espacio entre elementos',
              code: `.menu {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n}`,
            },
            {
              title: 'Dirección',
              body: '`flex-direction: column` pone los elementos en **columna**. Y `flex-wrap: wrap` permite que salten de línea si no caben.',
            },
          ],
          exercises: [
            {
              type: 'fill',
              prompt: 'Activa Flexbox',
              code: '.contenedor {\n  display: ___;\n}',
              answer: 'flex',
              options: ['flex', 'block', 'row', 'inline'],
            },
            {
              type: 'choice',
              prompt: '¿Qué propiedad reparte los elementos en horizontal (fila)?',
              options: ['align-items', 'justify-content', 'text-align', 'float'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cómo centras un elemento en vertical dentro de un flex en fila?',
              options: ['align-items: center', 'vertical-align: middle', 'justify-content: center', 'margin: center'],
              answer: 0,
            },
            {
              type: 'fill',
              prompt: 'Pon los elementos en columna',
              code: '.lista {\n  display: flex;\n  flex-direction: ___;\n}',
              answer: 'column',
              options: ['column', 'vertical', 'down', 'row'],
            },
            {
              type: 'choice',
              prompt: '¿Qué hace gap: 10px?',
              options: ['Añade borde', 'Deja 10px entre los elementos', 'Añade margen exterior al contenedor', 'Nada en flex'],
              answer: 1,
            },
          ],
        },
        {
          title: 'Grid',
          theory: [
            {
              title: 'Filas y columnas',
              body: '`display: grid` crea una **cuadrícula**. Con `grid-template-columns` defines las columnas. La unidad `fr` significa "una fracción del espacio libre".',
              code: `.galeria {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 12px;\n}`,
            },
            {
              title: '¿Flex o Grid?',
              body: '- **Flexbox**: una dimensión (una fila o una columna). Ideal para menús y barras.\n- **Grid**: dos dimensiones (filas y columnas). Ideal para galerías y diseños de página.\n\n`repeat(3, 1fr)` es lo mismo que `1fr 1fr 1fr`.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuántas columnas crea esto?',
              code: `grid-template-columns: 1fr 2fr 1fr;`,
              options: ['1', '2', '3', '4'],
              answer: 2,
              explanation: 'Hay tres valores, así que tres columnas (la del medio es el doble de ancha).',
            },
            {
              type: 'fill',
              prompt: 'Crea 4 columnas iguales',
              code: 'grid-template-columns: ___(4, 1fr);',
              answer: 'repeat',
              options: ['repeat', 'columns', 'times', 'loop'],
            },
            {
              type: 'choice',
              prompt: '¿Qué significa la unidad fr?',
              options: ['Frame', 'Una fracción del espacio disponible', 'Font ratio', 'Píxeles fijos'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué es mejor para una galería de fotos en filas y columnas?',
              options: ['Flexbox', 'Grid', 'float', 'position: absolute'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la regla de una cuadrícula de 2 columnas',
              lines: ['.grid {', '  display: grid;', '  grid-template-columns: 1fr 1fr;', '}'],
            },
          ],
        },
        {
          title: 'Diseño responsive',
          theory: [
            {
              title: 'Una web, todas las pantallas',
              body: 'Una web **responsive** se adapta a móvil, tablet y ordenador. Lo primero es esta línea en el `<head>` del HTML:',
              code: `<meta name="viewport" content="width=device-width, initial-scale=1">`,
            },
            {
              title: 'Media queries',
              body: '`@media` aplica estilos solo cuando se cumple una condición, por ejemplo cuando la pantalla es estrecha.',
              code: `.grid {\n  grid-template-columns: 1fr 1fr 1fr;\n}\n\n@media (max-width: 600px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}`,
            },
            {
              title: 'Unidades flexibles',
              body: '- `%`: relativo al contenedor\n- `rem`: relativo al tamaño de letra base (normalmente 16px)\n- `vw` / `vh`: % del ancho / alto de la pantalla',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué es una web responsive?',
              options: ['Una web muy rápida', 'Una web que se adapta a cualquier pantalla', 'Una web con animaciones', 'Una web con base de datos'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Aplica estilos solo en pantallas de hasta 600px',
              code: '___ (max-width: 600px) {\n  body { font-size: 14px; }\n}',
              answer: '@media',
              options: ['@media', '@screen', '@if', '@mobile'],
            },
            {
              type: 'choice',
              prompt: 'Si el tamaño base es 16px, ¿cuánto es 2rem?',
              options: ['2px', '16px', '32px', '200%'],
              answer: 2,
            },
            {
              type: 'match',
              prompt: 'Une cada unidad con su referencia',
              pairs: [
                ['%', 'El contenedor'],
                ['rem', 'La letra base'],
                ['vw', 'El ancho de pantalla'],
                ['px', 'Píxeles fijos'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué etiqueta es imprescindible para que el móvil no muestre la web "en miniatura"?',
              options: ['<meta name="viewport">', '<meta charset>', '<link rel="mobile">', '<title>'],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
};
