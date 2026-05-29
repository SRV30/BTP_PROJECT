import { createContext, useContext } from 'react'

export const RouterContext = createContext(null)

export const normalizePath = (path) => (path === '/' ? '/' : path.replace(/\/$/, ''))

export const useRouter = () => {
  const router = useContext(RouterContext)
  if (!router) {
    throw new Error('Router primitives must be used inside BrowserRouter')
  }
  return router
}
