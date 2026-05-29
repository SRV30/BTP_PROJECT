import { goals } from '../../data/profileData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const GoalsSection = () => (
  <DashboardCard>
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-bold text-white">Goals</h2>
      <button className="text-sm font-bold text-violet-300" type="button">Edit</button>
    </div>
    <div className="space-y-4">
      {goals.map((goal) => (
        <div key={goal.label}>
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <span className="font-bold text-slate-200">{goal.label}</span>
            <span className="text-slate-400">{goal.value}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" style={{ width: `${goal.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  </DashboardCard>
)
