import { DashboardCard } from '../dashboard/DashboardCard'

const buildAgentReports = (analysis) => [
  { agent: 'Behavior Agent', status: 'behaviorSummary', output: analysis.behaviorSummary },
  { agent: 'Mood Agent', status: 'moodAnalysis', output: analysis.moodAnalysis },
  { agent: 'Stress Agent', status: 'stressAnalysis', output: analysis.stressAnalysis },
  { agent: 'Depression Agent', status: 'depressionAnalysis', output: analysis.depressionAnalysis },
  { agent: 'Prediction Agent', status: 'predictionAnalysis', output: analysis.predictionAnalysis },
]

export const AgentReportSection = ({ analysis }) => {
  const reports = buildAgentReports(analysis)

  return (
    <DashboardCard>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">🤖</span>
        <div>
          <h2 className="text-lg font-bold text-white">Agent Report</h2>
          <p className="text-sm text-slate-400">CrewAI outputs returned by the AI analysis service.</p>
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {reports.map((report) => (
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-violet-300/30 hover:bg-white/[0.07]" key={report.agent}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-white">{report.agent}</h3>
              <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-bold text-violet-200">{report.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{report.output || 'No CrewAI output returned for this section.'}</p>
          </article>
        ))}
      </div>
    </DashboardCard>
  )
}
