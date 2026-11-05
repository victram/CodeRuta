import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'fullstack-arquitectura', title: 'Arquitectura full stack', icon: '🏗️', color: '#5f3dc4', level: 'Avanzado',
  description: 'Seguridad, rendimiento y mantenimiento.',
  units: [
    ['Diseño profesional', 'Capas, seguridad, consistencia y rendimiento.', [
      ['Arquitectura por capas', 'Separar UI, dominio y datos', 'Contratos y DTO'],
      ['Seguridad y datos', 'Autorización y secretos', 'Transacciones'],
      ['Rendimiento', 'Caché y paginación', 'Consultas eficientes'],
    ]],
    ['Producción', 'Observar, entregar y mantener un producto desplegado.', [
      ['Observabilidad', 'Logging y métricas', 'Seguimiento de errores'],
      ['Entrega continua', 'CI/CD y migraciones', 'Estrategias de despliegue'],
      ['Proyecto de portfolio', 'Documentación y pruebas', '[Proyecto] SaaS pequeño desplegado'],
    ]],
  ],
});
