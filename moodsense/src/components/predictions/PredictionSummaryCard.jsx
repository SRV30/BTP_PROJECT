import { DashboardCard } from '../dashboard/DashboardCard'

export const PredictionSummaryCard = ({ children, icon, title }) => (
  <DashboardCard className="relative min-h-full overflow-hidden">
    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
    <div className="relative">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl shadow-lg shadow-violet-500/20">{icon}</span>
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {children}
    </div>
  </DashboardCard>
)
