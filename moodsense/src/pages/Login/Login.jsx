import { Button } from '../../components/ui/Button'

const Login = () => (
  <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
    <section className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-slate-950/50">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-300">Secure access</p>
      <h1 className="mt-4 text-3xl font-bold">Welcome back</h1>
      <p className="mt-3 text-slate-300">Placeholder login screen for MoodSense AI authentication flows.</p>
      <form className="mt-8 space-y-4">
        <input className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-300" placeholder="Email address" type="email" />
        <input className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-violet-300" placeholder="Password" type="password" />
        <Button className="w-full" to="/dashboard">Continue</Button>
      </form>
    </section>
  </main>
)

export default Login
