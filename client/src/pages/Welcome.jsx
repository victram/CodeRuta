import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useUser } from '../UserContext.jsx';

const AVATARS = ['🦊', '🐼', '🐱', '🐸', '🦉', '🐙', '🚀', '👾', '🧠', '🐉', '🦄', '🤖'];

export default function Welcome() {
  const { login } = useUser();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.users().then(setUsers).catch(() => setError('No se pudo conectar con el servidor. ¿Está arrancado?'));
  }, []);

  async function create(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const u = await api.createUser({ name, avatar });
      login(u.id);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="welcome">
      <div className="welcome-hero">
        <div className="welcome-logo">🧭</div>
        <h1>CodeRuta</h1>
        <p>Aprende tecnología con lecciones cortas, ejercicios y exámenes: desarrollo, datos, IA, cloud, testing, ciberseguridad y más.</p>
        <ul className="welcome-points">
          <li>📚 Teoría fácil en tarjetas</li>
          <li>🧩 Ejercicios interactivos</li>
          <li>🏆 Exámenes por unidad</li>
          <li>🔥 Rachas, XP y niveles</li>
        </ul>
      </div>

      <div className="welcome-panel card">
        {users.length > 0 && (
          <>
            <h2>¿Quién eres?</h2>
            <div className="profile-list">
              {users.map((u) => (
                <button key={u.id} className="profile-btn" onClick={() => login(u.id)}>
                  <span className="avatar-lg">{u.avatar}</span>
                  <span>
                    <strong>{u.name}</strong>
                    <span className="muted small">{u.xp} XP</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="divider">o crea un perfil nuevo</div>
          </>
        )}
        {users.length === 0 && <h2>Crea tu perfil</h2>}

        <form onSubmit={create} className="create-form">
          <label className="field">
            <span>Tu nombre</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Víctor" maxLength={30} required />
          </label>
          <div className="field">
            <span>Elige un avatar</span>
            <div className="avatar-picker">
              {AVATARS.map((a) => (
                <button type="button" key={a} className={`avatar-choice ${a === avatar ? 'active' : ''}`} onClick={() => setAvatar(a)}>
                  {a}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-primary btn-lg btn-block" disabled={busy || !name.trim()}>
            Empezar a aprender
          </button>
        </form>
      </div>
    </div>
  );
}
