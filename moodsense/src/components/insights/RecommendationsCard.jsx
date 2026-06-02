import { DashboardCard } from '../dashboard/DashboardCard'

const getRecommendationText = (recommendation) => {
  if (typeof recommendation === 'string') return recommendation
  return recommendation.title || recommendation.description || 'Review your CrewAI wellness recommendation.'
}

export const RecommendationsCard = ({ recommendations = [] }) => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Wellness Recommendations</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {recommendations.length > 0 ? recommendations.map((recommendation, index) => (
        <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={`${getRecommendationText(recommendation)}-${index}`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-sm font-black text-violet-200">{index + 1}</span>
          <div>
            <p className="font-semibold text-slate-200">{getRecommendationText(recommendation)}</p>
            {typeof recommendation !== 'string' && recommendation.description && recommendation.description !== recommendation.title && (
              <p className="mt-2 text-sm leading-6 text-slate-400">{recommendation.description}</p>
            )}
          </div>
        </div>
      )) : (
        <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">CrewAI recommendations are unavailable for this report.</p>
      )}
    </div>
  </DashboardCard>
)
