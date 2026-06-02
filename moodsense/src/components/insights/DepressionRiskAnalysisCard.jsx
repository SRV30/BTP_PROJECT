import { InsightStatCard } from './InsightStatCard'

export const DepressionRiskAnalysisCard = ({ depressionAnalysis }) => (
  <InsightStatCard icon="🛡️" title="Depression Risk Analysis">
    <p className="leading-7 text-slate-300">{depressionAnalysis || 'CrewAI depression-risk analysis is unavailable for this report.'}</p>
    <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-400">MoodSense insights are wellness indicators and are not a medical diagnosis.</p>
  </InsightStatCard>
)
