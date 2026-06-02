import { useCallback } from 'react'
import { AccountSection } from '../../components/profile/AccountSection'
import { AchievementsSection } from '../../components/profile/AchievementsSection'
import { ActivityHistorySection } from '../../components/profile/ActivityHistorySection'
import { ProfileHeader } from '../../components/profile/ProfileHeader'
import { ProfileStats } from '../../components/profile/ProfileStats'
import { PageState } from '../../components/ui/PageState'
import { useApiResource } from '../../hooks/useApiResource'
import { appApi } from '../../services/appApi'

const Profile = () => {
  const loadProfile = useCallback(() => appApi.profile(), [])
  const { data, error, isLoading } = useApiResource(loadProfile)

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-6">
      <PageState error={error} isLoading={isLoading} />
      {!isLoading && !error && (
        <>
          <ProfileHeader user={data?.user} />
          <ProfileStats stats={data?.stats} />
          <AchievementsSection achievements={data?.achievements || []} />
          <ActivityHistorySection activityHistory={data?.activityHistory || []} />
          <AccountSection />
        </>
      )}
    </div>
  )
}

export default Profile
