import { useCallback } from 'react'
import { AIInsightPanel } from '../../components/dashboard/AIInsightPanel'
import { DashboardHeader } from '../../components/dashboard/DashboardHeader'
import { DepressionRiskCard } from '../../components/dashboard/DepressionRiskCard'
import { EmotionDistributionCard } from '../../components/dashboard/EmotionDistributionCard'
import { MoodHeroCard } from '../../components/dashboard/MoodHeroCard'
import { OverviewMetricCard } from '../../components/dashboard/OverviewMetricCard'
import { PredictionCard } from '../../components/dashboard/PredictionCard'
import { ProductivityCard } from '../../components/dashboard/ProductivityCard'
import { WeeklyMoodTrendCard } from '../../components/dashboard/WeeklyMoodTrendCard'
import { PageState } from '../../components/ui/PageState'
import { overviewCards, predictionTrend } from '../../data/dashboardData'
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const Dashboard = () => {
  const loadDashboard = useCallback(() => appApi.dashboard(), [])
  const { data, error, isLoading } = useApiResource(loadDashboard)
  const today = data?.today
  const cards = today
    ? [
        { ...overviewCards[0], value: today.stressScore, status: today.stressScore >= 70 ? 'High' : today.stressScore >= 40 ? 'Moderate' : 'Low' },
        { ...overviewCards[1], value: `${today.sleepHours}h`, status: 'Tracked' },
        { ...overviewCards[2], value: today.steps?.toLocaleString(), status: 'Today' },
        { ...overviewCards[3], value: `${today.screenTime}h`, status: 'Average' },
      ]
    : overviewCards

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <DashboardHeader user={data?.user} />
      <PageState error={error} isLoading={isLoading} />

      <section className="grid gap-5 lg:grid-cols-12">
        <MoodHeroCard moodLabel={today?.moodLabel} moodScore={today?.moodScore} />
        <PredictionCard confidence={today?.tomorrowPrediction?.confidence} mood={today?.tomorrowPrediction?.moodLabel} trend={data?.weeklyMoodTrend?.map((item) => ({ value: item.mood })) || predictionTrend} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black text-white">Overview</h2>
          <span className="text-sm font-semibold text-slate-400">Live API</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => <OverviewMetricCard key={card.title} {...card} />)}
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
}

export default Dashboard
