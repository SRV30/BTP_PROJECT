import { tomorrowPrediction } from '../../data/aiInsightsData'
import { InsightStatCard } from './InsightStatCard'

export const PredictionAnalysisCard = () => (
  <InsightStatCard icon="🔮" title="Tomorrow Prediction Analysis">
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs text-slate-500">Predicted Mood</p>
        <p className="mt-2 text-3xl font-black text-emerald-300">{tomorrowPrediction.mood}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs text-slate-500">Confidence</p>
        <p className="mt-2 text-3xl font-black text-violet-300">{tomorrowPrediction.confidence}</p>
      </div>
    </div>
    <p className="mt-5 text-sm font-bold text-white">Reasoning</p>
    <p className="mt-2 leading-7 text-slate-300">{tomorrowPrediction.reasoning}</p>
  </InsightStatCard>
)
