import { InsightStatCard } from './InsightStatCard'

export const StressAnalysisCard = ({ stressAnalysis }) => (
  <InsightStatCard icon="⚡" title="Stress Analysis">
    <p className="leading-7 text-slate-300">{stressAnalysis || 'CrewAI stress analysis is unavailable for this report.'}</p>
  </InsightStatCard>
)
