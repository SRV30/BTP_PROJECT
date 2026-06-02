import { apiClient } from './apiClient'

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials)
    return data
  },
  signup: async ({ fullName, ...payload }) => {
    const { data } = await apiClient.post('/auth/signup', { ...payload, name: fullName })
    return data
  },
  forgotPassword: async (payload) => {
    const { data } = await apiClient.post('/auth/forgot-password', payload)
    return data
  },
  logout: async () => {
    const { data } = await apiClient.post('/auth/logout')
    return data
  },
  me: async () => {
    const { data } = await apiClient.get('/auth/me')
    return data
  },
  resetPassword: async ({ password, token }) => {
    const { data } = await apiClient.post(`/auth/reset-password/${token}`, { password })
    return data
  },
}
