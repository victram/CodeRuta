import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'multiplataforma', title: 'Flutter y React Native', icon: '📱', color: '#54c5f8', level: 'Intermedio',
  description: 'Desarrollo multiplataforma y publicación.',
  units: [
    ['Fundamentos multiplataforma', 'Compara Flutter y React Native con criterios técnicos.', [
      ['Dart y Flutter', 'Widgets y estado', 'Diseño adaptable'],
      ['React Native', 'Componentes nativos y navegación', 'Estado y estilos'],
      ['Elegir una tecnología', 'Rendimiento y ecosistema', 'Ventajas y limitaciones'],
    ]],
    ['Publicar una app', 'Datos, calidad, privacidad y publicación de aplicaciones.', [
      ['Datos y APIs', 'HTTP, almacenamiento y errores', 'Autenticación'],
      ['Testing y accesibilidad', 'Pruebas y navegación accesible', 'Permisos y privacidad'],
      ['Proyecto multiplataforma', 'Builds y tiendas: conceptos', '[Proyecto] App de seguimiento personal'],
    ]],
  ],
});
