import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'cloud-proveedores', title: 'AWS y Azure esencial', icon: '☁️', color: '#1864ab', level: 'Intermedio',
  description: 'Servicios, arquitectura y costes.',
  units: [
    ['Primeros pasos en cloud', 'Modelos, servicios, redes e identidad en la nube.', [
      ['Modelos de nube', 'IaaS, PaaS y SaaS', 'Regiones y zonas'],
      ['Computación y almacenamiento', 'Máquinas virtuales y objetos', 'Bases de datos gestionadas'],
      ['Redes e identidad', 'VPC/VNet y reglas', 'IAM y mínimo privilegio'],
    ]],
    ['Desplegar y operar', 'Disponibilidad, observabilidad y control de costes.', [
      ['Escalabilidad y disponibilidad', 'Balanceo y autoescalado', 'Recuperación ante fallos'],
      ['Costes y observabilidad', 'Presupuestos y etiquetas', 'Logs y métricas'],
      ['Proyecto cloud', 'Infraestructura básica', '[Proyecto] Desplegar app con alertas y presupuesto'],
    ]],
  ],
});
