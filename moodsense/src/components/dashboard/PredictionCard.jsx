import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts'
import { DashboardCard } from './DashboardCard'

export const PredictionCard = ({ prediction, trend = [] }) => {
  const confidence = Number(prediction?.confidence)

  return (
    <DashboardCard className="lg:col-span-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Tomorrow's Prediction</h2>
        <span className="text-slate-400">ⓘ</span>
      </div>
      <div className="grid items-center gap-4 sm:grid-cols-[96px_1fr]">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-violet-500/80 bg-violet-500/10 text-5xl text-violet-300 shadow-2xl shadow-violet-500/20">😄</div>
        <div>
          <p className="text-slate-400">Likely <span className="font-bold text-white">{prediction?.moodLabel || 'Unavailable'}</span></p>
          <p className="mt-1 text-2xl font-black text-violet-300">{Number.isFinite(confidence) ? confidence : '—'}% <span className="text-sm font-medium text-slate-300">Confidence</span></p>
        </div>
      </div>
      <div className="mt-5 h-24">
        <ResponsiveContainer height="100%" width="100%">
          <LineChart data={trend}>
            <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14 }} />
            <Line dataKey="value" dot={false} stroke="#a855f7" strokeLinecap="round" strokeWidth={3} type="monotone" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}
