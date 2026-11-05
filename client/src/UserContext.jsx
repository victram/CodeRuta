import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from './api.js';

const STORAGE_KEY = 'coderuta.userId';
const UserContext = createContext(null);

function readStoredId() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(readStoredId);
  const [user, setUser] = useState(null);

  const refresh = useCallback(async () => {
    if (!userId) return setUser(null);
    try {
      setUser(await api.user(userId));
    } catch (err) {
      // Solo cerramos sesión si el perfil ya no existe; un fallo de red (p. ej. el servidor reiniciándose) no cuenta.
      if (err.status === 404) logout();
      else setTimeout(() => setRetry((n) => n + 1), 1500);
    }
  }, [userId]);

  const [retry, setRetry] = useState(0);
  useEffect(() => {
    refresh();
  }, [refresh, retry]);

  function login(id) {
    try {
      localStorage.setItem(STORAGE_KEY, String(id));
    } catch {
      /* sin almacenamiento: la sesión dura hasta recargar */
    }
    setUser(null);
    setUserId(id);
  }

  function logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nada */
    }
    setUser(null);
    setUserId(null);
  }

  return <UserContext.Provider value={{ userId, user, setUser, refresh, login, logout }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
