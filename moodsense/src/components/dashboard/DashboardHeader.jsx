export const DashboardHeader = () => (
  <header className="flex items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">Hello, Sahil 👋</h1>
      <p className="mt-1 text-sm text-slate-400 sm:text-base">Track your mood, improve your life.</p>
    </div>
    <div className="flex items-center gap-3">
      <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-xl text-white shadow-lg shadow-violet-950/20 transition hover:border-violet-300/40" type="button">
        🔔
        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-violet-400 ring-2 ring-slate-950" />
      </button>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-1 pr-3">
        <img
          alt="Sahil profile avatar"
          className="h-10 w-10 rounded-2xl object-cover"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
        />
        <span className="hidden text-sm font-semibold text-white sm:inline">Sahil</span>
      </div>
    </div>
  </header>
)
