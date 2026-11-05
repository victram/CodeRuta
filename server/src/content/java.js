import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'java',
  title: 'Java',
  icon: '☕',
  color: '#c92a2a',
  level: 'Desde cero',
  description: 'El lenguaje de los bancos, Android y las grandes empresas. Base para Spring Boot.',
  units: [
    unit('Java desde cero', 'Estructura de un programa, tipos, condicionales, bucles, arrays y Strings.', [
      lesson(
        'Hola, Java',
        [
          card(
            'Tu primer programa',
            'Todo en Java vive dentro de una **clase**. El programa empieza en el método `main`. `System.out.println` imprime una línea. Cada instrucción termina en `;`.',
            `public class Main {\n  public static void main(String[] args) {\n    System.out.println("¡Hola, mundo!");\n  }\n}`
          ),
          card(
            'Tipos y variables',
            'Java es de **tipado estático**: declaras el tipo de cada variable.\n\n- `int`: entero\n- `double`: decimal\n- `boolean`: true / false\n- `char`: un carácter (`\'a\'`)\n- `String`: texto (con mayúscula, es una clase)\n\nCon `var` Java infiere el tipo.',
            `int edad = 30;\ndouble precio = 9.99;\nboolean activo = true;\nString nombre = "Ana";\nvar ciudad = "Madrid"; // String`
          ),
        ],
        [
          choice('¿Dónde empieza a ejecutarse un programa Java?', ['En la primera línea', 'En el método main', 'En la clase Start', 'En el constructor'], 1),
          fill('Imprime una línea', 'System.out.___("Hola");', 'println', ['println', 'print_line', 'log', 'echo']),
          match('Une cada tipo con un valor', [['int', '42'], ['double', '3.14'], ['boolean', 'false'], ['String', '"Hola"']]),
          choice('¿Qué falta en esta línea?', ['Nada', 'El ; final', 'Las llaves', 'El tipo'], 1, { code: `int x = 5` }),
          choice('¿Por qué String va con mayúscula?', ['Es un error', 'Porque es una clase, no un tipo primitivo', 'Por estilo', 'Porque es constante'], 1),
        ]
      ),
      lesson(
        'Condicionales y bucles',
        [
          card('if / else y switch', 'Muy parecido a JavaScript. Para comparar **Strings** usa `.equals()`, nunca `==`.', `if (nota >= 5) {\n  System.out.println("Aprobado");\n} else {\n  System.out.println("Suspenso");\n}\n\nif (nombre.equals("Ana")) { ... }`),
          card('Bucles', '`for` clásico, `while` y el **for-each** para recorrer colecciones.', `for (int i = 0; i < 3; i++) {\n  System.out.println(i);\n}\n\nint[] nums = {1, 2, 3};\nfor (int n : nums) {\n  System.out.println(n);\n}`),
        ],
        [
          choice('¿Cómo comparas dos Strings en Java?', ['a == b', 'a.equals(b)', 'a === b', 'a.compare(b)'], 1, { explanation: '== compara si son el mismo objeto en memoria, no el contenido.' }),
          choice('¿Qué se imprime?', ['0 1 2', '1 2 3', '0 1 2 3', 'Nada'], 0, { code: `for (int i = 0; i < 3; i++) {\n  System.out.print(i + " ");\n}` }),
          fill('Recorre el array con for-each', 'for (int n ___ numeros) { }', ':', [':', 'in', 'of', '->']),
          order('Ordena el bucle while', ['int vidas = 3;', 'while (vidas > 0) {', '  vidas--;', '}']),
          choice('¿Qué imprime?', ['Mayor', 'Menor', 'Igual', 'Error'], 2, { code: `int a = 4, b = 4;\nif (a > b) System.out.println("Mayor");\nelse if (a < b) System.out.println("Menor");\nelse System.out.println("Igual");` }),
        ]
      ),
      lesson(
        'Arrays y Strings',
        [
          card('Arrays', 'Un array tiene **tamaño fijo** y un solo tipo. `length` (sin paréntesis) da su tamaño.', `int[] notas = {7, 9, 6};\nSystem.out.println(notas[0]);      // 7\nSystem.out.println(notas.length);  // 3\n\nString[] dias = new String[7];`),
          card('Métodos de String', '`length()`, `toUpperCase()`, `contains()`, `substring()`, `split()`… Los Strings son **inmutables**: los métodos devuelven un String nuevo.', `String s = "Hola mundo";\ns.length();         // 10\ns.toUpperCase();    // "HOLA MUNDO"\ns.contains("mun");  // true\ns.substring(0, 4);  // "Hola"`),
        ],
        [
          choice('¿Cuál es el tamaño del array?', ['2', '3', '4', 'length'], 1, { code: `int[] a = {5, 10, 15};` }),
          fill('Longitud de un String', 'int n = texto.___();', 'length', ['length', 'size', 'count', 'len']),
          choice('¿Qué devuelve "Java".substring(0, 2)?', ['"J"', '"Ja"', '"Jav"', '"av"'], 1),
          choice('¿Qué pasa con a[3] si a = {1, 2, 3}?', ['Devuelve 0', 'Devuelve null', 'ArrayIndexOutOfBoundsException', 'Devuelve 3'], 2),
          choice('"Strings inmutables" significa…', ['No se pueden crear', 'Sus métodos devuelven un String nuevo sin cambiar el original', 'Solo pueden tener 10 letras', 'No se pueden imprimir'], 1),
        ]
      ),
    ]),
    unit('Programación orientada a objetos', 'Clases, objetos, herencia, interfaces y colecciones.', [
      lesson(
        'Clases y objetos',
        [
          card('Molde y galletas', 'Una **clase** es un molde; un **objeto** es una galleta hecha con ese molde. La clase define **atributos** (datos) y **métodos** (acciones). El **constructor** crea el objeto.', `public class Perro {\n  private String nombre;\n\n  public Perro(String nombre) {\n    this.nombre = nombre;\n  }\n\n  public void ladrar() {\n    System.out.println(nombre + ": ¡Guau!");\n  }\n}\n\nPerro p = new Perro("Toby");\np.ladrar();`),
          card('Encapsulación', 'Los atributos suelen ser `private` y se accede a ellos con **getters** y **setters** públicos. Así controlas cómo se modifican los datos.', `public String getNombre() {\n  return nombre;\n}`),
        ],
        [
          choice('¿Qué es una clase?', ['Un objeto concreto', 'Un molde para crear objetos', 'Un tipo de bucle', 'Una variable'], 1),
          fill('Crea un objeto', 'Perro p = ___ Perro("Luna");', 'new', ['new', 'create', 'make', 'Perro']),
          choice('¿Qué hace this.nombre = nombre?', ['Compara', 'Asigna el parámetro al atributo del objeto', 'Imprime', 'Borra el atributo'], 1),
          match('Une cada concepto', [['Atributo', 'Dato del objeto'], ['Método', 'Acción del objeto'], ['Constructor', 'Crea e inicializa el objeto'], ['private', 'Solo accesible desde la clase']]),
          choice('¿Para qué sirven los getters?', ['Para borrar datos', 'Para leer atributos privados de forma controlada', 'Para crear clases', 'Para heredar'], 1),
        ]
      ),
      lesson(
        'Herencia y polimorfismo',
        [
          card('extends', 'Una clase puede **heredar** de otra con `extends`: recibe sus atributos y métodos. `@Override` indica que reescribes un método del padre.', `public class Animal {\n  public String sonido() { return "..."; }\n}\n\npublic class Gato extends Animal {\n  @Override\n  public String sonido() { return "Miau"; }\n}`),
          card('Polimorfismo', 'Una variable de tipo `Animal` puede guardar un `Gato` o un `Perro`, y cada uno responde a su manera. Eso es **polimorfismo**.', `Animal a = new Gato();\nSystem.out.println(a.sonido()); // "Miau"`),
        ],
        [
          fill('Hereda de Vehiculo', 'public class Coche ___ Vehiculo { }', 'extends', ['extends', 'implements', 'inherits', ':']),
          choice('¿Qué imprime?', ['...', 'Miau', 'Animal', 'Error'], 1, { code: `Animal a = new Gato();\nSystem.out.println(a.sonido());` }),
          choice('¿Qué indica @Override?', ['Que el método es nuevo', 'Que reescribe un método heredado', 'Que es privado', 'Que es estático'], 1),
          choice('¿Cuántas clases puede extender una clase en Java?', ['Ninguna', 'Una', 'Dos', 'Ilimitadas'], 1, { explanation: 'Java no tiene herencia múltiple de clases; para eso existen las interfaces.' }),
          choice('Polimorfismo significa…', ['Muchas clases en un archivo', 'Un mismo método se comporta distinto según el objeto real', 'Copiar código', 'Usar muchos bucles'], 1),
        ]
      ),
      lesson(
        'Interfaces y colecciones',
        [
          card('Interfaces', 'Una **interface** es un contrato: dice qué métodos debe tener una clase, sin decir cómo. Una clase puede **implementar** varias.', `public interface Pagable {\n  double calcularPago();\n}\n\npublic class Empleado implements Pagable {\n  public double calcularPago() { return 2000; }\n}`),
          card('Colecciones', 'Los arrays tienen tamaño fijo. En la práctica se usan **colecciones**:\n\n- `ArrayList`: lista que crece\n- `HashMap`: clave → valor\n- `HashSet`: sin repetidos', `List<String> nombres = new ArrayList<>();\nnombres.add("Ana");\nnombres.get(0); // "Ana"\n\nMap<String, Integer> edades = new HashMap<>();\nedades.put("Ana", 30);\nedades.get("Ana"); // 30`),
        ],
        [
          fill('Implementa la interfaz', 'public class Pato ___ Volador { }', 'implements', ['implements', 'extends', 'uses', 'with']),
          fill('Añade a la lista', 'lista.___("Leo");', 'add', ['add', 'push', 'append', 'put']),
          match('Une cada colección con su uso', [['ArrayList', 'Lista ordenada que crece'], ['HashMap', 'Clave → valor'], ['HashSet', 'Elementos sin repetir'], ['array', 'Tamaño fijo']]),
          choice('¿Qué método guarda un valor en un HashMap?', ['add', 'put', 'set', 'insert'], 1),
          choice('¿Qué es una interface?', ['Una clase con atributos', 'Un contrato de métodos que una clase debe implementar', 'Una pantalla', 'Una colección'], 1),
        ]
      ),
    ]),
    unit('Java moderno', 'Excepciones, lambdas, streams, records y Optional.', [
      lesson(
        'Excepciones',
        [
          card('try / catch / finally', 'Las **excepciones** representan errores. Las capturas con `try/catch`; `finally` se ejecuta siempre (útil para cerrar recursos).', `try {\n  int r = 10 / 0;\n} catch (ArithmeticException e) {\n  System.out.println("No se puede dividir entre 0");\n} finally {\n  System.out.println("Fin");\n}`),
          card('Lanzar excepciones', 'Con `throw` lanzas una excepción tú mismo, por ejemplo cuando un dato no es válido.', `if (edad < 0) {\n  throw new IllegalArgumentException("Edad negativa");\n}`),
        ],
        [
          fill('Captura el error', 'try {\n  ...\n} ___ (Exception e) {\n  ...\n}', 'catch', ['catch', 'except', 'error', 'rescue']),
          choice('¿Cuándo se ejecuta finally?', ['Solo si hay error', 'Solo si no hay error', 'Siempre', 'Nunca'], 2),
          fill('Lanza una excepción', '___ new IllegalStateException("Error");', 'throw', ['throw', 'throws', 'raise', 'return']),
          choice('¿Qué excepción da 10 / 0 con enteros?', ['NullPointerException', 'ArithmeticException', 'IOException', 'Ninguna'], 1),
          choice('¿Qué causa una NullPointerException?', ['Dividir entre 0', 'Usar un objeto que es null', 'Un bucle infinito', 'Un String vacío'], 1),
        ]
      ),
      lesson(
        'Lambdas y Streams',
        [
          card('Lambdas', 'Una **lambda** es una función corta sin nombre: `(parámetros) -> expresión`. Se usan muchísimo con colecciones.', `nombres.forEach(n -> System.out.println(n));`),
          card('Streams', 'Los **streams** procesan colecciones en cadena: `filter` (filtrar), `map` (transformar), `collect`/`toList` (recoger).', `List<Integer> nums = List.of(1, 2, 3, 4, 5);\n\nList<Integer> paresDobles = nums.stream()\n  .filter(n -> n % 2 == 0)\n  .map(n -> n * 2)\n  .toList(); // [4, 8]`),
        ],
        [
          fill('Completa la lambda', 'nums.forEach(n ___ System.out.println(n));', '->', ['->', '=>', ':', '::']),
          choice('¿Qué devuelve?', ['[1, 3]', '[2, 4]', '[4, 8]', '[2]'], 1, { code: `List.of(1, 2, 3, 4).stream()\n  .filter(n -> n % 2 == 0)\n  .toList();` }),
          choice('¿Qué hace map en un stream?', ['Filtra', 'Transforma cada elemento', 'Ordena', 'Cuenta'], 1),
          order('Ordena el stream', ['nombres.stream()', '  .filter(n -> n.startsWith("A"))', '  .map(String::toUpperCase)', '  .toList();']),
          choice('¿Qué devuelve .count() en un stream?', ['El primer elemento', 'Cuántos elementos hay', 'Una lista', 'Nada'], 1),
        ]
      ),
      lesson(
        'Records y Optional',
        [
          card('Records', 'Un `record` (Java 16+) crea una clase de **datos inmutables** en una línea: constructor, getters, `equals`, `hashCode` y `toString` incluidos.', `public record Punto(int x, int y) {}\n\nPunto p = new Punto(3, 4);\np.x(); // 3`),
          card('Optional', '`Optional` representa un valor que **puede no existir**. Evita los `null` y las NullPointerException.', `Optional<Usuario> u = repo.buscarPorEmail(email);\nString nombre = u.map(Usuario::nombre).orElse("Invitado");`),
        ],
        [
          choice('¿Qué genera un record automáticamente?', ['Solo el constructor', 'Constructor, getters, equals, hashCode y toString', 'Una base de datos', 'Nada'], 1),
          fill('Declara un record', 'public ___ Producto(String nombre, double precio) {}', 'record', ['record', 'class', 'struct', 'data']),
          choice('¿Para qué sirve Optional?', ['Hacer bucles', 'Representar un valor que puede faltar sin usar null', 'Crear hilos', 'Comparar Strings'], 1),
          fill('Valor por defecto si está vacío', 'String n = opcional.___("Anónimo");', 'orElse', ['orElse', 'default', 'ifEmpty', 'or']),
          choice('¿Los records son mutables?', ['Sí', 'No, son inmutables', 'Solo los int', 'Depende del getter'], 1),
        ]
      ),
    ]),
  ],
};
