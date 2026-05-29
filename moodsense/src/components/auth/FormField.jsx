import { cx } from '../../utils/formatters'

export const FormField = ({ error, icon, label, name, type = 'text', ...props }) => (
  <label className="block space-y-2" htmlFor={name}>
    <span className="text-xs font-medium text-slate-300">{label}</span>
    <div
      className={cx(
        'flex items-center gap-3 rounded-2xl border bg-white/[0.04] px-4 py-3 transition focus-within:border-violet-300 focus-within:bg-white/[0.07] focus-within:shadow-lg focus-within:shadow-violet-500/10',
        error ? 'border-rose-400/70' : 'border-white/10',
      )}
    >
      {icon && <span className="text-slate-400">{icon}</span>}
      <input
        className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        id={name}
        name={name}
        type={type}
        {...props}
      />
    </div>
    {error && <p className="text-xs font-medium text-rose-300">{error}</p>}
  </label>
)
