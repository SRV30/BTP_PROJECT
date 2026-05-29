import { DashboardCard } from '../dashboard/DashboardCard'

export const AccountSection = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Account</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-bold text-slate-200 transition hover:border-violet-300/30" type="button">Change Password</button>
      <button className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 font-bold text-slate-200 transition hover:border-violet-300/30" type="button">Logout</button>
      <button className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 font-bold text-rose-200 transition hover:bg-rose-500/20" type="button">Delete Account</button>
    </div>
  </DashboardCard>
)
