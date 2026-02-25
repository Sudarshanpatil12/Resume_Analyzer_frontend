import { createContext, useEffect, useMemo, useState } from 'react';
import { getMe, loginUser, registerUser } from '../api/authApi';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ra_token');
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((res) => setUser(res.data.data.user))
      .catch(() => {
        localStorage.removeItem('ra_token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const res = await loginUser(payload);
    localStorage.setItem('ra_token', res.data.data.token);
    setUser(res.data.data.user);
    return res;
  };

  const register = async (payload) => {
    const res = await registerUser(payload);
    localStorage.setItem('ra_token', res.data.data.token);
    setUser(res.data.data.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem('ra_token');
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, register, logout, isAuthenticated: Boolean(user) }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
