import apiClient from './client';

export const createAnalysis = (payload) => apiClient.post('/analysis', payload);
export const fetchAnalysisById = (analysisId) => apiClient.get(`/analysis/${analysisId}`);
