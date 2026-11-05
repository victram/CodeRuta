import { card, choice, fill, order, match, lesson, unit } from './_helpers.js';

export default {
  id: 'springboot',
  title: 'Spring Boot',
  icon: '🍃',
  color: '#2b8a3e',
  level: 'Avanzado',
  description: 'El framework de backend más usado con Java. Recomendado tras el curso de Java.',
  units: [
    unit('Tu primera API con Spring Boot', 'Proyecto, controladores REST e inyección de dependencias.', [
      lesson(
        '¿Qué es Spring Boot?',
        [
          card(
            'Spring sin dolor',
            '**Spring** es el framework más popular de Java para backend. **Spring Boot** lo configura por ti: con muy poco código tienes un servidor web listo, con Tomcat incluido.\n\nCreas el proyecto en **start.spring.io** (Spring Initializr) eligiendo dependencias como *Spring Web* o *Spring Data JPA*.',
            `@SpringBootApplication\npublic class TiendaApplication {\n  public static void main(String[] args) {\n    SpringApplication.run(TiendaApplication.class, args);\n  }\n}`
          ),
          card('Anotaciones', 'Spring funciona con **anotaciones** (`@Algo`): etiquetas que le dicen qué es cada clase. Los **starters** (`spring-boot-starter-web`…) agrupan dependencias.\n\nLa build se gestiona con **Maven** (`pom.xml`) o **Gradle**.'),
        ],
        [
          choice('¿Qué aporta Spring Boot sobre Spring?', ['Otro lenguaje', 'Configuración automática y servidor integrado', 'Una base de datos', 'Interfaz gráfica'], 1),
          fill('Anotación de la clase principal', '@___\npublic class App { ... }', 'SpringBootApplication', ['SpringBootApplication', 'SpringApp', 'Main', 'Application']),
          choice('¿Dónde se genera un proyecto nuevo de Spring Boot?', ['npm init', 'start.spring.io', 'github.com/new', 'java --new'], 1),
          match('Une cada concepto', [['Starter', 'Paquete de dependencias'], ['Maven', 'Herramienta de build (pom.xml)'], ['Tomcat', 'Servidor web integrado'], ['Anotación', 'Etiqueta @ que configura una clase']]),
          choice('¿En qué puerto arranca por defecto?', ['3000', '5173', '8080', '80'], 2),
        ]
      ),
      lesson(
        'Controladores REST',
        [
          card('@RestController', 'Un **controlador** recibe peticiones HTTP. Cada método se asocia a una ruta con `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`. Lo que devuelves se convierte en **JSON** automáticamente.', `@RestController\n@RequestMapping("/api/libros")\npublic class LibroController {\n\n  @GetMapping\n  public List<Libro> todos() {\n    return List.of(new Libro(1, "Dune"));\n  }\n}`),
          card('Parámetros', '- `@PathVariable`: parte de la ruta (`/libros/7`)\n- `@RequestParam`: query (`?autor=x`)\n- `@RequestBody`: cuerpo JSON', `@GetMapping("/{id}")\npublic Libro uno(@PathVariable Long id) { ... }\n\n@PostMapping\npublic Libro crear(@RequestBody Libro libro) { ... }`),
        ],
        [
          fill('Marca la clase como controlador REST', '@___\npublic class UsuarioController { }', 'RestController', ['RestController', 'Controller', 'Service', 'Api']),
          match('Une cada anotación con su método HTTP', [['@GetMapping', 'GET'], ['@PostMapping', 'POST'], ['@PutMapping', 'PUT'], ['@DeleteMapping', 'DELETE']]),
          choice('¿Con qué lees el id de /productos/{id}?', ['@RequestBody', '@PathVariable', '@RequestParam', '@Id'], 1),
          choice('¿Con qué recibes el JSON enviado en un POST?', ['@RequestBody', '@PathVariable', '@Header', '@Json'], 0),
          choice('¿En qué formato devuelve los objetos un @RestController?', ['HTML', 'XML siempre', 'JSON', 'Texto plano'], 2),
        ]
      ),
      lesson(
        'Servicios e inyección de dependencias',
        [
          card('Capas', 'Una app Spring se organiza en **capas**:\n\n- **Controller**: recibe la petición HTTP\n- **Service**: lógica de negocio\n- **Repository**: acceso a la base de datos\n\nAsí cada clase tiene una responsabilidad.'),
          card('Inyección de dependencias', 'No haces `new LibroService()`: Spring **crea** los objetos (beans) y te los **inyecta**. La forma recomendada es por **constructor**.', `@Service\npublic class LibroService { ... }\n\n@RestController\npublic class LibroController {\n  private final LibroService service;\n\n  public LibroController(LibroService service) {\n    this.service = service; // Spring lo inyecta\n  }\n}`),
        ],
        [
          order('Ordena las capas desde la petición hasta la BD', ['Controller', 'Service', 'Repository', 'Base de datos']),
          fill('Marca la clase de lógica de negocio', '@___\npublic class PedidoService { }', 'Service', ['Service', 'Logic', 'Business', 'Worker']),
          choice('¿Qué es la inyección de dependencias?', ['Escribir new en todas partes', 'Que el framework cree y entregue los objetos que necesitas', 'Un ataque informático', 'Una base de datos'], 1),
          choice('¿Cuál es la forma recomendada de inyectar?', ['Por constructor', 'Con variables globales', 'Con new', 'Con static'], 0),
          choice('¿Dónde debería ir la lógica de negocio?', ['En el Controller', 'En el Service', 'En la entidad', 'En el pom.xml'], 1),
        ]
      ),
    ]),
    unit('Datos y producción', 'JPA, validación, manejo de errores, configuración y tests.', [
      lesson(
        'Spring Data JPA',
        [
          card('Entidades', 'Con **JPA** una clase Java se convierte en una tabla. `@Entity` marca la clase y `@Id` la clave primaria.', `@Entity\npublic class Libro {\n  @Id\n  @GeneratedValue\n  private Long id;\n  private String titulo;\n  // getters y setters\n}`),
          card('Repositorios', 'Extiende `JpaRepository` y Spring te da gratis `findAll`, `findById`, `save`, `deleteById`… Incluso crea consultas a partir del **nombre del método**.', `public interface LibroRepository extends JpaRepository<Libro, Long> {\n  List<Libro> findByAutor(String autor);\n}`),
        ],
        [
          fill('Marca la clase como tabla', '@___\npublic class Cliente { }', 'Entity', ['Entity', 'Model', 'Record', 'Row']),
          choice('¿Qué método guarda una entidad?', ['insert()', 'save()', 'persistAll()', 'put()'], 1),
          choice('¿Qué hace findByEmail(String email) en un repositorio?', ['Nada, hay que programarlo', 'Spring genera la consulta por el nombre del método', 'Da error', 'Borra por email'], 1),
          fill('Extiende el repositorio', 'public interface PedidoRepository extends ___<Pedido, Long> {}', 'JpaRepository', ['JpaRepository', 'SqlRepository', 'DataStore', 'Database']),
          choice('¿Qué marca @Id?', ['El nombre de la tabla', 'La clave primaria', 'Una columna opcional', 'El índice'], 1),
        ]
      ),
      lesson(
        'Validación y errores',
        [
          card('Bean Validation', 'Anota los campos con reglas (`@NotBlank`, `@Email`, `@Min`, `@Size`) y añade `@Valid` en el controlador. Si algo no cumple, Spring responde **400** automáticamente.', `public record CrearUsuario(\n  @NotBlank String nombre,\n  @Email String email\n) {}\n\n@PostMapping\npublic Usuario crear(@Valid @RequestBody CrearUsuario datos) { ... }`),
          card('ResponseEntity y @ControllerAdvice', '`ResponseEntity` te deja elegir el código de estado. `@RestControllerAdvice` centraliza el manejo de errores de toda la API.', `@GetMapping("/{id}")\npublic ResponseEntity<Libro> uno(@PathVariable Long id) {\n  return repo.findById(id)\n    .map(ResponseEntity::ok)\n    .orElse(ResponseEntity.notFound().build());\n}`),
        ],
        [
          fill('Activa la validación', 'public Usuario crear(@___ @RequestBody CrearUsuario d)', 'Valid', ['Valid', 'Check', 'Validate', 'NotNull']),
          match('Une cada anotación con su regla', [['@NotBlank', 'Texto no vacío'], ['@Email', 'Formato de correo'], ['@Min(18)', 'Valor mínimo 18'], ['@Size(max = 50)', 'Longitud máxima']]),
          choice('Si la validación falla, ¿qué código devuelve Spring?', ['200', '400', '404', '500'], 1),
          choice('¿Para qué sirve @RestControllerAdvice?', ['Crear entidades', 'Manejar errores de forma centralizada', 'Configurar el puerto', 'Hacer tests'], 1),
          choice('¿Qué devuelve ResponseEntity.notFound().build()?', ['200', '201', '404', '500'], 2),
        ]
      ),
      lesson(
        'Configuración, seguridad y tests',
        [
          card('application.properties', 'La configuración vive en `application.properties` (o `.yml`). Con **perfiles** (`dev`, `prod`) usas valores distintos por entorno.', `server.port=8081\nspring.datasource.url=jdbc:postgresql://localhost:5432/tienda\nspring.datasource.password=\${DB_PASSWORD}`),
          card('Seguridad y tests', '- **Spring Security** añade login, roles y protección (por ejemplo con JWT)\n- `@SpringBootTest` arranca la app en un test\n- Con **MockMvc** pruebas los endpoints sin abrir el navegador'),
        ],
        [
          fill('Cambia el puerto', 'server.___=9090', 'port', ['port', 'puerto', 'listen', 'host']),
          choice('¿Para qué sirven los perfiles (dev, prod)?', ['Para usuarios', 'Para tener configuración distinta por entorno', 'Para el CSS', 'Para logs'], 1),
          choice('¿Qué módulo añade autenticación y roles?', ['Spring Data', 'Spring Security', 'Spring Web', 'Spring Batch'], 1),
          choice('¿Por qué usar ${DB_PASSWORD} y no escribir la contraseña?', ['Es más corto', 'Para no subir secretos al repositorio', 'Es obligatorio en Java', 'Va más rápido'], 1),
          fill('Test que arranca la aplicación', '@___\nclass AppTests { }', 'SpringBootTest', ['SpringBootTest', 'Test', 'RunTest', 'AppTest']),
        ]
      ),
    ]),
  ],
};
