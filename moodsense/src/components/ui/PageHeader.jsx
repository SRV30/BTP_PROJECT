export const PageHeader = ({ eyebrow, title, description }) => (
  <header className="space-y-3">
    {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">{eyebrow}</p>}
    <div className="max-w-3xl space-y-3">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
      {description && <p className="text-base leading-7 text-slate-300">{description}</p>}
    </div>
  </header>
)
