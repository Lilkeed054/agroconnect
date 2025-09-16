// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUser()
        .then(userData => setUser(userData))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      addNotification(`Welcome back, ${data.user.name}!`, 'success');
      return data;
    } catch (err) {
      addNotification(err.message, 'error');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await api.register(userData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      addNotification('Account created successfully!', 'success');
      return data;
    } catch (err) {
      addNotification(err.message, 'error');
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (e) {}
    localStorage.removeItem('token');
    setUser(null);
    addNotification('Logged out', 'info');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      setUser, // ✅ ADD THIS
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);