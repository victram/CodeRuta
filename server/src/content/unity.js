import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'unity', title: 'Fundamentos y Unity', icon: '🎮', color: '#495057', level: 'Desde cero',
  description: 'Desarrolla prototipos interactivos con C#.',
  units: [
    ['Bases de juegos', 'Bucle de juego, C# y organización de escenas.', [
      ['Game loop y coordenadas', 'Update y tiempo delta', 'Vectores y transformaciones'],
      ['Introducción a C#', 'Variables, clases y eventos', 'Componentes'],
      ['Escenas y prefabs', 'Objetos, colisiones y físicas', 'Prefab y organización'],
    ]],
    ['Juego completo', 'Movimiento, presentación y construcción de un juego 2D.', [
      ['Movimiento y cámara', 'Controles y animación', 'Cámara'],
      ['Interfaz y sonido', 'HUD y menús', 'Audio y feedback'],
      ['Proyecto Unity', 'Pruebas y builds', '[Proyecto] Juego 2D con niveles'],
    ]],
  ],
});
