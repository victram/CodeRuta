import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ciber-profesional',
  title: 'Ciberseguridad: Profesional',
  icon: '🕵️',
  color: '#364fc7',
  level: 'Nivel 3',
  description: 'Hacking ético, OWASP Top 10, DevSecOps, monitorización y respuesta a incidentes.',
  units: [
    unit('Hacking ético', 'Marco legal, metodología de pentesting y análisis de vulnerabilidades.', [
      lesson(
        'Ética y marco legal',
        [
          card('Sin autorización, es delito', 'El **hacking ético** usa técnicas de ataque para **mejorar la defensa**, siempre con **permiso por escrito** del propietario.\n\nAntes de empezar se firma un acuerdo con el **alcance** (qué sistemas, qué técnicas, en qué fechas) y unas **reglas de enfrentamiento**. Atacar sistemas sin autorización es ilegal (en España, Código Penal art. 197 bis y siguientes), aunque "solo mires".'),
          card('Dónde practicar legalmente', '- **Laboratorios propios**: máquinas virtuales en tu PC\n- Plataformas de práctica: **Hack The Box**, **TryHackMe**, **PortSwigger Web Security Academy**, OWASP Juice Shop\n- **Bug bounty** (HackerOne, Intigriti): empresas que invitan y pagan por encontrar fallos, según sus reglas\n- **Divulgación responsable**: si encuentras un fallo, avisa al propietario y dale tiempo a arreglarlo antes de hacerlo público'),
        ],
        [
          choice('¿Qué necesitas SIEMPRE antes de hacer una prueba de intrusión?', ['Un buen portátil', 'Autorización por escrito del propietario y un alcance definido', 'Una VPN', 'Nada si es para aprender'], 1),
          choice('Encuentras una vulnerabilidad en la web de una empresa sin buscarla. Lo correcto es…', ['Publicarla en redes', 'Avisar a la empresa de forma responsable', 'Explotarla para demostrarla', 'Venderla'], 1),
          match('Une cada concepto', [['Alcance', 'Qué sistemas y técnicas están permitidos'], ['Bug bounty', 'Programa que paga por encontrar fallos'], ['Divulgación responsable', 'Avisar antes de publicar'], ['Laboratorio', 'Entorno propio para practicar']]),
          choice('¿Dónde puedes practicar hacking de forma legal?', ['En la web de tu banco', 'En plataformas como TryHackMe o Hack The Box', 'En el Wi-Fi del vecino', 'En la web de tu instituto'], 1),
          choice('Un programa de bug bounty excluye el ataque DoS. Si lo haces…', ['Te pagan más', 'Incumples las reglas y puede ser ilegal', 'No pasa nada', 'Es lo esperado'], 1),
        ]
      ),
      lesson(
        'Metodología de pentesting',
        [
          card('Las fases', '1. **Planificación**: alcance y permisos\n2. **Reconocimiento**: reunir información pública (OSINT)\n3. **Escaneo y enumeración**: qué equipos, puertos y servicios hay\n4. **Análisis y explotación** controlada de vulnerabilidades, dentro del alcance\n5. **Post-explotación**: qué impacto real tendría\n6. **Informe**: hallazgos, riesgo y cómo corregirlos (la parte más importante para el cliente)'),
          card('Herramientas del oficio', '- **Nmap**: descubrir equipos y puertos abiertos\n- **Wireshark**: analizar el tráfico de red\n- **Burp Suite / OWASP ZAP**: interceptar y probar aplicaciones web\n- **Metasploit**: framework para verificar vulnerabilidades conocidas\n- **Kali Linux**: distribución que reúne estas herramientas\n\nSe usan **solo** contra sistemas propios o autorizados.'),
        ],
        [
          order('Ordena las fases de un pentest', ['Planificación y permisos', 'Reconocimiento', 'Escaneo y enumeración', 'Explotación controlada', 'Informe']),
          match('Une cada herramienta con su uso', [['Nmap', 'Descubrir puertos y servicios'], ['Wireshark', 'Analizar tráfico de red'], ['Burp Suite', 'Probar aplicaciones web'], ['Kali Linux', 'Distribución con herramientas de seguridad']]),
          choice('¿Qué es OSINT?', ['Un virus', 'Inteligencia a partir de fuentes públicas', 'Un firewall', 'Un lenguaje'], 1),
          choice('¿Qué es lo más valioso que entrega un pentester al cliente?', ['Capturas de pantalla', 'Un informe con hallazgos, riesgo y cómo corregirlos', 'Las contraseñas', 'Un vídeo'], 1),
          choice('¿Diferencia entre pentest de caja negra y caja blanca?', ['El color', 'En caja negra no tienes información interna; en caja blanca sí (código, arquitectura)', 'Ninguna', 'Caja blanca es ilegal'], 1),
        ]
      ),
      lesson(
        'OWASP Top 10 y vulnerabilidades',
        [
          card('Los fallos más críticos en webs', '**OWASP Top 10** recopila los riesgos más importantes en aplicaciones web:\n\n- **Control de acceso roto**: ver o cambiar datos de otros usuarios (`/pedidos/124` en vez del tuyo)\n- **Fallos criptográficos**: datos sensibles sin cifrar\n- **Inyección** (SQL, comandos)\n- **Configuración insegura**: contraseñas por defecto, errores detallados\n- **Componentes vulnerables**: librerías sin actualizar\n- **SSRF**: hacer que el servidor haga peticiones a sitios internos'),
          card('CVE y CVSS', 'Cada vulnerabilidad pública recibe un identificador **CVE** (ej. `CVE-2021-44228`, Log4Shell). Su gravedad se puntúa con **CVSS** de 0 a 10:\n\n- 0,1-3,9 **Baja** · 4-6,9 **Media** · 7-8,9 **Alta** · 9-10 **Crítica**\n\nHerramientas: **SAST** (analiza el código), **DAST** (prueba la app en marcha), escáneres de dependencias (`npm audit`, Dependabot).'),
        ],
        [
          choice('Cambias /api/facturas/100 por /api/facturas/101 y ves la factura de otra persona. Es…', ['XSS', 'Control de acceso roto', 'Un DDoS', 'Phishing'], 1, { explanation: 'El servidor debe comprobar en cada petición que el recurso pertenece al usuario.' }),
          reto(
            'Escribe severidad(cvss): "Ninguna" si es 0, "Baja" hasta 3.9, "Media" hasta 6.9, "Alta" hasta 8.9 y "Crítica" de 9 a 10.',
            `function severidad(cvss) {\n  \n}`,
            [['severidad(0)', 'Ninguna'], ['severidad(3.1)', 'Baja'], ['severidad(5)', 'Media'], ['severidad(7.5)', 'Alta'], ['severidad(10)', 'Crítica']],
            `function severidad(cvss) {\n  if (cvss === 0) return "Ninguna";\n  if (cvss < 4) return "Baja";\n  if (cvss < 7) return "Media";\n  if (cvss < 9) return "Alta";\n  return "Crítica";\n}`
          ),
          match('Une cada vulnerabilidad', [['Control de acceso roto', 'Acceder a datos de otros'], ['Componentes vulnerables', 'Librerías sin actualizar'], ['Configuración insegura', 'Contraseñas por defecto'], ['SSRF', 'El servidor hace peticiones internas']]),
          match('Une cada herramienta', [['SAST', 'Analiza el código fuente'], ['DAST', 'Prueba la app en ejecución'], ['npm audit', 'Revisa dependencias'], ['CVE', 'Identificador de una vulnerabilidad']]),
          choice('¿Qué hace una buena defensa contra componentes vulnerables?', ['No usar librerías', 'Actualizar dependencias y escanearlas en CI', 'Ocultar el package.json', 'Nada'], 1),
        ]
      ),
    ]),
    unit('Defensa y respuesta', 'DevSecOps y nube, monitorización y respuesta a incidentes.', [
      lesson(
        'DevSecOps y la nube',
        [
          card('Seguridad desde el principio', '**DevSecOps** integra la seguridad en todo el ciclo de desarrollo (*shift left*): revisión de código, SAST y escaneo de dependencias en el **pipeline de CI**, imágenes Docker mínimas y escaneadas.\n\nLos **secretos** (claves, contraseñas) van en un gestor de secretos o variables de entorno, nunca en Git. Si se sube uno por error: **revócalo** y genera otro.'),
          card('Nube y Zero Trust', '- **Modelo de responsabilidad compartida**: el proveedor asegura la infraestructura; tú, tu configuración y tus datos\n- **IAM**: roles con mínimo privilegio; nada de usar la cuenta raíz a diario\n- Buckets y bases de datos **no públicos** por defecto\n- **Zero Trust**: "nunca confíes, verifica siempre", aunque la petición venga de dentro de la red'),
        ],
        [
          choice('Subes por error una clave de API a GitHub. ¿Qué haces primero?', ['Borrar el commit y olvidarlo', 'Revocar la clave y generar una nueva', 'Hacer el repo privado y ya', 'Nada'], 1, { explanation: 'Aunque borres el commit, la clave pudo ser copiada en segundos por bots que vigilan GitHub.' }),
          choice('¿Qué significa shift left?', ['Mover el código a la izquierda', 'Llevar la seguridad a las primeras fases del desarrollo', 'Usar más pantallas', 'Despedir al equipo de seguridad'], 1),
          match('Une cada concepto', [['Zero Trust', 'Verificar siempre, también dentro de la red'], ['IAM', 'Gestión de identidades y permisos'], ['Responsabilidad compartida', 'Proveedor y cliente aseguran partes distintas'], ['Gestor de secretos', 'Guardar claves fuera del código']]),
          choice('¿Quién es responsable de que un bucket de almacenamiento no sea público?', ['Siempre el proveedor', 'Tú (el cliente), con tu configuración', 'Nadie', 'Los usuarios'], 1),
          choice('¿Qué añadirías al pipeline de CI para DevSecOps?', ['Más tiempo de espera', 'Escaneo de dependencias y análisis SAST', 'Desactivar los tests', 'Subir las claves'], 1),
        ]
      ),
      lesson(
        'Monitorización y detección',
        [
          card('Ver lo que pasa', '- **Logs**: registros de accesos, errores y acciones (¡sin guardar contraseñas en ellos!)\n- **SIEM** (Splunk, Elastic, Microsoft Sentinel): centraliza y correlaciona logs para detectar ataques\n- **IDS / IPS**: detectan / bloquean tráfico malicioso\n- **EDR**: protección avanzada en los equipos\n- **SOC**: el equipo que vigila 24/7'),
          card('Indicadores de ataque', 'Ejemplos de patrones sospechosos:\n\n- Muchos logins fallidos desde la misma IP (**fuerza bruta**)\n- Accesos a horas o países inusuales\n- Un usuario descargando volúmenes de datos anormales\n- Procesos desconocidos conectándose a internet\n\nUn **IOC** (indicador de compromiso) es una prueba concreta: una IP, un hash de malware, un dominio.'),
        ],
        [
          match('Une cada herramienta', [['SIEM', 'Centraliza y correlaciona logs'], ['IDS', 'Detecta tráfico malicioso'], ['IPS', 'Bloquea tráfico malicioso'], ['SOC', 'Equipo que vigila 24/7']]),
          reto(
            'Detecta fuerza bruta: ipsSospechosas(logs, limite) recibe eventos { ip, ok } y devuelve las IPs con al menos limite intentos fallidos (ok: false), en el orden en que alcanzan el límite.',
            `function ipsSospechosas(logs, limite) {\n  const fallos = {};\n  const res = [];\n  // cuenta los fallos por IP\n  return res;\n}`,
            [
              ['ipsSospechosas([{ ip: "1.1.1.1", ok: false }, { ip: "1.1.1.1", ok: false }, { ip: "2.2.2.2", ok: true }, { ip: "1.1.1.1", ok: false }], 3)', ['1.1.1.1']],
              ['ipsSospechosas([{ ip: "a", ok: false }, { ip: "b", ok: false }, { ip: "b", ok: false }, { ip: "a", ok: false }], 2)', ['b', 'a']],
              ['ipsSospechosas([{ ip: "x", ok: true }], 1)', []],
            ],
            `function ipsSospechosas(logs, limite) {\n  const fallos = {};\n  const res = [];\n  for (const e of logs) {\n    if (e.ok) continue;\n    fallos[e.ip] = (fallos[e.ip] || 0) + 1;\n    if (fallos[e.ip] === limite) res.push(e.ip);\n  }\n  return res;\n}`,
            { hint: 'Ignora los eventos ok. Cuenta fallos[e.ip] y, justo cuando llegue a limite, añade la IP al resultado.' }
          ),
          choice('¿Qué NUNCA debe aparecer en un log?', ['La hora', 'Contraseñas o datos de tarjetas', 'La IP', 'El código de estado'], 1),
          choice('¿Qué es un IOC?', ['Un tipo de cifrado', 'Una prueba concreta de compromiso (IP, hash, dominio)', 'Un lenguaje', 'Un antivirus'], 1),
          choice('Un empleado de contabilidad descarga 50 GB a las 3 de la mañana. Es…', ['Normal', 'Un comportamiento anómalo a investigar', 'Una actualización', 'Un backup oficial seguro'], 1),
        ]
      ),
      lesson(
        'Respuesta a incidentes y carrera',
        [
          card('Cuando pasa lo peor', 'Las fases de la respuesta a incidentes (NIST / SANS):\n\n1. **Preparación**: plan, contactos, copias, simulacros\n2. **Identificación**: confirmar qué pasa y su alcance\n3. **Contención**: aislar los equipos afectados para que no se extienda\n4. **Erradicación**: eliminar la causa (malware, cuenta comprometida)\n5. **Recuperación**: restaurar desde copias y vigilar\n6. **Lecciones aprendidas**: qué mejorar\n\nConserva las **evidencias** (análisis forense) y, si hay datos personales, notifica a la autoridad (en la UE, en 72 h según el RGPD).'),
          card('Carrera en ciberseguridad', '- **Roles**: analista SOC, pentester, ingeniero/a de seguridad cloud, AppSec, respuesta a incidentes, GRC (normativa y riesgos)\n- **Certificaciones**: CompTIA Security+ (inicio), eJPT, CEH, OSCP (pentesting práctico), CISSP (gestión)\n- **Practica**: CTFs, laboratorios, y publica lo que aprendes (blog, GitHub)'),
        ],
        [
          order('Ordena las fases de respuesta a incidentes', ['Preparación', 'Identificación', 'Contención', 'Erradicación', 'Recuperación', 'Lecciones aprendidas']),
          choice('Un portátil tiene ransomware. ¿Qué haces primero?', ['Pagar', 'Aislarlo de la red (contención)', 'Formatearlo sin más', 'Avisar por redes sociales'], 1),
          choice('Si un incidente expone datos personales en la UE, hay que notificar a la autoridad en…', ['72 horas', '1 año', 'Nunca', '1 minuto'], 0),
          match('Une cada rol con su trabajo', [['Analista SOC', 'Vigilar y responder alertas'], ['Pentester', 'Atacar con permiso para encontrar fallos'], ['AppSec', 'Seguridad en el desarrollo de software'], ['GRC', 'Normativa, riesgos y cumplimiento']]),
          match('Une cada certificación', [['Security+', 'Fundamentos para empezar'], ['OSCP', 'Pentesting práctico'], ['CISSP', 'Gestión de seguridad'], ['eJPT', 'Pentesting junior']]),
        ]
      ),
    ]),
  ],
};
