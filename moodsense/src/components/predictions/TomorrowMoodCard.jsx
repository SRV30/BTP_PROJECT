import { PredictionSummaryCard } from './PredictionSummaryCard'

export const TomorrowMoodCard = ({ confidence, mood, score }) => (
  <PredictionSummaryCard icon="😄" title="Tomorrow Mood Prediction">
    <div className="grid gap-5 sm:grid-cols-[1fr_120px] sm:items-center">
      <div>
        <p className="text-5xl font-black text-emerald-400">{mood || 'Unavailable'}</p>
        <p className="mt-2 text-2xl font-black text-violet-300">{Number.isFinite(Number(confidence)) ? confidence : '—'}% <span className="text-sm font-medium text-slate-300">Confidence</span></p>
        <p className="mt-4 text-slate-400">Mood Score: <span className="text-3xl font-black text-white">{Number.isFinite(Number(score)) ? score : '—'}</span></p>
      </div>
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-emerald-400/70 bg-emerald-400/10 text-6xl shadow-2xl shadow-emerald-500/20">🙂</div>
    </div>
  </PredictionSummaryCard>
)
