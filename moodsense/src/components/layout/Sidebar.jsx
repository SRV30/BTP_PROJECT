import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../constants/navigation'
import { BrandLogo } from '../common/BrandLogo'

export const Sidebar = () => (
  <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur xl:block">
    <BrandLogo />
    <nav className="mt-10 space-y-2">
      {navigationItems.map((item) => (
        <NavLink
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              isActive ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20' : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`
          }
          key={item.path}
          to={item.path}
        >
          <span>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  </aside>
)
