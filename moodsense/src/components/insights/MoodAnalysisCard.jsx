import { moodAnalysis } from '../../data/aiInsightsData'
import { InsightStatCard } from './InsightStatCard'

export const MoodAnalysisCard = () => (
  <InsightStatCard icon="🙂" title="Mood Analysis">
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs text-slate-500">Mood Score</p>
        <p className="mt-2 text-2xl font-black text-white">{moodAnalysis.score}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs text-slate-500">Mood</p>
        <p className="mt-2 text-2xl font-black text-emerald-300">{moodAnalysis.mood}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs text-slate-500">Trend</p>
        <p className="mt-2 text-2xl font-black text-violet-300">{moodAnalysis.trend}</p>
      </div>
    </div>
    <p className="mt-5 leading-7 text-slate-300">{moodAnalysis.explanation}</p>
  </InsightStatCard>
)
