import { apiClient } from './apiClient'

export const appApi = {
  dashboard: async () => (await apiClient.get('/dashboard')).data,
  analytics: async () => (await apiClient.get('/analytics')).data,
  predictions: async () => (await apiClient.get('/predictions')).data,
  insights: async () => (await apiClient.get('/insights')).data,
  profile: async () => (await apiClient.get('/profile')).data,
  updateProfile: async (payload) => (await apiClient.put('/profile', payload)).data,
  changePassword: async (payload) => (await apiClient.put('/change-password', payload)).data,

  // Daily Logs
  getLogs: async () => (await apiClient.get('/logs')).data,
  getLogsByDate: async (date) => (await apiClient.get(`/logs/date/${date}`)).data,
  createLog: async (payload) => (await apiClient.post('/logs', payload)).data,
  updateLog: async (id, payload) => (await apiClient.put(`/logs/${id}`, payload)).data,
  deleteLog: async (id) => (await apiClient.delete(`/logs/${id}`)).data,
  getLogHistory: async (page = 1, limit = 30) => (await apiClient.get(`/logs/history?page=${page}&limit=${limit}`)).data,
}
