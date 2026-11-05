const paths = {
  frontend: (
    <><rect x="6" y="9" width="36" height="29" rx="3" /><path d="M6 16h36M12 12.5h.1M16 12.5h.1M20 12.5h.1M21 23l-5 4 5 4M27 23l5 4-5 4" /></>
  ),
  backend: (
    <><rect x="7" y="7" width="34" height="10" rx="2" /><rect x="7" y="19" width="34" height="10" rx="2" /><rect x="7" y="31" width="34" height="10" rx="2" /><path d="M12 12h.1M12 24h.1M12 36h.1M18 12h17M18 24h17M18 36h17" /></>
  ),
  computacion: (
    <><rect x="13" y="13" width="22" height="22" rx="3" /><path d="M19 19h10v10H19zM18 5v8M24 5v8M30 5v8M18 35v8M24 35v8M30 35v8M5 18h8M5 24h8M5 30h8M35 18h8M35 24h8M35 30h8" /></>
  ),
  datos: (
    <><path d="M8 39V25h7v14M20 39V17h7v22M32 39V9h7v30" /><path d="M8 18l10-7 8 4 13-9" /></>
  ),
  ia: (
    <><circle cx="24" cy="24" r="5" /><circle cx="10" cy="12" r="3" /><circle cx="38" cy="12" r="3" /><circle cx="10" cy="36" r="3" /><circle cx="38" cy="36" r="3" /><path d="M13 14l7 7M35 14l-7 7M13 34l7-7M35 34l-7-7M24 7v12M24 29v12M22 7l2-3 2 3M22 41l2 3 2-3" /></>
  ),
  entrevistas: (
    <><path d="M7 10h25v18H17l-7 6v-6H7z" /><path d="M20 20h21v16H30l-6 5v-5h-4z" /><path d="M13 16h13M27 27h8" /></>
  ),
  ciberseguridad: (
    <><path d="M24 5l15 6v10c0 10-6 17-15 22C15 38 9 31 9 21V11z" /><circle cx="24" cy="22" r="4" /><path d="M24 26v7" /></>
  ),
  movil: (
    <><rect x="13" y="5" width="22" height="38" rx="4" /><path d="M20 10h8M22 37h4M20 20l-4 4 4 4M28 20l4 4-4 4" /></>
  ),
  testing: (
    <><path d="M18 6h12M21 6v12L10 36a4 4 0 003.5 6h21a4 4 0 003.5-6L27 18V6" /><path d="M15 33h18M18 29l4 4 8-9" /></>
  ),
  cloud: (
    <><path d="M14 37h23a8 8 0 001-16 13 13 0 00-25-3A10 10 0 0014 37z" /><path d="M24 34V20M18 26l6-6 6 6" /></>
  ),
  videojuegos: (
    <><path d="M14 18h20a9 9 0 018 9l-2 10a5 5 0 01-8 3l-5-4h-6l-5 4a5 5 0 01-8-3L6 27a9 9 0 018-9z" /><path d="M15 24v9M10.5 28.5h9M31 26h.1M36 31h.1M19 18l2-6h6l2 6" /></>
  ),
  fullstack: (
    <><path d="M24 6L7 15l17 9 17-9zM7 24l17 9 17-9M7 33l17 9 17-9" /><path d="M16 15h16" /></>
  ),
  'ingenieria-software': (
    <><rect x="6" y="8" width="14" height="11" rx="2" /><rect x="28" y="8" width="14" height="11" rx="2" /><rect x="17" y="30" width="14" height="11" rx="2" /><path d="M13 19v6h22v-6M24 25v5M10 13h6M32 13h6M21 35h6" /></>
  ),
  english: (
    <><path d="M6 9h25v20H17l-7 6v-6H6z" /><path d="M22 20h20v15h-6v6l-7-6h-7z" /><path d="M13 24l4-10 4 10M14.5 20h5M28 25h8M32 22v9" /></>
  ),
};

export default function TrackLogo({ id, color = 'currentColor', className = '' }) {
  return (
    <span className={`track-logo ${className}`} style={{ '--logo-color': color }} aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <g fill="none" stroke="currentColor" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round">
          {paths[id] ?? paths.computacion}
        </g>
      </svg>
    </span>
  );
}
