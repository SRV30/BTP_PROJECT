import { Link } from 'react-router-dom'
import { BrandLogo } from '../common/BrandLogo'

export const AuthLayout = ({ children, eyebrow, title, subtitle }) => (
  <main className="relative min-h-screen overflow-hidden bg-[#030816] px-4 py-6 text-white sm:px-6 lg:px-8">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.35),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.22),transparent_25%),radial-gradient(circle_at_50%_90%,rgba(59,130,246,0.18),transparent_35%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:46px_46px]" />

    <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
      <section className="hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-violet-950/30 backdrop-blur-xl lg:block">
        <Link to="/">
          <BrandLogo />
        </Link>
        <div className="mt-16 max-w-lg space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">{eyebrow}</p>
          <h1 className="text-5xl font-black tracking-tight">{title}</h1>
          <p className="text-lg leading-8 text-slate-300">{subtitle}</p>
        </div>
        <div className="mt-14 grid grid-cols-3 gap-4">
          {[
            ['98%', 'Secure sessions'],
            ['24/7', 'AI mood support'],
            ['4.9', 'Wellness rating'],
          ].map(([value, label]) => (
            <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4" key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-cyan-400/10 p-6">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-500/20 text-3xl shadow-2xl shadow-violet-500/30">🧠</div>
          <p className="text-xl font-semibold">Private by design</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">MoodSense AI keeps the experience focused on user wellbeing with polished, trustworthy authentication flows.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-md">
        <div className="mb-8 flex justify-center lg:hidden">
          <Link to="/">
            <BrandLogo />
          </Link>
        </div>
        {children}
      </section>
    </div>
  </main>
)
