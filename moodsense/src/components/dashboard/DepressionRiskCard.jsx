import { DashboardCard } from './DashboardCard'

const riskColor = (risk = '') => {
  if (risk.toLowerCase().includes('high')) return 'text-rose-400 border-rose-400/30 bg-rose-500/10 shadow-rose-500/20'
  if (risk.toLowerCase().includes('moderate')) return 'text-amber-300 border-amber-400/30 bg-amber-500/10 shadow-amber-500/20'
  return 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10 shadow-emerald-500/20'
}

const buildSignals = (today = {}) => [
  `Mood ${today.moodScore ?? '—'}/100`,
  `Stress ${today.stressScore ?? '—'}/100`,
  `Sleep ${today.sleepHours ?? '—'}h`,
  `Steps ${Number.isFinite(Number(today.steps)) ? Number(today.steps).toLocaleString() : '—'}`,
  `Screen ${today.screenTime ?? '—'}h`,
]

export const DepressionRiskCard = ({ risk, today }) => {
  const riskLabel = risk ? (risk.endsWith('Risk') ? risk : `${risk} Risk`) : 'Unavailable'
  const signals = buildSignals(today)

  return (
    <DashboardCard className="lg:col-span-12">
      <div className="grid gap-5 sm:grid-cols-[120px_1fr] sm:items-center">
        <div className={`flex h-24 w-24 items-center justify-center rounded-[2rem] border text-5xl shadow-2xl ${riskColor(riskLabel)}`}>🛡️</div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Depression Risk</h2>
            <span className="text-slate-400">ⓘ</span>
          </div>
          <p className={`mt-3 text-3xl font-black ${riskColor(riskLabel).split(' ')[0]}`}>{riskLabel}</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Latest risk classification returned by your tracked daily metrics.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {signals.map((signal) => (
              <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200" key={signal}>{signal}</span>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
