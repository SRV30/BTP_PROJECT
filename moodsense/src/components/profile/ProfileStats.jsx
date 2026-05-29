import { profileStats } from '../../data/profileData'

export const ProfileStats = () => (
  <section className="grid gap-4 sm:grid-cols-3">
    {profileStats.map((stat) => (
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 text-center shadow-2xl shadow-slate-950/20 backdrop-blur-xl" key={stat.label}>
        <p className="text-3xl font-black text-white">{stat.value}</p>
        <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
      </div>
    ))}
  </section>
)
