import { DashboardCard } from './DashboardCard'

const buildReasons = (today = {}) => [
  `Mood score: ${today.moodScore ?? '—'}/100`,
  `Stress score: ${today.stressScore ?? '—'}/100`,
  `Sleep: ${today.sleepHours ?? '—'}h`,
  `Screen time: ${today.screenTime ?? '—'}h`,
]

export const AIInsightPanel = ({ insight, today }) => (
  <DashboardCard className="relative overflow-hidden lg:col-span-6">
    <div className="absolute -right-8 bottom-4 h-44 w-44 rounded-full bg-violet-600/20 blur-3xl" />
    <div className="relative grid gap-5 sm:grid-cols-[1fr_160px] sm:items-center">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl text-violet-200">🧠</span>
          <h2 className="text-lg font-bold text-white">AI Insight</h2>
        </div>
        <p className="text-xl font-bold text-violet-300">Dashboard Insight</p>
        <p className="mt-3 max-w-sm leading-7 text-slate-300">{insight || 'No AI dashboard insight returned by the API.'}</p>
        <p className="mt-5 text-sm text-slate-400">Signals:</p>
        <ul className="mt-3 space-y-3">
          {buildReasons(today).map((reason) => (
            <li className="flex items-center gap-3 text-sm text-slate-200" key={reason}>
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-emerald-400 text-xs text-emerald-300">✓</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/10 text-7xl shadow-2xl shadow-violet-500/20 sm:h-40 sm:w-40">
        <span className="animate-pulse">🤖</span>
      </div>
    </div>
  </DashboardCard>
)
