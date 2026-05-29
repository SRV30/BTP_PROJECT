import { improvementSuggestions } from '../../data/predictionsData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const ImproveTomorrowCard = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">What Can Improve Tomorrow?</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {improvementSuggestions.map((suggestion, index) => (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={suggestion}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-sm font-black text-emerald-300">{index + 1}</span>
          <span className="font-semibold text-slate-200">{suggestion}</span>
        </div>
      ))}
    </div>
  </DashboardCard>
)
