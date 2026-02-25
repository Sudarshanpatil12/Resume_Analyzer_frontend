import apiClient from './client';

export const registerUser = (payload) => apiClient.post('/auth/register', payload);
export const loginUser = (payload) => apiClient.post('/auth/login', payload);
export const getMe = () => apiClient.get('/auth/me');
