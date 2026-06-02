import { InsightStatCard } from './InsightStatCard'

export const MoodAnalysisCard = ({ moodAnalysis }) => (
  <InsightStatCard icon="🙂" title="Mood Analysis">
    <p className="leading-7 text-slate-300">{moodAnalysis || 'CrewAI mood analysis is unavailable for this report.'}</p>
  </InsightStatCard>
)
