import { cx } from '../../utils/formatters'

export const AuthStatus = ({ status }) => {
  if (!status) return null

  return (
    <div
      className={cx(
        'rounded-2xl border px-4 py-3 text-sm font-medium',
        status.type === 'error'
          ? 'border-rose-400/30 bg-rose-500/10 text-rose-200'
          : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
      )}
      role="status"
    >
      {status.message}
    </div>
  )
}
