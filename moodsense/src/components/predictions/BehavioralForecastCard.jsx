import { behavioralForecast } from '../../data/predictionsData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const BehavioralForecastCard = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Behavioral Forecast</h2>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      {behavioralForecast.map((item) => (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={item.label}>
          <span className={`text-2xl ${item.tone}`}>{item.icon}</span>
          <p className="mt-3 text-sm text-slate-400">{item.label}</p>
          <p className="mt-1 text-2xl font-black text-white">{item.value}</p>
        </div>
      ))}
    </div>
  </DashboardCard>
)
