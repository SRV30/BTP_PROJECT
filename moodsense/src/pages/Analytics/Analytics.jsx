import { useCallback } from 'react'
import { AreaAnalyticsChart } from '../../components/charts/AreaAnalyticsChart'
import { AnalyticsChartCard } from '../../components/charts/AnalyticsChartCard'
import { BarAnalyticsChart } from '../../components/charts/BarAnalyticsChart'
import { DonutAnalyticsChart } from '../../components/charts/DonutAnalyticsChart'
import { LineAnalyticsChart } from '../../components/charts/LineAnalyticsChart'
import { StressHeatmap } from '../../components/charts/StressHeatmap'
import { DashboardCard } from '../../components/dashboard/DashboardCard'
import { PageState } from '../../components/ui/PageState'
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const analyticsRangeOptions = ['This Week', 'This Month', 'Custom']

const formatScore = (value) => `${Number(value || 0)}/100`
const formatHours = (value) => `${Number(value || 0).toFixed(1)}h`
const formatNumber = (value) => Number(value || 0).toLocaleString()
const formatDayValue = (day, value, suffix = '') => (day ? `${day} ${value ?? ''}${suffix}`.trim() : '—')

const Analytics = () => {
  const loadAnalytics = useCallback(() => appApi.analytics(), [])
  const { data, error, isLoading } = useApiResource(loadAnalytics)
  const dailyData = data?.dailyData || []
  const emotions = data?.emotionDistribution || []
  const stats = data?.stats || {}
  const summaryCards = data?.summaryCards || {}
  const productivityScore = Number(data?.productivityScore || 0)
  const weeklySummary = data?.weeklySummary || []
  const productiveApps = data?.productiveApps || []

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">MoodSense AI</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Analytics</h1>
          <p className="mt-2 max-w-2xl text-slate-400">Track mood, sleep, activity, screen time, stress, and productivity patterns with MongoDB-backed wellness analytics.</p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
          {analyticsRangeOptions.map((option, index) => (
            <button
              className={`rounded-2xl px-3 py-2 text-sm font-bold transition ${index === 0 ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
              key={option}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </header>
      <PageState error={error} isLoading={isLoading} />

      {!isLoading && !error && (
        <>
          <section className="grid gap-5 xl:grid-cols-2">
            <AnalyticsChartCard
              stats={[
                { label: 'Average Mood', value: formatScore(stats.averageMood) },
                { label: 'Best Day', value: formatDayValue(summaryCards.mood?.bestDay, summaryCards.mood?.bestValue, '/100') },
                { label: 'Worst Day', value: formatDayValue(summaryCards.mood?.worstDay, summaryCards.mood?.worstValue, '/100') },
              ]}
              subtitle="Daily mood scores"
              title="Mood Trend"
            >
              <LineAnalyticsChart color="#a855f7" data={dailyData} dataKey="mood" />
            </AnalyticsChartCard>

            <AnalyticsChartCard
              stats={[
                { label: 'Average Sleep', value: formatHours(stats.averageSleep) },
                { label: 'Best Sleep Day', value: formatDayValue(summaryCards.sleep?.bestDay, summaryCards.sleep?.bestValue, 'h') },
                { label: 'Tracked Days', value: String(dailyData.length) },
              ]}
              subtitle="Daily sleep hours"
              title="Sleep Analysis"
            >
              <BarAnalyticsChart color="#38bdf8" data={dailyData} dataKey="sleep" />
            </AnalyticsChartCard>

            <AnalyticsChartCard
              stats={[
                { label: 'Average Steps', value: formatNumber(stats.averageSteps) },
                { label: 'Most Active', value: formatDayValue(summaryCards.steps?.mostActiveDay, formatNumber(summaryCards.steps?.mostActiveValue)) },
                { label: 'Least Active', value: formatDayValue(summaryCards.steps?.leastActiveDay, formatNumber(summaryCards.steps?.leastActiveValue)) },
              ]}
              subtitle="Steps by day"
              title="Activity Analysis"
            >
              <BarAnalyticsChart color="#22d3ee" data={dailyData} dataKey="steps" />
            </AnalyticsChartCard>

            <AnalyticsChartCard
              stats={[
                { label: 'Average Screen Time', value: formatHours(stats.averageScreenTime) },
                { label: 'Highest Usage', value: formatDayValue(summaryCards.screenTime?.highestUsageDay, summaryCards.screenTime?.highestUsageValue, 'h') },
                { label: 'Lowest Usage', value: formatDayValue(summaryCards.screenTime?.lowestUsageDay, summaryCards.screenTime?.lowestUsageValue, 'h') },
              ]}
              subtitle="Daily device usage"
              title="Screen Time Analysis"
            >
              <AreaAnalyticsChart color="#c084fc" data={dailyData} dataKey="screenTime" />
            </AnalyticsChartCard>

            <AnalyticsChartCard title="Emotion Distribution">
              <DonutAnalyticsChart data={emotions} />
            </AnalyticsChartCard>

            <AnalyticsChartCard
              stats={[
                { label: 'Average Stress', value: formatScore(stats.averageStress) },
                { label: 'Highest Stress', value: formatDayValue(summaryCards.stress?.highestStressDay, summaryCards.stress?.highestStressValue, '/100') },
                { label: 'Lowest Stress', value: formatDayValue(summaryCards.stress?.lowestStressDay, summaryCards.stress?.lowestStressValue, '/100') },
              ]}
              subtitle="Weekly heatmap"
              title="Stress Heatmap"
            >
              <StressHeatmap data={data?.stressHeatmap || []} />
            </AnalyticsChartCard>
          </section>

          <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <DashboardCard>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Productivity Analysis</h2>
                  <p className="mt-2 text-5xl font-black text-emerald-400">{productivityScore}<span className="text-2xl text-slate-500">/100</span></p>
                  <p className="mt-1 font-bold text-emerald-300">Most Productive Day: {data?.mostProductiveDay || '—'}</p>
                </div>
                <div className="hidden h-24 w-24 items-center justify-center rounded-[2rem] bg-violet-500/15 text-5xl shadow-2xl shadow-violet-500/20 sm:flex">⚡</div>
              </div>
              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" style={{ width: `${productivityScore}%` }} />
              </div>
              <p className="mt-5 text-sm font-semibold text-slate-300">Productive Apps Used</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {productiveApps.length > 0 ? productiveApps.map((app) => (
                  <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200" key={app}>{app}</span>
                )) : <span className="text-sm text-slate-400">No productive app usage recorded.</span>}
              </div>
            </DashboardCard>

            <DashboardCard className="relative overflow-hidden">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl">🧠</span>
                  <h2 className="text-lg font-bold text-white">Weekly Summary</h2>
                </div>
                <div className="space-y-4 text-slate-200">
                  {weeklySummary.map((summary) => <p key={summary}>{summary}</p>)}
                </div>
              </div>
            </DashboardCard>
          </section>
        </>
      )}
    </div>
  )
}

export default Analytics
