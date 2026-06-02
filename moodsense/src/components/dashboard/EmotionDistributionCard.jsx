import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { DashboardCard } from './DashboardCard'

const getDominantEmotion = (data) => data.reduce((current, emotion) => (emotion.value > current.value ? emotion : current), { name: 'No data', value: 0, color: '#94a3b8' })

export const EmotionDistributionCard = ({ data = [] }) => {
  const dominantEmotion = getDominantEmotion(data)

  return (
    <DashboardCard className="lg:col-span-6">
      <h2 className="text-lg font-bold text-white">Emotion Distribution</h2>
      <div className="mt-5 grid items-center gap-5 sm:grid-cols-[220px_1fr]">
        <div className="relative h-56">
          <ResponsiveContainer height="100%" width="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
                {data.map((entry) => (
                  <Cell fill={entry.color} key={entry.name} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-white">{dominantEmotion.value}%</span>
            <span className="text-sm" style={{ color: dominantEmotion.color }}>{dominantEmotion.name}</span>
          </div>
        </div>
        <div className="space-y-4">
          {data.length > 0 ? data.map((emotion) => (
            <div className="flex items-center justify-between gap-4" key={emotion.name}>
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: emotion.color }} />
                <span className="text-sm text-slate-300">{emotion.name}</span>
              </div>
              <span className="font-bold text-white">{emotion.value}%</span>
            </div>
          )) : <p className="text-sm text-slate-400">No emotion distribution returned by the dashboard API.</p>}
        </div>
      </div>
    </DashboardCard>
  )
}
