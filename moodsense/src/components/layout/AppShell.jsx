import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const AppShell = () => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_30%)]" />
    <div className="relative flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 pb-28 sm:px-6 lg:px-8 xl:pb-10">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  </div>
)
