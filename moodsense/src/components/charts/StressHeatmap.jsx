const stressColors = {
  1: 'bg-emerald-500/25',
  2: 'bg-emerald-400/55',
  3: 'bg-lime-400/65',
  4: 'bg-amber-400/75',
  5: 'bg-rose-500/80',
}

export const StressHeatmap = ({ data }) => (
  <div className="space-y-3">
    {data.map((row) => (
      <div className="grid grid-cols-[44px_1fr] items-center gap-3" key={row.day}>
        <span className="text-sm text-slate-300">{row.day}</span>
        <div className="grid grid-cols-7 gap-2">
          {row.values.map((value, index) => (
            <span className={`h-7 rounded-lg ${stressColors[value]}`} key={`${row.day}-${index}`} title={`${row.day} stress ${value}`} />
          ))}
        </div>
      </div>
    ))}
    <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
      <span>Low</span>
      <div className="h-2 w-40 rounded-full bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-500" />
      <span>High</span>
    </div>
  </div>
)
