import { card, choice, fill, match, order, lesson, unit } from './_helpers.js';

const clean = (text) => text.replace(/^\[Proyecto\]\s*/, '');

const topicFacts = [
  [/aria/, 'ARIA complementa la semántica nativa cuando HTML no puede expresar por sí solo el nombre, rol o estado de un control.'],
  [/texto alternativo|labels|navegación por teclado/, 'Una interfaz accesible conserva significado sin imágenes, asocia cada campo con su etiqueta y permite operar todos los controles con teclado.'],
  [/audio y vídeo/, 'Los elementos multimedia deben ofrecer controles, alternativas textuales y formatos compatibles sin reproducirse de forma intrusiva.'],
  [/metadatos|favicon|seo/, 'Los metadatos describen el documento para navegadores y buscadores; no sustituyen una estructura semántica ni contenido útil.'],
  [/devtools|inspeccionar|depurar elementos/, 'DevTools permite observar el DOM y los estilos calculados en tiempo real sin modificar todavía los archivos fuente.'],
  [/transition|transform|keyframes/, 'Las transiciones interpolan cambios de estado, transform modifica la representación y keyframes define animaciones con varias etapas.'],
  [/movimiento reducido/, 'prefers-reduced-motion permite respetar a quienes han pedido al sistema minimizar animaciones no esenciales.'],
  [/custom properties|variables/, 'Las propiedades personalizadas de CSS centralizan valores reutilizables y participan en la cascada, lo que facilita temas y ajustes locales.'],
  [/mobile first|puntos de ruptura/, 'Mobile first parte de la restricción pequeña y añade mejoras cuando el contenido necesita más espacio, no según un dispositivo concreto.'],
  [/dom y eventos|queryselector/, 'El DOM representa el documento como nodos que JavaScript puede consultar y modificar después de que el navegador interprete el HTML.'],
  [/bubbling|delegación/, 'Los eventos suelen propagarse desde el elemento objetivo hacia sus ancestros; la delegación aprovecha esa propagación para gestionar muchos hijos.'],
  [/promesas|async\/await/, 'Una promesa representa un resultado futuro; async/await permite coordinarlo y try/catch gestiona los rechazos de forma legible.'],
  [/fetch y json/, 'fetch devuelve una promesa y no considera error automático todos los estados HTTP; conviene comprobar ok antes de leer el JSON.'],
  [/localstorage|sessionstorage/, 'localStorage persiste entre sesiones y sessionStorage dura lo que la pestaña; ambos guardan texto y no deben contener secretos.'],
  [/tipos para datos externos|validación en tiempo de ejecución/, 'Los tipos de TypeScript desaparecen al ejecutar, por lo que una respuesta externa necesita validación antes de tratarla como confiable.'],
  [/tipar props|eventos y estado/, 'Tipar props, eventos y estado hace explícito el contrato del componente y detecta usos incompatibles durante el desarrollo.'],
  [/componentes genéricos/, 'Un componente genérico conserva la relación entre el tipo de sus datos y el de sus callbacks sin renunciar a la reutilización.'],
  [/tsconfig/, 'tsconfig define cómo comprueba y transforma TypeScript; activar reglas estrictas evita que valores inciertos se propaguen sin control.'],
  [/react router|rutas y parámetros/, 'El router sincroniza la interfaz con la URL y permite que cada vista sea enlazable, recargable y navegable con el historial.'],
  [/rutas protegidas/, 'Una ruta protegida mejora la experiencia, pero la autorización real debe comprobarse también en el servidor.'],
  [/context api|usereducer/, 'Context distribuye un valor por el árbol y useReducer concentra transiciones de estado complejas en acciones explícitas.'],
  [/hooks personalizados/, 'Un hook personalizado extrae lógica con estado para reutilizarla; comparte comportamiento, no una instancia única del estado.'],
  [/vitest|testing library/, 'Las pruebas de componentes deben observar el comportamiento visible y usar consultas cercanas a cómo una persona encuentra los controles.'],
  [/venv|entornos virtuales/, 'Un entorno virtual aísla las dependencias de Python por proyecto y evita mezclar versiones instaladas globalmente.'],
  [/csv|json|pathlib/, 'CSV modela filas tabulares, JSON estructuras anidadas y pathlib manipula rutas sin concatenar separadores manualmente.'],
  [/pytest/, 'pytest descubre pruebas pequeñas y usa aserciones y fixtures para preparar casos reproducibles y aislados.'],
  [/argumentos de terminal/, 'Los argumentos permiten parametrizar un programa sin editar el código; deben validarse y ofrecer mensajes de ayuda claros.'],
  [/tipos parametrizados|genéricos/, 'Los genéricos expresan qué tipos acepta y devuelve una estructura sin perder comprobaciones ni recurrir a conversiones inseguras.'],
  [/comparable|comparator/, 'Comparable define el orden natural de una clase y Comparator permite órdenes alternativos sin modificarla.'],
  [/threads|executorservice/, 'ExecutorService separa las tareas de la gestión de hilos y facilita limitar recursos y cerrar la ejecución ordenadamente.'],
  [/junit|mockito|mockmvc/, 'Las pruebas unitarias aíslan reglas; los dobles sustituyen colaboradores y MockMvc verifica el contrato HTTP sin desplegar un servidor real.'],
  [/spring security|sesiones, roles|jwt/, 'Autenticación confirma identidad y autorización decide permisos; un JWT firmado no cifra su contenido ni revoca acceso por sí solo.'],
  [/integración con base de datos/, 'Una prueba de integración usa componentes reales en un entorno aislado y controla los datos para que el resultado sea repetible.'],
  [/postgresql y migraciones|migraciones/, 'Una migración versiona cambios de esquema para aplicarlos de forma ordenada y reproducible en cada entorno.'],
  [/hash de contraseñas/, 'Las contraseñas se almacenan con una función de derivación lenta, sal única y parámetros actualizables, nunca con cifrado reversible.'],
  [/validación con esquemas/, 'Un esquema valida forma y restricciones en el límite de la aplicación antes de que datos no fiables lleguen a la lógica.'],
  [/supertest|tests con vitest|tests con jest/, 'Las pruebas HTTP comprueban estado, cabeceras y cuerpo, además de los efectos persistentes y los caminos de error.'],
  [/logging|rate limiting/, 'El logging estructurado ayuda a investigar y el rate limiting reduce abuso; ninguno sustituye autenticación ni validación.'],
  [/subconsultas|cte/, 'Una CTE da nombre a un resultado intermedio y puede mejorar legibilidad; no garantiza por sí sola una consulta más rápida.'],
  [/funciones de ventana/, 'Una función de ventana calcula sobre filas relacionadas sin colapsarlas como hace GROUP BY.'],
  [/acid|commit|rollback|transacciones/, 'Una transacción agrupa cambios como una unidad: commit los confirma y rollback deshace los que aún no se han confirmado.'],
  [/explain|índices/, 'EXPLAIN muestra el plan elegido; un índice acelera ciertas lecturas a cambio de espacio y trabajo adicional al escribir.'],
  [/openapi|swagger|contratos/, 'OpenAPI describe operaciones y esquemas en un formato procesable que permite validar, documentar y generar clientes.'],
  [/idempotencia|reintentos/, 'Una operación idempotente tolera repeticiones con el mismo efecto final, algo clave cuando una respuesta se pierde y se reintenta.'],
  [/rate limiting|límites de peticiones/, 'Limitar peticiones protege capacidad y debe responder de forma predecible, pero no corrige una autorización defectuosa.'],
  [/health checks/, 'Un health check debe distinguir que el proceso vive de que está listo para recibir tráfico y acceder a sus dependencias críticas.'],
  [/logs, métricas|alertas/, 'Los logs explican eventos, las métricas muestran tendencias y las alertas deben señalar síntomas accionables para evitar ruido.'],
  [/feature branches|trunk-based/, 'Las ramas de corta duración reducen divergencia; trunk-based integra con frecuencia y depende de automatización y cambios pequeños.'],
  [/code review|revisión/, 'Una revisión eficaz busca corrección, claridad, seguridad y pruebas, y comenta el código sin convertir el feedback en un juicio personal.'],
  [/github actions|pipeline/, 'La integración continua ejecuta comprobaciones reproducibles ante cada cambio y bloquea la entrega si una condición esencial falla.'],
  [/dfs|bfs|búsqueda por niveles/, 'DFS profundiza antes de retroceder; BFS explora por niveles y encuentra caminos mínimos en grafos no ponderados.'],
  [/trade-offs de memoria|complejidad/, 'Elegir una estructura exige comparar costes de tiempo, memoria y operaciones dominantes con los límites reales del problema.'],
  [/backtracking|poda/, 'Backtracking explora decisiones y deshace elecciones; la poda descarta ramas que ya no pueden producir una solución válida.'],
  [/greedy|estrategia voraz/, 'Un algoritmo voraz toma la mejor decisión local y solo es correcto cuando puede demostrarse que conduce a una solución global.'],
  [/caminos mínimos/, 'El algoritmo adecuado para caminos mínimos depende de si las aristas tienen peso y de si pueden existir pesos negativos.'],
  [/esquemas y calidad de datos/, 'Validar un conjunto implica comprobar tipos, rangos, unicidad, valores ausentes y reglas propias del dominio.'],
  [/datetime|resampling|series temporales/, 'Una serie temporal necesita zona horaria y frecuencia explícitas; resampling agrupa observaciones en nuevos intervalos.'],
  [/tendencias|estacionalidad/, 'La tendencia describe cambio sostenido y la estacionalidad patrones periódicos; confundirlas produce conclusiones engañosas.'],
  [/distribuciones|muestreo/, 'La muestra debe representar el proceso de interés; una muestra grande no corrige un sesgo sistemático de selección.'],
  [/intervalos de confianza/, 'Un intervalo cuantifica la incertidumbre de un procedimiento de estimación y no es la probabilidad de que este parámetro fijo esté dentro.'],
  [/p-valor|tipo i|tipo ii/, 'El p-valor mide compatibilidad con la hipótesis nula; no expresa el tamaño del efecto ni la probabilidad de que la hipótesis sea cierta.'],
  [/pruebas a\/b/, 'Una prueba A/B necesita asignación comparable, métrica previa y tamaño suficiente para separar señal de variación aleatoria.'],
  [/transformers|atención/, 'La atención pondera relaciones entre elementos de una secuencia y permite a un transformer procesar contexto en paralelo.'],
  [/exactitud|robustez|sesgos/, 'Evaluar un modelo exige casos normales, límites y subgrupos; una media alta puede ocultar fallos importantes.'],
  [/privacidad|datos sensibles/, 'Los datos sensibles deben minimizarse, protegerse y no enviarse a un servicio externo sin una base y controles adecuados.'],
  [/cross-validation|data leakage|fuga de datos/, 'La validación cruzada estima variación entre particiones; todo preprocesado aprendido debe ajustarse solo con datos de entrenamiento.'],
  [/tensores|pytorch/, 'Un tensor almacena datos multidimensionales y el entrenamiento ajusta parámetros propagando gradientes para reducir una función de pérdida.'],
  [/hiperparámetros/, 'Los hiperparámetros se eligen fuera del entrenamiento y deben ajustarse con validación, no mirando repetidamente el conjunto de test.'],
  [/vector stores|búsqueda híbrida/, 'La búsqueda híbrida combina similitud semántica y coincidencia léxica para recuperar contexto relevante con mayor cobertura.'],
  [/prompt injection|límites de herramientas/, 'El contenido recuperado no es una instrucción fiable; las herramientas necesitan permisos mínimos, validación y confirmación para acciones sensibles.'],
  [/coste, latencia|trazas/, 'Medir tokens, latencia, errores y trazas por etapa permite localizar cuellos de botella y controlar el coste real de una función de IA.'],
  [/canales|conversión|propuesta de valor/, 'Una propuesta de valor conecta un problema concreto con un resultado medible; la conversión muestra dónde se pierde interés en el recorrido.'],
  [/protección de datos|contratos/, 'Operar un producto requiere definir responsabilidades, finalidad de los datos, conservación, proveedores y respuesta ante incidentes.'],
  [/debugging|reproducir fallos/, 'Depurar empieza por reproducir de forma mínima, formular una hipótesis y cambiar una variable antes de añadir una prueba de regresión.'],
  [/dos punteros|hash maps|árboles/, 'La técnica se elige por la estructura del problema: dos punteros aprovechan orden, un mapa acceso por clave y un árbol jerarquía.'],
  [/requisitos funcionales|no funcionales/, 'Los requisitos funcionales describen capacidades; los no funcionales fijan cualidades medibles como latencia, seguridad o disponibilidad.'],
  [/passkeys|mfa/, 'Las passkeys usan criptografía ligada al sitio y resisten mejor el phishing; MFA añade una barrera si un factor se compromete.'],
  [/copias de seguridad|recuperación/, 'Una copia solo es útil si está separada, protegida y se ha probado que puede restaurarse dentro del tiempo necesario.'],
  [/permisos, usuarios|mínimo privilegio|iam/, 'El mínimo privilegio concede solo las acciones y recursos necesarios durante el tiempo necesario, con revisión periódica.'],
  [/autorización por objeto/, 'Cada acceso a un objeto debe comprobar que la identidad actual puede operar precisamente sobre ese recurso.'],
  [/siem|correlación/, 'Un SIEM centraliza eventos y aplica reglas de correlación; una alerta sigue necesitando contexto y verificación humana.'],
  [/threat modeling/, 'El modelado de amenazas identifica activos, límites de confianza, posibles abusos y controles antes de que el sistema esté terminado.'],
  [/null safety/, 'La null safety de Kotlin distingue tipos anulables y obliga a tratar la ausencia antes de usar el valor.'],
  [/data classes/, 'Una data class genera operaciones habituales para objetos cuyo propósito principal es transportar datos.'],
  [/composables|jetpack compose/, 'Compose declara la interfaz como función del estado y recompone las partes afectadas cuando ese estado cambia.'],
  [/viewmodel|repositorios/, 'ViewModel conserva estado de pantalla y el repositorio separa el acceso a datos de la interfaz.'],
  [/room/, 'Room añade comprobaciones y un modelo estructurado sobre SQLite, con entidades, DAO y migraciones explícitas.'],
  [/widgets y estado|dart y flutter/, 'Flutter compone la interfaz con widgets inmutables y reconstruye las partes dependientes cuando cambia el estado.'],
  [/react native|componentes nativos/, 'React Native expresa vistas con componentes de React que se conectan con capacidades nativas de cada plataforma.'],
  [/unitarias, integración|pirámide de pruebas/, 'Las unitarias aíslan reglas, las de integración verifican colaboraciones y las E2E recorren el sistema completo con mayor coste.'],
  [/particiones|valores límite/, 'Las particiones agrupan entradas equivalentes y los valores límite atacan los puntos donde suele cambiar el comportamiento.'],
  [/reproducibilidad|informes útiles|gestión de bugs/, 'Un bug útil incluye entorno, precondiciones, pasos mínimos, resultado esperado, resultado real y evidencia sin datos sensibles.'],
  [/regresión|exploratorias/, 'La regresión confirma que lo conocido sigue funcionando; la exploración combina aprendizaje, diseño y ejecución para descubrir riesgos nuevos.'],
  [/matchers|mocks|fixtures/, 'Los matchers expresan resultados, las fixtures preparan datos y los mocks deben reservarse para límites cuya interacción importa.'],
  [/selectores estables|aserciones/, 'Una prueba E2E fiable localiza elementos por su rol o contrato visible y espera estados observables, no tiempos arbitrarios.'],
  [/flaky|aislamiento/, 'Una prueba intermitente suele esconder dependencia de tiempo, orden, red o estado compartido y debe corregirse, no reintentarse sin límite.'],
  [/dns, tcp\/ip|puertos|firewalls/, 'DNS resuelve nombres, IP enruta paquetes, TCP aporta entrega ordenada y el firewall limita tráfico según origen, destino y puerto.'],
  [/máquinas virtuales|contenedores/, 'Una máquina virtual incluye un sistema invitado; un contenedor comparte el kernel y aísla procesos con menor sobrecarga.'],
  [/bloques, objetos|volúmenes/, 'El almacenamiento de bloques ofrece dispositivos, el de objetos usa claves y metadatos, y los volúmenes aportan persistencia montable.'],
  [/iaas|paas|saas/, 'IaaS entrega infraestructura, PaaS una plataforma gestionada y SaaS una aplicación terminada; cambia cuánto opera el cliente.'],
  [/regiones y zonas/, 'Una región agrupa ubicaciones y las zonas aíslan fallos; distribuir recursos mejora resiliencia pero añade coste y complejidad.'],
  [/balanceo|autoescalado/, 'El balanceador reparte tráfico entre instancias sanas y el autoescalado ajusta capacidad usando señales y límites definidos.'],
  [/presupuestos|etiquetas/, 'Las etiquetas atribuyen consumo y los presupuestos alertan antes del exceso; una alerta no impide automáticamente el gasto.'],
  [/update|tiempo delta|game loop/, 'El game loop actualiza estado y dibuja repetidamente; multiplicar movimiento por delta time evita depender de los fotogramas por segundo.'],
  [/vectores|transformaciones/, 'Los vectores representan dirección y magnitud; las transformaciones combinan posición, rotación y escala en distintos espacios.'],
  [/colisiones|físicas/, 'Una colisión detecta contacto; la respuesta física depende de cuerpos, capas, materiales y del paso temporal de simulación.'],
  [/hud|menús|audio y feedback/, 'La interfaz y el sonido convierten cambios internos en señales perceptibles y deben confirmar acciones sin saturar al jugador.'],
  [/blueprints/, 'Blueprints modela lógica visual basada en nodos y eventos; conviene dividirla en funciones y contratos igual que el código.'],
  [/punteros inteligentes|referencias/, 'Las referencias expresan un alias válido y los punteros inteligentes hacen explícita la propiedad y duración de un objeto.'],
  [/behavior trees|lod|profiling/, 'El profiling localiza el coste real; LOD reduce detalle a distancia y un Behavior Tree organiza decisiones de IA jerárquicas.'],
  [/server y client components/, 'Los Server Components reducen JavaScript enviado y acceden a recursos del servidor; los Client Components manejan interacción del navegador.'],
  [/orm/, 'Un ORM traduce operaciones entre objetos y tablas, pero no elimina la necesidad de entender transacciones, consultas e índices.'],
  [/cookies seguras|sesiones y roles/, 'Una cookie de sesión debe usar HttpOnly, Secure y SameSite adecuados; el servidor sigue comprobando el rol en cada operación.'],
  [/server actions|mutaciones/, 'Una mutación del servidor debe validar entrada, autenticar, autorizar, aplicar el cambio de forma atómica y devolver errores controlados.'],
  [/separar ui|arquitectura por capas/, 'Las capas aíslan interfaz, reglas y datos mediante dependencias dirigidas, permitiendo cambiar detalles sin contaminar el dominio.'],
  [/caché|paginación/, 'La caché intercambia frescura por velocidad y la paginación limita trabajo; ambas necesitan claves y criterios de orden estables.'],
  [/observabilidad/, 'La observabilidad combina logs, métricas y trazas para explicar el estado interno a partir de señales externas correlacionadas.'],
  [/solid|responsabilidades/, 'SOLID orienta dependencias y responsabilidades para que el código pueda cambiar sin propagar efectos innecesarios.'],
  [/factory|strategy|observer|patrones de diseño/, 'Un patrón nombra una solución recurrente: Factory crea, Strategy intercambia algoritmos y Observer notifica cambios.'],
  [/code smells|legibilidad|refactorización/, 'Refactorizar cambia la estructura sin cambiar el comportamiento y se apoya en nombres claros, pasos pequeños y pruebas.'],
  [/monolito|microservicios/, 'Un monolito simplifica despliegue y consistencia; microservicios aíslan despliegues a cambio de red, operación y datos distribuidos.'],
  [/colas|límites de dominio/, 'Una cola desacopla productores y consumidores; el límite de dominio define qué modelo y reglas pertenecen juntos.'],
  [/diagramas|adr/, 'Un ADR registra contexto, decisión y consecuencias; un diagrama útil muestra la vista necesaria sin fingir un detalle que no se mantiene.'],
  [/kanban|scrum/, 'Kanban limita trabajo en curso y optimiza flujo; Scrum organiza trabajo en iteraciones con responsabilidades y eventos definidos.'],
  [/releases|rollbacks|postmortem/, 'Una entrega fiable permite detectar impacto, detener cambios y volver atrás; el postmortem busca aprendizaje sistémico sin culpas.'],
];

