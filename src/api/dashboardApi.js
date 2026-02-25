import apiClient from './client';

export const fetchDashboardStats = () => apiClient.get('/dashboard/stats');
export const fetchAnalysisHistory = () => apiClient.get('/dashboard/history');
