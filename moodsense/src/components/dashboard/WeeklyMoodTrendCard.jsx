import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { DashboardCard } from './DashboardCard'

const getTrendStatus = (data) => {
  if (data.length < 2) return { label: 'Not enough data', tone: 'text-slate-300 border-white/10 bg-white/[0.04]', description: 'Mood trend needs more tracked days.' }

  const first = Number(data[0].mood || 0)
  const last = Number(data[data.length - 1].mood || 0)
  const difference = last - first

  if (difference > 3) return { label: 'Improving ↗', tone: 'text-emerald-300 border-emerald-400/20 bg-emerald-500/15', description: `Mood score is up ${difference} points across the displayed period.` }
  if (difference < -3) return { label: 'Declining ↘', tone: 'text-rose-300 border-rose-400/20 bg-rose-500/15', description: `Mood score is down ${Math.abs(difference)} points across the displayed period.` }
  return { label: 'Stable →', tone: 'text-cyan-300 border-cyan-400/20 bg-cyan-500/15', description: 'Mood score is steady across the displayed period.' }
}

export const WeeklyMoodTrendCard = ({ data = [] }) => {
  const trend = getTrendStatus(data)

  return (
    <DashboardCard className="lg:col-span-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Weekly Mood Trend</h2>
        <span className="text-sm font-semibold text-violet-300">{data.length} days</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={data} margin={{ bottom: 8, left: -20, right: 8, top: 18 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis axisLine={false} dataKey="day" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
            <YAxis axisLine={false} domain={[0, 100]} tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14 }} />
            <Line dataKey="mood" dot={{ fill: '#c084fc', r: 4, stroke: '#fff', strokeWidth: 2 }} stroke="#8b5cf6" strokeLinecap="round" strokeWidth={4} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className={`rounded-2xl border px-4 py-2 text-sm font-bold ${trend.tone}`}>{trend.label}</span>
        <span className="text-sm text-slate-400">{trend.description}</span>
      </div>
    </DashboardCard>
  )
}
