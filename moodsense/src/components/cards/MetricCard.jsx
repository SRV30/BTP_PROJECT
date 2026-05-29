const toneStyles = {
  positive: 'from-emerald-400/20 to-teal-500/10 text-emerald-200',
  calm: 'from-sky-400/20 to-blue-500/10 text-sky-200',
  focus: 'from-violet-400/20 to-fuchsia-500/10 text-violet-200',
}

export const MetricCard = ({ label, value, change, tone = 'positive' }) => (
  <article className={`rounded-3xl border border-white/10 bg-gradient-to-br ${toneStyles[tone]} p-5 shadow-2xl shadow-slate-950/30`}>
    <p className="text-sm text-slate-300">{label}</p>
    <div className="mt-4 flex items-end justify-between gap-4">
      <strong className="text-3xl font-bold text-white">{value}</strong>
      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{change}</span>
    </div>
  </article>
)
