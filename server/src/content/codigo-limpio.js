import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'codigo-limpio', title: 'Código limpio y patrones', icon: '🧹', color: '#0ca678', level: 'Intermedio',
  description: 'Principios de diseño y mantenibilidad.',
  units: [
    ['Diseñar bien', 'Legibilidad, principios y patrones con criterio.', [
      ['Legibilidad y refactorización', 'Nombres y funciones', 'Code smells'],
      ['SOLID', 'Responsabilidades y dependencias', 'Ejemplos prácticos'],
      ['Patrones de diseño', 'Factory, Strategy y Observer', 'Cuándo no aplicar patrones'],
    ]],
    ['Diseño aplicado', 'Arquitectura, revisión y mejora segura del código.', [
      ['Arquitectura en capas', 'Dependencias y módulos', 'Casos de uso'],
      ['Revisión de código', 'Feedback constructivo', 'Deuda técnica'],
      ['Proyecto mantenible', 'Refactorización con tests', '[Proyecto] Mejorar una aplicación existente'],
    ]],
  ],
});
