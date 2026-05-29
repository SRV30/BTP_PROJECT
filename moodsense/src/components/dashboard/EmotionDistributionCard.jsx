import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { emotionDistribution } from '../../data/dashboardData'
import { DashboardCard } from './DashboardCard'

export const EmotionDistributionCard = () => (
  <DashboardCard className="lg:col-span-6">
    <h2 className="text-lg font-bold text-white">Emotion Distribution</h2>
    <div className="mt-5 grid items-center gap-5 sm:grid-cols-[220px_1fr]">
      <div className="relative h-56">
        <ResponsiveContainer height="100%" width="100%">
          <PieChart>
            <Pie data={emotionDistribution} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={2} stroke="none">
              {emotionDistribution.map((entry) => (
                <Cell fill={entry.color} key={entry.name} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">58%</span>
          <span className="text-sm text-emerald-300">Happy</span>
        </div>
      </div>
      <div className="space-y-4">
        {emotionDistribution.map((emotion) => (
          <div className="flex items-center justify-between gap-4" key={emotion.name}>
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: emotion.color }} />
              <span className="text-sm text-slate-300">{emotion.name}</span>
            </div>
            <span className="font-bold text-white">{emotion.value}%</span>
          </div>
        ))}
      </div>
    </div>
  </DashboardCard>
)
