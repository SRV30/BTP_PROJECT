import { createContext } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  isAuthLoading: false,
  token: null,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
})
