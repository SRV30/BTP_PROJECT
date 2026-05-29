import { BrandLogo } from '../../components/common/BrandLogo'
import { Button } from '../../components/ui/Button'

const Splash = () => (
  <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
    <section className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-violet-950/40 backdrop-blur sm:p-10">
      <BrandLogo />
      <div className="mt-12 max-w-2xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">MoodSense AI</p>
        <h1 className="text-4xl font-black tracking-tight sm:text-6xl">Decode mood patterns with responsible AI.</h1>
        <p className="text-lg leading-8 text-slate-300">A scalable React, Vite, and Tailwind foundation for emotion analytics, predictions, and personalized wellness insights.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/dashboard">Enter dashboard</Button>
          <Button to="/login" variant="secondary">Sign in</Button>
        </div>
      </div>
    </section>
  </main>
)

export default Splash
