import { productivityContributors } from '../../data/dashboardData'
import { DashboardCard } from './DashboardCard'

export const ProductivityCard = () => (
  <DashboardCard className="lg:col-span-6">
    <div className="mb-5 flex items-center gap-2">
      <h2 className="text-lg font-bold text-white">Productivity Score</h2>
      <span className="text-slate-400">ⓘ</span>
    </div>
    <div className="grid gap-6 sm:grid-cols-[140px_1fr] sm:items-center">
      <div>
        <p><span className="text-5xl font-black text-emerald-400">78</span><span className="text-2xl text-slate-500">/100</span></p>
        <p className="mt-1 font-bold text-emerald-300">Good Job!</p>
      </div>
      <div className="h-4 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-lg shadow-emerald-400/30" />
      </div>
    </div>
    <p className="mt-6 text-sm font-semibold text-slate-300">Top Contributors</p>
    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {productivityContributors.map((contributor) => (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3" key={contributor.label}>
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-sm font-black text-cyan-300">{contributor.icon}</div>
          <p className="text-xs font-bold text-white">{contributor.label}</p>
          <p className="text-[0.65rem] text-slate-400">{contributor.detail}</p>
        </div>
      ))}
    </div>
  </DashboardCard>
)
