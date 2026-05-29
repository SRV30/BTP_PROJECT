import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { weeklyMoodTrend } from '../../data/dashboardData'
import { DashboardCard } from './DashboardCard'

export const WeeklyMoodTrendCard = () => (
  <DashboardCard className="lg:col-span-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-bold text-white">Weekly Mood Trend</h2>
      <span className="text-sm font-semibold text-violet-300">View All</span>
    </div>
    <div className="h-64">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={weeklyMoodTrend} margin={{ bottom: 8, left: -20, right: 8, top: 18 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis axisLine={false} dataKey="day" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
          <YAxis axisLine={false} domain={[0, 100]} tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
          <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14 }} />
          <Line dataKey="score" dot={{ fill: '#c084fc', r: 4, stroke: '#fff', strokeWidth: 2 }} stroke="#8b5cf6" strokeLinecap="round" strokeWidth={4} type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <span className="rounded-2xl border border-emerald-400/20 bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300">Improving ↗</span>
      <span className="text-sm text-slate-400">Your mood is improving this week!</span>
    </div>
  </DashboardCard>
)
