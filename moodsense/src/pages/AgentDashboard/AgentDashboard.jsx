import { useCallback } from 'react'
import { AgentSummaryCard } from '../../components/agent/AgentSummaryCard'
import { WellnessProfileCard } from '../../components/agent/WellnessProfileCard'
import { PageState } from '../../components/ui/PageState'
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const AgentDashboard = () => {
  const loadAgentData = useCallback(async () => {
    const [insights, profile] = await Promise.all([
      appApi.insights(),
      appApi.profile().catch(() => ({})),
    ])
    return { ...insights, userProfile: profile }
  }, [])

  const { data, error, isLoading } = useApiResource(loadAgentData)
  const report = data?.agentReport || {}

  return (
    <div className="mx-auto max-w-7xl space-y-8 pb-12">
      <header>
        <p className="text-xs font-black uppercase tracking-[0.4em] text-cyan-400">Operations Control</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Agent Command</h1>
        <p className="mt-4 max-w-2xl text-lg font-medium text-slate-400">
          Orchestrating multi-agent behavioral analysis and wellness forecasting.
        </p>
      </header>

      <PageState error={error} isLoading={isLoading} />

      {!isLoading && !error && (
        <div className="space-y-8">
          {/* Top Row: Overall Insight & Wellness Profile */}
          <div className="grid gap-6 lg:grid-cols-12">
            <AgentSummaryCard
              agentName="Behavior Agent"
              className="lg:col-span-7"
              icon="🔍"
              status="Analyzing Patterns"
              summary={report.behaviorSummary || data?.todayInsight}
              title="Latest behavioral Insight"
            />
            <WellnessProfileCard
              className="lg:col-span-5"
              profile={data?.userProfile?.wellnessProfile}
            />
          </div>

          {/* Grid: Core Agent Modules */}
          <section>
            <h2 className="mb-6 text-xl font-black text-white">Active Agents</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <AgentSummaryCard
                agentName={report.moodAgent?.agentName || 'Mood Agent'}
                icon="🎭"
                status={report.moodAgent?.status || 'Active'}
                summary={report.moodAgent?.summary || data?.moodAnalysis?.explanation}
                title="Emotional State Analysis"
              />
              <AgentSummaryCard
                agentName={report.stressAgent?.agentName || 'Stress Agent'}
                icon="⚡"
                status={report.stressAgent?.status || 'Active'}
                summary={report.stressAgent?.summary || data?.stressAnalysis?.explanation}
                title="Stress & Tension report"
              />
              <AgentSummaryCard
                agentName={report.depressionAgent?.agentName || 'Depression Agent'}
                icon="🛡️"
                status={report.depressionAgent?.status || 'Monitoring'}
                summary={report.depressionAgent?.summary || data?.depressionAnalysis}
                title="Clinical Risk Assessment"
              />
              <AgentSummaryCard
                agentName={report.predictionAgent?.agentName || 'Prediction Agent'}
                icon="🔮"
                status={report.predictionAgent?.status || 'Forecasting'}
                summary={report.predictionAgent?.summary || data?.prediction?.explanation}
                title="Tomorrow's Outlook"
              />
            </div>
          </section>

          {/* Recommendations Row */}
          <section className="rounded-[2rem] border border-white/10 bg-slate-900/50 p-8">
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">🌱</span>
              <div>
                <h3 className="text-xl font-bold text-white">Wellness Coach Agent</h3>
                <p className="text-sm text-slate-400">Personalized actionable recommendations</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {(report.wellnessCoachAgent?.recommendations || data?.recommendations || []).map((rec, i) => (
                <div className="group rounded-2xl border border-white/5 bg-white/[0.03] p-6 transition hover:border-emerald-500/30 hover:bg-white/[0.05]" key={i}>
                  <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Strategy 0{i + 1}</p>
                  <h4 className="mt-3 font-bold text-white">{typeof rec === 'string' ? rec : rec.title}</h4>
                  {rec.description && <p className="mt-2 text-sm leading-relaxed text-slate-400">{rec.description}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default AgentDashboard
