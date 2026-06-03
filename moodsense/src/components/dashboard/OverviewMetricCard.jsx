import { Line, LineChart, ResponsiveContainer } from 'recharts'
import { DashboardCard } from './DashboardCard'

export const OverviewMetricCard = ({ color, data = [], icon, status, suffix, title, value }) => {
  const sparklineData = data.map((point, index) => ({ index, point }))
  const isAggregated = status === 'Daily Summary'

  return (
    <DashboardCard className={`p-4 ${!isAggregated ? 'ring-1 ring-white/5' : ''}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.06] text-xl" style={{ color }}>{icon}</span>
        <p className="text-sm font-semibold text-slate-300">{title}</p>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-black text-white">{value}</span>
        {suffix && <span className="pb-1 text-xl text-slate-500">{suffix}</span>}
      </div>
      <p className="mt-1 text-sm font-bold" style={{ color }}>{status}</p>
      <div className="mt-3 h-10">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={sparklineData}>
            <Line dataKey="point" dot={false} stroke={color} strokeLinecap="round" strokeWidth={2.5} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}
