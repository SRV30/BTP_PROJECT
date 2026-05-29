import { InsightCard } from '../../components/cards/InsightCard'
import { MetricCard } from '../../components/cards/MetricCard'
import { MoodTrendChart } from '../../components/charts/MoodTrendChart'
import { PageHeader } from '../../components/ui/PageHeader'
import { useMoodOverview } from '../../hooks/useMoodOverview'

const Dashboard = () => {
  const { insightCards, moodMetrics, moodTimeline } = useMoodOverview()

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Mood intelligence"
        title="AI-powered emotional wellness dashboard"
        description="Monitor sentiment, stress indicators, and wellbeing momentum from one mobile-first MoodSense command center."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moodMetrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <MoodTrendChart data={moodTimeline} />
        <section className="space-y-4">
          {insightCards.map((insight, index) => (
            <InsightCard index={index + 1} key={insight}>{insight}</InsightCard>
          ))}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
