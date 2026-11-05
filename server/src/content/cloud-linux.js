import { expandedCourse } from './_expanded-helpers.js';

export default expandedCourse({
  id: 'cloud-linux', title: 'Linux y redes para cloud', icon: '🐧', color: '#1971c2', level: 'Desde cero',
  description: 'Fundamentos de sistemas y conectividad.',
  units: [
    ['Sistema operativo', 'Consola, administración y redes esenciales.', [
      ['Consola Linux', 'Comandos, rutas y permisos', 'Procesos y servicios'],
      ['Administración básica', 'Usuarios, paquetes y logs', 'SSH y seguridad'],
      ['Redes', 'DNS, TCP/IP y HTTP', 'Puertos y firewalls'],
    ]],
    ['Infraestructura', 'Virtualización, almacenamiento y operación segura.', [
      ['Virtualización y contenedores', 'Máquinas virtuales', 'Contenedores'],
      ['Almacenamiento y copias', 'Bloques, objetos y volúmenes', 'Backup y recuperación'],
      ['Proyecto servidor', 'Monitorización y hardening básico', '[Proyecto] Servidor Linux de laboratorio'],
    ]],
  ],
});
