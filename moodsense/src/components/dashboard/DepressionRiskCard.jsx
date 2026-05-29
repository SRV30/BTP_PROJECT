import { riskFactors } from '../../data/dashboardData'
import { DashboardCard } from './DashboardCard'

export const DepressionRiskCard = () => (
  <DashboardCard className="lg:col-span-12">
    <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:items-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-emerald-400/30 bg-emerald-500/10 text-5xl text-emerald-300 shadow-2xl shadow-emerald-500/20">🛡️</div>
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white">Depression Risk</h2>
          <span className="text-slate-400">ⓘ</span>
        </div>
        <p className="mt-3 text-3xl font-black text-emerald-400">Low Risk</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Your behavioral patterns indicate low risk today, supported by stable routines and a positive mood trend.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {riskFactors.map((factor) => (
            <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200" key={factor}>{factor}</span>
          ))}
        </div>
      </div>
    </div>
  </DashboardCard>
)
