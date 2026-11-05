import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from './UserContext.jsx';
import TopBar from './components/TopBar.jsx';
import Spinner from './components/Spinner.jsx';
import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import Course from './pages/Course.jsx';
import LessonPlayer from './pages/LessonPlayer.jsx';
import Profile from './pages/Profile.jsx';

function Layout() {
  const { refresh } = useUser();
  const { pathname } = useLocation();
  useEffect(() => {
    refresh();
    window.scrollTo(0, 0);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="app-shell">
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const { userId, user } = useUser();
  if (!userId) return <Welcome />;
  if (!user) return <Spinner fullscreen />;

  return (
    <Routes>
      <Route path="/leccion/:id" element={<LessonPlayer mode="lesson" />} />
      <Route path="/practica" element={<LessonPlayer mode="practice" />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/curso/:id" element={<Course />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
