import { AccountSection } from '../../components/profile/AccountSection'
import { AchievementsSection } from '../../components/profile/AchievementsSection'
import { ActivityHistorySection } from '../../components/profile/ActivityHistorySection'
import { GoalsSection } from '../../components/profile/GoalsSection'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileStats } from '../../components/profile/ProfileStats'
import { SettingsSection } from '../../components/profile/SettingsSection'

const Profile = () => (
  <div className="mx-auto max-w-7xl space-y-6 pb-6">
    <ProfileHeader />
    <ProfileStats />
    <AchievementsSection />
    <section className="grid gap-5 lg:grid-cols-2">
      <ActivityHistorySection />
      <GoalsSection />
    </section>
    <section className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <SettingsSection />
      <AccountSection />
    </section>
  </div>
)

export default Profile
