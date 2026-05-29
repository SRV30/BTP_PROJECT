import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = () => {
  const { isAuthenticated, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return <div className="min-h-screen bg-[#050816] p-6 text-cyan-200">Restoring your MoodSense session...</div>
  }

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
}
