import { DashboardCard } from '../dashboard/DashboardCard'

export const AIExplanationCard = ({ explanation }) => (
  <DashboardCard className="relative overflow-hidden">
    <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
    <div className="relative flex gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl">🧠</span>
      <div>
        <h2 className="text-lg font-bold text-white">AI Explanation</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">{explanation || 'No prediction explanation returned by the predictions API.'}</p>
      </div>
    </div>
  </DashboardCard>
)
