import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ia-programar',
  title: 'Programar con IA',
  icon: '🧑‍💻',
  color: '#5f3dc4',
  level: 'Intermedio',
  description: 'Prompts que funcionan, asistentes de código y apps con APIs de IA, RAG y agentes.',
  units: [
    unit('Prompting y asistentes', 'Escribir buenos prompts y programar con ayuda de la IA.', [
      lesson(
        'Anatomía de un buen prompt',
        [
          card('Sé específico', 'Un buen prompt deja poco margen a la interpretación. Incluye:\n\n- **Rol / contexto**: quién eres y para qué lo necesitas\n- **Tarea**: qué quieres exactamente\n- **Datos**: el texto o código sobre el que trabajar\n- **Formato**: cómo quieres la respuesta (lista, tabla, JSON, nº de palabras)\n- **Restricciones**: qué evitar', `❌ "Hazme un texto de mi tienda"\n\n✅ "Soy dueña de una tienda online de cerámica artesanal.\nEscribe 3 descripciones de producto (máx. 60 palabras cada una)\npara tazas hechas a mano, con tono cercano, en español,\ny termina cada una con una llamada a la acción."`),
          card('Delimitadores', 'Separa claramente instrucciones y datos con etiquetas o comillas, para que el modelo no confunda el texto a procesar con órdenes.', `Resume el siguiente correo en 2 frases:\n<correo>\n...\n</correo>`),
        ],
        [
          choice('¿Qué prompt dará mejor resultado?', ['"Escribe algo de marketing"', '"Escribe 3 asuntos de email (máx. 8 palabras) para anunciar un 20 % de descuento en zapatillas, tono juvenil"', '"Marketing zapatillas"', '"Ayuda"'], 1),
          match('Une cada parte del prompt', [['Contexto', 'Para quién y para qué'], ['Tarea', 'Qué hacer exactamente'], ['Formato', 'Cómo entregar la respuesta'], ['Restricciones', 'Qué evitar']]),
          choice('¿Para qué sirven los delimitadores como <texto>…</texto>?', ['Para decorar', 'Para separar instrucciones de los datos a procesar', 'Para cifrar', 'No sirven'], 1),
          order('Ordena un prompt claro', ['Contexto: soy profesor de primaria', 'Tarea: crea 5 preguntas sobre fracciones', 'Formato: tabla con pregunta y respuesta', 'Restricción: nivel de 10 años']),
          choice('Pedir "responde en JSON con las claves nombre y precio" sirve para…', ['Nada', 'Poder usar la respuesta directamente en tu código', 'Hacerlo más lento', 'Traducir'], 1),
        ]
      ),
      lesson(
        'Técnicas avanzadas',
        [
          card('Ejemplos (few-shot)', 'Dar **ejemplos** de entrada → salida enseña al modelo exactamente el estilo y formato que quieres.', `Clasifica el sentimiento:\n"Me encanta" → positivo\n"Fatal servicio" → negativo\n"Llegó a tiempo, todo bien" →`),
          card('Pensar paso a paso e iterar', '- Pide que **razone paso a paso** antes de responder en problemas complejos\n- **Divide** tareas grandes en pasos\n- **Itera**: si la respuesta no es buena, di qué cambiar (más corto, otro tono, añade X)\n- Pide que **se autorrevise**: "revisa tu respuesta buscando errores"'),
        ],
        [
          choice('¿Qué es few-shot prompting?', ['Usar pocas palabras', 'Dar ejemplos de entrada y salida en el prompt', 'Hacer pocas preguntas', 'Usar un modelo pequeño'], 1),
          choice('La primera respuesta no te convence. Lo mejor es…', ['Rendirse', 'Iterar indicando qué cambiar', 'Repetir el mismo prompt exacto', 'Cambiar de idioma'], 1),
          choice('Para un problema de lógica complejo conviene pedir…', ['La respuesta sin más', 'Que razone paso a paso', 'Que responda en una palabra', 'Que use emojis'], 1),
          match('Une cada técnica', [['Few-shot', 'Dar ejemplos'], ['Paso a paso', 'Razonar antes de responder'], ['Dividir tareas', 'Pasos más pequeños'], ['Autorrevisión', 'Buscar errores en su respuesta']]),
          fill('Completa el ejemplo few-shot', '"Hola" → "Hello"\n"Gracias" → "Thanks"\n"Adiós" → ___', '"Goodbye"', ['"Goodbye"', '"Adiós"', '"Hello"', '"Thanks"']),
        ]
      ),
      lesson(
        'Programar con asistentes de IA',
        [
          card('Tu copiloto', 'Asistentes como **GitHub Copilot**, **Cursor** o **Claude Code** autocompletan, explican código, escriben tests y hacen cambios en varios archivos.\n\nÚsalos para: entender código ajeno, generar código repetitivo, escribir tests, buscar bugs, documentar.'),
          card('Tú sigues siendo responsable', '- **Lee** y **entiende** todo lo que aceptas\n- **Prueba** el código (¡tests!)\n- Revisa la **seguridad**: entradas sin validar, SQL injection, secretos en el código\n- Comprueba que las librerías que sugiere **existen** (pueden alucinar paquetes)\n- Aprende los fundamentos: la IA acelera a quien ya sabe'),
        ],
        [
          choice('La IA te genera una función. ¿Qué haces antes de subirla?', ['Nada', 'Leerla, entenderla y probarla', 'Borrar los comentarios', 'Cambiar los nombres'], 1),
          choice('La IA te sugiere instalar un paquete que no conoces. ¿Qué haces?', ['Instalarlo ya', 'Comprobar que existe y es fiable', 'Pedirle otro', 'Nada'], 1, { explanation: 'Los modelos pueden inventar nombres de paquetes, y hay atacantes que publican paquetes maliciosos con esos nombres.' }),
          match('Une cada uso con su ejemplo', [['Explicar', '"¿Qué hace esta función?"'], ['Tests', '"Escribe tests para este módulo"'], ['Depurar', '"¿Por qué falla con lista vacía?"'], ['Refactorizar', '"Hazlo más legible"']]),
          choice('¿Qué fallo de seguridad debes vigilar en código generado?', ['Usar const', 'Concatenar entradas del usuario en consultas SQL', 'Usar funciones', 'Comentarios'], 1),
          reto(
            'La IA generó esta función, pero falla con una lista vacía (devuelve NaN). Arréglala para que devuelva 0 si no hay elementos.',
            `function mediaNotas(notas) {\n  let suma = 0;\n  for (const n of notas) suma += n;\n  return suma / notas.length;\n}`,
            [['mediaNotas([5, 7, 9])', 7], ['mediaNotas([])', 0], ['mediaNotas([10])', 10]],
            `function mediaNotas(notas) {\n  if (notas.length === 0) return 0;\n  let suma = 0;\n  for (const n of notas) suma += n;\n  return suma / notas.length;\n}`,
            { hint: 'Añade al principio: if (notas.length === 0) return 0;' }
          ),
        ]
      ),
    ]),
    unit('Construir apps con IA', 'APIs de modelos, embeddings, RAG y agentes.', [
      lesson(
        'Usar la API de un modelo',
        [
          card('Mensajes', 'Las APIs de modelos de lenguaje reciben una lista de **mensajes** con un **rol** (`system` o instrucciones, `user`, `assistant`) y devuelven la respuesta del modelo. La clave de API va en una **variable de entorno**, nunca en el frontend.', `// En TU servidor (nunca en el navegador):\nconst res = await fetch(PROVEEDOR_URL, {\n  method: "POST",\n  headers: { Authorization: "Bearer " + process.env.API_KEY },\n  body: JSON.stringify({\n    model: "nombre-del-modelo",\n    max_tokens: 500,\n    messages: [{ role: "user", content: "Resume este texto: ..." }],\n  }),\n});`),
          card('Costes y control', '- Se paga por **tokens** de entrada y de salida\n- `max_tokens` limita la longitud de la respuesta\n- Los modelos grandes son más listos pero más caros y lentos: elige el adecuado para cada tarea\n- Pide salidas **estructuradas** (JSON) para procesarlas con código'),
        ],
        [
          choice('¿Dónde debe estar la clave de API del modelo?', ['En el código de React', 'En el servidor, en una variable de entorno', 'En la URL', 'En un comentario'], 1),
          match('Une cada rol de mensaje', [['system', 'Instrucciones generales'], ['user', 'Lo que pide la persona'], ['assistant', 'Respuestas del modelo'], ['max_tokens', 'Límite de la respuesta']]),
          choice('¿Cómo se suele cobrar el uso de un modelo por API?', ['Por minuto', 'Por tokens de entrada y salida', 'Una cuota única', 'Es gratis siempre'], 1),
          choice('Para clasificar 1 millón de comentarios cortos, lo sensato es…', ['El modelo más grande y caro', 'Un modelo pequeño y barato, probando la calidad antes', 'Hacerlo a mano', 'No usar IA'], 1),
          reto(
            'Escribe crearMensajes(pregunta) que devuelva el array de mensajes para la API: un único mensaje con role "user" y content la pregunta.',
            `function crearMensajes(pregunta) {\n  return [];\n}`,
            [['crearMensajes("Hola")', [{ role: 'user', content: 'Hola' }]], ['crearMensajes("¿Qué es RAG?")', [{ role: 'user', content: '¿Qué es RAG?' }]]],
            `function crearMensajes(pregunta) {\n  return [{ role: "user", content: pregunta }];\n}`
          ),
        ]
      ),
      lesson(
        'Embeddings y RAG',
        [
          card('Embeddings', 'Un **embedding** convierte un texto en una lista de números (un **vector**) que representa su **significado**. Textos parecidos tienen vectores cercanos. Se guardan en **bases de datos vectoriales** para buscar por significado, no por palabras exactas.'),
          card('RAG', '**RAG** (Retrieval-Augmented Generation) = buscar y luego generar:\n\n1. Trocea tus documentos y guarda sus embeddings\n2. Cuando llega una pregunta, busca los trozos más parecidos\n3. Pásalos al modelo junto a la pregunta: "responde usando solo esta información"\n\nAsí el modelo responde sobre **tus** datos (manuales, políticas, productos) y alucina menos.'),
        ],
        [
          choice('¿Qué es un embedding?', ['Una imagen', 'Un vector de números que representa el significado de un texto', 'Una contraseña', 'Un tipo de prompt'], 1),
          order('Ordena el flujo RAG', ['Trocear documentos y guardar embeddings', 'Llega una pregunta', 'Buscar los trozos más parecidos', 'Enviar trozos + pregunta al modelo', 'El modelo responde con esa información']),
          choice('¿Qué problema resuelve RAG?', ['Que el modelo sea más rápido', 'Que responda con información de tus documentos actualizados', 'Que no cueste dinero', 'Que genere imágenes'], 1),
          reto(
            'La similitud entre embeddings se mide a menudo con el producto escalar. Escribe productoEscalar(a, b): suma de a[i] × b[i].',
            `function productoEscalar(a, b) {\n  \n}`,
            [['productoEscalar([1, 2, 3], [4, 5, 6])', 32], ['productoEscalar([1, 0], [0, 1])', 0], ['productoEscalar([2, 2], [3, 1])', 8]],
            `function productoEscalar(a, b) {\n  let s = 0;\n  for (let i = 0; i < a.length; i++) s += a[i] * b[i];\n  return s;\n}`
          ),
          choice('¿Dónde se suelen guardar los embeddings?', ['En un CSV', 'En una base de datos vectorial', 'En localStorage', 'En el prompt'], 1),
        ]
      ),
      lesson(
        'Agentes y herramientas',
        [
          card('De chatbot a agente', 'Un **agente** es un modelo que puede **usar herramientas** (buscar en la web, consultar una BD, llamar a una API, ejecutar código) y decidir los siguientes pasos en bucle hasta completar una tarea.\n\nLe describes las herramientas (nombre, para qué sirven, parámetros) y el modelo pide usarlas; **tu código** las ejecuta y le devuelve el resultado.'),
          card('Diseñar agentes con cabeza', '- Herramientas con descripciones claras\n- **Permisos mínimos**: que no pueda borrar o pagar sin confirmación humana\n- Límites de pasos y de coste\n- Registros (logs) de lo que hace\n- **MCP** (Model Context Protocol) es un estándar para conectar herramientas a los modelos'),
        ],
        [
          choice('¿Qué diferencia a un agente de un chatbot simple?', ['Es más bonito', 'Puede usar herramientas y encadenar pasos para completar tareas', 'No usa un modelo', 'Solo responde sí o no'], 1),
          choice('Cuando el modelo pide usar una herramienta, ¿quién la ejecuta?', ['El modelo directamente', 'Tu código, que le devuelve el resultado', 'El usuario a mano', 'Nadie'], 1),
          match('Une cada concepto', [['Herramienta', 'Función que el agente puede pedir usar'], ['MCP', 'Estándar para conectar herramientas'], ['Permisos mínimos', 'Solo lo imprescindible'], ['Logs', 'Registro de lo que hizo']]),
          choice('Un agente va a enviar emails a clientes. Lo responsable es…', ['Dejarle enviar sin límite', 'Pedir confirmación humana antes de enviar', 'Darle tu contraseña', 'No registrar nada'], 1),
          reto(
            'Simula el "router" de herramientas de un agente: ejecutarHerramienta(nombre, args) debe devolver args.a + args.b para "sumar", la fecha fija "2026-01-01" para "fecha", y "desconocida" para cualquier otra.',
            `function ejecutarHerramienta(nombre, args) {\n  // usa un switch o if/else\n}`,
            [['ejecutarHerramienta("sumar", { a: 2, b: 3 })', 5], ['ejecutarHerramienta("fecha", {})', '2026-01-01'], ['ejecutarHerramienta("borrarTodo", {})', 'desconocida']],
            `function ejecutarHerramienta(nombre, args) {\n  switch (nombre) {\n    case "sumar":\n      return args.a + args.b;\n    case "fecha":\n      return "2026-01-01";\n    default:\n      return "desconocida";\n  }\n}`
          ),
        ]
      ),
    ]),
  ],
};
