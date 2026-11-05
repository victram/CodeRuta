export default {
  id: 'react',
  title: 'React',
  icon: '⚛️',
  color: '#0c8599',
  level: 'Intermedio',
  description: 'Construye interfaces con componentes reutilizables. Recomendado tras JavaScript.',
  units: [
    {
      title: 'Tus primeros componentes',
      description: 'JSX, componentes, props y estado.',
      lessons: [
        {
          title: 'Componentes y JSX',
          theory: [
            {
              title: '¿Qué es React?',
              body: 'React es una **librería de JavaScript** para construir interfaces con **componentes**: piezas reutilizables, como bloques de LEGO (un botón, una tarjeta, un menú…).',
            },
            {
              title: 'Un componente es una función',
              body: 'Un componente es una función que devuelve **JSX**: una mezcla de JavaScript y HTML. Su nombre empieza siempre por **mayúscula**.',
              code: `function Saludo() {\n  return <h1>¡Hola!</h1>;\n}\n\n// Se usa como una etiqueta:\n<Saludo />`,
            },
            {
              title: 'JavaScript dentro de JSX',
              body: 'Usa llaves `{ }` para meter JavaScript dentro del JSX. Y ojo: en lugar de `class` se escribe `className`.',
              code: `const nombre = "Ana";\n\nfunction Tarjeta() {\n  return <p className="tarjeta">Hola, {nombre}</p>;\n}`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué es React?',
              options: ['Un lenguaje de programación', 'Una librería de JavaScript para interfaces', 'Una base de datos', 'Un navegador'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cómo debe empezar el nombre de un componente?',
              options: ['Con minúscula', 'Con mayúscula', 'Con $', 'Con un número'],
              answer: 1,
              explanation: 'React distingue componentes (Boton) de etiquetas HTML normales (button) por la mayúscula.',
            },
            {
              type: 'fill',
              prompt: 'En JSX, ¿cómo se pone una clase CSS?',
              code: '<div ___="tarjeta">Hola</div>',
              answer: 'className',
              options: ['className', 'class', 'css', 'style'],
            },
            {
              type: 'choice',
              prompt: '¿Qué símbolos usas para insertar JavaScript en JSX?',
              options: ['( )', '[ ]', '{ }', '< >'],
              answer: 2,
            },
            {
              type: 'order',
              prompt: 'Ordena el componente',
              lines: ['function Boton() {', '  return <button>Clic</button>;', '}'],
            },
          ],
        },
        {
          title: 'Props',
          theory: [
            {
              title: 'Pasar datos con props',
              body: 'Las **props** son los datos que un componente recibe de su padre, igual que los argumentos de una función.',
              code: `function Saludo({ nombre }) {\n  return <h1>Hola, {nombre}</h1>;\n}\n\n<Saludo nombre="Luis" />  // Hola, Luis\n<Saludo nombre="Eva" />   // Hola, Eva`,
            },
            {
              title: 'Las props son de solo lectura',
              body: 'Un componente **no** debe modificar sus props. Puedes pasar textos, números, arrays, objetos e incluso funciones.',
              code: `<Producto nombre="Teclado" precio={25} enOferta={true} />`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué son las props?',
              options: ['Estilos CSS', 'Datos que un componente recibe de su padre', 'Variables globales', 'Archivos de imagen'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué se muestra en pantalla?',
              code: `function Saludo({ nombre }) {\n  return <p>Hola {nombre}</p>;\n}\n\n<Saludo nombre="Eva" />`,
              options: ['Hola nombre', 'Hola Eva', 'Hola {nombre}', 'Error'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Recibe la prop titulo',
              code: 'function Tarjeta({ ___ }) {\n  return <h2>{titulo}</h2>;\n}',
              answer: 'titulo',
              options: ['titulo', 'props', 'this', 'title'],
            },
            {
              type: 'choice',
              prompt: '¿Puede un componente modificar sus props?',
              options: ['Sí, siempre', 'No, son de solo lectura', 'Solo si son números', 'Solo con CSS'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada concepto con su definición',
              pairs: [
                ['Componente', 'Función que devuelve JSX'],
                ['Props', 'Datos que recibe un componente'],
                ['JSX', 'HTML dentro de JavaScript'],
                ['{ }', 'Insertar JavaScript'],
              ],
            },
          ],
        },
        {
          title: 'Estado con useState',
          theory: [
            {
              title: 'La memoria de un componente',
              body: 'El **estado** es la memoria de un componente. `useState` devuelve el valor actual y una función para cambiarlo.\n\nCuando el estado cambia, React **vuelve a dibujar** el componente automáticamente.',
              code: `import { useState } from "react";\n\nfunction Contador() {\n  const [cuenta, setCuenta] = useState(0);\n\n  return (\n    <button onClick={() => setCuenta(cuenta + 1)}>\n      Clics: {cuenta}\n    </button>\n  );\n}`,
            },
            {
              title: 'Eventos',
              body: 'Los eventos (`onClick`, `onChange`, `onSubmit`…) se escriben en **camelCase** y reciben una función.',
              code: `<input onChange={(e) => setNombre(e.target.value)} />`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué devuelve useState?',
              options: ['Solo el valor', 'Un array con el valor y una función para cambiarlo', 'Un elemento HTML', 'Nada'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Completa con el nombre habitual del setter',
              code: 'const [color, ___] = useState("rojo");',
              answer: 'setColor',
              options: ['setColor', 'changeColor', 'color2', 'useColor'],
              explanation: 'Por convención, la función se llama set + nombre del estado.',
            },
            {
              type: 'choice',
              prompt: '¿Qué pasa cuando cambia el estado?',
              options: ['Nada', 'React vuelve a dibujar el componente', 'Se recarga la página', 'Se borra el componente'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cómo se escribe el evento de clic en React?',
              options: ['onclick', 'onClick', 'on-click', 'click'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'El usuario pulsa el botón una vez. ¿Cuánto vale n?',
              code: `const [n, setN] = useState(5);\n\n<button onClick={() => setN(n * 2)}>x2</button>`,
              options: ['5', '7', '10', '25'],
              answer: 2,
            },
          ],
        },
      ],
    },
    {
      title: 'Listas, formularios y efectos',
      description: 'Pinta listas de datos, maneja formularios y carga datos de una API.',
      lessons: [
        {
          title: 'Renderizar listas',
          theory: [
            {
              title: 'map dentro de JSX',
              body: 'Para mostrar una lista, transforma el array en elementos JSX con `map`.',
              code: `const frutas = ["Manzana", "Pera", "Uva"];\n\nfunction Lista() {\n  return (\n    <ul>\n      {frutas.map((f) => (\n        <li key={f}>{f}</li>\n      ))}\n    </ul>\n  );\n}`,
            },
            {
              title: 'La prop key',
              body: 'Cada elemento de una lista necesita una `key` **única y estable** (normalmente un id). React la usa para saber qué elemento cambió. Evita usar el índice si la lista puede reordenarse.',
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué método de array se usa para pintar listas en React?',
              options: ['forEach', 'map', 'filter', 'push'],
              answer: 1,
              explanation: 'map devuelve un array nuevo de elementos JSX; forEach no devuelve nada.',
            },
            {
              type: 'fill',
              prompt: 'Añade la prop que identifica cada elemento',
              code: '{tareas.map((t) => <li ___={t.id}>{t.texto}</li>)}',
              answer: 'key',
              options: ['key', 'id', 'index', 'name'],
            },
            {
              type: 'choice',
              prompt: '¿Cómo debe ser una key?',
              options: ['Aleatoria en cada render', 'Única y estable', 'Siempre 0', 'Un texto largo'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cuántos <li> se pintan?',
              code: `const nums = [1, 2, 3, 4];\n<ul>{nums.filter((n) => n > 2).map((n) => <li key={n}>{n}</li>)}</ul>`,
              options: ['2', '3', '4', '0'],
              answer: 0,
            },
            {
              type: 'order',
              prompt: 'Ordena la lista',
              lines: ['<ul>', '  {nombres.map((n) => <li key={n}>{n}</li>)}', '</ul>'],
            },
          ],
        },
        {
          title: 'Condicionales y formularios',
          theory: [
            {
              title: 'Mostrar u ocultar',
              body: '- `condición && <Algo />`: muestra solo si es verdad\n- `condición ? <A /> : <B />`: elige entre dos',
              code: `{logueado ? <p>Hola</p> : <button>Entrar</button>}\n{errores > 0 && <p>Hay {errores} errores</p>}`,
            },
            {
              title: 'Inputs controlados',
              body: 'Un input **controlado** guarda su valor en el estado: `value` lee el estado y `onChange` lo actualiza.',
              code: `const [texto, setTexto] = useState("");\n\n<input\n  value={texto}\n  onChange={(e) => setTexto(e.target.value)}\n/>`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué se muestra si logueado es false?',
              code: `{logueado ? <p>Bienvenido</p> : <p>Inicia sesión</p>}`,
              options: ['Bienvenido', 'Inicia sesión', 'Nada', 'Los dos'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Muestra el aviso solo si hay error',
              code: '{hayError ___ <p>Algo salió mal</p>}',
              answer: '&&',
              options: ['&&', '||', '??', '=>'],
            },
            {
              type: 'choice',
              prompt: '¿Dónde está el texto escrito en el evento onChange?',
              options: ['e.value', 'e.target.value', 'e.text', 'this.value'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué es un input controlado?',
              options: ['Un input deshabilitado', 'Un input cuyo valor vive en el estado de React', 'Un input con validación', 'Un input sin onChange'],
              answer: 1,
            },
            {
              type: 'match',
              prompt: 'Une cada parte con su función',
              pairs: [
                ['value', 'Lee el estado'],
                ['onChange', 'Actualiza el estado'],
                ['&&', 'Mostrar si es verdad'],
                ['? :', 'Elegir entre dos'],
              ],
            },
          ],
        },
        {
          title: 'useEffect y datos de una API',
          theory: [
            {
              title: 'Efectos',
              body: '`useEffect` ejecuta código **después** de pintar el componente: cargar datos, temporizadores, suscripciones…\n\nEl array del final son las **dependencias**: el efecto se repite cuando cambian. Con `[]` se ejecuta solo una vez al montar.',
              code: `useEffect(() => {\n  document.title = "Tienes " + n + " mensajes";\n}, [n]);`,
            },
            {
              title: 'Cargar datos',
              body: 'El patrón típico: un estado para los datos, y un efecto que hace `fetch` y guarda el resultado.',
              code: `const [libros, setLibros] = useState([]);\n\nuseEffect(() => {\n  fetch("/api/libros")\n    .then((res) => res.json())\n    .then(setLibros);\n}, []);`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Cuándo se ejecuta un efecto con dependencias []?',
              options: ['En cada render', 'Solo una vez, al montar', 'Nunca', 'Al hacer clic'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Importa el hook de efectos',
              code: 'import { useState, ___ } from "react";',
              answer: 'useEffect',
              options: ['useEffect', 'useFetch', 'useData', 'effect'],
            },
            {
              type: 'choice',
              prompt: 'Con dependencias [id], ¿cuándo se repite el efecto?',
              options: ['Nunca', 'Cada vez que cambia id', 'Cada segundo', 'Solo al desmontar'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Para qué se usa habitualmente useEffect?',
              options: ['Dar estilos', 'Cargar datos de una API', 'Crear componentes', 'Definir props'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena el efecto que carga datos',
              lines: ['useEffect(() => {', '  fetch("/api/notas")', '    .then((r) => r.json())', '    .then(setNotas);', '}, []);'],
            },
          ],
        },
      ],
    },
  ],
};
