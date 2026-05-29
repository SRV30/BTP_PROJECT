import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export const AreaAnalyticsChart = ({ color = '#c084fc', data, dataKey }) => (
  <div className="h-72">
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={data} margin={{ bottom: 8, left: -18, right: 12, top: 16 }}>
        <defs>
          <linearGradient id={`area-${dataKey}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.55} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
        <XAxis axisLine={false} dataKey="day" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
        <YAxis axisLine={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} />
        <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14 }} />
        <Area dataKey={dataKey} fill={`url(#area-${dataKey})`} stroke={color} strokeWidth={3} type="monotone" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
)
