import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'entrevistas-codigo',
  title: 'Problemas de entrevista',
  icon: '🎯',
  color: '#d6336c',
  level: 'Avanzado',
  description: 'Los problemas de código que más se preguntan, resueltos paso a paso en JavaScript.',
  units: [
    unit('Problemas clásicos', 'Hashing, strings y pilas: lo que sale en casi todas las entrevistas.', [
      lesson(
        'Cómo afrontar un problema',
        [
          card('El método', 'En una entrevista valoran **cómo piensas**, no solo la respuesta. Piensa en voz alta:\n\n1. **Entender**: repite el problema y pregunta dudas (¿puede haber negativos? ¿lista vacía?)\n2. **Ejemplos**: prueba casos pequeños y casos límite\n3. **Fuerza bruta**: di la solución obvia aunque sea lenta\n4. **Optimizar**: ¿un hash map? ¿ordenar? ¿dos punteros?\n5. **Programar** limpio\n6. **Probar** con tus ejemplos y dar la **complejidad**'),
          card('Casos límite', 'Siempre piensa en: lista **vacía**, un solo elemento, **duplicados**, números **negativos**, valores muy grandes, strings con espacios o mayúsculas.'),
        ],
        [
          order('Ordena el método para resolver un problema', ['Entender y preguntar dudas', 'Probar ejemplos', 'Proponer fuerza bruta', 'Optimizar', 'Programar', 'Probar y dar la complejidad']),
          choice('¿Qué es lo primero que debes hacer?', ['Programar rápido', 'Asegurarte de entender el problema y preguntar', 'Decir la complejidad', 'Quedarte en silencio'], 1),
          choice('¿Por qué decir primero la fuerza bruta?', ['Para perder tiempo', 'Demuestra que entiendes el problema y da un punto de partida', 'Es la mejor solución siempre', 'No se debe decir'], 1),
          match('Une cada caso límite', [['[]', 'Lista vacía'], ['[7]', 'Un solo elemento'], ['[2, 2, 2]', 'Duplicados'], ['[-5, 3]', 'Negativos']]),
          reto(
            'Calentamiento: escribe maximo(nums) sin usar Math.max. Si la lista está vacía devuelve null.',
            `function maximo(nums) {\n  \n}`,
            [['maximo([3, 9, 2])', 9], ['maximo([-5, -2, -8])', -2], ['maximo([])', null], ['maximo([4])', 4]],
            `function maximo(nums) {\n  if (nums.length === 0) return null;\n  let max = nums[0];\n  for (const n of nums) if (n > max) max = n;\n  return max;\n}`,
            { hint: 'Empieza con max = nums[0] (no con 0: ¡piensa en los negativos!).' }
          ),
        ]
      ),
      lesson(
        'Arrays y hashing',
        [
          card('Two Sum', 'El problema más famoso: dado un array y un objetivo, encuentra **dos posiciones** cuyos valores sumen el objetivo.\n\n- Fuerza bruta: probar todos los pares → **O(n²)**\n- Óptimo: guardar en un **Map** lo visto y buscar el complementario `objetivo − x` → **O(n)**', `// [2, 7, 11, 15], objetivo 9\n// ves 2 → guardas {2: 0}\n// ves 7 → ¿está 9 − 7 = 2? ¡Sí! → [0, 1]`),
          card('El truco del hash map', 'Cuando pienses "¿he visto ya esto?" o "¿cuántas veces aparece?", piensa en un **Map** o un **Set**: convierten búsquedas O(n) en O(1).'),
        ],
        [
          reto(
            'Two Sum: escribe dosSuma(nums, objetivo) que devuelva [i, j] (con i < j) tales que nums[i] + nums[j] === objetivo. Siempre hay exactamente una solución. Intenta hacerlo en O(n) con un Map.',
            `function dosSuma(nums, objetivo) {\n  const vistos = new Map(); // valor → índice\n  \n}`,
            [['dosSuma([2, 7, 11, 15], 9)', [0, 1]], ['dosSuma([3, 2, 4], 6)', [1, 2]], ['dosSuma([3, 3], 6)', [0, 1]]],
            `function dosSuma(nums, objetivo) {\n  const vistos = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const falta = objetivo - nums[i];\n    if (vistos.has(falta)) return [vistos.get(falta), i];\n    vistos.set(nums[i], i);\n  }\n  return null;\n}`,
            { hint: 'Para cada nums[i], calcula falta = objetivo - nums[i]. Si falta está en el Map, ya lo tienes.' }
          ),
          reto(
            'Escribe tieneDuplicados(nums): true si algún valor aparece más de una vez.',
            `function tieneDuplicados(nums) {\n  \n}`,
            [['tieneDuplicados([1, 2, 3, 1])', true], ['tieneDuplicados([1, 2, 3])', false], ['tieneDuplicados([])', false]],
            `function tieneDuplicados(nums) {\n  return new Set(nums).size !== nums.length;\n}`,
            { hint: 'Un Set elimina repetidos: compara su tamaño con el del array.' }
          ),
          choice('¿Complejidad de Two Sum con un hash map?', ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'], 1),
          choice('¿Qué estructura usarías para "¿he visto este valor antes?"', ['Un array y buscar con un bucle', 'Un Set', 'Una pila', 'Un string'], 1),
          reto(
            'Escribe primerUnico(s): el primer carácter que aparece una sola vez, o null si no hay.',
            `function primerUnico(s) {\n  // 1. cuenta cada carácter\n  // 2. recorre otra vez y devuelve el primero con cuenta 1\n}`,
            [['primerUnico("aabcc")', 'b'], ['primerUnico("leetcode")', 'l'], ['primerUnico("aabb")', null]],
            `function primerUnico(s) {\n  const cuenta = {};\n  for (const c of s) cuenta[c] = (cuenta[c] || 0) + 1;\n  for (const c of s) if (cuenta[c] === 1) return c;\n  return null;\n}`
          ),
        ]
      ),
      lesson(
        'Strings y pilas',
        [
          card('Palíndromos y anagramas', '- **Palíndromo**: se lee igual al derecho y al revés ("reconocer"). Dos punteros o comparar con el texto invertido.\n- **Anagrama**: mismas letras en distinto orden ("amor" / "roma"). Ordena las letras o cuéntalas.', `"roma".split("").sort().join("") // "amor"`),
          card('Paréntesis válidos', 'Clásico de **pilas**: al ver un símbolo de apertura, apílalo; al ver uno de cierre, debe coincidir con el último apilado. Al final, la pila debe quedar vacía.', `"([]{})" → válido\n"([)]"   → no válido`),
        ],
        [
          reto(
            'Escribe esPalindromo(s): true si se lee igual al derecho y al revés.',
            `function esPalindromo(s) {\n  \n}`,
            [['esPalindromo("reconocer")', true], ['esPalindromo("hola")', false], ['esPalindromo("a")', true], ['esPalindromo("")', true]],
            `function esPalindromo(s) {\n  let i = 0, j = s.length - 1;\n  while (i < j) {\n    if (s[i] !== s[j]) return false;\n    i++;\n    j--;\n  }\n  return true;\n}`
          ),
          reto(
            'Escribe sonAnagramas(a, b): true si tienen exactamente las mismas letras.',
            `function sonAnagramas(a, b) {\n  \n}`,
            [['sonAnagramas("amor", "roma")', true], ['sonAnagramas("hola", "halo")', true], ['sonAnagramas("gato", "pato")', false], ['sonAnagramas("ab", "abc")', false]],
            `function sonAnagramas(a, b) {\n  const ordenar = (s) => s.split("").sort().join("");\n  return ordenar(a) === ordenar(b);\n}`
          ),
          reto(
            'Paréntesis válidos: escribe valido(s) para un texto con ( ) [ ] { }. Usa una pila.',
            `function valido(s) {\n  const pila = [];\n  const pareja = { ")": "(", "]": "[", "}": "{" };\n  \n}`,
            [['valido("()")', true], ['valido("([]{})")', true], ['valido("([)]")', false], ['valido("((")', false], ['valido("")', true]],
            `function valido(s) {\n  const pila = [];\n  const pareja = { ")": "(", "]": "[", "}": "{" };\n  for (const c of s) {\n    if (c === "(" || c === "[" || c === "{") pila.push(c);\n    else if (pila.pop() !== pareja[c]) return false;\n  }\n  return pila.length === 0;\n}`,
            { hint: 'Si es de apertura, push. Si es de cierre, pila.pop() debe ser su pareja. Al final, pila vacía.' }
          ),
          choice('¿Qué estructura resuelve los paréntesis válidos?', ['Cola', 'Pila', 'Árbol', 'Grafo'], 1),
          choice('¿Complejidad de ordenar las letras para comparar anagramas?', ['O(n)', 'O(n log n)', 'O(1)', 'O(n²)'], 1),
        ]
      ),
    ]),
    unit('Problemas intermedios', 'Ventanas, búsqueda binaria, árboles y recursión.', [
      lesson(
        'Subarrays',
        [
          card('Kadane: suma máxima', 'Problema: la mayor suma de un subarray **contiguo**. Idea de **Kadane**: recorre el array llevando la mejor suma que **termina aquí**; si se vuelve negativa, empieza de nuevo.', `actual = max(x, actual + x)\nmejor  = max(mejor, actual)`),
          card('Mover ceros', 'Muchos problemas piden modificar el array "en el sitio" con **dos punteros**: uno lee y otro escribe.'),
        ],
        [
          reto(
            'Kadane: escribe sumaMaximaSubarray(nums): la mayor suma de elementos seguidos (hay al menos un elemento).',
            `function sumaMaximaSubarray(nums) {\n  let actual = nums[0];\n  let mejor = nums[0];\n  \n}`,
            [['sumaMaximaSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])', 6], ['sumaMaximaSubarray([1])', 1], ['sumaMaximaSubarray([-3, -1, -2])', -1], ['sumaMaximaSubarray([5, 4, -1, 7, 8])', 23]],
            `function sumaMaximaSubarray(nums) {\n  let actual = nums[0];\n  let mejor = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    actual = Math.max(nums[i], actual + nums[i]);\n    mejor = Math.max(mejor, actual);\n  }\n  return mejor;\n}`,
            { hint: 'Desde i = 1: actual = Math.max(nums[i], actual + nums[i]); mejor = Math.max(mejor, actual);' }
          ),
          reto(
            'Escribe moverCeros(nums): devuelve el array con todos los ceros al final, manteniendo el orden del resto.',
            `function moverCeros(nums) {\n  \n}`,
            [['moverCeros([0, 1, 0, 3, 12])', [1, 3, 12, 0, 0]], ['moverCeros([0])', [0]], ['moverCeros([1, 2])', [1, 2]]],
            `function moverCeros(nums) {\n  const res = nums.filter((n) => n !== 0);\n  while (res.length < nums.length) res.push(0);\n  return res;\n}`
          ),
          choice('¿Complejidad del algoritmo de Kadane?', ['O(n²)', 'O(n)', 'O(n log n)', 'O(2ⁿ)'], 1),
          choice('En Kadane, ¿cuándo "empiezas de nuevo"?', ['Nunca', 'Cuando la suma acumulada perjudica más que empezar en el elemento actual', 'Cada 2 elementos', 'Al final'], 1),
          choice('"Subarray" significa…', ['Elementos cualesquiera', 'Elementos seguidos (contiguos)', 'Un array ordenado', 'El primer elemento'], 1),
        ]
      ),
      lesson(
        'Búsqueda binaria en entrevistas',
        [
          card('Más allá de buscar un número', 'La búsqueda binaria aparece camuflada: "array ordenado", "encuentra el primer…", "mínimo valor que cumple…". Si ves **ordenado** o una respuesta **monótona** (falso, falso, …, verdadero, verdadero), piensa en binaria.'),
          card('Posición de inserción', 'Variante clásica: ¿en qué índice insertar x para mantener el orden? Es el primer índice cuyo valor es ≥ x.', `[1, 3, 5, 6], x = 5 → 2\n[1, 3, 5, 6], x = 2 → 1\n[1, 3, 5, 6], x = 7 → 4`),
        ],
        [
          reto(
            'Escribe posicionInsercion(nums, x) para un array ordenado: el índice donde está x o donde debería insertarse. En O(log n).',
            `function posicionInsercion(nums, x) {\n  let izq = 0, der = nums.length;\n  \n}`,
            [['posicionInsercion([1, 3, 5, 6], 5)', 2], ['posicionInsercion([1, 3, 5, 6], 2)', 1], ['posicionInsercion([1, 3, 5, 6], 7)', 4], ['posicionInsercion([1, 3, 5, 6], 0)', 0]],
            `function posicionInsercion(nums, x) {\n  let izq = 0, der = nums.length;\n  while (izq < der) {\n    const medio = Math.floor((izq + der) / 2);\n    if (nums[medio] < x) izq = medio + 1;\n    else der = medio;\n  }\n  return izq;\n}`,
            { hint: 'Mientras izq < der: si nums[medio] < x, izq = medio + 1; si no, der = medio. Devuelve izq.' }
          ),
          choice('¿Qué pista sugiere búsqueda binaria?', ['El array está ordenado', 'Hay strings', 'Hay un bucle', 'Hay objetos'], 0),
          choice('¿Cuántos pasos necesita la binaria con 1.000.000 de elementos?', ['~20', '~1.000', '~500.000', '1'], 0),
          fill('Evita el desbordamiento en otros lenguajes', 'medio = izq + Math.floor((der - izq) / ___);', '2', ['2', '10', 'der', '1']),
          choice('Si buscas el PRIMER índice que cumple una condición, cuando medio la cumple…', ['Devuelves medio inmediatamente', 'Guardas medio y sigues buscando a la izquierda', 'Vas a la derecha', 'Paras'], 1),
        ]
      ),
      lesson(
        'Árboles y recursión',
        [
          card('Profundidad de un árbol', 'Pregunta típica: ¿cuál es la altura (profundidad máxima) de un árbol binario? Recursión: `1 + max(profundidad(izq), profundidad(der))`, con `null` → 0.'),
          card('Invertir un árbol', 'Otra clásica: intercambiar izquierda y derecha en todos los nodos. De nuevo, recursión: invierte los hijos y cámbialos de sitio.'),
        ],
        [
          reto(
            'Escribe profundidad(nodo): la profundidad máxima de un árbol binario ({ valor, izq, der }; vacío = null).',
            `function profundidad(nodo) {\n  \n}`,
            [
              ['profundidad(null)', 0],
              ['profundidad({ valor: 1, izq: null, der: null })', 1],
              ['profundidad({ valor: 1, izq: { valor: 2, izq: { valor: 4, izq: null, der: null }, der: null }, der: { valor: 3, izq: null, der: null } })', 3],
            ],
            `function profundidad(nodo) {\n  if (nodo === null) return 0;\n  return 1 + Math.max(profundidad(nodo.izq), profundidad(nodo.der));\n}`
          ),
          reto(
            'Escribe contarHojas(nodo): cuántos nodos no tienen hijos.',
            `function contarHojas(nodo) {\n  \n}`,
            [
              ['contarHojas(null)', 0],
              ['contarHojas({ valor: 1, izq: null, der: null })', 1],
              ['contarHojas({ valor: 1, izq: { valor: 2, izq: null, der: null }, der: { valor: 3, izq: { valor: 4, izq: null, der: null }, der: { valor: 5, izq: null, der: null } } })', 3],
            ],
            `function contarHojas(nodo) {\n  if (nodo === null) return 0;\n  if (nodo.izq === null && nodo.der === null) return 1;\n  return contarHojas(nodo.izq) + contarHojas(nodo.der);\n}`
          ),
          choice('¿Cuál es el caso base habitual en recursión sobre árboles?', ['nodo.valor === 0', 'nodo === null', 'nodo.izq === nodo.der', 'No hay'], 1),
          choice('¿Complejidad de recorrer todos los nodos de un árbol?', ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'], 1),
          choice('Para recorrer un árbol por niveles usas…', ['DFS con recursión', 'BFS con una cola', 'Ordenación', 'Un Set'], 1),
        ]
      ),
    ]),
  ],
};
