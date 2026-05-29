import { Link } from 'react-router-dom'

export const AuthCard = ({ children, footerText, footerTo, footerAction, icon = '✦', subtitle, title }) => (
  <section className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-violet-950/40 backdrop-blur-2xl sm:p-8">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl border border-violet-300/30 bg-gradient-to-br from-violet-500 to-blue-500 text-2xl shadow-2xl shadow-violet-500/40">
      {icon}
    </div>
    <div className="mt-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
      <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
    </div>
    {children}
    {footerText && (
      <p className="mt-8 text-center text-sm text-slate-400">
        {footerText}{' '}
        <Link className="font-semibold text-violet-300 transition hover:text-cyan-200" to={footerTo}>
          {footerAction}
        </Link>
      </p>
    )}
  </section>
)
