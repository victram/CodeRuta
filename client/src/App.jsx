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
import Roadmap from './pages/Roadmap.jsx';
import PlacementTest from './pages/PlacementTest.jsx';

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
  if (!user.placementCompleted) {
    return (
      <Routes>
        <Route path="/nivel" element={<PlacementTest />} />
        <Route path="*" element={<Navigate to="/nivel" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/nivel" element={<PlacementTest />} />
      <Route path="/leccion/:id" element={<LessonPlayer mode="lesson" />} />
      <Route path="/practica" element={<LessonPlayer mode="practice" />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/curso/:id" element={<Course />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/perfil" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
