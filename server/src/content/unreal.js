import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'unreal', title: 'Unreal Engine y C++', icon: '🕹️', color: '#343a40', level: 'Intermedio',
  description: 'Blueprints, gameplay y optimización.',
  units: [
    ['Introducción a Unreal', 'Editor, Blueprints y fundamentos de C++ para Unreal.', [
      ['Editor y actores', 'Niveles, componentes y assets', 'Sistema de eventos'],
      ['Blueprints', 'Variables, funciones y comunicación', 'Inputs y gameplay'],
      ['Fundamentos de C++', 'Clases, punteros inteligentes y referencias', 'Clases de Unreal'],
    ]],
    ['Prototipo 3D', 'Interacción, inteligencia, rendimiento y empaquetado.', [
      ['Interacción y física', 'Detección de colisiones', 'Interfaces de interacción'],
      ['IA y rendimiento', 'Behavior Trees: introducción', 'Profiling y LOD'],
      ['Proyecto Unreal', 'Empaquetado y pruebas', '[Proyecto] Prototipo jugable en 3D'],
    ]],
  ],
});
