import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import AIInsights from '../pages/AIInsights/AIInsights'
import Analytics from '../pages/Analytics/Analytics'
import DailyLogsPage from '../pages/DailyLogs/DailyLogsPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import Login from '../pages/Login/Login'
import Predictions from '../pages/Predictions/Predictions'
import Profile from '../pages/Profile/Profile'
import ResetPassword from '../pages/ResetPassword/ResetPassword'
import Signup from '../pages/Signup/Signup'
import Splash from '../pages/Splash/Splash'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => (
  <Routes>
    <Route element={<Splash />} path="/" />
    <Route element={<Login />} path="/login" />
    <Route element={<Signup />} path="/signup" />
    <Route element={<ForgotPassword />} path="/forgot-password" />
    <Route element={<ResetPassword />} path="/reset-password" />
    <Route element={<ResetPassword />} path="/reset-password/:token" />
    <Route element={<ProtectedRoute />}>
      <Route element={<AppShell />}>
        <Route element={<Navigate replace to="/dashboard" />} path="/app" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<DailyLogsPage />} path="/logs" />
        <Route element={<Analytics />} path="/analytics" />
        <Route element={<AIInsights />} path="/insights" />
        <Route element={<Navigate replace to="/insights" />} path="/ai-insights" />
        <Route element={<Predictions />} path="/predictions" />
        <Route element={<Profile />} path="/profile" />
      </Route>
    </Route>
    <Route element={<Navigate replace to="/" />} path="*" />
  </Routes>
)
