async function request(path, { method = 'GET', body } = {}) {
  const options = {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  };
  let res;
  try {
    res = await fetch(`/api${path}`, options);
  } catch {
    if (method === 'GET') {
      await new Promise((resolve) => setTimeout(resolve, 350));
      try {
        res = await fetch(`/api${path}`, options);
      } catch {
        throw new Error('No se pudo conectar con CodeRuta. Comprueba que la aplicación siga abierta y vuelve a intentarlo.');
      }
    } else {
      throw new Error('Se perdió la conexión al guardar. Tu respuesta sigue en pantalla; inténtalo de nuevo.');
    }
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

const post = (path, body = {}) => request(path, { method: 'POST', body });

export const api = {
  users: () => request('/users'),
  createUser: (body) => post('/users', body),
  user: (id) => request(`/users/${id}`),
  updateUser: (id, body) => request(`/users/${id}`, { method: 'PATCH', body }),
  stats: (id) => request(`/users/${id}/stats`),
  startPlacement: (userId) => post('/placement/start', { userId }),
  skipPlacement: (userId) => post('/placement/skip', { userId }),
  completePlacement: (body) => post('/placement/complete', body),
  placementResult: (userId) => request(`/placement/result?userId=${userId}`),
  tracks: (userId) => request(`/tracks?userId=${userId}`),
  roadmap: (userId) => request(`/roadmap?userId=${userId}`),
  course: (id, userId) => request(`/courses/${encodeURIComponent(id)}?userId=${userId}`),
  lesson: (id) => request(`/lessons/${encodeURIComponent(id)}`),
  completeLesson: (id, body) => post(`/lessons/${encodeURIComponent(id)}/complete`, body),

  practice: (userId) => request(`/practice?userId=${userId}`),
  completePractice: (body) => post('/practice/complete', body),
};
