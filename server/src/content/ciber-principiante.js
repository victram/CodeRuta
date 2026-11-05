import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ciber-principiante',
  title: 'Ciberseguridad: Principiante',
  icon: '🔐',
  color: '#1864ab',
  level: 'Nivel 2',
  description: 'Fundamentos técnicos: conceptos, redes, criptografía y seguridad web para programadores.',
  units: [
    unit('Fundamentos técnicos', 'La tríada CIA, redes y criptografía.', [
      lesson(
        'Conceptos clave',
        [
          card('La tríada CIA', 'La seguridad protege tres propiedades de la información:\n\n- **Confidencialidad**: solo la ven quienes deben\n- **Integridad**: nadie la modifica sin permiso\n- **Disponibilidad**: está accesible cuando se necesita\n\nUn ataque DDoS ataca la disponibilidad; una filtración, la confidencialidad.'),
          card('Amenaza, vulnerabilidad y riesgo', '- **Vulnerabilidad**: un punto débil (software sin actualizar)\n- **Amenaza**: quien o qué puede aprovecharlo (un atacante, un malware)\n- **Riesgo**: probabilidad × impacto de que ocurra\n\nPrincipios de diseño: **mínimo privilegio** (cada uno solo los permisos que necesita) y **defensa en profundidad** (varias capas de protección).'),
        ],
        [
          match('Une cada ataque con la propiedad que rompe', [['Filtración de datos', 'Confidencialidad'], ['Alterar una transferencia', 'Integridad'], ['DDoS que tumba la web', 'Disponibilidad'], ['Leer emails ajenos', 'Confidencialidad']]),
          match('Une cada concepto', [['Vulnerabilidad', 'Punto débil'], ['Amenaza', 'Quien puede aprovecharlo'], ['Riesgo', 'Probabilidad × impacto'], ['Parche', 'Corrige la vulnerabilidad']]),
          choice('¿Qué es el principio de mínimo privilegio?', ['Dar todos los permisos a todos', 'Dar a cada usuario solo los permisos que necesita', 'No usar contraseñas', 'Tener un solo administrador'], 1),
          choice('Firewall + antivirus + 2FA + copias de seguridad es un ejemplo de…', ['Mínimo privilegio', 'Defensa en profundidad', 'Phishing', 'Ingeniería social'], 1),
          fill('Las tres propiedades', 'Tríada ___: Confidencialidad, Integridad, Disponibilidad', 'CIA', ['CIA', 'ABC', 'SQL', 'API']),
        ]
      ),
      lesson(
        'Redes para seguridad',
        [
          card('IP, puertos y protocolos', '- Una **IP** identifica a un equipo en la red\n- Un **puerto** identifica un servicio dentro del equipo: 80 (HTTP), 443 (HTTPS), 22 (SSH), 3306 (MySQL)\n- **TCP**: conexión fiable (web, email); **UDP**: rápido sin garantías (vídeo, juegos, DNS)\n- **DNS** traduce nombres (google.com) a IPs'),
          card('Firewall y exposición', 'Un **firewall** decide qué tráfico entra y sale según reglas. Cada puerto abierto a internet es una posible puerta de entrada: abre solo lo imprescindible.\n\n❌ La base de datos accesible desde internet\n✅ Solo la API, y la base de datos en una red privada'),
        ],
        [
          match('Une cada puerto con su servicio', [['443', 'HTTPS'], ['22', 'SSH'], ['80', 'HTTP'], ['3306', 'MySQL']]),
          choice('¿Qué hace el DNS?', ['Cifra el tráfico', 'Traduce nombres de dominio a direcciones IP', 'Bloquea virus', 'Guarda contraseñas'], 1),
          choice('¿Qué protocolo es fiable y orientado a conexión?', ['UDP', 'TCP', 'DNS', 'ICMP'], 1),
          choice('Tu base de datos tiene el puerto abierto a todo internet. ¿Qué haces?', ['Nada', 'Cerrarlo y dejarla accesible solo desde la red privada o la API', 'Cambiar el nombre de la BD', 'Abrir más puertos'], 1),
          choice('¿Para qué sirve un firewall?', ['Acelerar internet', 'Filtrar el tráfico según reglas', 'Guardar copias', 'Diseñar webs'], 1),
        ]
      ),
      lesson(
        'Criptografía básica',
        [
          card('Cifrado simétrico y asimétrico', '- **Simétrico** (AES): la misma clave cifra y descifra. Muy rápido\n- **Asimétrico** (RSA, curvas elípticas): una **clave pública** para cifrar y una **privada** para descifrar\n\nHTTPS combina ambos: el asimétrico intercambia una clave, y el simétrico cifra la conversación.'),
          card('Hash', 'Un **hash** (SHA-256) convierte datos en una huella de tamaño fijo, y **no se puede revertir**. Un cambio mínimo cambia todo el hash.\n\nLas contraseñas se guardan con hashes **lentos y con sal** (bcrypt, Argon2), nunca en texto plano. La **sal** es un valor aleatorio por usuario que impide usar tablas precalculadas.\n\n⚠️ Codificar (Base64) **no** es cifrar: cualquiera lo revierte.'),
        ],
        [
          match('Une cada técnica', [['AES', 'Cifrado simétrico'], ['RSA', 'Cifrado asimétrico'], ['SHA-256', 'Hash'], ['Base64', 'Codificación (no es seguridad)']]),
          choice('¿Cómo se deben guardar las contraseñas?', ['En texto plano', 'Cifradas con AES', 'Con un hash lento y con sal (bcrypt/Argon2)', 'En Base64'], 2),
          choice('En el cifrado asimétrico, ¿qué compartes con todo el mundo?', ['La clave privada', 'La clave pública', 'Las dos', 'Ninguna'], 1),
          choice('¿Para qué sirve la sal en un hash de contraseña?', ['Para que pese menos', 'Para que dos contraseñas iguales den hashes distintos', 'Para descifrarla', 'Para comprimir'], 1),
          reto(
            'Programa el cifrado César (histórico, ¡no es seguro!): cesar(texto, n) desplaza cada letra minúscula n posiciones en el alfabeto (a-z, volviendo a la "a" tras la "z"). Lo que no sea letra minúscula se deja igual.',
            `function cesar(texto, n) {\n  let res = "";\n  for (const c of texto) {\n    // c.charCodeAt(0) da el código; "a" es 97\n  }\n  return res;\n}`,
            [['cesar("abc", 1)', 'bcd'], ['cesar("xyz", 3)', 'abc'], ['cesar("hola mundo", 13)', 'ubyn zhaqb'], ['cesar("a-b!", 2)', 'c-d!']],
            `function cesar(texto, n) {\n  let res = "";\n  for (const c of texto) {\n    if (c >= "a" && c <= "z") {\n      const pos = (c.charCodeAt(0) - 97 + n) % 26;\n      res += String.fromCharCode(97 + pos);\n    } else {\n      res += c;\n    }\n  }\n  return res;\n}`,
            { hint: 'pos = (c.charCodeAt(0) - 97 + n) % 26; y luego String.fromCharCode(97 + pos).', explanation: 'Solo hay 25 desplazamientos posibles: se rompe probándolos todos (fuerza bruta). Por eso se usa AES.' }
          ),
        ]
      ),
    ]),
    unit('Seguridad web (OWASP)', 'Inyección SQL, XSS y autenticación segura.', [
      lesson(
        'Inyección SQL',
        [
          card('Cuando el dato se convierte en código', 'Si construyes una consulta **pegando** lo que escribe el usuario, puede inyectar SQL:', `// ❌ VULNERABLE\nconst sql = "SELECT * FROM usuarios WHERE email = '" + email + "'";\n// Si email = ' OR '1'='1  → devuelve TODOS los usuarios`),
          card('La solución: consultas parametrizadas', 'Usa **parámetros** (`?`): la base de datos trata el valor siempre como dato, nunca como código. Los ORM (JPA, Prisma…) lo hacen por ti.\n\nAdemás: valida las entradas y da a la app un usuario de BD con **mínimos permisos**.', `// ✅ SEGURO\ndb.prepare("SELECT * FROM usuarios WHERE email = ?").get(email);`),
        ],
        [
          choice('¿Qué causa la inyección SQL?', ['Usar SQL', 'Concatenar datos del usuario dentro de la consulta', 'Tener muchas tablas', 'Usar índices'], 1),
          choice('¿Cuál es la defensa principal?', ['Ocultar los errores', 'Consultas parametrizadas', 'Cambiar el nombre de las tablas', 'Usar mayúsculas'], 1),
          fill('Consulta segura', 'db.prepare("SELECT * FROM productos WHERE id = ___").get(id);', '?', ['?', "' + id + '", 'id', '*']),
          choice('¿Qué código es vulnerable?', ['db.prepare("... WHERE nombre = ?").all(nombre)', '"... WHERE nombre = \'" + nombre + "\'"', 'repo.findByNombre(nombre)', 'Ninguno'], 1),
          choice('Además de parametrizar, ¿qué limita el daño si hay una inyección?', ['Un usuario de BD con permisos mínimos', 'Un logo', 'Más RAM', 'Comentarios en el código'], 0),
        ]
      ),
      lesson(
        'XSS (Cross-Site Scripting)',
        [
          card('Scripts inyectados', 'Hay **XSS** cuando una web muestra texto del usuario **como HTML** sin escaparlo. Un atacante escribe `<script>…</script>` en un comentario y se ejecuta en el navegador de quien lo lea: puede robar sesiones o datos.', `// ❌ VULNERABLE\ncomentarioDiv.innerHTML = comentario;\n\n// ✅ SEGURO\ncomentarioDiv.textContent = comentario;`),
          card('Defensas', '- **Escapar** la salida: `<` → `&lt;`, `>` → `&gt;`, etc.\n- Usar `textContent` en vez de `innerHTML`\n- Los frameworks como **React** escapan por defecto (cuidado con `dangerouslySetInnerHTML`)\n- Cabecera **Content-Security-Policy** (CSP) para limitar qué scripts se ejecutan\n- Cookies de sesión con `HttpOnly` (JS no puede leerlas)'),
        ],
        [
          choice('¿Qué es XSS?', ['Un tipo de CSS', 'Inyectar scripts que se ejecutan en el navegador de otros usuarios', 'Un error de base de datos', 'Un virus de Windows'], 1),
          choice('¿Qué es más seguro para mostrar texto del usuario?', ['innerHTML', 'textContent', 'document.write', 'eval'], 1),
          choice('¿React protege contra XSS por defecto?', ['No', 'Sí, escapa el texto, salvo con dangerouslySetInnerHTML', 'Solo en producción', 'Solo con TypeScript'], 1),
          reto(
            'Escribe escaparHTML(texto): reemplaza & por &amp;, < por &lt;, > por &gt;, " por &quot; y \' por &#39;. (¡Escapa & primero!)',
            `function escaparHTML(texto) {\n  return texto\n    .replaceAll("&", "&amp;")\n    // sigue con los demás\n}`,
            [
              ['escaparHTML("<script>alert(1)</script>")', '&lt;script&gt;alert(1)&lt;/script&gt;'],
              ['escaparHTML("Tom & Jerry")', 'Tom &amp; Jerry'],
              ['escaparHTML("di \\"hola\\"")', 'di &quot;hola&quot;'],
              ['escaparHTML("hola")', 'hola'],
            ],
            `function escaparHTML(texto) {\n  return texto\n    .replaceAll("&", "&amp;")\n    .replaceAll("<", "&lt;")\n    .replaceAll(">", "&gt;")\n    .replaceAll('"', "&quot;")\n    .replaceAll("'", "&#39;");\n}`,
            { explanation: 'Si escaparas & al final, convertirías el &lt; ya escapado en &amp;lt;.' }
          ),
          match('Une cada defensa', [['Escapar la salida', 'Mostrar < como texto'], ['CSP', 'Limitar qué scripts se ejecutan'], ['HttpOnly', 'JS no puede leer la cookie'], ['textContent', 'Insertar texto, no HTML']]),
        ]
      ),
      lesson(
        'Autenticación segura',
        [
          card('Login bien hecho', '- Contraseñas con **bcrypt/Argon2**, nunca en texto plano\n- **Limita los intentos** (rate limiting) para frenar la fuerza bruta\n- Mensajes genéricos: "usuario o contraseña incorrectos" (no digas cuál falla)\n- Ofrece **2FA**\n- Todo por **HTTPS**'),
          card('Sesiones y cookies', 'Tras el login, la sesión suele ir en una cookie con atributos de seguridad:\n\n- `HttpOnly`: JavaScript no puede leerla (frena el robo por XSS)\n- `Secure`: solo viaja por HTTPS\n- `SameSite`: no se envía desde otras webs (frena **CSRF**)\n\n**CSRF**: una web maliciosa hace que tu navegador envíe una acción a otra web donde tienes la sesión abierta.', `Set-Cookie: sesion=abc123; HttpOnly; Secure; SameSite=Lax`),
        ],
        [
          choice('¿Por qué el login debe decir "usuario o contraseña incorrectos" sin especificar?', ['Por brevedad', 'Para no revelar qué usuarios existen', 'Por diseño', 'Da igual'], 1),
          match('Une cada atributo de cookie', [['HttpOnly', 'JavaScript no puede leerla'], ['Secure', 'Solo por HTTPS'], ['SameSite', 'Frena CSRF'], ['Expires', 'Cuándo caduca']]),
          choice('¿Qué frena un ataque de fuerza bruta contra el login?', ['Un logo', 'Limitar los intentos (rate limiting) y 2FA', 'Contraseñas cortas', 'Mostrar la contraseña'], 1),
          choice('¿Qué es CSRF?', ['Un tipo de cifrado', 'Que otra web haga que tu navegador envíe acciones a una web donde tienes sesión', 'Un lenguaje', 'Un firewall'], 1),
          fill('Cookie inaccesible desde JavaScript', 'Set-Cookie: sesion=xyz; ___; Secure', 'HttpOnly', ['HttpOnly', 'NoScript', 'Private', 'Hidden']),
        ]
      ),
    ]),
  ],
};
