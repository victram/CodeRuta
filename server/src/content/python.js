export default {
  id: 'python',
  title: 'Python',
  icon: '🐍',
  color: '#3b5bdb',
  level: 'Desde cero',
  description: 'El lenguaje más fácil de leer. Ideal para empezar, para backend, datos e IA.',
  units: [
    {
      title: 'Python desde cero',
      description: 'print, variables, condicionales, listas y bucles.',
      lessons: [
        {
          title: 'print y variables',
          theory: [
            {
              title: 'Hola, Python',
              body: 'Python es famoso por ser **fácil de leer**. Se usa en backend, ciencia de datos, automatización e inteligencia artificial.\n\n`print()` muestra texto en pantalla.',
              code: `print("¡Hola, mundo!")`,
            },
            {
              title: 'Variables',
              body: 'No necesitas `let` ni `const`: escribe el nombre y asigna con `=`. Los nombres suelen escribirse en **snake_case** (minúsculas y guiones bajos).',
              code: `nombre = "Ana"\nedad = 30\nmi_ciudad = "Madrid"\nprint(nombre, edad)`,
            },
            {
              title: 'Tipos básicos',
              body: '- `str`: texto\n- `int`: número entero\n- `float`: número decimal\n- `bool`: `True` o `False` (¡con mayúscula!)',
              code: `type("hola")  # <class 'str'>\ntype(7)       # <class 'int'>\ntype(3.5)     # <class 'float'>`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué función muestra texto en pantalla?',
              options: ['echo()', 'console.log()', 'print()', 'write()'],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Guarda el valor 20 en la variable',
              code: 'mi_edad ___ 20',
              answer: '=',
              options: ['=', '==', ':', '->'],
              explanation: '= asigna un valor. == sirve para comparar.',
            },
            {
              type: 'choice',
              prompt: '¿Cómo se escribe "verdadero" en Python?',
              options: ['true', 'True', 'TRUE', 'verdadero'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada valor con su tipo',
              pairs: [
                ['"hola"', 'str'],
                ['7', 'int'],
                ['3.5', 'float'],
                ['False', 'bool'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `x = 5\nx = x + 2\nprint(x)`,
              options: ['5', '2', '7', 'x'],
              answer: 2,
            },
          ],
        },
        {
          title: 'Condicionales',
          theory: [
            {
              title: 'if, elif y else',
              body: 'Python usa **sangría** (4 espacios) en lugar de llaves para marcar los bloques, y dos puntos `:` al final de `if`, `elif` y `else`.',
              code: `edad = 20\n\nif edad >= 18:\n    print("Puedes votar")\nelif edad >= 16:\n    print("Casi")\nelse:\n    print("Aún no")`,
            },
            {
              title: 'Lógica en palabras',
              body: 'Los operadores lógicos se escriben en inglés: `and`, `or`, `not`.',
              code: `if edad >= 18 and tiene_dni:\n    print("Adelante")`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué marca un bloque de código en Python?',
              options: ['Llaves { }', 'La sangría', 'Paréntesis', 'Punto y coma'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Completa la condición',
              code: 'if precio > 100___\n    print("Caro")',
              answer: ':',
              options: [':', ';', '{', 'then'],
            },
            {
              type: 'choice',
              prompt: '¿Cómo se escribe "si no, si…" en Python?',
              options: ['else if', 'elseif', 'elif', 'elsif'],
              answer: 2,
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `n = 3\nif n > 5:\n    print("grande")\nelse:\n    print("pequeño")`,
              options: ['grande', 'pequeño', 'Nada', 'Error'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el programa',
              lines: ['edad = 15', 'if edad >= 18:', '    print("Adulto")', 'else:', '    print("Menor")'],
            },
          ],
        },
        {
          title: 'Listas y bucles',
          theory: [
            {
              title: 'Listas',
              body: 'Una lista guarda varios valores en orden, entre corchetes. El primer elemento está en la posición **0**.',
              code: `frutas = ["manzana", "pera", "uva"]\nprint(frutas[0])        # manzana\nfrutas.append("kiwi")   # añade al final\nprint(len(frutas))      # 4`,
            },
            {
              title: 'El bucle for',
              body: '`for` recorre cada elemento de una lista. `range(n)` genera los números de 0 a n-1.',
              code: `for fruta in frutas:\n    print(fruta)\n\nfor i in range(3):\n    print(i)   # 0, 1, 2`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `colores = ["rojo", "verde", "azul"]\nprint(colores[1])`,
              options: ['rojo', 'verde', 'azul', 'Error'],
              answer: 1,
              explanation: 'Las posiciones empiezan en 0: rojo es 0, verde es 1.',
            },
            {
              type: 'fill',
              prompt: 'Añade un elemento al final de la lista',
              code: 'numeros.___(4)',
              answer: 'append',
              options: ['append', 'push', 'add', 'insert'],
            },
            {
              type: 'choice',
              prompt: '¿Qué números genera range(3)?',
              options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', 'Solo el 3'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Imprime cada nombre de la lista',
              lines: ['nombres = ["Ana", "Leo"]', 'for n in nombres:', '    print(n)'],
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve len([1, 2, 3, 4])?',
              options: ['3', '4', '10', '[4]'],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Funciones y estructuras de datos',
      description: 'Funciones, diccionarios, f-strings y manejo de errores.',
      lessons: [
        {
          title: 'Funciones',
          theory: [
            {
              title: 'def',
              body: 'Las funciones se crean con `def`, el nombre, los parámetros entre paréntesis y dos puntos. El cuerpo va con sangría.',
              code: `def saludar(nombre):\n    return "Hola " + nombre\n\nprint(saludar("Ana"))  # Hola Ana`,
            },
            {
              title: 'Valores por defecto',
              body: 'Un parámetro puede tener un valor por defecto, que se usa si no lo pasas.',
              code: `def potencia(base, exponente=2):\n    return base ** exponente\n\npotencia(3)     # 9\npotencia(2, 3)  # 8`,
            },
          ],
          exercises: [
            {
              type: 'fill',
              prompt: 'Define la función',
              code: '___ sumar(a, b):\n    return a + b',
              answer: 'def',
              options: ['def', 'function', 'func', 'fn'],
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `def doble(n):\n    return n * 2\n\nprint(doble(5))`,
              options: ['5', '10', '25', 'doble'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve potencia(4)?',
              code: `def potencia(base, exponente=2):\n    return base ** exponente`,
              options: ['4', '8', '16', 'Error'],
              answer: 2,
              explanation: 'exponente vale 2 por defecto, y ** es "elevado a": 4² = 16.',
            },
            {
              type: 'choice',
              prompt: '¿Qué devuelve una función sin return?',
              options: ['0', 'None', 'False', 'Error'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el programa',
              lines: ['def area(ancho, alto):', '    return ancho * alto', 'print(area(3, 4))'],
            },
          ],
        },
        {
          title: 'Diccionarios',
          theory: [
            {
              title: 'Clave → valor',
              body: 'Un **diccionario** guarda pares clave: valor entre llaves. Es como un objeto de JavaScript, y es lo que verás al trabajar con JSON.',
              code: `persona = {"nombre": "Ana", "edad": 30}\n\nprint(persona["nombre"])  # Ana\npersona["ciudad"] = "Madrid"  # añade una clave`,
            },
            {
              title: 'Recorrer un diccionario',
              body: '`.items()` te da cada clave y su valor. `.get()` lee una clave sin dar error si no existe.',
              code: `for clave, valor in persona.items():\n    print(clave, valor)\n\npersona.get("telefono", "sin teléfono")`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `precios = {"pan": 1, "leche": 2}\nprint(precios["leche"])`,
              options: ['1', '2', 'leche', 'Error'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Recorre claves y valores',
              code: 'for k, v in datos.___():\n    print(k, v)',
              answer: 'items',
              options: ['items', 'pairs', 'entries', 'all'],
            },
            {
              type: 'choice',
              prompt: '¿Con qué símbolos se crea un diccionario?',
              options: ['[ ]', '( )', '{ }', '< >'],
              answer: 2,
            },
            {
              type: 'choice',
              prompt: '¿Qué ventaja tiene .get("x") frente a ["x"]?',
              options: ['Es más rápido', 'No da error si la clave no existe', 'Borra la clave', 'Ordena el diccionario'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada estructura con su forma',
              pairs: [
                ['Lista', '[1, 2, 3]'],
                ['Diccionario', '{"a": 1}'],
                ['Texto', '"hola"'],
                ['Booleano', 'True'],
              ],
            },
          ],
        },
        {
          title: 'f-strings y errores',
          theory: [
            {
              title: 'f-strings',
              body: 'Pon una `f` antes de las comillas y mete variables entre llaves `{ }` dentro del texto.',
              code: `nombre = "Leo"\nedad = 25\nprint(f"{nombre} tiene {edad} años")`,
            },
            {
              title: 'try / except',
              body: 'Si algo puede fallar (convertir texto a número, abrir un archivo…), envuélvelo en `try`. Si falla, se ejecuta `except` en lugar de romper el programa.',
              code: `try:\n    numero = int("abc")\nexcept ValueError:\n    print("Eso no es un número")`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué se muestra?',
              code: `x = 3\nprint(f"Tengo {x} gatos")`,
              options: ['Tengo x gatos', 'Tengo {x} gatos', 'Tengo 3 gatos', 'Error'],
              answer: 2,
            },
            {
              type: 'fill',
              prompt: 'Convierte el texto en f-string',
              code: 'print(___"Hola {nombre}")',
              answer: 'f',
              options: ['f', 's', '$', 'fmt'],
            },
            {
              type: 'fill',
              prompt: 'Captura el error',
              code: 'try:\n    int("hola")\n___ ValueError:\n    print("Error")',
              answer: 'except',
              options: ['except', 'catch', 'error', 'else'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve try/except?',
              options: ['Repetir código', 'Manejar errores sin que se rompa el programa', 'Definir funciones', 'Importar módulos'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué hace int("42")?',
              options: ['Devuelve el texto "42"', 'Convierte el texto en el número 42', 'Da error', 'Devuelve 4'],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
};
