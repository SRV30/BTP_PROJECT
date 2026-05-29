import { todayInsight } from '../../data/aiInsightsData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const TodayInsightCard = () => (
  <DashboardCard className="relative overflow-hidden">
    <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
    <div className="relative grid gap-5 sm:grid-cols-[1fr_120px] sm:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Today's Insight</p>
        <h2 className="mt-4 text-2xl font-black text-white">{todayInsight.title}</h2>
        <p className="mt-3 max-w-xl leading-7 text-slate-300">{todayInsight.description}</p>
      </div>
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-violet-400/30 bg-violet-500/15 text-6xl shadow-2xl shadow-violet-500/20">🧠</div>
    </div>
  </DashboardCard>
)
