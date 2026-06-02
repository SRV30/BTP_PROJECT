import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { appApi } from '../../services/appApi'
import { DashboardCard } from '../dashboard/DashboardCard'

export const AccountSection = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
  }

  const handlePasswordChange = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')
    setIsSubmitting(true)

    try {
      const response = await appApi.changePassword(form)
      setStatus(response.message || 'Password changed successfully')
      setForm({ currentPassword: '', newPassword: '' })
    } catch (apiError) {
      setError(apiError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <DashboardCard>
      <h2 className="text-lg font-bold text-white">Account</h2>
      <form className="mt-5 grid gap-4" onSubmit={handlePasswordChange}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-300">
            Current Password
            <input
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/50"
              name="currentPassword"
              onChange={handleChange}
              placeholder="Enter current password"
              type="password"
              value={form.currentPassword}
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-300">
            New Password
            <input
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/50"
              name="newPassword"
              onChange={handleChange}
              placeholder="Enter new password"
              type="password"
              value={form.newPassword}
            />
          </label>
        </div>
        {status && <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">{status}</p>}
        {error && <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200">{error}</p>}
        <div className="grid gap-3 sm:grid-cols-2">
          <button className="rounded-2xl border border-violet-300/30 bg-violet-500/15 px-4 py-3 font-bold text-violet-100 transition hover:bg-violet-500/25 disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>
          <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-bold text-slate-200 transition hover:border-violet-300/30" onClick={handleLogout} type="button">Logout</button>
        </div>
      </form>
    </DashboardCard>
  )
}
