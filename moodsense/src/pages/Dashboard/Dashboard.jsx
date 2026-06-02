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
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const getStressStatus = (stressScore) => {
  if (stressScore >= 70) return 'High'
  if (stressScore >= 40) return 'Moderate'
  if (Number.isFinite(stressScore)) return 'Low'
  return 'Unavailable'
}

const formatHours = (hours) => (Number.isFinite(Number(hours)) ? `${Number(hours).toFixed(1)}h` : '—')
const formatNumber = (value) => (Number.isFinite(Number(value)) ? Number(value).toLocaleString() : '—')
const toSparkline = (items, field) => items.map((item) => Number(item[field] || 0))

const buildOverviewCards = ({ today, weeklyMoodTrend = [] }) => [
  {
    title: 'Stress Score',
    value: Number.isFinite(Number(today?.stressScore)) ? today.stressScore : '—',
    suffix: '/100',
    status: getStressStatus(Number(today?.stressScore)),
    icon: '⚡',
    color: '#facc15',
    data: toSparkline(weeklyMoodTrend, 'stress'),
  },
  {
    title: 'Sleep',
    value: formatHours(today?.sleepHours),
    status: today?.sleepHours ? 'Tracked today' : 'Unavailable',
    icon: '☾',
    color: '#38bdf8',
    data: toSparkline(weeklyMoodTrend, 'sleep'),
  },
  {
    title: 'Steps',
    value: formatNumber(today?.steps),
    status: 'Today',
    icon: '🚶',
    color: '#22d3ee',
    data: toSparkline(weeklyMoodTrend, 'steps'),
  },
  {
    title: 'Screen Time',
    value: formatHours(today?.screenTime),
    status: 'Today',
    icon: '▯',
    color: '#c084fc',
    data: toSparkline(weeklyMoodTrend, 'screenTime'),
  },
]

const Dashboard = () => {
  const loadDashboard = useCallback(() => appApi.dashboard(), [])
  const { data, error, isLoading } = useApiResource(loadDashboard)
  const today = data?.today
  const weeklyMoodTrend = data?.weeklyMoodTrend || []
  const cards = buildOverviewCards({ today, weeklyMoodTrend })
  const predictionTrend = weeklyMoodTrend.map((item) => ({ day: item.day, value: item.mood }))

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <DashboardHeader user={data?.user} />
      <PageState error={error} isLoading={isLoading} />

      {!isLoading && !error && (
        <>
          <section className="grid gap-5 lg:grid-cols-12">
            <MoodHeroCard moodLabel={today?.moodLabel} moodScore={today?.moodScore} />
            <PredictionCard prediction={today?.tomorrowPrediction} trend={predictionTrend} />
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
            <AIInsightPanel insight={data?.aiInsight} today={today} />
            <WeeklyMoodTrendCard data={weeklyMoodTrend} />
            <EmotionDistributionCard data={data?.emotionDistribution || []} />
            <ProductivityCard score={data?.productivityScore} today={today} />
            <DepressionRiskCard risk={today?.depressionRisk} today={today} />
          </section>
        </>
      )}
    </div>
  )
}

export default Dashboard
