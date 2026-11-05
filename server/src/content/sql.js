export default {
  id: 'sql',
  title: 'SQL',
  icon: '🗄️',
  color: '#5f3dc4',
  level: 'Desde cero',
  description: 'Habla con las bases de datos: consulta, guarda y relaciona información.',
  units: [
    {
      title: 'Consultas básicas',
      description: 'SELECT, WHERE, INSERT, UPDATE, DELETE, JOIN y agregados.',
      lessons: [
        {
          title: 'SELECT y WHERE',
          theory: [
            {
              title: 'Tablas',
              body: 'Una base de datos relacional guarda la información en **tablas** con filas y columnas, como una hoja de cálculo. **SQL** es el lenguaje para consultarlas.\n\n¡Esta misma app guarda tu progreso con SQLite!',
            },
            {
              title: 'SELECT',
              body: '`SELECT` elige las columnas y `FROM` la tabla. `*` significa "todas las columnas".',
              code: `SELECT nombre, edad FROM usuarios;\n\nSELECT * FROM usuarios;`,
            },
            {
              title: 'Filtrar y ordenar',
              body: '`WHERE` filtra filas y `ORDER BY` ordena (`ASC` de menor a mayor, `DESC` de mayor a menor).',
              code: `SELECT * FROM usuarios\nWHERE edad >= 18\nORDER BY nombre ASC;`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué significa * en SELECT *?',
              options: ['Ninguna columna', 'Todas las columnas', 'La primera fila', 'Multiplicar'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Lee los nombres de la tabla clientes',
              code: 'SELECT nombre ___ clientes;',
              answer: 'FROM',
              options: ['FROM', 'IN', 'OF', 'TABLE'],
            },
            {
              type: 'choice',
              prompt: '¿Qué cláusula filtra filas?',
              options: ['ORDER BY', 'WHERE', 'SELECT', 'GROUP'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la consulta',
              lines: ['SELECT titulo', 'FROM libros', 'WHERE precio < 20', 'ORDER BY titulo;'],
              explanation: 'El orden siempre es SELECT → FROM → WHERE → ORDER BY.',
            },
            {
              type: 'choice',
              prompt: '¿Cómo ordenas los precios de mayor a menor?',
              options: ['ORDER BY precio ASC', 'ORDER BY precio DESC', 'SORT precio', 'ORDER precio DOWN'],
              answer: 1,
            },
          ],
        },
        {
          title: 'INSERT, UPDATE y DELETE',
          theory: [
            {
              title: 'Añadir filas',
              body: '`INSERT INTO` añade filas nuevas. Los textos van entre **comillas simples**.',
              code: `INSERT INTO usuarios (nombre, edad)\nVALUES ('Ana', 30);`,
            },
            {
              title: 'Modificar y borrar',
              body: '⚠️ Usa **siempre** `WHERE` con `UPDATE` y `DELETE`. Sin él, cambiarías o borrarías **todas** las filas de la tabla.',
              code: `UPDATE usuarios SET edad = 31 WHERE id = 1;\n\nDELETE FROM usuarios WHERE id = 1;`,
            },
          ],
          exercises: [
            {
              type: 'match',
              prompt: 'Une cada comando con su acción',
              pairs: [
                ['INSERT', 'Añadir filas'],
                ['SELECT', 'Leer datos'],
                ['UPDATE', 'Modificar filas'],
                ['DELETE', 'Borrar filas'],
              ],
            },
            {
              type: 'fill',
              prompt: 'Completa la inserción',
              code: "INSERT INTO productos (nombre)\n___ ('Teclado');",
              answer: 'VALUES',
              options: ['VALUES', 'DATA', 'SET', 'INTO'],
            },
            {
              type: 'choice',
              prompt: '¿Qué hace DELETE FROM usuarios; (sin WHERE)?',
              options: ['Nada', 'Borra todas las filas', 'Borra solo la primera fila', 'Siempre da error'],
              answer: 1,
              explanation: 'Sin WHERE no hay filtro, así que afecta a todas las filas. ¡Mucho cuidado!',
            },
            {
              type: 'fill',
              prompt: 'Cambia el precio del producto 3',
              code: 'UPDATE productos ___ precio = 10 WHERE id = 3;',
              answer: 'SET',
              options: ['SET', 'VALUES', 'TO', 'WITH'],
            },
            {
              type: 'choice',
              prompt: 'En SQL, ¿cómo se escriben los textos?',
              options: ["Entre comillas simples: 'texto'", 'Entre llaves: {texto}', 'Entre < >', 'Sin comillas'],
              answer: 0,
            },
          ],
        },
        {
          title: 'JOIN y agregados',
          theory: [
            {
              title: 'Resumir datos',
              body: '`COUNT`, `SUM`, `AVG`, `MIN` y `MAX` resumen muchas filas en un solo valor. `GROUP BY` agrupa por una columna.',
              code: `SELECT COUNT(*) FROM pedidos;\nSELECT AVG(precio) FROM productos;\n\nSELECT categoria, COUNT(*)\nFROM productos\nGROUP BY categoria;`,
            },
            {
              title: 'Relacionar tablas',
              body: 'Las tablas se relacionan con **claves**: `id` es la clave primaria y `usuario_id` una **clave foránea** que apunta a otra tabla. `JOIN` las combina.',
              code: `SELECT pedidos.id, usuarios.nombre\nFROM pedidos\nJOIN usuarios ON pedidos.usuario_id = usuarios.id;`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué función cuenta filas?',
              options: ['SUM()', 'COUNT()', 'TOTAL()', 'NUM()'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué calcula AVG(precio)?',
              options: ['La suma', 'El promedio', 'El máximo', 'Cuántos hay'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Cuenta clientes por país',
              code: 'SELECT pais, COUNT(*)\nFROM clientes\n___ BY pais;',
              answer: 'GROUP',
              options: ['GROUP', 'ORDER', 'SORT', 'SPLIT'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve JOIN?',
              options: ['Borrar tablas', 'Combinar filas de tablas relacionadas', 'Crear índices', 'Ordenar resultados'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Una columna usuario_id que apunta a usuarios.id es una…',
              options: ['Clave primaria', 'Clave foránea', 'Columna calculada', 'Vista'],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      title: 'Diseño de bases de datos',
      description: 'Crear tablas, relacionarlas y hacer búsquedas más potentes.',
      lessons: [
        {
          title: 'Crear tablas',
          theory: [
            {
              title: 'CREATE TABLE',
              body: '`CREATE TABLE` define una tabla nueva: el nombre de cada columna y su **tipo** de dato.',
              code: `CREATE TABLE usuarios (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  email TEXT UNIQUE,\n  edad INTEGER\n);`,
            },
            {
              title: 'Restricciones',
              body: '- `PRIMARY KEY`: identifica cada fila de forma única\n- `NOT NULL`: no puede quedar vacío\n- `UNIQUE`: no se puede repetir\n- `DEFAULT`: valor si no se indica otro',
            },
          ],
          exercises: [
            {
              type: 'fill',
              prompt: 'Crea la tabla',
              code: '___ TABLE productos (\n  id INTEGER PRIMARY KEY,\n  nombre TEXT\n);',
              answer: 'CREATE',
              options: ['CREATE', 'MAKE', 'NEW', 'ADD'],
            },
            {
              type: 'match',
              prompt: 'Une cada restricción con su significado',
              pairs: [
                ['PRIMARY KEY', 'Identificador único de la fila'],
                ['NOT NULL', 'Obligatorio'],
                ['UNIQUE', 'Sin repetidos'],
                ['DEFAULT', 'Valor por defecto'],
              ],
            },
            {
              type: 'choice',
              prompt: '¿Qué restricción usarías para que no haya dos emails iguales?',
              options: ['NOT NULL', 'UNIQUE', 'DEFAULT', 'INDEX'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Qué tipo usarías para guardar un nombre?',
              options: ['INTEGER', 'TEXT', 'REAL', 'BOOLEAN'],
              answer: 1,
            },
            {
              type: 'order',
              prompt: 'Ordena la creación de la tabla',
              lines: ['CREATE TABLE notas (', '  id INTEGER PRIMARY KEY,', '  texto TEXT NOT NULL', ');'],
            },
          ],
        },
        {
          title: 'Relaciones',
          theory: [
            {
              title: 'Uno a muchos',
              body: 'Un usuario puede tener **muchos** pedidos. La tabla del lado "muchos" guarda una **clave foránea** que apunta al "uno".',
              code: `CREATE TABLE pedidos (\n  id INTEGER PRIMARY KEY,\n  usuario_id INTEGER REFERENCES usuarios(id),\n  total REAL\n);`,
            },
            {
              title: 'Muchos a muchos',
              body: 'Un alumno tiene muchos cursos y un curso muchos alumnos. Se resuelve con una **tabla intermedia** que guarda las dos claves.',
              code: `CREATE TABLE matriculas (\n  alumno_id INTEGER REFERENCES alumnos(id),\n  curso_id INTEGER REFERENCES cursos(id)\n);`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: 'Un autor escribe muchos libros. ¿Qué relación es?',
              options: ['Uno a uno', 'Uno a muchos', 'Muchos a muchos', 'Ninguna'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿En qué tabla va la clave foránea autor_id?',
              options: ['En autores', 'En libros', 'En las dos', 'En ninguna'],
              answer: 1,
              explanation: 'La clave foránea va en el lado "muchos": cada libro apunta a su autor.',
            },
            {
              type: 'fill',
              prompt: 'Apunta a la tabla usuarios',
              code: 'usuario_id INTEGER ___ usuarios(id)',
              answer: 'REFERENCES',
              options: ['REFERENCES', 'POINTS', 'LINKS', 'JOIN'],
            },
            {
              type: 'choice',
              prompt: '¿Cómo se resuelve una relación muchos a muchos?',
              options: ['Con una columna de texto', 'Con una tabla intermedia', 'Con dos claves primarias', 'No se puede'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: 'Estudiantes y asignaturas: ¿qué relación es?',
              options: ['Uno a uno', 'Uno a muchos', 'Muchos a muchos', 'Ninguna'],
              answer: 2,
            },
          ],
        },
        {
          title: 'Búsquedas avanzadas',
          theory: [
            {
              title: 'Filtros útiles',
              body: '- `LIKE`: busca patrones de texto (`%` = cualquier cosa)\n- `IN`: está en una lista\n- `BETWEEN`: entre dos valores\n- `IS NULL`: está vacío',
              code: `SELECT * FROM usuarios WHERE nombre LIKE 'An%';\nSELECT * FROM productos WHERE categoria IN ('libros', 'juegos');\nSELECT * FROM productos WHERE precio BETWEEN 10 AND 20;`,
            },
            {
              title: 'LIMIT e índices',
              body: '`LIMIT` devuelve solo unas cuantas filas: perfecto para paginar. Un **índice** hace que las búsquedas por una columna sean mucho más rápidas.',
              code: `SELECT * FROM posts ORDER BY fecha DESC LIMIT 10;\n\nCREATE INDEX idx_usuarios_email ON usuarios(email);`,
            },
          ],
          exercises: [
            {
              type: 'choice',
              prompt: '¿Qué nombres encuentra LIKE \'Ma%\'?',
              options: ['Solo "Ma"', 'Los que empiezan por "Ma"', 'Los que terminan en "Ma"', 'Ninguno'],
              answer: 1,
            },
            {
              type: 'fill',
              prompt: 'Devuelve solo 5 filas',
              code: 'SELECT * FROM noticias ___ 5;',
              answer: 'LIMIT',
              options: ['LIMIT', 'TOP', 'MAX', 'FIRST'],
            },
            {
              type: 'fill',
              prompt: 'Precios entre 10 y 50',
              code: 'SELECT * FROM productos WHERE precio ___ 10 AND 50;',
              answer: 'BETWEEN',
              options: ['BETWEEN', 'FROM', 'RANGE', 'IN'],
            },
            {
              type: 'choice',
              prompt: '¿Para qué sirve un índice?',
              options: ['Ordenar la tabla para siempre', 'Acelerar las búsquedas por una columna', 'Borrar duplicados', 'Hacer copias de seguridad'],
              answer: 1,
            },
            {
              type: 'choice',
              prompt: '¿Cómo buscas filas sin email?',
              options: ["WHERE email = ''", 'WHERE email IS NULL', 'WHERE email = NULL', 'WHERE NOT email'],
              answer: 1,
              explanation: 'En SQL, NULL no se compara con =. Se usa IS NULL.',
            },
          ],
        },
      ],
    },
  ],
};
