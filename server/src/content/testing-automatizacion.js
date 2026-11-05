import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'testing-automatizacion', title: 'Automatización de pruebas', icon: '🧪', color: '#e67700', level: 'Intermedio',
  description: 'Vitest, Playwright y CI.',
  units: [
    ['Pruebas automatizadas', 'Pruebas unitarias, de integración y de extremo a extremo.', [
      ['Unitarias con Vitest', 'Matchers y mocks', 'Cobertura con criterio'],
      ['Integración', 'Componentes, APIs y bases de datos', 'Fixtures'],
      ['Pruebas E2E con Playwright', 'Selectores estables y aserciones', 'Manejo de esperas'],
    ]],
    ['Calidad continua', 'Automatización fiable integrada en el flujo de entrega.', [
      ['Pruebas en CI', 'GitHub Actions', 'Informes de ejecución'],
      ['Pruebas fiables', 'Flaky tests y aislamiento', 'Datos de prueba'],
      ['Proyecto de automatización', 'Suite completa', '[Proyecto] Pipeline de calidad web'],
    ]],
  ],
});
