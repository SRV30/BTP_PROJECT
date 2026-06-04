export const AgentSummaryCard = ({ agentName, title, summary, status, icon, className = '' }) => (
  <div className={`group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 transition-all hover:bg-slate-900/60 ${className}`}>
    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl transition-all group-hover:bg-violet-600/20" />

    <div className="relative mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.03] text-3xl shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">{agentName}</p>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
      <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        {status}
      </span>
    </div>

    <div className="relative flex-1">
      <p className="text-base leading-relaxed text-slate-300">
        {summary || 'Analysis pending based on current telemetry inputs...'}
      </p>
    </div>

    <div className="relative mt-6 flex items-center gap-4 border-t border-white/5 pt-6">
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div className="h-6 w-6 rounded-full border-2 border-slate-900 bg-slate-800" key={i} />
        ))}
      </div>
      <p className="text-xs font-semibold text-slate-500">Telemetry cross-referenced</p>
    </div>
  </div>
)
