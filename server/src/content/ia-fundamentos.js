import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'ia-fundamentos',
  title: 'Fundamentos de IA',
  icon: '🧠',
  color: '#7048e8',
  level: 'Desde cero',
  description: 'Qué es la IA, cómo aprende una máquina y cómo funcionan los modelos de lenguaje.',
  units: [
    unit('¿Qué es la inteligencia artificial?', 'IA, machine learning, deep learning y tipos de aprendizaje.', [
      lesson(
        'IA, ML y deep learning',
        [
          card('Muñecas rusas', '- **Inteligencia artificial (IA)**: sistemas que hacen tareas que parecen requerir inteligencia\n- **Machine learning (ML)**: IA que **aprende de datos** en vez de seguir reglas escritas a mano\n- **Deep learning**: ML con **redes neuronales** de muchas capas\n- **IA generativa**: modelos que **crean** contenido nuevo (texto, imágenes, audio, código)'),
          card('Reglas vs aprendizaje', 'Programación tradicional: **reglas + datos → respuestas**.\n\nMachine learning: **datos + respuestas → reglas** (el modelo las descubre solo).\n\nPor eso el ML brilla donde es difícil escribir reglas: reconocer caras, entender lenguaje, detectar fraude.'),
        ],
        [
          order('Ordena de más general a más específico', ['Inteligencia artificial', 'Machine learning', 'Deep learning']),
          choice('¿Qué distingue al machine learning?', ['Usa solo reglas escritas a mano', 'Aprende patrones a partir de datos', 'Solo funciona con imágenes', 'No necesita ordenadores'], 1),
          match('Une cada término', [['IA generativa', 'Crea contenido nuevo'], ['Deep learning', 'Redes neuronales profundas'], ['Machine learning', 'Aprende de datos'], ['Programación clásica', 'Reglas escritas a mano']]),
          choice('¿Qué tarea es ideal para machine learning?', ['Sumar dos números', 'Detectar si un email es spam', 'Ordenar una lista', 'Calcular el IVA'], 1),
          choice('ChatGPT, Claude o Gemini son ejemplos de…', ['Bases de datos', 'IA generativa (modelos de lenguaje)', 'Sistemas operativos', 'Lenguajes de programación'], 1),
        ]
      ),
      lesson(
        'Cómo aprende una máquina',
        [
          card('Datos, entrenamiento y modelo', '1. Reúnes **datos** de ejemplo (por ejemplo, fotos etiquetadas "gato" / "perro")\n2. **Entrenas**: el algoritmo ajusta millones de números (**parámetros**) para equivocarse lo menos posible\n3. Obtienes un **modelo**, que hace **predicciones** con datos nuevos (**inferencia**)'),
          card('Basura entra, basura sale', 'Un modelo es tan bueno como sus datos. Si los datos están sesgados, incompletos o mal etiquetados, el modelo también lo estará.\n\n**Overfitting**: el modelo memoriza los ejemplos en vez de aprender la regla general, y falla con datos nuevos.'),
        ],
        [
          order('Ordena el proceso', ['Reunir datos', 'Entrenar el algoritmo', 'Obtener el modelo', 'Predecir con datos nuevos']),
          choice('¿Qué son los parámetros de un modelo?', ['Sus datos de entrada', 'Los números que ajusta durante el entrenamiento', 'Su nombre', 'Sus usuarios'], 1),
          choice('¿Qué es la inferencia?', ['Entrenar el modelo', 'Usar el modelo ya entrenado para predecir', 'Borrar datos', 'Etiquetar fotos'], 1),
          choice('Un modelo saca 100 % con los datos de entrenamiento y 55 % con datos nuevos. Es…', ['Perfecto', 'Overfitting', 'Underfitting', 'Imposible'], 1),
          choice('Si entrenas un modelo de contratación solo con CVs de hombres, el modelo…', ['Será justo', 'Probablemente discriminará a las mujeres', 'No funcionará', 'Mejorará solo'], 1),
        ]
      ),
      lesson(
        'Tipos de aprendizaje',
        [
          card('Tres grandes familias', '- **Supervisado**: aprende de ejemplos **con la respuesta** (etiquetas). Ej: precio de casas, spam / no spam\n- **No supervisado**: busca patrones **sin respuestas**. Ej: agrupar clientes parecidos\n- **Por refuerzo**: aprende por **prueba y error** con recompensas. Ej: jugar al ajedrez, robots'),
          card('Clasificación y regresión', 'Dentro del supervisado:\n\n- **Clasificación**: predice una **categoría** (¿gato o perro?)\n- **Regresión**: predice un **número** (¿cuánto costará esta casa?)'),
        ],
        [
          match('Une cada tipo con un ejemplo', [['Supervisado', 'Detectar spam con emails etiquetados'], ['No supervisado', 'Agrupar clientes por hábitos'], ['Por refuerzo', 'Aprender a jugar por recompensas'], ['Regresión', 'Predecir el precio de una casa']]),
          choice('Predecir si un cliente se dará de baja (sí/no) es…', ['Regresión', 'Clasificación', 'No supervisado', 'Refuerzo'], 1),
          choice('Predecir la temperatura de mañana es…', ['Clasificación', 'Regresión', 'Clustering', 'Refuerzo'], 1),
          choice('¿Qué necesita el aprendizaje supervisado?', ['Nada', 'Datos con la respuesta correcta (etiquetas)', 'Un robot', 'Recompensas'], 1),
          fill('Agrupar datos sin etiquetas se llama…', 'Clustering = aprendizaje ___', 'no supervisado', ['no supervisado', 'supervisado', 'por refuerzo', 'generativo']),
        ]
      ),
    ]),
    unit('Modelos de lenguaje', 'Cómo funcionan los LLM, sus límites y el uso responsable.', [
      lesson(
        '¿Qué es un LLM?',
        [
          card('Predecir la siguiente palabra', 'Un **LLM** (Large Language Model) es una red neuronal enorme entrenada con muchísimo texto para **predecir el siguiente fragmento de texto**. Repitiendo esa predicción, escribe respuestas completas.\n\nLa arquitectura que lo hizo posible se llama **Transformer** (2017).'),
          card('Tokens y contexto', '- Los modelos no leen letras ni palabras, sino **tokens** (trozos de palabra; en español, ~1 token ≈ 3-4 caracteres)\n- La **ventana de contexto** es cuánto texto puede tener en cuenta a la vez\n- La **temperatura** controla la creatividad: baja = respuestas más predecibles; alta = más variadas'),
        ],
        [
          choice('¿Qué hace fundamentalmente un LLM?', ['Buscar en Google', 'Predecir el siguiente fragmento de texto', 'Copiar respuestas de una base de datos', 'Pensar como un humano'], 1),
          choice('¿Qué es un token?', ['Una contraseña', 'Un trozo de texto con el que trabaja el modelo', 'Una moneda', 'Un usuario'], 1),
          choice('Para obtener respuestas más consistentes y predecibles, la temperatura debe ser…', ['Alta', 'Baja', 'Negativa', 'Da igual'], 1),
          fill('Arquitectura de los LLM modernos', 'Los LLM usan la arquitectura ___', 'Transformer', ['Transformer', 'Pipeline', 'MVC', 'Kernel']),
          choice('¿Qué es la ventana de contexto?', ['La pantalla del chat', 'La cantidad de texto que el modelo puede tener en cuenta a la vez', 'El historial del navegador', 'El precio'], 1),
        ]
      ),
      lesson(
        'Limitaciones',
        [
          card('Alucinaciones', 'Un LLM puede inventarse datos, citas o funciones de código **con total seguridad**. Eso se llama **alucinación**. Por eso: **verifica** siempre lo importante.'),
          card('Otros límites', '- **Fecha de corte**: no sabe lo que pasó después de su entrenamiento (salvo que tenga búsqueda web)\n- **Sesgos**: reproduce sesgos de los datos\n- **Cálculo exacto**: puede fallar en cuentas largas si no usa herramientas\n- **No "entiende"** como una persona: predice texto plausible'),
        ],
        [
          choice('¿Qué es una alucinación de un LLM?', ['Un error de conexión', 'Inventar información falsa con seguridad', 'Tardar mucho', 'Negarse a responder'], 1),
          choice('Un LLM te da una cita de un libro. ¿Qué haces?', ['La uso tal cual', 'La verifico en la fuente original', 'La cambio un poco', 'Le pregunto si está seguro y la uso'], 1),
          choice('¿Por qué un modelo no conoce las noticias de ayer?', ['Porque es lento', 'Por su fecha de corte de entrenamiento (si no tiene búsqueda)', 'Porque no lee español', 'Por la temperatura'], 1),
          match('Une cada límite con su descripción', [['Alucinación', 'Inventa datos'], ['Fecha de corte', 'No conoce hechos recientes'], ['Sesgo', 'Refleja prejuicios de los datos'], ['Ventana de contexto', 'Límite de texto que procesa']]),
          choice('El código que te genera una IA…', ['Siempre es correcto', 'Hay que revisarlo y probarlo como cualquier otro código', 'No se puede usar', 'Es siempre inseguro'], 1),
        ]
      ),
      lesson(
        'Ética y uso responsable',
        [
          card('Privacidad', 'No pegues en una IA datos personales, contraseñas, claves de API ni información confidencial de tu empresa sin saber cómo se tratan. Revisa las políticas de uso y si se usan tus datos para entrenar.'),
          card('Responsabilidad', '- **Transparencia**: di cuándo un contenido está hecho con IA si importa\n- **Derechos de autor**: no uses la IA para copiar obras ajenas\n- **Decisiones importantes** (salud, dinero, contratación): siempre con supervisión humana\n- **Deepfakes**: no crees contenido que suplante a personas reales'),
        ],
        [
          choice('¿Qué NO deberías pegar en un chat de IA público?', ['Una pregunta de programación', 'Las contraseñas y claves de tu empresa', 'Un texto tuyo para corregir', 'Una receta'], 1),
          choice('Una IA decide a quién conceder un préstamo. Lo responsable es…', ['Confiar ciegamente', 'Que haya supervisión humana y se pueda auditar', 'No avisar a nadie', 'Usar la temperatura alta'], 1),
          choice('¿Qué es un deepfake?', ['Un modelo pequeño', 'Contenido falso que imita a una persona real', 'Un error de red', 'Un tipo de base de datos'], 1),
          match('Une cada principio', [['Privacidad', 'No compartir datos sensibles'], ['Transparencia', 'Decir cuándo se usa IA'], ['Supervisión humana', 'Revisar decisiones importantes'], ['Derechos de autor', 'No copiar obras ajenas']]),
          choice('La regulación europea sobre IA se llama…', ['GDPR', 'AI Act (Ley de IA)', 'HTTP', 'ISO 9001'], 1),
        ]
      ),
    ]),
  ],
};
