import { profileUser } from '../../data/profileData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const ProfileHeader = () => (
  <DashboardCard className="relative overflow-hidden">
    <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <img alt={profileUser.name} className="h-24 w-24 rounded-[2rem] border border-violet-300/30 object-cover shadow-2xl shadow-violet-500/20" src={profileUser.avatar} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Profile</p>
          <h1 className="mt-2 text-3xl font-black text-white">{profileUser.name}</h1>
          <p className="mt-1 text-slate-400">{profileUser.email}</p>
        </div>
      </div>
      <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-violet-500/25 transition hover:scale-[1.02]" type="button">
        Edit Profile
      </button>
    </div>
  </DashboardCard>
)
