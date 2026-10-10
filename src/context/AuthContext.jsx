import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  const [token, setToken] = useState(localStorage.getItem('scamshield_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('scamshield_user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
=======
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
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
        localStorage.removeItem('scamshield_user');
      }
    }
    setLoading(false);
<<<<<<< HEAD
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
=======
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
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
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
