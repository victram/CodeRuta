import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ia-negocio',
  title: 'Gana dinero con IA',
  icon: '💸',
  color: '#2f9e44',
  level: 'Intermedio',
  description: 'Modelos de negocio reales con IA: servicios, productos, precios y clientes. Sin humo.',
  units: [
    unit('Oportunidades reales', 'Qué se puede vender con IA y cómo empezar.', [
      lesson(
        'Modelos de negocio con IA',
        [
          card('Sin humo', 'La IA no da dinero "sola": da dinero **resolver un problema** a alguien que paga por ello. La IA es la herramienta que te permite hacerlo **más rápido o más barato**.\n\nDesconfía de quien promete "ingresos pasivos sin esfuerzo".'),
          card('Formas habituales', '- **Servicios**: automatizaciones, chatbots o integraciones para empresas (freelance o agencia)\n- **Productos**: una app o SaaS que usa IA por dentro\n- **Contenido y formación**: cursos, newsletters, plantillas\n- **Empleo**: perfiles muy demandados (ingeniería de IA, datos, automatización)'),
        ],
        [
          choice('¿Qué genera ingresos de verdad?', ['Usar IA sin más', 'Resolver un problema por el que alguien paga', 'Tener muchas herramientas', 'Publicar mucho en redes'], 1),
          match('Une cada modelo con un ejemplo', [['Servicio', 'Montar un chatbot para una clínica'], ['Producto SaaS', 'App de suscripción que resume reuniones'], ['Contenido', 'Curso sobre automatización'], ['Empleo', 'Ingeniero/a de IA en una empresa']]),
          choice('Alguien promete "gana 10.000 €/mes sin trabajar con IA". ¿Qué piensas?', ['Es real', 'Es una señal de alarma: probablemente vende humo', 'Hay que pagarle ya', 'Es fácil'], 1),
          choice('¿Qué ventaja da la IA a un negocio?', ['Elimina la necesidad de clientes', 'Hacer tareas más rápido o barato', 'Hace legal cualquier cosa', 'Garantiza el éxito'], 1),
          choice('Para empezar con poco riesgo, suele ser mejor…', ['Crear una gran startup desde el día 1', 'Ofrecer un servicio a pocos clientes y aprender de ellos', 'Pedir un préstamo grande', 'Esperar a la IA perfecta'], 1),
        ]
      ),
      lesson(
        'Servicios de automatización',
        [
          card('Lo que piden las empresas', 'Las pymes pierden horas en tareas repetitivas. Servicios muy demandados:\n\n- **Atención al cliente**: chatbot con RAG sobre sus preguntas frecuentes\n- **Automatización de procesos**: leer facturas, clasificar emails, rellenar CRMs\n- **Contenido**: descripciones de productos, traducciones, posts (siempre revisados)\n- **Análisis**: resúmenes de encuestas, informes automáticos'),
          card('Herramientas', 'No siempre hace falta programar: **n8n**, **Make** o **Zapier** conectan apps y modelos de IA con bloques visuales. Si sabes programar, puedes ofrecer soluciones a medida con APIs.'),
        ],
        [
          choice('¿Qué servicio encaja mejor para una tienda con muchas preguntas repetidas?', ['Un videojuego', 'Un chatbot con sus preguntas frecuentes (RAG)', 'Un logo nuevo', 'Un servidor físico'], 1),
          match('Une cada herramienta', [['n8n', 'Automatizaciones visuales (autoalojable)'], ['Zapier', 'Conectar apps sin código'], ['API de un LLM', 'Soluciones a medida con código'], ['RAG', 'Responder con documentos del cliente']]),
          choice('Un cliente quiere publicar textos generados por IA sin revisarlos. Le recomiendas…', ['Publicarlos tal cual', 'Revisión humana antes de publicar', 'No usar IA nunca', 'Copiar a la competencia'], 1),
          reto(
            'Calcula el ahorro de tu automatización: ahorroMensual(horasSemana, costeHora). Usa 4 semanas al mes.',
            `function ahorroMensual(horasSemana, costeHora) {\n  \n}`,
            [['ahorroMensual(5, 20)', 400], ['ahorroMensual(10, 15)', 600], ['ahorroMensual(0, 30)', 0]],
            `function ahorroMensual(horasSemana, costeHora) {\n  return horasSemana * 4 * costeHora;\n}`,
            { explanation: 'Vender el ahorro en euros ("te ahorro 400 €/mes") convence mucho más que hablar de tecnología.' }
          ),
          choice('¿Cómo presentas mejor tu servicio a una empresa?', ['"Uso los mejores modelos"', '"Te ahorro 20 horas al mes en facturación"', '"Es IA de última generación"', '"Es muy complejo"'], 1),
        ]
      ),
      lesson(
        'Crear un micro-SaaS con IA',
        [
          card('Pequeño y enfocado', 'Un **micro-SaaS** es un producto de software pequeño, de nicho, que se paga por suscripción. Ej: generador de descripciones para tiendas de Etsy, resumen de reuniones para abogados, corrector de CVs.\n\nCuanto más concreto el nicho, más fácil encontrar clientes.'),
          card('El stack', 'Con lo que aprendes en esta app ya puedes construir uno:\n\n- **Frontend**: React\n- **Backend**: Node o Spring Boot + base de datos\n- **IA**: API de un modelo (en el servidor)\n- **Pagos**: un proveedor como Stripe\n- **Despliegue**: Docker + la nube\n\nEmpieza con un **MVP**: la versión mínima que resuelve el problema.'),
        ],
        [
          choice('¿Qué es un MVP?', ['El mejor jugador', 'La versión mínima que ya resuelve el problema', 'Un tipo de base de datos', 'Una métrica'], 1),
          choice('¿Qué idea de micro-SaaS es más prometedora?', ['"Una IA para todo el mundo"', '"Generador de informes de visita para inspectores de seguros"', '"Otro ChatGPT"', '"Una red social nueva"'], 1),
          order('Ordena los pasos para lanzar', ['Elegir un nicho con un problema claro', 'Hablar con clientes potenciales', 'Construir un MVP', 'Cobrar a los primeros clientes', 'Mejorar con su feedback']),
          match('Une cada pieza del stack', [['React', 'Interfaz'], ['Spring Boot / Node', 'Backend'], ['Stripe', 'Pagos'], ['Docker', 'Despliegue']]),
          choice('¿Dónde se llama a la API del modelo en tu SaaS?', ['En el navegador del cliente con tu clave', 'En tu servidor', 'En el email', 'Da igual'], 1),
        ]
      ),
    ]),
    unit('De la idea al cliente', 'Validar, poner precio y hacerlo de forma legal y ética.', [
      lesson(
        'Validar la idea',
        [
          card('Antes de programar', 'El error más común: pasar meses construyendo algo que nadie quiere. Valida primero:\n\n- **Habla** con 10-20 posibles clientes sobre su problema (no sobre tu idea)\n- Crea una **landing page** y mide si se apuntan\n- Consigue **preventas** o un primer cliente que pague\n\nSi nadie paga, no es (todavía) un negocio.'),
          card('Encontrar clientes', '- Tu red de contactos y LinkedIn\n- Comunidades del nicho (foros, grupos)\n- Contenido útil que muestre lo que sabes hacer\n- Un **portfolio** con casos reales (aunque los primeros sean pequeños)'),
        ],
        [
          choice('¿Cuál es la mejor señal de que una idea funciona?', ['Que a tus amigos les guste', 'Que alguien pague por ella', 'Que sea técnicamente difícil', 'Que tenga IA'], 1),
          choice('En una entrevista con un posible cliente deberías preguntar sobre…', ['Si le gusta tu idea', 'Su problema y cómo lo resuelve hoy', 'Su color favorito', 'Su sueldo'], 1),
          order('Ordena la validación', ['Identificar un problema', 'Hablar con clientes potenciales', 'Landing page o propuesta', 'Conseguir la primera venta']),
          choice('¿Qué es una landing page?', ['Un aeropuerto', 'Una página que presenta la oferta y recoge interesados', 'Un servidor', 'Un tipo de IA'], 1),
          choice('Para tus primeros clientes de servicios, ¿qué ayuda más?', ['Un logo caro', 'Casos reales en un portfolio', 'Muchos seguidores falsos', 'Bajar precios a 0 para siempre'], 1),
        ]
      ),
      lesson(
        'Precios y costes',
        [
          card('Calcula tus costes', 'Con IA tienes **costes variables**: cada llamada al modelo cuesta (tokens). Calcula cuánto te cuesta cada cliente al mes y asegúrate de que el precio deja **margen**.', `coste por cliente = llamadas al mes × coste por llamada\nmargen = (precio − coste) / precio`),
          card('Poner precio', '- Cobra por el **valor** que aportas, no por tus horas o tokens\n- Planes por niveles (básico / pro) con **límites de uso**\n- Proyectos de servicios: precio cerrado + mantenimiento mensual\n- No compitas solo por ser el más barato'),
        ],
        [
          reto(
            'Calcula el margen de tu SaaS: margen(precio, coste) = (precio − coste) / precio, redondeado a 2 decimales.',
            `function margen(precio, coste) {\n  // Math.round(x * 100) / 100 para 2 decimales\n}`,
            [['margen(20, 5)', 0.75], ['margen(10, 10)', 0], ['margen(30, 10)', 0.67]],
            `function margen(precio, coste) {\n  return Math.round(((precio - coste) / precio) * 100) / 100;\n}`
          ),
          choice('Cada cliente hace 1.000 llamadas al mes a 0,002 € cada una. ¿Coste por cliente?', ['0,2 €', '2 €', '20 €', '200 €'], 1),
          choice('¿Por qué poner límites de uso en los planes?', ['Para molestar', 'Para que un cliente que usa muchísimo no te cueste más de lo que paga', 'Es obligatorio', 'No hace falta'], 1),
          choice('¿Cómo es mejor fijar el precio de una automatización que ahorra 1.000 €/mes?', ['Por las horas que tardaste', 'En relación al valor que aporta', 'Lo más barato posible', 'Gratis'], 1),
          match('Une cada concepto', [['Coste variable', 'Tokens por uso'], ['Margen', 'Lo que te queda tras los costes'], ['Plan por niveles', 'Básico / Pro'], ['Mantenimiento', 'Cuota mensual de soporte']]),
        ]
      ),
      lesson(
        'Legal, ética y reputación',
        [
          card('Haz las cosas bien', '- **Protección de datos** (RGPD en Europa): informa qué datos tratas y con qué proveedores\n- Revisa los **términos de uso** de cada modelo: qué puedes hacer y si puedes revenderlo\n- **Derechos de autor**: no vendas contenido que copie obras o marcas ajenas\n- **Factura** y declara tus ingresos (autónomo o empresa)'),
          card('Honestidad', 'No prometas lo que la IA no puede hacer. Explica sus límites (puede equivocarse) y deja siempre una vía de **revisión humana**. Tu reputación es tu mejor activo a largo plazo.'),
        ],
        [
          choice('¿Qué ley regula los datos personales en Europa?', ['RGPD', 'HTTP', 'SQL', 'ISO 9001'], 0),
          choice('Un cliente quiere que su chatbot diga que es una persona real. ¿Qué haces?', ['Aceptar', 'Recomendar ser transparente: indicar que es un asistente de IA', 'Cobrar más', 'Ignorarlo'], 1),
          choice('Antes de revender un producto basado en un modelo, debes…', ['Nada', 'Revisar los términos de uso del proveedor', 'Cambiarle el nombre', 'Copiarlo'], 1),
          match('Une cada tema con su acción', [['Privacidad', 'Informar qué datos tratas'], ['Derechos de autor', 'No copiar obras ajenas'], ['Fiscalidad', 'Facturar y declarar'], ['Honestidad', 'Explicar los límites de la IA']]),
          choice('¿Qué protege mejor tu negocio a largo plazo?', ['Prometer resultados imposibles', 'Una reputación de trabajo honesto y fiable', 'Precios mínimos', 'Mucha publicidad'], 1),
        ]
      ),
    ]),
  ],
};
