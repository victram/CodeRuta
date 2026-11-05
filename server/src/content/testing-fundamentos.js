import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'testing-fundamentos', title: 'Fundamentos de testing', icon: '🔎', color: '#f59f00', level: 'Desde cero',
  description: 'Casos de prueba, informes y calidad.',
  units: [
    ['Bases de calidad', 'Tipos de pruebas, diseño de casos y comunicación de defectos.', [
      ['Tipos de pruebas', 'Unitarias, integración y end-to-end', 'Pirámide de pruebas'],
      ['Diseño de casos', 'Particiones y valores límite', 'Precondiciones y resultados esperados'],
      ['Gestión de bugs', 'Reproducibilidad y prioridad', 'Informes útiles'],
    ]],
    ['QA en equipos', 'Pruebas funcionales, APIs y planificación de calidad.', [
      ['Pruebas funcionales', 'Regresión y exploratorias', 'Matrices de casos'],
      ['APIs y herramientas', 'Pruebas de endpoints', 'Colecciones y entornos'],
      ['Proyecto QA', 'Plan y evidencia', '[Proyecto] Probar una aplicación de tareas'],
    ]],
  ],
});
