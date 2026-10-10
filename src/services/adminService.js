import api from './api';

export const getAllReports = async () => {
  const response = await api.get('/admin/reports');
  return response.data;
};

export const updateReportStatus = async (id, status, adminNotes) => {
  const response = await api.patch(`/admin/reports/${id}/status`, { status, adminNotes });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const toggleUserStatus = async (userId) => {
  const response = await api.patch(`/admin/users/${userId}/toggle-status`);
  return response.data;
};

export const getAdminAnalytics = async () => {
  const response = await api.get('/admin/analytics');
  return response.data;
};

export const getAuditLogs = async () => {
  const response = await api.get('/admin/audit-logs');
  return response.data;
};
