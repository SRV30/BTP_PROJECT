import { confidenceLevels } from '../../data/predictionsData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const ConfidenceMeterCard = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Prediction Confidence</h2>
    <div className="mt-5 space-y-4">
      {confidenceLevels.map((level) => (
        <div key={level.label}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-bold text-slate-200">{level.label}</span>
            <span className="text-slate-400">{level.value}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div className={`h-full rounded-full ${level.color}`} style={{ width: `${level.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  </DashboardCard>
)
