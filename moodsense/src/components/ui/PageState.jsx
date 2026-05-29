export const PageState = ({ error, isLoading }) => {
  if (isLoading) {
    return <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm font-semibold text-cyan-200">Loading live MoodSense data...</div>
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm font-semibold text-rose-200">{error}</div>
  }

  return null
}
