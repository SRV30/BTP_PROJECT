import { AppShell } from '../components/layout/AppShell'
import AIInsights from '../pages/AIInsights/AIInsights'
import Analytics from '../pages/Analytics/Analytics'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import Predictions from '../pages/Predictions/Predictions'
import Profile from '../pages/Profile/Profile'
import Splash from '../pages/Splash/Splash'
import { useRouter } from './routerContext'
import { Navigate } from './routerPrimitives'

const appPages = {
  '/dashboard': <Dashboard />,
  '/analytics': <Analytics />,
  '/ai-insights': <AIInsights />,
  '/predictions': <Predictions />,
  '/profile': <Profile />,
}

export const AppRoutes = () => {
  const { path } = useRouter()

  if (path === '/') return <Splash />
  if (path === '/login') return <Login />
  if (appPages[path]) return <AppShell>{appPages[path]}</AppShell>

  return <Navigate replace to="/" />
}
