export default {
  id: 'javascript',
  title: 'JavaScript',
  icon: '⚡',
  color: '#f08c00',
  level: 'Desde cero',
  description: 'El lenguaje que da vida a la web. También se usa en el servidor con Node.js.',
  units: [
    {
      title: 'Primeros pasos con JavaScript',
      description: 'Variables, tipos, operadores, condicionales y bucles.',
      lessons: [
        {
          title: 'Variables y tipos',
          theory: [
            {
              title: 'JavaScript da vida a la web',
              body: 'JavaScript añade **interactividad**: botones que responden, datos que se cargan, animaciones…\n\n`console.log()` muestra un mensaje en la consola. ¡Es tu mejor amigo para ver qué pasa!',
              code: `console.log("¡Hola, mundo!");`,
            },
            {
              title: 'Variables',
              body: 'Una variable es una caja con nombre que guarda un valor.\n\n- `let`: si el valor va a cambiar\n- `const`: si no va a cambiar',
              code: `let edad = 25;\nconst nombre = "Ana";\n\nedad = 26;        // ✅ permitido\n// nombre = "Luis"; ❌ error: es const`,
            },
            {
              title: 'Tipos de datos',
              body: '- `string`: texto entre comillas\n- `number`: números (42, 3.14)\n- `boolean`: `true` o `false`\n- `undefined` / `null`: sin valor\n\n`typeof` te dice el tipo de un valor.',
              code: `typeof "hola"  // "string"\ntypeof 42      // "number"\ntypeof true    // "boolean"`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué muestra un mensaje en la consola?',
              options: ['print()', 'console.log()', 'echo', 'System.out()'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué palabra usas para una variable que NO va a cambiar?',
              options: ['let', 'var', 'const', 'static'],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Declara una variable que puede cambiar',
              code: '___ puntos = 10;',
              answer: ['let', 'var'],
              options: ['let', 'int', 'variable', 'def'],
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve este código?',
              code: `typeof "5"`,
              options: ['"number"', '"string"', '"boolean"', '"text"'],
              answer: 1,
              explanation: 'Está entre comillas, así que es texto (string), aunque parezca un número.',
            },
            {
              type: 'match',
              prompt: 'Une cada valor con su tipo',
              pairs: [
                ['"hola"', 'string'],
                ['42', 'number'],
                ['true', 'boolean'],
                ['undefined', 'sin valor'],
              ],
            },
          ],
        },
        {
          title: 'Operadores y condicionales',
          theory: [
            {
              title: 'Operadores',
              body: '- Matemáticos: `+ - * /` y `%` (resto de la división)\n- Comparación: `===` igual, `!==` distinto, `> < >= <=`\n\nUsa siempre `===`: compara el valor **y** el tipo.',
              code: `10 % 3     // 1\n5 === 5    // true\n5 === "5"  // false (distinto tipo)`,
            },
            {
              title: 'if / else',
              body: '`if` ejecuta un bloque solo si la condición es verdadera; `else` se ejecuta en caso contrario.',
              code: `const edad = 18;\n\nif (edad >= 18) {\n  console.log("Eres mayor de edad");\n} else {\n  console.log("Eres menor de edad");\n}`,
            },
            {
              title: 'Operadores lógicos',
              body: '- `&&` (y): verdadero si **ambos** lo son\n- `||` (o): verdadero si **alguno** lo es\n- `!` (no): invierte el valor',
              code: `const tieneEntrada = true;\nconst esMayor = false;\n\ntieneEntrada && esMayor  // false\ntieneEntrada || esMayor  // true`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué muestra este código?',
              code: `console.log(10 % 3);`,
              options: ['3', '1', '0', '3.33'],
              answer: 1,
              explanation: '10 entre 3 es 3 y sobra 1. El operador % devuelve lo que sobra.',
            },
            {
              type: 'choice',
              prompt: '¿Qué operador compara valor Y tipo?',
              options: ['==', '=', '===', '!='],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Aprobado si la nota es 5 o más',
              code: 'if (nota ___ 5) {\n  console.log("Aprobado");\n}',
              answer: '>=',
              options: ['>=', '=>', '=', '<'],
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `const x = 7;\nif (x > 10) {\n  console.log("A");\n} else {\n  console.log("B");\n}`,
              options: ['A', 'B', 'AB', 'Nada'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cuál es el resultado de true && false?',
              options: ['true', 'false', 'undefined', 'Error'],
              answer: 1,
              explanation: '&& solo es true cuando los dos lados son true.',
            },
          ],
        },
        {
          title: 'Bucles',
          theory: [
            {
              title: 'El bucle for',
              body: 'Un bucle repite código. El `for` tiene tres partes: **inicio**, **condición** y **paso**.',
              code: `for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\n// Muestra: 1, 2, 3`,
            },
            {
              title: 'El bucle while',
              body: 'Se repite **mientras** la condición sea verdadera. ¡Cuidado! Si nunca deja de cumplirse, tendrás un bucle infinito.',
              code: `let vidas = 3;\nwhile (vidas > 0) {\n  console.log("Te quedan", vidas);\n  vidas--;\n}`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuántas veces se ejecuta el console.log?',
              code: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
              options: ['4', '5', '6', 'Infinitas'],
              answer: 1,
              explanation: 'i toma los valores 0, 1, 2, 3 y 4: cinco vueltas.',
            },
            {
              type: 'choice',
              prompt: '¿Qué hace i++?',
              options: ['Resta 1 a i', 'Suma 1 a i', 'Multiplica i por 2', 'Nada'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el bucle que cuenta del 1 al 3',
              lines: ['for (let i = 1; i <= 3; i++) {', '  console.log(i);', '}'],
            },
            {
              type: 'fill',
              prompt: 'Repite mientras n sea menor que 3',
              code: 'let n = 0;\n___ (n < 3) {\n  n++;\n}',
              answer: 'while',
              options: ['while', 'for', 'loop', 'repeat'],
            },
            {
              type: 'choice',
              prompt: '¿Qué es un bucle infinito?',
              options: ['Un bucle muy rápido', 'Un bucle cuya condición nunca deja de cumplirse', 'Un error de sintaxis', 'Un bucle de 1000 vueltas'],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Funciones, arrays y objetos',
      description: 'Reutiliza código y organiza tus datos.',
      lessons: [
        {
          title: 'Funciones',
          theory: [
            {
              title: 'Bloques reutilizables',
              body: 'Una **función** es un bloque de código con nombre que puedes usar muchas veces. Recibe **parámetros** y puede devolver un resultado con `return`.',
              code: `function sumar(a, b) {\n  return a + b;\n}\n\nconsole.log(sumar(2, 3)); // 5`,
            },
            {
              title: 'Funciones flecha',
              body: 'Una forma más corta de escribir funciones. Si solo tiene una expresión, el `return` es automático.',
              code: `const doble = (n) => n * 2;\n\nconsole.log(doble(4)); // 8`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué palabra devuelve un valor desde una función?',
              options: ['give', 'return', 'send', 'output'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `function saludar(nombre) {\n  return "Hola " + nombre;\n}\nconsole.log(saludar("Ana"));`,
              options: ['Hola nombre', 'Hola Ana', 'saludar', 'undefined'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Declara la función',
              code: '___ restar(a, b) {\n  return a - b;\n}',
              answer: 'function',
              options: ['function', 'def', 'func', 'fn'],
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve triple(3)?',
              code: `const triple = (n) => n * 3;`,
              options: ['3', '6', '9', '33'],
              answer: 2,
            },
            {
              type: 'order',
              prompt: 'Ordena la función que multiplica',
              lines: ['function multiplicar(a, b) {', '  return a * b;', '}', 'console.log(multiplicar(2, 5));'],
            },
          ],
        },
        {
          title: 'Arrays',
          theory: [
            {
              title: 'Listas de valores',
              body: 'Un **array** guarda varios valores en orden. Las posiciones empiezan en **0**. `length` te dice cuántos hay.',
              code: `const frutas = ["manzana", "pera"];\nfrutas.push("uva");      // añade al final\nconsole.log(frutas[0]);  // "manzana"\nconsole.log(frutas.length); // 3`,
            },
            {
              title: 'map y filter',
              body: '- `map` crea un array nuevo **transformando** cada elemento\n- `filter` crea un array nuevo con los elementos que **cumplen** una condición',
              code: `const nums = [1, 2, 3, 4];\nnums.map((n) => n * 10);     // [10, 20, 30, 40]\nnums.filter((n) => n > 2);   // [3, 4]`,
            },
          ],
          exercises: [
            {
              type: 'fill',
              prompt: 'Añade "kiwi" al final',
              code: 'frutas.___("kiwi");',
              answer: 'push',
              options: ['push', 'append', 'add', 'insert'],
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `const colores = ["rojo", "verde", "azul"];\nconsole.log(colores.length);`,
              options: ['2', '3', '"azul"', 'undefined'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve [1, 2, 3].map((n) => n + 1)?',
              options: ['[1, 2, 3]', '[2, 3, 4]', '6', '[1, 2, 3, 1]'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve [5, 10, 15].filter((n) => n >= 10)?',
              options: ['[5]', '[10, 15]', '[15]', 'true'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada método con lo que hace',
              pairs: [
                ['push', 'Añadir al final'],
                ['length', 'Cuántos elementos hay'],
                ['map', 'Transformar cada elemento'],
                ['filter', 'Quedarse con algunos'],
              ],
            },
          ],
        },
        {
          title: 'Objetos',
          theory: [
            {
              title: 'Datos con nombre',
              body: 'Un **objeto** agrupa datos relacionados en pares **clave: valor**. Accedes a ellos con un punto.',
              code: `const usuario = {\n  nombre: "Ana",\n  edad: 30,\n  activo: true,\n};\n\nconsole.log(usuario.nombre); // "Ana"\nusuario.edad = 31;`,
            },
            {
              title: 'Arrays de objetos',
              body: 'Lo más habitual en la vida real: una lista de objetos, por ejemplo los productos de una tienda que llegan de una API.',
              code: `const productos = [\n  { nombre: "Teclado", precio: 25 },\n  { nombre: "Ratón", precio: 15 },\n];\n\nproductos.map((p) => p.nombre); // ["Teclado", "Ratón"]`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `const coche = { marca: "Seat", año: 2020 };\nconsole.log(coche.marca);`,
              options: ['coche', 'marca', 'Seat', '2020'],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Lee la edad del usuario',
              code: 'console.log(usuario___edad);',
              answer: '.',
              options: ['.', ':', '->', '#'],
            },
            {
              type: 'choice',
              prompt: '¿Cómo se separan la clave y el valor en un objeto?',
              options: ['Con =', 'Con :', 'Con ->', 'Con ;'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve este código?',
              code: `const items = [{ n: 1 }, { n: 2 }];\nitems.map((i) => i.n);`,
              options: ['[1, 2]', '[{ n: 1 }, { n: 2 }]', '3', '["n", "n"]'],
              answer: 0,
            },
            {
              type: 'order',
              prompt: 'Ordena el objeto',
              lines: ['const libro = {', '  titulo: "Dune",', '  paginas: 600,', '};'],
            },
          ],
        },
      ],
    },
  ],
};
