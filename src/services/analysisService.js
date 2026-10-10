import api from './api';

export const analyzeMessage = async (message) => {
  const response = await api.post('/analyze/message', { message });
  return response.data;
};

export const analyzeUrl = async (url) => {
  const response = await api.post('/analyze/url', { url });
  return response.data;
};

export const getUserAnalyses = async () => {
  const response = await api.get('/analyses');
  return response.data;
};

export const getAnalysisById = async (id) => {
  const response = await api.get(`/analyses/${id}`);
  return response.data;
};
