import { DashboardCard } from '../dashboard/DashboardCard'

const fallbackAvatar = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80'

export const ProfileHeader = ({ user }) => {
  const displayName = user?.name || 'MoodSense User'

  return (
    <DashboardCard className="relative overflow-hidden">
      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <img alt={displayName} className="h-24 w-24 rounded-[2rem] border border-violet-300/30 object-cover shadow-2xl shadow-violet-500/20" src={user?.avatar || fallbackAvatar} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-300">Profile</p>
            <h1 className="mt-2 text-3xl font-black text-white">{displayName}</h1>
            <p className="mt-1 text-slate-400">{user?.email || 'Authenticated MoodSense account'}</p>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
