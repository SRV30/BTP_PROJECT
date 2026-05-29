export const MoodTrendChart = ({ data }) => {
  const maxScore = 100

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Weekly mood trend</h2>
          <p className="text-sm text-slate-400">AI-scored emotional momentum</p>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">Live model</span>
      </div>
      <div className="flex h-56 items-end gap-3 sm:gap-4">
        {data.map((item) => (
          <div className="flex flex-1 flex-col items-center gap-3" key={item.day}>
            <div className="flex h-44 w-full items-end rounded-full bg-white/5 p-1">
              <div
                className="w-full rounded-full bg-gradient-to-t from-violet-500 to-cyan-300"
                style={{ height: `${(item.score / maxScore) * 100}%` }}
                title={`${item.day}: ${item.score}`}
              />
            </div>
            <span className="text-xs font-medium text-slate-400">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
