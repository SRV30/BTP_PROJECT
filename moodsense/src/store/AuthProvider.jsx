import { useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/authApi'
import { AuthContext } from './authContext'

const TOKEN_KEY = 'moodsense_token'
const USER_KEY = 'moodsense_user'

const readStoredUser = () => {
  try {
    return JSON.parse(window.localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => window.localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => readStoredUser())
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(token))

  useEffect(() => {
    if (!token) return

    authApi
      .me()
      .then(({ user: currentUser }) => {
        setUser(currentUser)
        window.localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
      })
      .catch(() => {
        setToken(null)
        setUser(null)
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.removeItem(USER_KEY)
      })
      .finally(() => setIsAuthLoading(false))
  }, [token])

  const persistSession = ({ token: nextToken, user: nextUser }) => {
    setToken(nextToken)
    setUser(nextUser)
    window.localStorage.setItem(TOKEN_KEY, nextToken)
    window.localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      isAuthLoading,
      token,
      user,
      login: async (credentials) => {
        const session = await authApi.login(credentials)
        persistSession(session)
        return session
      },
      signup: async (payload) => {
        const session = await authApi.signup(payload)
        persistSession(session)
        return session
      },
      logout: async () => {
        try {
          if (token) await authApi.logout()
        } finally {
          setToken(null)
          setUser(null)
          window.localStorage.removeItem(TOKEN_KEY)
          window.localStorage.removeItem(USER_KEY)
        }
      },
    }),
    [isAuthLoading, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
