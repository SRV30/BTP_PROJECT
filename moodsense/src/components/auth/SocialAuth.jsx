export const SocialAuth = () => (
  <div className="space-y-5">
    <div className="flex items-center gap-4 text-xs text-slate-500">
      <span className="h-px flex-1 bg-white/10" />
      or continue with
      <span className="h-px flex-1 bg-white/10" />
    </div>
    <div className="grid grid-cols-3 gap-3">
      {['G', '', 'f'].map((provider) => (
        <button
          className="rounded-2xl border border-white/10 bg-white/[0.04] py-3 text-lg font-bold text-white transition hover:border-violet-300/40 hover:bg-white/[0.08]"
          key={provider}
          type="button"
        >
          {provider}
        </button>
      ))}
    </div>
  </div>
)
