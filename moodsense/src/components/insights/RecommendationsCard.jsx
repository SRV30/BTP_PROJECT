import { wellnessRecommendations } from '../../data/aiInsightsData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const RecommendationsCard = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Wellness Recommendations</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {wellnessRecommendations.map((recommendation, index) => (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={recommendation}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-sm font-black text-violet-200">{index + 1}</span>
          <span className="font-semibold text-slate-200">{recommendation}</span>
        </div>
      ))}
    </div>
  </DashboardCard>
)
