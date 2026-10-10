import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('scamshield_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('scamshield_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('scamshield_user');
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const { token: jwtToken, id, name, email: userEmail, role } = response.data;
    
    const userData = { id, name, email: userEmail, role };
    localStorage.setItem('scamshield_token', jwtToken);
    localStorage.setItem('scamshield_user', JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password });
    const { token: jwtToken, id, name: userName, email: userEmail, role } = response.data;

    const userData = { id, name: userName, email: userEmail, role };
    localStorage.setItem('scamshield_token', jwtToken);
    localStorage.setItem('scamshield_user', JSON.stringify(userData));

    setToken(jwtToken);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('scamshield_token');
    localStorage.removeItem('scamshield_user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user && user.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
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
