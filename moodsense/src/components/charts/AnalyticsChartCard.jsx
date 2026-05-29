import { DashboardCard } from '../dashboard/DashboardCard'

export const AnalyticsChartCard = ({ children, stats = [], subtitle, title }) => (
  <DashboardCard className="min-h-full">
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {stats.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {stats.map((stat) => (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2" key={stat.label}>
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
              <p className="mt-1 text-sm font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    {children}
  </DashboardCard>
)
