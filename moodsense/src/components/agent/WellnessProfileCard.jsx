export const WellnessProfileCard = ({ profile, className = '' }) => {
  const patterns = [
    { label: 'Sleep Pattern', value: profile?.sleepPattern || 'Pending', color: 'text-sky-400', bg: 'bg-sky-400/10' },
    { label: 'Activity Pattern', value: profile?.activityPattern || 'Pending', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Screen usage', value: profile?.screenTimePattern || 'Pending', color: 'text-violet-400', bg: 'bg-violet-400/10' },
  ]

  const days = profile?.daysAnalyzed || 0

  return (
    <div className={`relative flex flex-col rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Wellness Profile</h3>
        <p className="text-xs font-semibold text-slate-500">Long-term behavioral baseline</p>
      </div>

      <div className="space-y-4">
        {patterns.map((p) => (
          <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4" key={p.label}>
            <span className="text-sm font-medium text-slate-400">{p.label}</span>
            <span className={`rounded-lg ${p.bg} ${p.color} px-3 py-1 text-xs font-black uppercase tracking-wider`}>
              {p.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-dashed border-white/10 p-4 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
          {days > 0 ? `Based on ${days} day(s) of data` : 'Insufficient data for baseline'}
        </p>
      </div>
    </div>
  )
}
