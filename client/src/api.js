async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`/api${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
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
  loseHeart: (id) => post(`/users/${id}/hearts/lose`),

  tracks: (userId) => request(`/tracks?userId=${userId}`),
  course: (id, userId) => request(`/courses/${encodeURIComponent(id)}?userId=${userId}`),
  lesson: (id) => request(`/lessons/${encodeURIComponent(id)}`),
  completeLesson: (id, body) => post(`/lessons/${encodeURIComponent(id)}/complete`, body),

  practice: (userId) => request(`/practice?userId=${userId}`),
  completePractice: (body) => post('/practice/complete', body),
};
