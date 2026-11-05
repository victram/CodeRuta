export default function Spinner({ fullscreen = false }) {
  const el = <div className="spinner" role="status" aria-label="Cargando" />;
  return fullscreen ? <div className="center-screen">{el}</div> : <div className="center-block">{el}</div>;
}
