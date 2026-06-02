import { useCallback } from 'react'
import { AgentReportSection } from '../../components/insights/AgentReportSection'
import { DepressionRiskAnalysisCard } from '../../components/insights/DepressionRiskAnalysisCard'
import { InsightTabs } from '../../components/insights/InsightTabs'
import { MoodAnalysisCard } from '../../components/insights/MoodAnalysisCard'
import { PredictionAnalysisCard } from '../../components/insights/PredictionAnalysisCard'
import { RecommendationsCard } from '../../components/insights/RecommendationsCard'
import { StressAnalysisCard } from '../../components/insights/StressAnalysisCard'
import { TodayInsightCard } from '../../components/insights/TodayInsightCard'
import { PageState } from '../../components/ui/PageState'
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const getCrewAiAnalysis = (insights) => {
  const agentReport = insights?.agentReport || {}

  return {
    behaviorSummary: agentReport.behaviorSummary || agentReport.overallSummary || insights?.todayInsight || '',
    moodAnalysis: agentReport.moodAgent?.summary || insights?.moodAnalysis?.explanation || '',
    stressAnalysis: agentReport.stressAgent?.summary || insights?.stressAnalysis?.explanation || '',
    depressionAnalysis: agentReport.depressionAgent?.summary || insights?.depressionAnalysis || '',
    predictionAnalysis: agentReport.predictionAgent?.summary || insights?.prediction?.explanation || '',
    recommendations: agentReport.wellnessCoachAgent?.recommendations || insights?.recommendations || [],
    model: agentReport.model || '',
    generatedAt: agentReport.generatedAt || '',
    cached: Boolean(agentReport.cached || insights?.aiService?.cached),
  }
}

const AIInsights = () => {
  const loadInsights = useCallback(() => appApi.insights(), [])
  const { data: insights, error, isLoading } = useApiResource(loadInsights)
  const analysis = getCrewAiAnalysis(insights)

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">CrewAI intelligence</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">AI Insights</h1>
          <p className="mt-2 max-w-2xl text-slate-400">Review live agent-generated mood, stress, prediction, depression-risk, and wellness coaching analysis.</p>
        </div>
        <InsightTabs />
      </header>
      <PageState error={error} isLoading={isLoading} />
      {!isLoading && !error && (
        <>
          <TodayInsightCard behaviorSummary={analysis.behaviorSummary} cached={analysis.cached} generatedAt={analysis.generatedAt} model={analysis.model} />
          <section className="grid gap-5 xl:grid-cols-2">
            <MoodAnalysisCard moodAnalysis={analysis.moodAnalysis} />
            <StressAnalysisCard stressAnalysis={analysis.stressAnalysis} />
            <DepressionRiskAnalysisCard depressionAnalysis={analysis.depressionAnalysis} />
            <PredictionAnalysisCard predictionAnalysis={analysis.predictionAnalysis} />
          </section>
          <RecommendationsCard recommendations={analysis.recommendations} />
          <AgentReportSection analysis={analysis} />
        </>
      )}
    </div>
  )
}

export default AIInsights
