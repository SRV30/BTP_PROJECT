import { depressionRiskAnalysis } from '../../data/aiInsightsData'
import { InsightStatCard } from './InsightStatCard'

export const DepressionRiskAnalysisCard = () => (
  <InsightStatCard icon="🛡️" title="Depression Risk Analysis">
    <p className="text-3xl font-black text-emerald-400">{depressionRiskAnalysis.level}</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      <div>
        <p className="mb-3 text-sm font-bold text-emerald-300">Positive indicators</p>
        <ul className="space-y-2">
          {depressionRiskAnalysis.positiveIndicators.map((indicator) => (
            <li className="flex items-center gap-2 text-sm text-slate-300" key={indicator}><span className="text-emerald-300">✓</span>{indicator}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-3 text-sm font-bold text-rose-300">Risk indicators</p>
        <ul className="space-y-2">
          {depressionRiskAnalysis.riskIndicators.map((indicator) => (
            <li className="flex items-center gap-2 text-sm text-slate-300" key={indicator}><span className="text-rose-300">•</span>{indicator}</li>
          ))}
        </ul>
      </div>
    </div>
    <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-400">{depressionRiskAnalysis.disclaimer}</p>
  </InsightStatCard>
)
