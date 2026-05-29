import { tomorrowStressPrediction } from '../../data/predictionsData'
import { PredictionSummaryCard } from './PredictionSummaryCard'

export const TomorrowStressCard = () => (
  <PredictionSummaryCard icon="⚡" title="Tomorrow Stress Prediction">
    <p><span className="text-5xl font-black text-cyan-300">{tomorrowStressPrediction.score}</span><span className="text-2xl text-slate-500">/100</span></p>
    <p className="mt-4 inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-500/15 px-5 py-2 font-bold text-emerald-300">{tomorrowStressPrediction.status}</p>
    <p className="mt-5 leading-7 text-slate-300">Stress is predicted to remain controlled if sleep and screen-time patterns stay consistent.</p>
  </PredictionSummaryCard>
)
