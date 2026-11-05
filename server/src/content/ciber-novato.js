import { card, choice, fill, order, match, reto, lesson, unit } from './_helpers.js';

export default {
  id: 'ciber-novato',
  title: 'Ciberseguridad: Novato',
  icon: '🔰',
  color: '#1971c2',
  level: 'Nivel 1',
  description: 'Protege tus cuentas y dispositivos: contraseñas, 2FA, phishing y hábitos seguros.',
  units: [
    unit('Protege tus cuentas', 'Contraseñas, verificación en dos pasos y phishing.', [
      lesson(
        'Contraseñas seguras',
        [
          card('Longitud antes que complejidad', 'Una contraseña es más difícil de adivinar cuanto más **larga** sea. Una **frase de contraseña** de varias palabras ("tortuga-lunes-cafe-azul") es fácil de recordar y muy difícil de romper.\n\n❌ `123456`, `password`, tu nombre o tu fecha de nacimiento\n✅ 12 caracteres o más, única para cada sitio'),
          card('Un gestor de contraseñas', 'El mayor peligro es **reutilizar** contraseñas: si se filtra una web, prueban la misma en todas (*credential stuffing*).\n\nUn **gestor de contraseñas** (Bitwarden, 1Password, el del navegador…) crea y recuerda una distinta para cada sitio. Tú solo recuerdas una contraseña maestra fuerte.\n\nPuedes comprobar si tu email aparece en filtraciones en webs como *Have I Been Pwned*.'),
        ],
        [
          choice('¿Qué contraseña es más segura?', ['Ana1990', 'P@ss', 'tortuga-lunes-cafe-azul', 'qwerty123'], 2),
          choice('¿Cuál es el mayor riesgo con las contraseñas?', ['Que sean largas', 'Reutilizar la misma en varios sitios', 'Usar un gestor', 'Cambiarlas'], 1),
          choice('¿Qué es el credential stuffing?', ['Rellenar formularios', 'Probar contraseñas filtradas de una web en otras', 'Un tipo de antivirus', 'Cifrar contraseñas'], 1),
          match('Une cada consejo', [['Gestor de contraseñas', 'Una contraseña distinta por sitio'], ['Frase de contraseña', 'Larga y fácil de recordar'], ['Have I Been Pwned', 'Ver si te han filtrado'], ['Contraseña maestra', 'La única que memorizas']]),
          reto(
            'Escribe fuerza(p): cuenta cuántas reglas cumple la contraseña: 12+ caracteres, una mayúscula, una minúscula, un número y un símbolo. 0-2 reglas → "débil", 3-4 → "media", 5 → "fuerte".',
            `function fuerza(p) {\n  let reglas = 0;\n  if (p.length >= 12) reglas++;\n  // /[A-Z]/.test(p) comprueba si hay mayúsculas\n  \n}`,
            [['fuerza("abc")', 'débil'], ['fuerza("abcdefghijkl1")', 'media'], ['fuerza("Tortuga-Lunes-7")', 'fuerte'], ['fuerza("ABC123")', 'débil']],
            `function fuerza(p) {\n  let reglas = 0;\n  if (p.length >= 12) reglas++;\n  if (/[A-Z]/.test(p)) reglas++;\n  if (/[a-z]/.test(p)) reglas++;\n  if (/[0-9]/.test(p)) reglas++;\n  if (/[^A-Za-z0-9]/.test(p)) reglas++;\n  if (reglas <= 2) return "débil";\n  if (reglas <= 4) return "media";\n  return "fuerte";\n}`,
            { hint: 'Usa /[A-Z]/, /[a-z]/, /[0-9]/ y /[^A-Za-z0-9]/ (símbolo = lo que no es letra ni número) con .test(p).' }
          ),
        ]
      ),
      lesson(
        'Verificación en dos pasos',
        [
          card('Algo que sabes + algo que tienes', 'La **verificación en dos pasos** (2FA / MFA) pide, además de la contraseña, un segundo factor. Aunque roben tu contraseña, no podrán entrar.\n\n- **Algo que sabes**: contraseña, PIN\n- **Algo que tienes**: móvil, llave de seguridad\n- **Algo que eres**: huella, cara'),
          card('Mejor y peor', 'De más a menos seguro:\n\n- **Passkeys** y **llaves físicas** (FIDO2/YubiKey): resistentes al phishing\n- **App de autenticación** (códigos TOTP de 6 dígitos que cambian cada 30 s)\n- **SMS**: mejor que nada, pero vulnerable al robo de la SIM\n\nGuarda los **códigos de recuperación** en un lugar seguro.'),
        ],
        [
          choice('¿Qué aporta la verificación en dos pasos?', ['Nada si la contraseña es buena', 'Protección aunque roben tu contraseña', 'Que no haga falta contraseña nunca', 'Más velocidad'], 1),
          match('Une cada factor con su tipo', [['Contraseña', 'Algo que sabes'], ['Móvil con app', 'Algo que tienes'], ['Huella dactilar', 'Algo que eres'], ['Llave de seguridad', 'Algo que tienes']]),
          order('Ordena de más a menos seguro', ['Passkey o llave física', 'App de autenticación (TOTP)', 'Código por SMS', 'Solo contraseña']),
          choice('Te llega un código 2FA que no has pedido. Significa que…', ['Es un regalo', 'Alguien tiene tu contraseña: cámbiala', 'El sistema funciona mal', 'No importa'], 1),
          choice('¿Para qué sirven los códigos de recuperación?', ['Para compartirlos', 'Para entrar si pierdes tu segundo factor', 'Para pagar', 'No sirven'], 1),
        ]
      ),
      lesson(
        'Phishing',
        [
          card('El engaño más común', 'El **phishing** intenta que des tus datos o descargues algo, haciéndose pasar por alguien de confianza (tu banco, Correos, un compañero).\n\nSeñales de alarma:\n\n- **Urgencia** o amenaza: "tu cuenta se bloqueará en 24 h"\n- Remitente o enlace **raros**\n- Piden contraseñas, códigos o pagos\n- Errores, saludos genéricos, adjuntos inesperados'),
          card('Mira el dominio real', 'Lo que importa es el **dominio** justo antes de la primera `/`:\n\n- ✅ `https://www.mibanco.es/login`\n- ❌ `https://mibanco.es.seguridad-login.com` → el dominio real es *seguridad-login.com*\n- ❌ `https://rnibanco.es` → "rn" imita a "m"\n\nAnte la duda, **no hagas clic**: entra tú escribiendo la dirección o llama al número oficial. También existe por SMS (**smishing**) y por teléfono (**vishing**).'),
        ],
        [
          choice('"Tu cuenta será suspendida en 2 horas, entra aquí". ¿Qué señal es?', ['Confianza', 'Urgencia: típica del phishing', 'Un aviso legal normal', 'Spam inofensivo'], 1),
          choice('¿Cuál es el dominio real de https://paypal.com.cuenta-verificar.net/login?', ['paypal.com', 'cuenta-verificar.net', 'login', 'paypal.com.cuenta'], 1),
          match('Une cada variante', [['Phishing', 'Por email'], ['Smishing', 'Por SMS'], ['Vishing', 'Por llamada'], ['Spear phishing', 'Dirigido a una persona concreta']]),
          choice('Te llega un SMS de "tu banco" con un enlace. Lo más seguro es…', ['Hacer clic para comprobar', 'Entrar en la app o web oficial por tu cuenta', 'Responder al SMS', 'Reenviarlo a tus amigos'], 1),
          reto(
            'Escribe dominio(url): devuelve lo que hay entre "://" y la siguiente "/" (o el final). Ej: "https://web.com/a" → "web.com".',
            `function dominio(url) {\n  // pista: url.split("://")[1] y luego .split("/")[0]\n}`,
            [['dominio("https://www.mibanco.es/login")', 'www.mibanco.es'], ['dominio("https://mibanco.es.seguridad-login.com/x")', 'mibanco.es.seguridad-login.com'], ['dominio("http://ejemplo.org")', 'ejemplo.org']],
            `function dominio(url) {\n  return url.split("://")[1].split("/")[0];\n}`,
            { explanation: 'Fíjate en el final del dominio: en el segundo caso es seguridad-login.com, no mibanco.es.' }
          ),
        ]
      ),
    ]),
    unit('Hábitos seguros', 'Malware y copias de seguridad, redes, Wi-Fi y privacidad.', [
      lesson(
        'Malware y copias de seguridad',
        [
          card('Tipos de malware', '- **Virus / gusano**: se copian y se propagan\n- **Troyano**: parece un programa legítimo, pero esconde algo malicioso\n- **Ransomware**: cifra tus archivos y pide un rescate\n- **Spyware / keylogger**: espía lo que haces o escribes\n\nVías típicas: adjuntos, descargas piratas, USB desconocidos y programas sin actualizar.'),
          card('Defensa básica', '- **Actualiza** sistema y apps: los parches cierran agujeros conocidos\n- Instala software solo de **fuentes oficiales**\n- Antivirus activado (Windows Defender ya es bueno)\n- **Copias de seguridad 3-2-1**: 3 copias, en 2 soportes distintos, 1 fuera de casa (o en la nube)\n\nCon buenas copias, el ransomware pierde su poder.'),
        ],
        [
          match('Une cada malware con lo que hace', [['Ransomware', 'Cifra archivos y pide rescate'], ['Troyano', 'Se disfraza de programa legítimo'], ['Keylogger', 'Registra lo que tecleas'], ['Gusano', 'Se propaga solo por la red']]),
          choice('¿Por qué son importantes las actualizaciones?', ['Cambian los colores', 'Corrigen vulnerabilidades conocidas', 'Hacen el PC más lento', 'No lo son'], 1),
          fill('La regla de las copias de seguridad', 'Regla ___: 3 copias, 2 soportes, 1 fuera de casa', '3-2-1', ['3-2-1', '1-2-3', '2-2-2', '5-1-0']),
          choice('Encuentras un USB en la calle. ¿Qué haces?', ['Lo conectas para ver de quién es', 'No lo conectas a tu ordenador', 'Lo formateas en tu PC', 'Lo usas para tus copias'], 1),
          choice('¿Qué te protege mejor contra el ransomware?', ['Pagar el rescate', 'Tener copias de seguridad desconectadas', 'Apagar el monitor', 'Usar modo oscuro'], 1),
        ]
      ),
      lesson(
        'Redes y Wi-Fi',
        [
          card('HTTPS', 'El candado y `https://` indican que la conexión entre tu navegador y la web está **cifrada**: nadie en medio puede leerla.\n\n⚠️ El candado **no** garantiza que la web sea honesta: las webs de phishing también tienen HTTPS. Solo garantiza que la conexión es privada.'),
          card('Wi-Fi pública y en casa', '- En Wi-Fi públicas (cafeterías, aeropuertos) evita operaciones sensibles o usa una **VPN** de confianza o los datos del móvil\n- En casa: cambia la contraseña del router por defecto, usa **WPA2 / WPA3** y actualiza el router\n- Desactiva el Wi-Fi y el Bluetooth cuando no los uses'),
        ],
        [
          choice('¿Qué garantiza el candado de HTTPS?', ['Que la web es honesta', 'Que la conexión está cifrada', 'Que no hay virus', 'Que es una web del gobierno'], 1),
          choice('¿Una web de phishing puede tener HTTPS?', ['No, nunca', 'Sí', 'Solo los domingos', 'Solo si es .com'], 1),
          choice('En el Wi-Fi gratis de un aeropuerto, ¿qué evitas?', ['Leer noticias', 'Hacer operaciones bancarias sin VPN', 'Ver el tiempo', 'Mirar un mapa'], 1),
          match('Une cada medida', [['VPN', 'Cifra tu tráfico en redes no fiables'], ['WPA3', 'Cifrado moderno del Wi-Fi'], ['Cambiar la clave del router', 'Evitar la contraseña de fábrica'], ['HTTPS', 'Conexión cifrada con la web']]),
          choice('¿Qué conviene cambiar nada más instalar un router?', ['El color', 'La contraseña de administración por defecto', 'El cable', 'Nada'], 1),
        ]
      ),
      lesson(
        'Privacidad e ingeniería social',
        [
          card('Tu huella digital', 'Todo lo que publicas deja rastro. Fecha de nacimiento, mascota, colegio… son respuestas típicas a "preguntas de seguridad" y sirven para engañarte.\n\n- Revisa la **privacidad** de tus redes sociales\n- Revisa los **permisos** de las apps (¿la linterna necesita tus contactos?)\n- Piensa antes de publicar dónde estás en tiempo real'),
          card('Ingeniería social', 'Es manipular a las **personas** en lugar de a las máquinas: el atacante se hace pasar por soporte técnico, un jefe con prisa o un repartidor.\n\nRegla de oro: **nadie legítimo te pedirá tu contraseña ni un código 2FA**. Verifica siempre por otro canal.'),
        ],
        [
          choice('Una app de linterna pide acceso a tus contactos. ¿Qué haces?', ['Aceptar', 'Denegarlo: no lo necesita', 'Desinstalar el móvil', 'Da igual'], 1),
          choice('Llama "soporte técnico" y te pide el código que te acaba de llegar por SMS. ¿Qué haces?', ['Dárselo rápido', 'Colgar: nadie legítimo pide ese código', 'Dárselo si suena amable', 'Pedirle que espere'], 1),
          choice('¿Qué es la ingeniería social?', ['Una carrera universitaria', 'Manipular a las personas para que den información o accesos', 'Un firewall', 'Programar redes sociales'], 1),
          match('Une cada situación con la respuesta correcta', [['"Soy tu jefe, haz esta transferencia ya"', 'Verificar por otro canal'], ['Foto con tu billete de avión', 'No publicarla (tiene datos)'], ['Pregunta de seguridad "¿tu mascota?"', 'Usar una respuesta inventada'], ['Perfil público con tu dirección', 'Ponerlo privado']]),
          choice('¿Por qué no publicar tu fecha de nacimiento completa?', ['Por modestia', 'Se usa para suplantar identidad y responder preguntas de seguridad', 'Está prohibido', 'No importa'], 1),
        ]
      ),
    ]),
  ],
};
