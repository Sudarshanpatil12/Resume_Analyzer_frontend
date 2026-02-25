import axios from 'axios';
import { emitAppAlert } from '../utils/alerts';

const isProd = import.meta.env.PROD;
// const defaultBaseURL = 'http://localhost:5001/api';
const defaultBaseURL = isProd ? '/api' : 'http://localhost:5001/api';

const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseURL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ra_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Request failed';

    if (error.response?.status === 401) {
      localStorage.removeItem('ra_token');
      emitAppAlert({ type: 'error', message: 'Session expired. Please login again.' });
    } else {
      emitAppAlert({ type: 'error', message });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
