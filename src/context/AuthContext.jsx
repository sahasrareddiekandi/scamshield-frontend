import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('scamshield_token');
    const savedUser = localStorage.getItem('scamshield_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('scamshield_token');
        localStorage.removeItem('scamshield_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data;
    setToken(data.token);
    setUser({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    });
    localStorage.setItem('scamshield_token', data.token);
    localStorage.setItem('scamshield_user', JSON.stringify({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    }));
    return data;
  };

  const register = async (fullName, email, password) => {
    const response = await api.post('/auth/register', { fullName, email, password });
    const data = response.data;
    setToken(data.token);
    setUser({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    });
    localStorage.setItem('scamshield_token', data.token);
    localStorage.setItem('scamshield_user', JSON.stringify({
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    }));
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('scamshield_token');
    localStorage.removeItem('scamshield_user');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, isAdmin, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
