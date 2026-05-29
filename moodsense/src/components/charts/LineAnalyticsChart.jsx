import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const LineAnalyticsChart = ({ color = '#a855f7', data, dataKey }) => (
  <div className="h-72">
    <ResponsiveContainer height="100%" width="100%">
      <LineChart data={data} margin={{ bottom: 8, left: -18, right: 12, top: 16 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis axisLine={false} dataKey="day" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
        <YAxis axisLine={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14 }} />
        <Line dataKey={dataKey} dot={{ fill: color, r: 4, stroke: '#fff', strokeWidth: 2 }} stroke={color} strokeLinecap="round" strokeWidth={4} type="monotone" />
      </LineChart>
    </ResponsiveContainer>
  </div>
)
