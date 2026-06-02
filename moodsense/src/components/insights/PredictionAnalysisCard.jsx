import { InsightStatCard } from './InsightStatCard'

export const PredictionAnalysisCard = ({ predictionAnalysis }) => (
  <InsightStatCard icon="🔮" title="Tomorrow Prediction Analysis">
    <p className="leading-7 text-slate-300">{predictionAnalysis || 'CrewAI prediction analysis is unavailable for this report.'}</p>
  </InsightStatCard>
)
