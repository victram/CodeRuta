import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'algoritmos',
  title: 'Algoritmos',
  icon: '⚙️',
  color: '#5c940d',
  level: 'Intermedio',
  description: 'Big O, búsqueda, ordenación, recursión y programación dinámica. Con retos en JavaScript.',
  units: [
    unit('Fundamentos', 'Complejidad, búsqueda y ordenación.', [
      lesson(
        'Complejidad: Big O',
        [
          card('¿Cuánto tarda si hay más datos?', 'La notación **Big O** describe cómo crece el tiempo (o la memoria) de un algoritmo cuando crecen los datos (**n**). No mide segundos, mide **tendencia**.', `// O(1): no depende de n\narr[0];\n\n// O(n): una vuelta por elemento\nfor (const x of arr) { }\n\n// O(n²): bucle dentro de bucle\nfor (const a of arr) for (const b of arr) { }`),
          card('Las más comunes', 'De mejor a peor:\n\n- `O(1)` constante\n- `O(log n)` logarítmica (búsqueda binaria)\n- `O(n)` lineal\n- `O(n log n)` (buenas ordenaciones)\n- `O(n²)` cuadrática\n- `O(2ⁿ)` exponencial (¡muy lenta!)'),
        ],
        [
          choice('¿Qué complejidad tiene un bucle que recorre el array una vez?', ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'], 1),
          choice('¿Y dos bucles anidados sobre el mismo array?', ['O(n)', 'O(2n)', 'O(n²)', 'O(log n)'], 2),
          order('Ordena de más rápida a más lenta', ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)']),
          choice('¿Qué complejidad tiene?', ['O(n)', 'O(1)', 'O(n²)', 'O(log n)'], 1, { code: `function primero(arr) {\n  return arr[0];\n}` }),
          match('Une cada algoritmo con su complejidad', [['Búsqueda binaria', 'O(log n)'], ['Recorrer una lista', 'O(n)'], ['Merge sort', 'O(n log n)'], ['Comparar todos con todos', 'O(n²)']]),
        ]
      ),
      lesson(
        'Búsqueda',
        [
          card('Búsqueda lineal', 'Mira los elementos uno a uno hasta encontrarlo: **O(n)**. Funciona con cualquier array, ordenado o no.'),
          card('Búsqueda binaria', 'Si el array está **ordenado**, mira el centro: si buscas algo menor, descarta la mitad derecha; si es mayor, la izquierda. Repite. ¡Con 1.000.000 de elementos basta con ~20 pasos! **O(log n)**.', `// buscar 7 en [1, 3, 5, 7, 9, 11]\n// centro = 5 → 7 es mayor → quedan [7, 9, 11]\n// centro = 9 → 7 es menor → queda [7] ✅`),
        ],
        [
          choice('¿Qué requisito tiene la búsqueda binaria?', ['Que el array sea pequeño', 'Que el array esté ordenado', 'Que no haya números', 'Ninguno'], 1),
          choice('Con 1.000 elementos ordenados, ¿cuántos pasos necesita como máximo la búsqueda binaria?', ['1.000', '500', 'Unos 10', '1'], 2, { explanation: '2¹⁰ = 1024, así que ~10 divisiones a la mitad bastan.' }),
          reto(
            'Escribe busquedaBinaria(arr, x) para un array ordenado: devuelve la posición de x o -1 si no está.',
            `function busquedaBinaria(arr, x) {\n  let izq = 0;\n  let der = arr.length - 1;\n  // mientras izq <= der...\n}`,
            [['busquedaBinaria([1, 3, 5, 7, 9], 7)', 3], ['busquedaBinaria([1, 3, 5, 7, 9], 1)', 0], ['busquedaBinaria([1, 3, 5, 7, 9], 4)', -1], ['busquedaBinaria([], 5)', -1]],
            `function busquedaBinaria(arr, x) {\n  let izq = 0;\n  let der = arr.length - 1;\n  while (izq <= der) {\n    const medio = Math.floor((izq + der) / 2);\n    if (arr[medio] === x) return medio;\n    if (arr[medio] < x) izq = medio + 1;\n    else der = medio - 1;\n  }\n  return -1;\n}`,
            { hint: 'const medio = Math.floor((izq + der) / 2); si arr[medio] < x, izq = medio + 1; si no, der = medio - 1.' }
          ),
          fill('Calcula el índice central', 'const medio = Math.___((izq + der) / 2);', 'floor', ['floor', 'random', 'sqrt', 'abs']),
          choice('¿Complejidad de la búsqueda lineal?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 2),
        ]
      ),
      lesson(
        'Ordenación',
        [
          card('Algoritmos clásicos', '- **Burbuja**: intercambia vecinos desordenados una y otra vez. Fácil pero **O(n²)**.\n- **Merge sort**: divide en mitades, ordena y mezcla. **O(n log n)**.\n- **Quick sort**: elige un pivote y separa menores y mayores. **O(n log n)** de media.'),
          card('Cuidado con sort() en JavaScript', '`sort()` sin argumentos ordena como **texto**. Para números, pasa una función de comparación.', `[10, 9, 2].sort();               // [10, 2, 9] 😱\n[10, 9, 2].sort((a, b) => a - b); // [2, 9, 10] ✅`),
        ],
        [
          choice('¿Qué devuelve [10, 1, 5].sort() en JavaScript?', ['[1, 5, 10]', '[1, 10, 5]', '[10, 5, 1]', 'Error'], 1, { explanation: 'Sin función de comparación compara como texto: "1" < "10" < "5".' }),
          fill('Ordena números de menor a mayor', 'nums.sort((a, b) => a ___ b);', '-', ['-', '+', '>', '<']),
          match('Une cada algoritmo con su complejidad', [['Burbuja', 'O(n²)'], ['Merge sort', 'O(n log n)'], ['Quick sort (media)', 'O(n log n)'], ['Búsqueda binaria', 'O(log n)']]),
          reto(
            'Implementa ordenarBurbuja(arr): devuelve el array ordenado de menor a mayor sin usar .sort().',
            `function ordenarBurbuja(arr) {\n  const a = [...arr]; // copia\n  // dos bucles: si a[j] > a[j + 1], intercámbialos\n  return a;\n}`,
            [['ordenarBurbuja([3, 1, 2])', [1, 2, 3]], ['ordenarBurbuja([5, 4, 3, 2, 1])', [1, 2, 3, 4, 5]], ['ordenarBurbuja([])', []], ['ordenarBurbuja([10, 2, 33, 4])', [2, 4, 10, 33]]],
            `function ordenarBurbuja(arr) {\n  const a = [...arr];\n  for (let i = 0; i < a.length; i++) {\n    for (let j = 0; j < a.length - 1 - i; j++) {\n      if (a[j] > a[j + 1]) {\n        [a[j], a[j + 1]] = [a[j + 1], a[j]];\n      }\n    }\n  }\n  return a;\n}`,
            { hint: 'Para intercambiar: [a[j], a[j + 1]] = [a[j + 1], a[j]];' }
          ),
          choice('¿Qué idea usa merge sort?', ['Buscar el máximo', 'Dividir en mitades, ordenar y mezclar', 'Intercambiar vecinos', 'Usar un hash map'], 1),
        ]
      ),
    ]),
    unit('Técnicas', 'Recursión, dos punteros, ventana deslizante y programación dinámica.', [
      lesson(
        'Recursión',
        [
          card('Una función que se llama a sí misma', 'Una función **recursiva** resuelve un problema llamándose con un problema **más pequeño**. Siempre necesita un **caso base** que pare; si no, desborda la pila (*stack overflow*).', `function cuentaAtras(n) {\n  if (n === 0) return;     // caso base\n  console.log(n);\n  cuentaAtras(n - 1);       // problema más pequeño\n}`),
          card('Pensar en recursivo', '1. ¿Cuál es el caso más simple? (caso base)\n2. Si supiera resolver el problema para n - 1, ¿cómo resuelvo n?', `// factorial(4) = 4 * factorial(3)\n//              = 4 * 3 * factorial(2) ...`),
        ],
        [
          choice('¿Qué pasa si una función recursiva no tiene caso base?', ['Devuelve 0', 'Se llama infinitamente y desborda la pila', 'Nada', 'Se optimiza sola'], 1),
          reto(
            'Escribe factorial(n) de forma recursiva. factorial(0) = 1 y factorial(n) = n × factorial(n − 1).',
            `function factorial(n) {\n  // caso base\n  // caso recursivo\n}`,
            [['factorial(0)', 1], ['factorial(1)', 1], ['factorial(5)', 120], ['factorial(10)', 3628800]],
            `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`
          ),
          choice('¿Qué devuelve?', ['10', '15', '5', '0'], 1, { code: `function suma(n) {\n  if (n === 0) return 0;\n  return n + suma(n - 1);\n}\nsuma(5);` }),
          fill('Caso base de la potencia', 'function potencia(b, e) {\n  if (e === 0) return ___;\n  return b * potencia(b, e - 1);\n}', '1', ['1', '0', 'b', 'e']),
          choice('¿Qué estructuras se recorren de forma natural con recursión?', ['Árboles', 'Variables', 'Strings vacíos', 'Booleanos'], 0),
        ]
      ),
      lesson(
        'Dos punteros y ventana deslizante',
        [
          card('Dos punteros', 'Usa dos índices que se mueven por el array (por ejemplo uno desde cada extremo). Convierte muchos problemas **O(n²)** en **O(n)**.', `// ¿Es palíndromo?\nlet i = 0, j = s.length - 1;\nwhile (i < j) {\n  if (s[i] !== s[j]) return false;\n  i++; j--;\n}\nreturn true;`),
          card('Ventana deslizante', 'Para problemas de "subarray de tamaño k": en vez de recalcular la suma entera, **suma el que entra y resta el que sale**.', `// suma de cada ventana de 3: [1, 2, 3, 4, 5]\n// [1,2,3] = 6 → +4 −1 → [2,3,4] = 9 → +5 −2 → [3,4,5] = 12`),
        ],
        [
          choice('¿Qué mejora suele aportar la técnica de dos punteros?', ['De O(1) a O(n)', 'De O(n²) a O(n)', 'Ninguna', 'Ordena el array'], 1),
          reto(
            'Escribe sumaMaxima(arr, k): la mayor suma de k elementos SEGUIDOS. Usa una ventana deslizante.',
            `function sumaMaxima(arr, k) {\n  // 1. suma los primeros k\n  // 2. desliza: suma el que entra y resta el que sale\n}`,
            [['sumaMaxima([1, 2, 3, 4, 5], 2)', 9], ['sumaMaxima([5, 1, 1, 5], 2)', 6], ['sumaMaxima([4, -1, 2, 1], 3)', 5], ['sumaMaxima([7], 1)', 7]],
            `function sumaMaxima(arr, k) {\n  let suma = 0;\n  for (let i = 0; i < k; i++) suma += arr[i];\n  let max = suma;\n  for (let i = k; i < arr.length; i++) {\n    suma += arr[i] - arr[i - k];\n    max = Math.max(max, suma);\n  }\n  return max;\n}`,
            { hint: 'Dentro del bucle desde i = k: suma += arr[i] - arr[i - k]; y guarda el máximo.' }
          ),
          choice('En la ventana deslizante, al avanzar una posición…', ['Se recalcula todo', 'Se suma el que entra y se resta el que sale', 'Se ordena', 'Se duplica la ventana'], 1),
          choice('¿Qué complejidad tiene la ventana deslizante?', ['O(n²)', 'O(n·k)', 'O(n)', 'O(log n)'], 2),
          choice('Para comprobar un palíndromo con dos punteros, empiezan…', ['Los dos al principio', 'Uno en cada extremo', 'En el centro', 'Al azar'], 1),
        ]
      ),
      lesson(
        'Programación dinámica',
        [
          card('No repitas trabajo', 'La **programación dinámica** resuelve problemas que se dividen en **subproblemas repetidos**, guardando cada resultado para no calcularlo dos veces.\n\nEjemplo: Fibonacci recursivo ingenuo es **O(2ⁿ)**; guardando resultados es **O(n)**.', `// ❌ lento: recalcula lo mismo miles de veces\nfunction fib(n) {\n  if (n < 2) return n;\n  return fib(n - 1) + fib(n - 2);\n}`),
          card('Memoización y tabulación', '- **Memoización**: recursión + caché de resultados\n- **Tabulación**: rellenar una tabla de abajo arriba con un bucle', `function fib(n) {\n  const t = [0, 1];\n  for (let i = 2; i <= n; i++) t[i] = t[i - 1] + t[i - 2];\n  return t[n];\n}`),
        ],
        [
          choice('¿Cuál es la idea clave de la programación dinámica?', ['Usar muchos bucles', 'Guardar resultados de subproblemas para no repetirlos', 'Ordenar primero', 'Usar recursión siempre'], 1),
          match('Une cada técnica', [['Memoización', 'Recursión + caché'], ['Tabulación', 'Tabla rellenada con un bucle'], ['Fibonacci ingenuo', 'O(2ⁿ)'], ['Fibonacci con DP', 'O(n)']]),
          reto(
            'Una escalera tiene n peldaños y puedes subir 1 o 2 cada vez. Escribe formas(n): ¿de cuántas maneras puedes llegar arriba? ¡Ojo: formas(45) debe ser rápido!',
            `function formas(n) {\n  // formas(1) = 1, formas(2) = 2\n  // formas(n) = formas(n - 1) + formas(n - 2)\n}`,
            [['formas(1)', 1], ['formas(2)', 2], ['formas(3)', 3], ['formas(5)', 8], ['formas(45)', 1836311903]],
            `function formas(n) {\n  if (n <= 2) return n;\n  let a = 1, b = 2;\n  for (let i = 3; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}`,
            { hint: 'La versión recursiva directa tarda demasiado con 45. Usa un bucle guardando solo los dos últimos valores.', explanation: 'Es Fibonacci disfrazado: para llegar al peldaño n vienes del n−1 o del n−2.' }
          ),
          choice('¿Por qué el Fibonacci recursivo ingenuo es tan lento?', ['Porque usa sumas', 'Porque recalcula los mismos valores muchísimas veces', 'Porque JavaScript es lento', 'No es lento'], 1),
          fill('Guarda el resultado en la caché', 'memo[n] = resultado;\nreturn memo[___];', 'n', ['n', '0', 'resultado', 'memo']),
        ]
      ),
    ]),
  ],
};
