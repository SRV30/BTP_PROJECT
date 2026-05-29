import { activityHistory } from '../../data/profileData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const ActivityHistorySection = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Activity History</h2>
    <div className="mt-5 space-y-3">
      {activityHistory.map((item) => (
        <article className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={item.title}>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-xl">{item.icon}</span>
          <div>
            <h3 className="font-bold text-white">{item.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-400">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  </DashboardCard>
)