const factFor = (topic) => {
  const normalized = clean(topic).toLocaleLowerCase('es');
  return topicFacts.find(([pattern]) => pattern.test(normalized))?.[1]
    ?? `Dominar ${clean(topic)} exige entender qué problema resuelve, aplicarlo en un caso mínimo y comprobar sus límites.`;
};

const focusDescription = (topic, lessonTitle) =>
  `**${clean(topic)}** es uno de los objetivos de «${lessonTitle}». ${factFor(topic)} ` +
  'Estúdialo desde el problema que resuelve: identifica sus entradas, el resultado esperado, sus límites y un caso en el que no conviene aplicarlo. ' +
  'Después llévalo a un ejemplo pequeño que puedas observar y explicar paso a paso.';

const practiceDescription = (topic, project) =>
  project
    ? `En el proyecto aplicarás **${clean(topic)}** en un entregable verificable. Divide el trabajo en una versión mínima, una comprobación objetiva y una mejora. Documenta las decisiones y no incluyas datos sensibles ni credenciales.`
    : `Para practicar **${clean(topic)}**, empieza por el caso más sencillo, predice el resultado antes de ejecutarlo y cambia una sola condición cada vez. Comprueba también un caso límite: entender por qué falla forma parte del aprendizaje.`;

export function expandedLesson(title, topics) {
  const [first, second = first] = topics;
  const project = topics.some((topic) => topic.startsWith('[Proyecto]')) || /proyecto/i.test(title);
  const firstClean = clean(first);
  const secondClean = clean(second);

  return lesson(
    title,
    [
      card(firstClean, focusDescription(first, title)),
      card(secondClean, focusDescription(second, title)),
      card(
        project ? 'Construye, verifica y explica' : 'Método de práctica',
        practiceDescription(project ? second : first, project)
      ),
    ],
    [
      choice(
        `¿Qué afirmación describe correctamente «${firstClean}»?`,
        [factFor(first), 'Elimina la necesidad de validar entradas y resultados.', 'Solo es útil si se aplica a todos los problemas.', 'Garantiza que un sistema nunca tendrá errores.'],
        0,
        { explanation: factFor(first) }
      ),
      fill(
        'Completa el segundo foco de la lección.',
        'Segundo foco: ___',
        secondClean,
        [secondClean, 'Una tarea sin criterio de éxito', 'Una solución sin pruebas', 'Un cambio sin documentar'],
        { explanation: `${secondClean} completa el objetivo de la lección y se practica junto con ${firstClean}.` }
      ),
      match(
        'Relaciona cada foco con el momento en que debes trabajarlo.',
        [
          [firstClean, factFor(first)],
          [secondClean, factFor(second) === factFor(first) ? `${factFor(second)} En este caso se aplica al segundo foco de la lección.` : factFor(second)],
        ],
        { explanation: `La relación correcta distingue el propósito de ${firstClean} del de ${secondClean}.` }
      ),
      order(
        'Ordena una práctica técnica fiable.',
        ['Definir el resultado esperado', 'Crear el caso mínimo', 'Ejecutar y observar', 'Probar un caso límite', 'Explicar la conclusión'],
        { explanation: 'Definir primero el criterio de éxito permite saber si la práctica realmente funciona.' }
      ),
      choice(
        project ? '¿Qué demuestra mejor que el proyecto está terminado?' : '¿Qué hábito produce un aprendizaje más sólido?',
        project
          ? ['Un entregable reproducible con pruebas y decisiones documentadas', 'Una captura sin contexto', 'Código que nadie ha ejecutado', 'Credenciales incluidas en el repositorio']
          : ['Predecir, probar y explicar también los casos límite', 'Copiar el resultado sin ejecutarlo', 'Evitar cualquier error', 'Memorizar una única solución'],
        0,
        {
          explanation: project
            ? 'Un proyecto es verificable cuando otra persona puede ejecutarlo, revisar sus pruebas y entender sus decisiones.'
            : 'La predicción y los casos límite revelan si entiendes el concepto más allá del ejemplo feliz.',
        }
      ),
    ]
  );
}

export const expandedUnit = (title, description, lessons) =>
  unit(title, description, lessons.map(([lessonTitle, ...topics]) => expandedLesson(lessonTitle, topics)));

export const expandedCourse = ({ id, title, icon, color, level, description, units }) => ({
  id,
  title,
  icon,
  color,
  level,
  description,
  units: units.map(([unitTitle, unitDescription, lessons]) => expandedUnit(unitTitle, unitDescription, lessons)),
});

export function addTopicToLesson(course, lessonTitle, topic) {
  const target = course.units.flatMap((entry) => entry.lessons).find((entry) => entry.title === lessonTitle);
  if (!target) throw new Error(`No se encontró la lección «${lessonTitle}» en ${course.id}`);

  target.theory.push(card(clean(topic), focusDescription(topic, lessonTitle)));
  target.exercises.push(
    choice(
      `¿Qué idea nueva completa «${lessonTitle}»?`,
      [clean(topic), 'Ignorar los casos límite', 'Guardar secretos en el código', 'Aplicar cambios sin comprobarlos'],
      0,
      { explanation: `${clean(topic)} amplía la lección y debe practicarse con un ejemplo pequeño y verificable.` }
    )
  );
}
