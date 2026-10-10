import axios from 'axios';

<<<<<<< HEAD
const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization Bearer token to requests
=======
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('scamshield_token');
    if (token) {
<<<<<<< HEAD
      config.headers.Authorization = `Bearer ${token}`;
=======
      config.headers['Authorization'] = `Bearer ${token}`;
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
    }
    return config;
  },
  (error) => Promise.reject(error)
);

<<<<<<< HEAD
// Interceptor to handle global response errors (e.g. 401 Unauthorized, 429 Rate Limit)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // Clear invalid token if unauthenticated
=======
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized and trying to access protected route, clear stale token
      const isAuthPath = error.config.url.includes('/auth/login') || error.config.url.includes('/auth/register');
      if (!isAuthPath) {
>>>>>>> 31bd52d2744288ef5bea2b1c40185b0655ac316c
        localStorage.removeItem('scamshield_token');
        localStorage.removeItem('scamshield_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
