import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'typescript',
  title: 'TypeScript',
  icon: '🔷',
  color: '#3178c6',
  level: 'Intermedio',
  description: 'JavaScript con tipos: detecta errores antes de ejecutar. El estándar en empresas.',
  units: [
    unit('Tipos básicos', 'Anotaciones, arrays, uniones, interfaces y types.', [
      lesson(
        'Por qué TypeScript',
        [
          card(
            'JavaScript con superpoderes',
            'TypeScript es JavaScript + **tipos**. Se escribe en archivos `.ts` y se **compila** a JavaScript normal.\n\nEl editor te avisa de errores **mientras escribes**, antes de ejecutar nada. Por eso lo usan casi todas las empresas en proyectos grandes.',
            `let edad: number = 25;\nedad = "veinte"; // ❌ Error: string no es number`
          ),
          card(
            'Tipos primitivos',
            '- `string`: texto\n- `number`: números\n- `boolean`: true / false\n- `any`: cualquier cosa (¡evítalo, desactiva la ayuda!)\n\nMuchas veces TypeScript **infiere** el tipo solo: `let x = 5` ya es `number`.',
            `const nombre: string = "Ana";\nconst activo: boolean = true;\nlet total = 10; // inferido: number`
          ),
        ],
        [
          choice('¿Qué es TypeScript?', ['Un lenguaje totalmente distinto a JS', 'JavaScript con tipos que se compila a JavaScript', 'Una base de datos', 'Un framework de CSS'], 1),
          fill('Anota el tipo', 'let precio: ___ = 9.99;', 'number', ['number', 'float', 'decimal', 'int']),
          choice('¿Cuándo detecta TypeScript los errores de tipos?', ['Al ejecutar en producción', 'Mientras escribes / al compilar', 'Nunca', 'Solo en el navegador'], 1),
          choice('¿Qué tipo infiere TypeScript?', ['string', 'number', 'any', 'boolean'], 0, { code: `let saludo = "hola";` }),
          choice('¿Por qué evitar any?', ['Es más lento', 'Desactiva la comprobación de tipos', 'No existe', 'Solo vale para números'], 1),
        ]
      ),
      lesson(
        'Arrays, uniones y literales',
        [
          card('Arrays y tuplas', 'Un array de números es `number[]`. Una **tupla** es un array de longitud fija con un tipo por posición.', `const notas: number[] = [7, 8, 10];\nconst punto: [number, number] = [3, 4];`),
          card(
            'Uniones',
            'Con `|` un valor puede ser de **varios** tipos. Con **literales** limitas los valores posibles: ¡adiós a los errores de escritura!',
            `let id: number | string = 42;\nid = "abc-42"; // ✅\n\ntype Estado = "pendiente" | "hecho";\nlet tarea: Estado = "hecho";\n// tarea = "echo"; ❌ error`
          ),
        ],
        [
          fill('Array de textos', 'const nombres: ___[] = ["Ana", "Leo"];', 'string', ['string', 'text', 'String[]', 'array']),
          choice('¿Qué significa number | string?', ['Número y texto a la vez', 'Puede ser número o texto', 'Un número convertido a texto', 'Error'], 1),
          choice('¿Qué valor es válido?', ['"arriba"', '"izquierda"', '"norte"', '42'], 1, { code: `type Dir = "izquierda" | "derecha";\nlet d: Dir = ???` }),
          choice('¿Qué es una tupla?', ['Un objeto', 'Un array de longitud fija con tipos por posición', 'Un tipo de bucle', 'Un string'], 1),
          match('Une cada tipo con un valor', [['number[]', '[1, 2, 3]'], ['[string, number]', '["Ana", 30]'], ['boolean', 'true'], ['"si" | "no"', '"si"']]),
        ]
      ),
      lesson(
        'Interfaces y type',
        [
          card(
            'Dar forma a los objetos',
            'Una `interface` describe qué propiedades tiene un objeto y de qué tipo. El `?` marca una propiedad **opcional**.',
            `interface Usuario {\n  id: number;\n  nombre: string;\n  email?: string; // opcional\n}\n\nconst u: Usuario = { id: 1, nombre: "Ana" };`
          ),
          card('type vs interface', '`type` también crea tipos y además permite uniones. En la práctica, para objetos se usan los dos; elige uno y sé coherente.\n\n`readonly` impide modificar una propiedad.', `type Producto = {\n  readonly id: number;\n  precio: number;\n};`),
        ],
        [
          fill('Declara la interfaz', '___ Libro {\n  titulo: string;\n  paginas: number;\n}', 'interface', ['interface', 'class', 'struct', 'object']),
          choice('¿Qué indica el ? en email?: string', ['Que es un error', 'Que la propiedad es opcional', 'Que es nullable siempre', 'Que es privada'], 1),
          choice('¿Este objeto es válido para Usuario { id: number; nombre: string }?', ['Sí', 'No, falta nombre', 'No, sobra id', 'Sí, si es any'], 1, { code: `const u: Usuario = { id: 7 };` }),
          choice('¿Qué hace readonly?', ['Oculta la propiedad', 'Impide modificarla después', 'La hace opcional', 'La convierte en string'], 1),
          order('Ordena la interfaz', ['interface Tarea {', '  id: number;', '  hecha: boolean;', '}']),
        ]
      ),
    ]),
    unit('TypeScript en la práctica', 'Funciones tipadas, genéricos y utilidades.', [
      lesson(
        'Funciones tipadas',
        [
          card('Parámetros y retorno', 'Anota el tipo de cada parámetro y, después de los paréntesis, el tipo que devuelve. `void` significa que no devuelve nada.', `function sumar(a: number, b: number): number {\n  return a + b;\n}\n\nconst log = (msg: string): void => console.log(msg);`),
          card('Opcionales y por defecto', 'Un parámetro con `?` es opcional; también puedes darle un valor por defecto.', `function saludar(nombre: string, saludo = "Hola"): string {\n  return saludo + ", " + nombre;\n}`),
        ],
        [
          fill('Tipo de retorno', 'function doble(n: number): ___ {\n  return n * 2;\n}', 'number', ['number', 'void', 'any', 'return']),
          choice('¿Qué significa void?', ['Devuelve null', 'No devuelve nada', 'Devuelve cualquier cosa', 'Es un error'], 1),
          choice('¿Qué pasa con sumar(2, "3")?', ['Devuelve 5', 'Devuelve "23"', 'Error de tipos al compilar', 'Nada'], 2, { code: `function sumar(a: number, b: number) { return a + b; }` }),
          fill('Haz opcional el parámetro', 'function crear(nombre: string, edad___: number) {}', '?', ['?', '!', '*', '=']),
          choice('¿Qué devuelve saludar("Leo")?', ['"Hola, Leo"', '"Leo"', 'undefined', 'Error'], 0, { code: `function saludar(nombre: string, saludo = "Hola") {\n  return saludo + ", " + nombre;\n}` }),
        ]
      ),
      lesson(
        'Genéricos',
        [
          card('Tipos como parámetros', 'Un **genérico** `<T>` es un "hueco" para un tipo. Así una función sirve para muchos tipos sin perder la información.', `function primero<T>(lista: T[]): T {\n  return lista[0];\n}\n\nprimero([1, 2, 3]);      // number\nprimero(["a", "b"]);     // string`),
          card('Genéricos en el día a día', 'Los ves constantemente: `Array<number>`, `Promise<Usuario>`, `useState<string>()` en React…', `async function cargar(): Promise<Usuario[]> {\n  const res = await fetch("/api/usuarios");\n  return res.json();\n}`),
        ],
        [
          choice('¿Para qué sirve <T>?', ['Para crear una clase', 'Para que una función funcione con distintos tipos manteniéndolos', 'Para hacer bucles', 'Es HTML'], 1),
          choice('¿Qué tipo devuelve primero(["x", "y"])?', ['number', 'string', 'T', 'any'], 1, { code: `function primero<T>(lista: T[]): T { return lista[0]; }` }),
          fill('Una promesa que resuelve a texto', 'async function leer(): ___<string> { ... }', 'Promise', ['Promise', 'Async', 'Future', 'Task']),
          choice('Array<number> es lo mismo que…', ['number[]', '[number]', 'number', 'Array'], 0),
          fill('Estado de React tipado', 'const [n, setN] = useState___(0);', '<number>', ['<number>', '(number)', '[number]', ':number']),
        ]
      ),
      lesson(
        'Narrowing y utility types',
        [
          card('Estrechar tipos', 'Con una unión, TypeScript te obliga a comprobar el tipo antes de usarlo. Dentro del `if`, ya sabe cuál es: eso es **narrowing**.', `function formatear(v: number | string) {\n  if (typeof v === "number") {\n    return v.toFixed(2); // aquí v es number\n  }\n  return v.toUpperCase(); // aquí v es string\n}`),
          card('Utility types', '- `Partial<T>`: todas las propiedades opcionales\n- `Pick<T, "a" | "b">`: solo algunas\n- `Omit<T, "a">`: todas menos algunas\n- `Record<K, V>`: objeto con claves K y valores V', `type UsuarioEditable = Partial<Usuario>;\ntype UsuarioPublico = Omit<Usuario, "email">;`),
        ],
        [
          choice('¿Qué es narrowing?', ['Hacer el código más corto', 'Que TypeScript deduzca un tipo más concreto tras una comprobación', 'Convertir tipos a string', 'Borrar tipos'], 1),
          fill('Comprueba si es texto', 'if (___ valor === "string") { ... }', 'typeof', ['typeof', 'instanceof', 'type', 'is']),
          match('Une cada utility type con su efecto', [['Partial', 'Todo opcional'], ['Pick', 'Solo algunas propiedades'], ['Omit', 'Todas menos algunas'], ['Record', 'Diccionario clave → valor']]),
          choice('Para un formulario de "editar perfil" donde todo es opcional, usarías…', ['Pick<Usuario>', 'Partial<Usuario>', 'Record<Usuario>', 'any'], 1),
          choice('¿Qué tipo es v dentro del else?', ['number', 'string', 'number | string', 'never'], 1, { code: `function f(v: number | string) {\n  if (typeof v === "number") { ... }\n  else { /* aquí */ }\n}` }),
        ]
      ),
    ]),
  ],
};
