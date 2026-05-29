import { insightTabs } from '../../data/aiInsightsData'

export const InsightTabs = () => (
  <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-xl">
    {insightTabs.map((tab, index) => (
      <button
        className={`rounded-2xl px-3 py-2 text-sm font-bold transition ${index === 0 ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
        key={tab}
        type="button"
      >
        {tab}
      </button>
    ))}
  </div>
)
