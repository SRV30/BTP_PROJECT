import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../constants/navigation'

export const BottomNav = () => (
  <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-3xl border border-white/10 bg-slate-950/90 p-2 shadow-2xl shadow-slate-950/60 backdrop-blur xl:hidden">
    {navigationItems.map((item) => (
      <NavLink
        aria-label={item.label}
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[0.65rem] font-semibold transition ${
            isActive ? 'bg-violet-500 text-white' : 'text-slate-400'
          }`
        }
        key={item.path}
        to={item.path}
      >
        <span className="text-base">{item.icon}</span>
        <span className="hidden sm:inline">{item.label}</span>
      </NavLink>
    ))}
  </nav>
)
