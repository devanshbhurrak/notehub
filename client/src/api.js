import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6969',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;