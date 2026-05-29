import { stressAnalysis } from '../../data/aiInsightsData'
import { InsightStatCard } from './InsightStatCard'

export const StressAnalysisCard = () => (
  <InsightStatCard icon="⚡" title="Stress Analysis">
    <p><span className="text-5xl font-black text-amber-300">{stressAnalysis.score}</span></p>
    <p className="mt-2 inline-flex rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-2 font-bold text-amber-200">{stressAnalysis.status}</p>
    <p className="mt-5 leading-7 text-slate-300">{stressAnalysis.explanation}</p>
  </InsightStatCard>
)
