import { createContext } from 'react'

export const DUMMY_AUTH_STATE = false

export const AuthContext = createContext({
  isAuthenticated: DUMMY_AUTH_STATE,
  login: () => {},
  logout: () => {},
})
