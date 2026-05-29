export const InsightCard = ({ children, index }) => (
  <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-200">
      {String(index).padStart(2, '0')}
    </div>
    <p className="leading-7 text-slate-200">{children}</p>
  </article>
)
