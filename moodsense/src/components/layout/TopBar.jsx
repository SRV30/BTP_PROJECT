import { appStore } from '../../store/appStore'
import { BrandLogo } from '../common/BrandLogo'

export const TopBar = () => (
  <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/75 px-4 py-4 backdrop-blur xl:px-8">
    <div className="flex items-center justify-between gap-4">
      <div className="xl:hidden">
        <BrandLogo />
      </div>
      <div className="hidden xl:block">
        <p className="text-sm text-slate-400">Welcome back,</p>
        <p className="font-semibold text-white">{appStore.currentUser.name}</p>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-right">
        <p className="text-xs text-slate-400">Role</p>
        <p className="text-sm font-semibold text-white">{appStore.currentUser.role}</p>
      </div>
    </div>
  </header>
)
