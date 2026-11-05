import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'kotlin-android', title: 'Kotlin y Android', icon: '🤖', color: '#3ddc84', level: 'Desde cero',
  description: 'Interfaces, actividades y estado en Android.',
  units: [
    ['Kotlin esencial', 'Lenguaje Kotlin, orientación a objetos y primeros pasos en Android.', [
      ['Variables, funciones y clases', 'Tipos, null safety y colecciones', 'Funciones y data classes'],
      ['Control de flujo y objetos', 'Condicionales, bucles y POO', 'Interfaces y lambdas'],
      ['Primeros pasos Android', 'Android Studio y estructura', 'Emulador y ciclo de vida'],
    ]],
    ['Aplicaciones Android', 'Interfaces modernas, arquitectura, persistencia y un proyecto completo.', [
      ['Interfaces con Jetpack Compose', 'Composables y layouts', 'Estado y navegación'],
      ['Datos y arquitectura', 'ViewModel y repositorios', 'Persistencia con Room'],
      ['Proyecto móvil', 'Permisos y pruebas', '[Proyecto] App Android de hábitos'],
    ]],
  ],
});
