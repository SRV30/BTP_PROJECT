import { DashboardCard } from '../dashboard/DashboardCard'

const formatGeneratedAt = (generatedAt) => {
  if (!generatedAt) return 'Not generated yet'

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(generatedAt))
}

export const TodayInsightCard = ({ behaviorSummary, cached, generatedAt, model }) => (
  <DashboardCard className="relative overflow-hidden">
    <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
    <div className="relative grid gap-5 sm:grid-cols-[1fr_120px] sm:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Behavior Summary</p>
        <h2 className="mt-4 text-2xl font-black text-white">CrewAI Daily Analysis</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-300">{behaviorSummary || 'CrewAI behavior summary is unavailable for this report.'}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.18em]">
          <span className="rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-violet-200">Model: {model || 'Unknown'}</span>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-500/10 px-3 py-2 text-cyan-200">{cached ? 'Cached' : 'Fresh'} result</span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-slate-300">Generated: {formatGeneratedAt(generatedAt)}</span>
        </div>
      </div>
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-violet-400/30 bg-violet-500/15 text-6xl shadow-2xl shadow-violet-500/20">🧠</div>
    </div>
  </DashboardCard>
)
