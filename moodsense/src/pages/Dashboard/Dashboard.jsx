import { AIInsightPanel } from '../../components/dashboard/AIInsightPanel'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { DepressionRiskCard } from '../../components/dashboard/DepressionRiskCard'
import { EmotionDistributionCard } from '../../components/dashboard/EmotionDistributionCard'
import { MoodHeroCard } from '../../components/dashboard/MoodHeroCard'
import { OverviewMetricCard } from '../../components/dashboard/OverviewMetricCard'
import { PredictionCard } from '../../components/dashboard/PredictionCard'
import { ProductivityCard } from '../../components/dashboard/ProductivityCard'
import { WeeklyMoodTrendCard } from '../../components/dashboard/WeeklyMoodTrendCard'
import { overviewCards } from '../../data/dashboardData'

const Dashboard = () => (
  <div className="mx-auto max-w-7xl space-y-6 pb-6">
    <DashboardHeader />

    <section className="grid gap-5 lg:grid-cols-12">
      <MoodHeroCard />
      <PredictionCard />
    </section>

    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-black text-white">Overview</h2>
        <span className="text-sm font-semibold text-slate-400">View All</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <OverviewMetricCard key={card.title} {...card} />
        ))}
      </div>
    </section>

    <section className="grid gap-5 lg:grid-cols-12">
      <AIInsightPanel />
      <WeeklyMoodTrendCard />
      <EmotionDistributionCard />
      <ProductivityCard />
      <DepressionRiskCard />
    </section>
  </div>
)

export default Dashboard
