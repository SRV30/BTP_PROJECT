import { settings } from '../../data/profileData'
import { DashboardCard } from '../dashboard/DashboardCard'

export const SettingsSection = () => (
  <DashboardCard>
    <h2 className="text-lg font-bold text-white">Settings</h2>
    <div className="mt-5 divide-y divide-white/10">
      {settings.map((setting, index) => (
        <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0" key={setting}>
          <span className="font-semibold text-slate-200">{setting}</span>
          {index < 2 ? (
            <button className="relative h-7 w-12 rounded-full bg-emerald-400/80" type="button">
              <span className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white" />
            </button>
          ) : (
            <span className="text-slate-500">›</span>
          )}
        </div>
      ))}
    </div>
  </DashboardCard>
)
