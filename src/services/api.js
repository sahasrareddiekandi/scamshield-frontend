import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization Bearer token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('scamshield_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle global response errors (e.g. 401 Unauthorized, 429 Rate Limit)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Clear invalid token if unauthenticated
        localStorage.removeItem('scamshield_token');
        localStorage.removeItem('scamshield_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
