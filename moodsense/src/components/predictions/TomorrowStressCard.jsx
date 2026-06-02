import { PredictionSummaryCard } from './PredictionSummaryCard'

const getStressStatus = (score) => {
  const numericScore = Number(score)
  if (numericScore >= 70) return 'High Stress'
  if (numericScore >= 40) return 'Moderate Stress'
  if (Number.isFinite(numericScore)) return 'Low Stress'
  return 'Unavailable'
}

export const TomorrowStressCard = ({ score }) => (
  <PredictionSummaryCard icon="⚡" title="Tomorrow Stress Prediction">
    <p><span className="text-5xl font-black text-cyan-300">{Number.isFinite(Number(score)) ? score : '—'}</span><span className="text-2xl text-slate-500">/100</span></p>
    <p className="mt-4 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-500/15 px-5 py-2 font-bold text-emerald-300">{getStressStatus(score)}</p>
    <p className="mt-5 leading-7 text-slate-300">Stress prediction is based on the backend forecast generated from recent DailyMetrics patterns.</p>
  </PredictionSummaryCard>
)
