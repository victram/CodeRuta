import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'next-postgres', title: 'Next.js y PostgreSQL', icon: '🌐', color: '#212529', level: 'Intermedio',
  description: 'Aplicaciones web con frontend y backend.',
  units: [
    ['Full stack moderno', 'Renderizado, datos y validación en una aplicación completa.', [
      ['Next.js fundamental', 'Enrutado y renderizado', 'Server y Client Components'],
      ['PostgreSQL', 'Esquemas y consultas', 'Migraciones'],
      ['Acceso a datos', 'ORM: conceptos', 'Validación de entradas'],
    ]],
    ['Producto conectado', 'Identidad, mutaciones, calidad y despliegue.', [
      ['Autenticación', 'Sesiones y roles', 'Cookies seguras'],
      ['Server actions y APIs', 'Mutaciones y validación', 'Errores y estados de carga'],
      ['Proyecto full stack', 'Testing y despliegue', '[Proyecto] Aplicación de reservas'],
    ]],
  ],
});
