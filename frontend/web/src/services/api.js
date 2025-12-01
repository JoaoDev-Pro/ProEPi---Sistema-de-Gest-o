// frontend\web\src\services\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Endereço do seu Backend
});

// Interceptor para adicionar o Token em toda requisição
api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;