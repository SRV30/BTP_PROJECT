import { DashboardCard } from './DashboardCard'

const clampScore = (score) => Math.min(100, Math.max(0, Number(score) || 0))

const getProductivityStatus = (score) => {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs focus'
}

const buildSignals = (today = {}) => [
  { label: 'LinkedIn', detail: `${today.linkedin ?? '—'} mins`, icon: 'in' },
  { label: 'Gmail', detail: `${today.gmail ?? '—'} mins`, icon: 'M' },
  { label: 'Sleep', detail: `${today.sleepHours ?? '—'}h`, icon: '☾' },
  { label: 'Steps', detail: Number.isFinite(Number(today.steps)) ? Number(today.steps).toLocaleString() : '—', icon: '🚶' },
]

export const ProductivityCard = ({ score, today }) => {
  const productivityScore = clampScore(score)
  const signals = buildSignals(today)

  return (
    <DashboardCard className="lg:col-span-6">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="text-lg font-bold text-white">Productivity Score</h2>
        <span className="text-slate-400">ⓘ</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-[140px_1fr] sm:items-center">
        <div>
          <p><span className="text-5xl font-black text-emerald-400">{productivityScore}</span><span className="text-2xl text-slate-500">/100</span></p>
          <p className="mt-1 font-bold text-emerald-300">{getProductivityStatus(productivityScore)}</p>
        </div>
        <div className="h-4 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-lg shadow-emerald-400/30" style={{ width: `${productivityScore}%` }} />
        </div>
      </div>
      <p className="mt-6 text-sm font-semibold text-slate-300">Current Signals</p>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {signals.map((signal) => (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3" key={signal.label}>
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-sm font-black text-cyan-300">{signal.icon}</div>
            <p className="text-xs font-bold text-white">{signal.label}</p>
            <p className="text-[0.65rem] text-slate-400">{signal.detail}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
