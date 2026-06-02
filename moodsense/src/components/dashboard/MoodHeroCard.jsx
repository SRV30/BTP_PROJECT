import { DashboardCard } from './DashboardCard'

const getMoodStatus = (score) => {
  if (score >= 80) return 'Very Good'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Neutral'
  if (Number.isFinite(score)) return 'Needs Care'
  return 'Unavailable'
}

export const MoodHeroCard = ({ moodLabel, moodScore }) => {
  const score = Number(moodScore)
  const safeScore = Number.isFinite(score) ? score : 0
  const circumference = 2 * Math.PI * 46
  const offset = circumference - (safeScore / 100) * circumference

  return (
    <DashboardCard className="relative overflow-hidden lg:col-span-7">
      <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative grid gap-6 sm:grid-cols-[180px_1fr] sm:items-center">
        <div>
          <div className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            Today's Mood <span className="text-sm text-slate-400">ⓘ</span>
          </div>
          <div className="relative mx-auto h-40 w-40 sm:mx-0">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" fill="none" r="46" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
              <circle className="drop-shadow-[0_0_18px_rgba(52,211,153,0.8)]" cx="60" cy="60" fill="none" r="46" stroke="url(#moodGradient)" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="10" />
              <defs>
                <linearGradient id="moodGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#5eead4" /></linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-green-500 text-4xl shadow-2xl shadow-emerald-500/40">🙂</div></div>
          </div>
        </div>
        <div className="space-y-4 text-center sm:text-left">
          <p className="text-4xl font-black text-emerald-400 sm:text-5xl">{moodLabel || 'Unavailable'}</p>
          <div className="flex items-end justify-center gap-2 sm:justify-start"><span className="text-5xl font-black text-white sm:text-6xl">{Number.isFinite(score) ? score : '—'}</span><span className="pb-2 text-2xl text-slate-500">/100</span></div>
          <span className="inline-flex rounded-2xl border border-violet-400/30 bg-violet-500/15 px-6 py-2 font-bold text-violet-200">{getMoodStatus(score)}</span>
          <p className="text-sm text-slate-300">Latest mood score returned by the dashboard API.</p>
        </div>
      </div>
    </DashboardCard>
  )
}
