import { AreaAnalyticsChart } from '../../components/charts/AreaAnalyticsChart'
import { AnalyticsChartCard } from '../../components/charts/AnalyticsChartCard'
import { BarAnalyticsChart } from '../../components/charts/BarAnalyticsChart'
import { DonutAnalyticsChart } from '../../components/charts/DonutAnalyticsChart'
import { LineAnalyticsChart } from '../../components/charts/LineAnalyticsChart'
import { StressHeatmap } from '../../components/charts/StressHeatmap'
import { DashboardCard } from '../../components/dashboard/DashboardCard'
import { analyticsDailyData, analyticsEmotionDistribution, analyticsRangeOptions, productiveApps, stressHeatmap } from '../../data/analyticsData'

const Analytics = () => (
  <div className="mx-auto max-w-7xl space-y-6 pb-6">
    <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">MoodSense AI</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Analytics</h1>
        <p className="mt-2 max-w-2xl text-slate-400">Track mood, sleep, activity, screen time, stress, and productivity patterns with AI-powered wellness analytics.</p>
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

    <section className="grid gap-5 xl:grid-cols-2">
      <AnalyticsChartCard
        stats={[
          { label: 'Average Mood', value: '77/100' },
          { label: 'Best Day', value: 'Sun 84' },
          { label: 'Worst Day', value: 'Wed 68' },
        ]}
        subtitle="Daily mood scores"
        title="Mood Trend"
      >
        <LineAnalyticsChart color="#a855f7" data={analyticsDailyData} dataKey="mood" />
      </AnalyticsChartCard>

      <AnalyticsChartCard
        stats={[
          { label: 'Average Sleep', value: '7h 16m' },
          { label: 'Best Sleep Day', value: 'Sat' },
          { label: 'Consistency', value: '86%' },
        ]}
        subtitle="Daily sleep hours"
        title="Sleep Analysis"
      >
        <BarAnalyticsChart color="#38bdf8" data={analyticsDailyData} dataKey="sleep" />
      </AnalyticsChartCard>

      <AnalyticsChartCard
        stats={[
          { label: 'Average Steps', value: '6,364' },
          { label: 'Most Active', value: 'Sat' },
          { label: 'Least Active', value: 'Wed' },
        ]}
        subtitle="Steps by day"
        title="Activity Analysis"
      >
        <BarAnalyticsChart color="#22d3ee" data={analyticsDailyData} dataKey="steps" />
      </AnalyticsChartCard>

      <AnalyticsChartCard
        stats={[
          { label: 'Average Screen Time', value: '4h 12m' },
          { label: 'Highest Usage', value: 'Wed' },
          { label: 'Lowest Usage', value: 'Sat' },
        ]}
        subtitle="Daily device usage"
        title="Screen Time Analysis"
      >
        <AreaAnalyticsChart color="#c084fc" data={analyticsDailyData} dataKey="screenTime" />
      </AnalyticsChartCard>

      <AnalyticsChartCard title="Emotion Distribution">
        <DonutAnalyticsChart data={analyticsEmotionDistribution} />
      </AnalyticsChartCard>

      <AnalyticsChartCard
        stats={[
          { label: 'Average Stress', value: '44/100' },
          { label: 'Stress Trend', value: 'Down 8%' },
        ]}
        subtitle="Weekly heatmap"
        title="Stress Heatmap"
      >
        <StressHeatmap data={stressHeatmap} />
      </AnalyticsChartCard>
    </section>

    <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <DashboardCard>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">Productivity Analysis</h2>
            <p className="mt-2 text-5xl font-black text-emerald-400">78<span className="text-2xl text-slate-500">/100</span></p>
            <p className="mt-1 font-bold text-emerald-300">Most Productive Day: Friday</p>
          </div>
          <div className="hidden h-24 w-24 items-center justify-center rounded-[2rem] bg-violet-500/15 text-5xl shadow-2xl shadow-violet-500/20 sm:flex">⚡</div>
        </div>
        <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" />
        </div>
        <p className="mt-5 text-sm font-semibold text-slate-300">Productive Apps Used</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {productiveApps.map((app) => (
            <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200" key={app}>{app}</span>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard className="relative overflow-hidden">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-2xl">🧠</span>
            <h2 className="text-lg font-bold text-white">AI Summary</h2>
          </div>
          <div className="space-y-4 text-slate-200">
            <p>This week your mood improved by <span className="font-bold text-emerald-300">12%</span>.</p>
            <p>Sleep quality remained <span className="font-bold text-cyan-300">stable</span>.</p>
            <p>Stress levels decreased by <span className="font-bold text-violet-300">8%</span>.</p>
          </div>
        </div>
      </DashboardCard>
    </section>
  </div>
)

export default Analytics
