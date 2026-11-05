import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'arquitectura-equipos', title: 'Arquitectura y equipos', icon: '🤝', color: '#087f5b', level: 'Avanzado',
  description: 'Decisiones técnicas y colaboración.',
  units: [
    ['Arquitecturas de software', 'Sistemas, límites y documentación de decisiones.', [
      ['Monolito y microservicios', 'Ventajas y trade-offs', 'Límites de dominio'],
      ['Diseño de sistemas', 'Disponibilidad y escalabilidad', 'Colas y caché: introducción'],
      ['Documentación técnica', 'Diagramas y ADR', 'Contratos de API'],
    ]],
    ['Trabajo profesional', 'Planificación, entrega fiable y aprendizaje de incidentes.', [
      ['Gestión ágil', 'Kanban y Scrum', 'Estimación y planificación'],
      ['Entrega fiable', 'Releases, rollbacks y observabilidad', 'Incidentes y postmortems'],
      ['Proyecto final', 'Diseño, documentación y pruebas', '[Proyecto] Solución de extremo a extremo'],
    ]],
  ],
});
