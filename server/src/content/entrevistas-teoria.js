import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'entrevistas-teoria',
  title: 'Preguntas técnicas y de diseño',
  icon: '💼',
  color: '#495057',
  level: 'Avanzado',
  description: 'POO, SOLID, web, bases de datos, diseño de sistemas y preguntas de comportamiento.',
  units: [
    unit('Teoría que siempre preguntan', 'POO y SOLID, JavaScript y web, bases de datos.', [
      lesson(
        'POO y SOLID',
        [
          card('Los 4 pilares de la POO', '- **Encapsulación**: ocultar los datos internos y exponer métodos\n- **Abstracción**: mostrar solo lo esencial\n- **Herencia**: reutilizar comportamiento de una clase padre\n- **Polimorfismo**: un mismo método, distinto comportamiento según el objeto'),
          card('SOLID', '- **S**: responsabilidad única (una razón para cambiar)\n- **O**: abierto a extensión, cerrado a modificación\n- **L**: sustitución de Liskov (un hijo debe poder usarse como el padre)\n- **I**: interfaces pequeñas y específicas\n- **D**: depender de abstracciones, no de implementaciones (inyección de dependencias)'),
        ],
        [
          match('Une cada pilar de la POO', [['Encapsulación', 'Ocultar datos internos'], ['Herencia', 'Reutilizar de una clase padre'], ['Polimorfismo', 'Mismo método, distinto comportamiento'], ['Abstracción', 'Mostrar solo lo esencial']]),
          match('Une cada letra de SOLID', [['S', 'Responsabilidad única'], ['O', 'Abierto/cerrado'], ['I', 'Segregación de interfaces'], ['D', 'Inversión de dependencias']]),
          choice('Una clase Usuario que guarda en BD, envía emails y genera PDFs viola…', ['La O', 'La S (responsabilidad única)', 'La L', 'Ninguna'], 1),
          choice('¿Qué principio aplica Spring con la inyección de dependencias?', ['S', 'O', 'L', 'D'], 3),
          choice('"Composición sobre herencia" significa…', ['No usar clases', 'Preferir combinar objetos a crear jerarquías profundas', 'Usar solo herencia', 'Escribir más código'], 1),
        ]
      ),
      lesson(
        'JavaScript y la web',
        [
          card('JavaScript', '- **Closure**: una función que recuerda las variables de donde se creó\n- **Event loop**: JS es de un solo hilo; las tareas asíncronas esperan en una cola\n- **== vs ===**: `===` compara tipo y valor\n- **let/const vs var**: ámbito de bloque vs de función\n- **Promesas / async-await**: código asíncrono legible', `function contador() {\n  let n = 0;\n  return () => ++n; // closure: recuerda n\n}`),
          card('La web', '- ¿Qué pasa al escribir una URL? DNS → conexión TCP/TLS → petición HTTP → respuesta → el navegador pinta HTML, CSS y JS\n- **Cookies vs localStorage**: las cookies viajan al servidor en cada petición\n- **CORS**, **HTTPS**, códigos de estado, REST'),
        ],
        [
          choice('¿Qué es un closure?', ['Un tipo de bucle', 'Una función que recuerda variables de su ámbito de creación', 'Cerrar el navegador', 'Un error'], 1),
          choice('¿Qué se imprime primero?', ['"timeout"', '"fin"', 'A la vez', 'Nada'], 1, { code: `setTimeout(() => console.log("timeout"), 0);\nconsole.log("fin");`, explanation: 'El callback de setTimeout va a la cola del event loop y se ejecuta cuando termina el código síncrono.' }),
          order('Ordena lo que pasa al abrir una web', ['Resolución DNS', 'Conexión TCP/TLS', 'Petición HTTP', 'Respuesta del servidor', 'El navegador pinta la página']),
          choice('¿Qué viaja al servidor en cada petición?', ['localStorage', 'Las cookies', 'sessionStorage', 'Las variables de JS'], 1),
          choice('¿Qué devuelve 0 == "0"?', ['true', 'false', 'Error', 'undefined'], 0, { explanation: 'Con == JavaScript convierte tipos. Por eso se recomienda ===.' }),
        ]
      ),
      lesson(
        'Bases de datos',
        [
          card('Conceptos clave', '- **Índice**: acelera búsquedas a cambio de espacio y escrituras más lentas\n- **ACID**: Atomicidad, Consistencia, Aislamiento, Durabilidad (transacciones fiables)\n- **Normalización**: evitar datos duplicados repartiéndolos en tablas relacionadas\n- **SQL vs NoSQL**: tablas y relaciones vs documentos/clave-valor flexibles'),
          card('Preguntas típicas', '- ¿Cuándo usarías NoSQL? Datos sin esquema fijo, enorme escala horizontal\n- ¿Qué es el problema N+1? Hacer 1 consulta y luego N más dentro de un bucle\n- ¿Qué es una transacción? Varias operaciones que se hacen **todas o ninguna**'),
        ],
        [
          match('Une cada letra de ACID', [['Atomicidad', 'Todo o nada'], ['Consistencia', 'Siempre en un estado válido'], ['Aislamiento', 'Las transacciones no se pisan'], ['Durabilidad', 'Lo confirmado no se pierde']]),
          choice('¿Qué inconveniente tiene añadir muchos índices?', ['Ninguno', 'Escrituras más lentas y más espacio', 'Lecturas más lentas', 'Borra datos'], 1),
          choice('Una transferencia bancaria (restar en A, sumar en B) necesita…', ['Un índice', 'Una transacción', 'Un caché', 'NoSQL'], 1),
          choice('¿Qué es el problema N+1?', ['Un error de sintaxis', 'Hacer una consulta por cada elemento de una lista en lugar de una sola', 'Tener N+1 tablas', 'Una clave duplicada'], 1),
          match('Une cada base de datos con su tipo', [['PostgreSQL', 'SQL relacional'], ['MongoDB', 'NoSQL de documentos'], ['Redis', 'Clave-valor en memoria'], ['SQLite', 'SQL en un archivo']]),
        ]
      ),
    ]),
    unit('Diseño de sistemas y conducta', 'Arquitectura a gran escala, preguntas de comportamiento y la oferta.', [
      lesson(
        'Diseño de sistemas',
        [
          card('Cómo responder', '"Diseña un acortador de URLs" o "diseña Instagram". Estructura:\n\n1. **Requisitos**: funcionales y de escala (¿cuántos usuarios?)\n2. **API**: endpoints principales\n3. **Modelo de datos**\n4. **Arquitectura**: cliente → balanceador → servidores → caché → base de datos\n5. **Cuellos de botella** y cómo escalar'),
          card('Piezas habituales', '- **Balanceador de carga**: reparte peticiones\n- **Caché** (Redis): guarda resultados frecuentes en memoria\n- **CDN**: archivos estáticos cerca del usuario\n- **Cola de mensajes** (Kafka, RabbitMQ): tareas en segundo plano\n- **Réplicas** y **sharding**: escalar la base de datos'),
        ],
        [
          order('Ordena cómo responder una pregunta de diseño', ['Aclarar requisitos y escala', 'Definir la API', 'Modelo de datos', 'Dibujar la arquitectura', 'Hablar de cuellos de botella']),
          match('Une cada pieza con su función', [['Balanceador', 'Reparte las peticiones'], ['Caché', 'Respuestas rápidas en memoria'], ['Cola de mensajes', 'Tareas en segundo plano'], ['CDN', 'Archivos estáticos cerca del usuario']]),
          choice('La página principal se pide millones de veces y cambia poco. ¿Qué añades?', ['Más tablas', 'Una caché', 'Un bucle', 'Menos servidores'], 1),
          choice('Enviar el email de bienvenida no debe retrasar el registro. Usas…', ['Una cola de mensajes', 'Un índice', 'Una CDN', 'Un JOIN'], 0),
          choice('¿Qué es sharding?', ['Copiar la BD', 'Repartir los datos entre varias bases de datos', 'Cifrar', 'Borrar datos viejos'], 1),
        ]
      ),
      lesson(
        'Preguntas de comportamiento',
        [
          card('El método STAR', 'Para "Cuéntame una vez que…" responde con **STAR**:\n\n- **S**ituación: el contexto\n- **T**area: tu responsabilidad\n- **A**cción: qué hiciste **tú** (concreto)\n- **R**esultado: qué pasó, mejor con números, y qué aprendiste'),
          card('Prepara tus historias', 'Ten preparadas 4-5 historias reales: un reto técnico, un conflicto en equipo, un error que cometiste, algo de lo que estés orgulloso/a.\n\nPreguntas típicas: "¿Por qué quieres trabajar aquí?", "¿Cuál es tu mayor debilidad?", "Háblame de ti".'),
        ],
        [
          order('Ordena el método STAR', ['Situación', 'Tarea', 'Acción', 'Resultado']),
          choice('En la parte "Acción" debes hablar de…', ['Lo que hizo el equipo en general', 'Lo que hiciste tú en concreto', 'Lo que haría otra persona', 'Tus hobbies'], 1),
          choice('Te preguntan por un error. ¿Qué respuesta es mejor?', ['"Nunca me equivoco"', 'Un error real, qué hiciste para arreglarlo y qué aprendiste', 'Culpar a un compañero', 'Cambiar de tema'], 1),
          choice('¿Qué es mejor en el "Resultado"?', ['"Salió bien"', '"Redujimos el tiempo de carga un 40 %"', 'No decir nada', '"No me acuerdo"'], 1),
          choice('"¿Por qué esta empresa?" Lo ideal es…', ['"Por el sueldo"', 'Mostrar que conoces su producto y conectar con tus intereses', '"Me da igual"', '"Porque estaba en paro"'], 1),
        ]
      ),
      lesson(
        'CV, portfolio y la oferta',
        [
          card('Destacar', '- **CV** de 1 página, con logros medibles ("reduje…", "construí…") y tecnologías\n- **Portfolio** / GitHub con 2-3 proyectos completos y desplegados, con README\n- **LinkedIn** actualizado\n- Practica problemas y entrevistas **simuladas** en voz alta'),
          card('La oferta', '- Investiga **rangos salariales** de tu puesto y ciudad\n- Valora el paquete completo: sueldo, teletrabajo, formación, horario\n- Es normal **negociar** con educación y argumentos\n- Al final de la entrevista, **haz preguntas**: sobre el equipo, el día a día, cómo se mide el éxito'),
        ],
        [
          choice('¿Qué línea de CV es mejor?', ['"Responsable de la web"', '"Reduje el tiempo de carga de la web un 50 % migrando a React"', '"Sé programar"', '"Trabajador"'], 1),
          choice('¿Qué hace fuerte un portfolio?', ['Muchos proyectos a medias', '2-3 proyectos completos, desplegados y documentados', 'Solo tutoriales copiados', 'Un logo'], 1),
          choice('Al final te preguntan "¿tienes alguna pregunta?". Lo mejor es…', ['"No"', 'Preguntar por el equipo, el día a día o los retos del puesto', 'Preguntar solo por vacaciones', 'Irte'], 1),
          match('Une cada elemento con su consejo', [['CV', 'Una página con logros medibles'], ['GitHub', 'Proyectos con README'], ['Oferta', 'Valorar el paquete completo'], ['Práctica', 'Entrevistas simuladas en voz alta']]),
          choice('¿Es correcto negociar una oferta?', ['Nunca', 'Sí, con educación y argumentos', 'Solo si te amenazan', 'Solo por email'], 1),
        ]
      ),
    ]),
  ],
};
