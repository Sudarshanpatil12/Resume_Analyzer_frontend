import apiClient from './client';

export const uploadResume = (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  return apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const fetchResumes = () => apiClient.get('/resumes');
