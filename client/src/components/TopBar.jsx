import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../UserContext.jsx';

export default function TopBar() {
  const { user } = useUser();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">🧭</span>
          <span className="brand-name">CodeRuta</span>
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Aprender
          </NavLink>
          <NavLink to="/roadmap">Roadmap</NavLink>
          <NavLink to="/practica">Practicar</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
        </nav>
        <div className="chips">
          <span className={`chip ${user.playedToday ? 'chip-fire' : 'chip-dim'}`} title="Racha de días seguidos">
            🔥 {user.streak}
          </span>
          <span className="chip chip-xp" title="Experiencia total">
            ⭐ {user.xp}
          </span>
          <Link to="/perfil" className="avatar-sm" title={user.name}>
            {user.avatar}
          </Link>
        </div>
      </div>
    </header>
  );
}
