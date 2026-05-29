import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import AIInsights from '../pages/AIInsights/AIInsights'
import Analytics from '../pages/Analytics/Analytics'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import Predictions from '../pages/Predictions/Predictions'
import Profile from '../pages/Profile/Profile'
import Splash from '../pages/Splash/Splash'

export const AppRoutes = () => (
  <Routes>
    <Route element={<Splash />} path="/" />
    <Route element={<Login />} path="/login" />
    <Route element={<AppShell />}>
      <Route element={<Navigate replace to="/dashboard" />} path="/app" />
      <Route element={<Dashboard />} path="/dashboard" />
      <Route element={<Analytics />} path="/analytics" />
      <Route element={<AIInsights />} path="/ai-insights" />
      <Route element={<Predictions />} path="/predictions" />
      <Route element={<Profile />} path="/profile" />
    </Route>
    <Route element={<Navigate replace to="/" />} path="*" />
  </Routes>
)
