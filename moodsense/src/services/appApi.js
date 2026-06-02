import { apiClient } from './apiClient'

export const appApi = {
  dashboard: async () => (await apiClient.get('/dashboard')).data,
  analytics: async () => (await apiClient.get('/analytics')).data,
  predictions: async () => (await apiClient.get('/predictions')).data,
  insights: async () => (await apiClient.get('/insights')).data,
  profile: async () => (await apiClient.get('/profile')).data,
  updateProfile: async (payload) => (await apiClient.put('/profile', payload)).data,
  changePassword: async (payload) => (await apiClient.put('/change-password', payload)).data,
}
