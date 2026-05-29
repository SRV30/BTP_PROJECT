import { achievements } from '../../data/profileData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const AchievementsSection = () => (
  <DashboardCard>
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-bold text-white">Achievements</h2>
      <span className="text-sm font-semibold text-violet-300">View All</span>
    </div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {achievements.map((achievement) => (
        <article className={`rounded-2xl border border-white/10 bg-gradient-to-br ${achievement.tone} p-4 text-center`} key={achievement.title}>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">{achievement.icon}</div>
          <p className="mt-3 font-bold text-white">{achievement.title}</p>
        </article>
      ))}
    </div>
  </DashboardCard>
)
