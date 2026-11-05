import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'estructuras',
  title: 'Estructuras de datos',
  icon: '🧱',
  color: '#0b7285',
  level: 'Intermedio',
  description: 'Arrays, pilas, colas, listas, hash maps, árboles y grafos. Con retos en JavaScript.',
  units: [
    unit('Estructuras lineales', 'Arrays, strings, pilas, colas y listas enlazadas.', [
      lesson(
        'Arrays y strings',
        [
          card('Memoria contigua', 'Un **array** guarda los elementos seguidos en memoria. Por eso:\n\n- Leer `arr[i]` es instantáneo: **O(1)**\n- Insertar o borrar al principio o en medio obliga a mover todo lo demás: **O(n)**\n- Añadir al final (`push`) suele ser **O(1)**', `const a = [10, 20, 30];\na[1];        // O(1) → 20\na.push(40);  // O(1)\na.unshift(5); // O(n): mueve todos`),
          card('Strings', 'Un string es como un array de caracteres, pero **inmutable** en JavaScript: cada cambio crea uno nuevo. Para construir textos largos, junta las partes en un array y usa `join`.', `"hola"[0];          // "h"\n"hola".split("");   // ["h","o","l","a"]\n["a","b"].join("-"); // "a-b"`),
        ],
        [
          choice('¿Cuánto cuesta leer arr[500] en un array?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0),
          choice('¿Qué operación es O(n) en un array?', ['arr[3]', 'arr.push(x)', 'arr.unshift(x) (insertar al principio)', 'arr.length'], 2),
          fill('Convierte un string en array de letras', '"abc".___("")', 'split', ['split', 'join', 'chars', 'explode']),
          reto(
            'Escribe invertir(arr), que devuelva un array NUEVO con los elementos al revés, sin usar .reverse().',
            `function invertir(arr) {\n  // tu código aquí\n}`,
            [['invertir([1, 2, 3])', [3, 2, 1]], ['invertir(["a", "b"])', ['b', 'a']], ['invertir([])', []]],
            `function invertir(arr) {\n  const res = [];\n  for (let i = arr.length - 1; i >= 0; i--) {\n    res.push(arr[i]);\n  }\n  return res;\n}`,
            { hint: 'Recorre el array desde el final (i = arr.length - 1) hasta 0 y haz push en un array nuevo.' }
          ),
          match('Une cada operación con su coste', [['Leer arr[i]', 'O(1)'], ['Buscar un valor sin orden', 'O(n)'], ['push al final', 'O(1)'], ['Insertar al principio', 'O(n)']]),
        ]
      ),
      lesson(
        'Pilas y colas',
        [
          card('Pila (stack): LIFO', 'El **último** en entrar es el **primero** en salir, como una pila de platos. Ejemplos: el botón "deshacer", el historial del navegador, la pila de llamadas de funciones.', `const pila = [];\npila.push(1);\npila.push(2);\npila.pop();   // 2 (el último)`),
          card('Cola (queue): FIFO', 'El **primero** en entrar es el **primero** en salir, como la cola del súper. Ejemplos: tareas pendientes, peticiones a un servidor, impresión.', `const cola = [];\ncola.push("Ana");\ncola.push("Leo");\ncola.shift();  // "Ana" (el primero)`),
        ],
        [
          match('Une cada estructura con su regla', [['Pila', 'LIFO: último en entrar, primero en salir'], ['Cola', 'FIFO: primero en entrar, primero en salir'], ['push', 'Añadir al final'], ['pop', 'Sacar el último']]),
          choice('El botón "Deshacer" de un editor usa…', ['Una cola', 'Una pila', 'Un árbol', 'Un grafo'], 1),
          choice('¿Qué devuelve el último pop?', ['"a"', '"b"', '"c"', 'undefined'], 2, { code: `const p = [];\np.push("a"); p.push("b"); p.push("c");\np.pop();` }),
          fill('Saca el primero de la cola', 'const siguiente = cola.___();', 'shift', ['shift', 'pop', 'first', 'dequeue']),
          reto(
            'Usa una pila para escribir invertirTexto(s), que devuelva el texto al revés.',
            `function invertirTexto(s) {\n  const pila = [];\n  // 1. mete cada letra en la pila\n  // 2. sácalas con pop y júntalas\n}`,
            [['invertirTexto("hola")', 'aloh'], ['invertirTexto("ab")', 'ba'], ['invertirTexto("")', '']],
            `function invertirTexto(s) {\n  const pila = [];\n  for (const letra of s) pila.push(letra);\n  let res = "";\n  while (pila.length > 0) res += pila.pop();\n  return res;\n}`,
            { hint: 'for (const letra of s) pila.push(letra); y luego while (pila.length > 0) res += pila.pop();' }
          ),
        ]
      ),
      lesson(
        'Listas enlazadas',
        [
          card('Nodos encadenados', 'Una **lista enlazada** es una cadena de **nodos**. Cada nodo guarda un valor y una referencia al **siguiente**. El último apunta a `null`.\n\n- Insertar al principio: **O(1)**\n- Acceder al elemento i: **O(n)** (hay que recorrer)', `const lista = {\n  valor: 1,\n  siguiente: { valor: 2, siguiente: { valor: 3, siguiente: null } },\n};`),
          card('Recorrer una lista', 'Usa un puntero `actual` que avanza nodo a nodo hasta llegar a `null`.', `let actual = lista;\nwhile (actual !== null) {\n  console.log(actual.valor);\n  actual = actual.siguiente;\n}`),
        ],
        [
          choice('¿Qué guarda cada nodo de una lista enlazada?', ['Solo un valor', 'Un valor y una referencia al siguiente nodo', 'Un índice', 'Toda la lista'], 1),
          choice('¿Cuánto cuesta acceder al elemento 100 de una lista enlazada?', ['O(1)', 'O(n)', 'O(log n)', 'Imposible'], 1),
          choice('¿Ventaja de la lista enlazada frente al array?', ['Acceso por índice más rápido', 'Insertar al principio en O(1)', 'Ocupa menos memoria siempre', 'Se ordena sola'], 1),
          fill('Avanza al siguiente nodo', 'actual = actual.___;', 'siguiente', ['siguiente', 'proximo', 'valor', 'nodo']),
          reto(
            'Escribe longitud(lista), que cuente los nodos de una lista enlazada (null es una lista vacía).',
            `function longitud(lista) {\n  // recorre con un puntero "actual"\n}`,
            [
              ['longitud(null)', 0],
              ['longitud({ valor: 1, siguiente: null })', 1],
              ['longitud({ valor: 1, siguiente: { valor: 2, siguiente: { valor: 3, siguiente: null } } })', 3],
            ],
            `function longitud(lista) {\n  let n = 0;\n  let actual = lista;\n  while (actual !== null) {\n    n++;\n    actual = actual.siguiente;\n  }\n  return n;\n}`
          ),
        ]
      ),
    ]),
    unit('Estructuras avanzadas', 'Hash maps, sets, árboles, grafos y heaps.', [
      lesson(
        'Hash maps y sets',
        [
          card('Búsquedas instantáneas', 'Un **hash map** (en JS `Map` u objeto) guarda pares clave → valor. Buscar, insertar y borrar son **O(1)** de media. Es la estructura más usada en entrevistas.', `const edades = new Map();\nedades.set("Ana", 30);\nedades.get("Ana");  // 30\nedades.has("Leo");  // false`),
          card('Set', 'Un **Set** guarda valores **sin repetir**, con `has` en O(1). Perfecto para eliminar duplicados o comprobar "¿ya lo he visto?".', `const s = new Set([1, 2, 2, 3]);\ns.size;    // 3\ns.has(2);  // true\n[...new Set([1, 1, 2])]; // [1, 2]`),
        ],
        [
          choice('¿Cuánto cuesta buscar una clave en un hash map (de media)?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0),
          choice('¿Qué devuelve s.size?', ['4', '3', '2', '5'], 2, { code: `const s = new Set(["a", "b", "a", "b"]);` }),
          fill('Comprueba si existe la clave', 'if (mapa.___("clave")) { ... }', 'has', ['has', 'contains', 'exists', 'includes']),
          reto(
            'Escribe contarPalabras(texto): devuelve un objeto con cuántas veces aparece cada palabra (separadas por espacios).',
            `function contarPalabras(texto) {\n  const conteo = {};\n  // tu código aquí\n  return conteo;\n}`,
            [['contarPalabras("a b a")', { a: 2, b: 1 }], ['contarPalabras("hola")', { hola: 1 }], ['contarPalabras("x x x")', { x: 3 }]],
            `function contarPalabras(texto) {\n  const conteo = {};\n  for (const p of texto.split(" ")) {\n    conteo[p] = (conteo[p] || 0) + 1;\n  }\n  return conteo;\n}`,
            { hint: 'conteo[p] = (conteo[p] || 0) + 1;' }
          ),
          choice('Para eliminar duplicados de un array, lo más simple es…', ['Ordenarlo', 'Un Set', 'Una pila', 'Un bucle while infinito'], 1),
        ]
      ),
      lesson(
        'Árboles',
        [
          card('Jerarquías', 'Un **árbol** tiene una **raíz** y cada nodo tiene **hijos**. Los nodos sin hijos son **hojas**. Ejemplos: carpetas del ordenador, el DOM de HTML, organigramas.\n\nEn un **árbol binario** cada nodo tiene como mucho 2 hijos: izquierdo y derecho.', `const arbol = {\n  valor: 5,\n  izq: { valor: 3, izq: null, der: null },\n  der: { valor: 8, izq: null, der: null },\n};`),
          card('Árbol binario de búsqueda (BST)', 'En un **BST**, todo lo de la izquierda es **menor** y todo lo de la derecha es **mayor**. Buscar cuesta **O(log n)** si está equilibrado.\n\nLos árboles se recorren de forma natural con **recursión**.', `function buscar(nodo, x) {\n  if (nodo === null) return false;\n  if (x === nodo.valor) return true;\n  return x < nodo.valor ? buscar(nodo.izq, x) : buscar(nodo.der, x);\n}`),
        ],
        [
          match('Une cada término', [['Raíz', 'Nodo superior'], ['Hoja', 'Nodo sin hijos'], ['Árbol binario', 'Máximo 2 hijos por nodo'], ['BST', 'Izquierda menor, derecha mayor']]),
          choice('En un BST con raíz 10, ¿dónde va el 4?', ['A la derecha', 'A la izquierda', 'Es la nueva raíz', 'No se puede'], 1),
          choice('¿Qué estructura de HTML es un árbol?', ['El CSS', 'El DOM', 'Las cookies', 'El localStorage'], 1),
          reto(
            'Escribe sumaArbol(nodo), que sume todos los valores de un árbol binario. Un nodo vacío es null. (Pista: recursión.)',
            `function sumaArbol(nodo) {\n  // caso base: si nodo es null...\n}`,
            [
              ['sumaArbol(null)', 0],
              ['sumaArbol({ valor: 5, izq: null, der: null })', 5],
              ['sumaArbol({ valor: 5, izq: { valor: 3, izq: null, der: null }, der: { valor: 8, izq: { valor: 1, izq: null, der: null }, der: null } })', 17],
            ],
            `function sumaArbol(nodo) {\n  if (nodo === null) return 0;\n  return nodo.valor + sumaArbol(nodo.izq) + sumaArbol(nodo.der);\n}`,
            { hint: 'return nodo.valor + sumaArbol(nodo.izq) + sumaArbol(nodo.der);' }
          ),
          choice('¿Cuánto cuesta buscar en un BST equilibrado?', ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], 1),
        ]
      ),
      lesson(
        'Grafos y heaps',
        [
          card('Grafos', 'Un **grafo** son **nodos** conectados por **aristas**. Ejemplos: redes sociales, mapas, enlaces entre webs. Se suele guardar como **lista de adyacencia**.\n\n- **BFS** (anchura): explora por niveles, usa una **cola**. Encuentra el camino más corto.\n- **DFS** (profundidad): va hasta el fondo, usa una **pila** o recursión.', `const grafo = {\n  A: ["B", "C"],\n  B: ["D"],\n  C: ["D"],\n  D: [],\n};`),
          card('Heap (montículo)', 'Un **heap** da siempre el elemento **mínimo** (o máximo) en O(1) y lo saca en O(log n). Se usa para **colas de prioridad**: urgencias de un hospital, tareas por importancia, el algoritmo de Dijkstra.'),
        ],
        [
          match('Une cada concepto', [['BFS', 'Explora por niveles con una cola'], ['DFS', 'Va en profundidad con pila o recursión'], ['Arista', 'Conexión entre dos nodos'], ['Heap', 'Cola de prioridad']]),
          choice('Para encontrar el camino más corto en un grafo sin pesos usas…', ['DFS', 'BFS', 'Ordenación burbuja', 'Un Set'], 1),
          choice('Una red social (amigos) se representa mejor con…', ['Un array', 'Un grafo', 'Una pila', 'Un string'], 1),
          reto(
            'Escribe alcanzables(grafo, inicio): cuántos nodos se pueden visitar desde inicio (incluido él mismo). Usa BFS con una cola y un Set de visitados.',
            `function alcanzables(grafo, inicio) {\n  const visitados = new Set([inicio]);\n  const cola = [inicio];\n  // mientras haya nodos en la cola...\n}`,
            [
              ['alcanzables({ A: ["B"], B: ["C"], C: [] }, "A")', 3],
              ['alcanzables({ A: ["B"], B: [], C: ["A"] }, "A")', 2],
              ['alcanzables({ A: ["B"], B: ["A"] }, "B")', 2],
            ],
            `function alcanzables(grafo, inicio) {\n  const visitados = new Set([inicio]);\n  const cola = [inicio];\n  while (cola.length > 0) {\n    const nodo = cola.shift();\n    for (const vecino of grafo[nodo]) {\n      if (!visitados.has(vecino)) {\n        visitados.add(vecino);\n        cola.push(vecino);\n      }\n    }\n  }\n  return visitados.size;\n}`,
            { hint: 'Saca un nodo con cola.shift(), recorre grafo[nodo] y añade a la cola los vecinos no visitados.', explanation: 'El Set evita visitar dos veces el mismo nodo y entrar en bucles cuando hay ciclos.' }
          ),
          choice('¿Para qué sirve el Set de visitados en BFS?', ['Ordenar', 'No repetir nodos ni entrar en bucles', 'Contar aristas', 'Nada'], 1),
        ]
      ),
    ]),
  ],
};
