import { useEffect } from 'react';

/**
 * Tiñe el fondo de la página con el color base de la ruta (frontend, backend, IA…).
 * Al salir de la página se vuelve al fondo normal.
 */
export function useTrackTheme(color) {
  useEffect(() => {
    if (!color) return;
    const body = document.body;
    body.style.setProperty('--track', color);
    body.classList.add('tinted');
    return () => {
      body.classList.remove('tinted');
      body.style.removeProperty('--track');
    };
  }, [color]);
}
