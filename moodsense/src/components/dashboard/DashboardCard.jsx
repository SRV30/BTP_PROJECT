import { cx } from '../../utils/formatters'

export const DashboardCard = ({ children, className }) => (
  <section
    className={cx(
      'rounded-[1.75rem] border border-white/10 bg-slate-900/55 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-slate-900/70',
      className,
    )}
  >
    {children}
  </section>
)
