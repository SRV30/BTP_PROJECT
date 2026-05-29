import { useCallback, useEffect, useMemo, useState } from 'react'
import { normalizePath, RouterContext, useRouter } from './routerContext'

export const BrowserRouter = ({ children }) => {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname || '/'))

  useEffect(() => {
    const handlePopState = () => setPath(normalizePath(window.location.pathname || '/'))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    const nextPath = normalizePath(to)
    setPath((currentPath) => {
      if (nextPath === currentPath) return currentPath
      window.history[replace ? 'replaceState' : 'pushState']({}, '', nextPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return nextPath
    })
  }, [])

  const value = useMemo(() => ({ navigate, path }), [navigate, path])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export const Link = ({ children, onClick, to, ...props }) => {
  const { navigate } = useRouter()

  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}

export const NavLink = ({ children, className, to, ...props }) => {
  const { path } = useRouter()
  const isActive = normalizePath(path) === normalizePath(to)
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className

  return (
    <Link className={resolvedClassName} to={to} {...props}>
      {children}
    </Link>
  )
}

export const Navigate = ({ replace = false, to }) => {
  const { navigate } = useRouter()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])

  return null
}
