import { cx } from '../../utils/formatters'

export const AuthSubmitButton = ({ children, isLoading }) => (
  <button
    className={cx(
      'flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 px-5 py-3 text-sm font-bold text-white shadow-2xl shadow-violet-500/30 transition hover:scale-[1.01] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-70',
      isLoading && 'animate-pulse',
    )}
    disabled={isLoading}
    type="submit"
  >
    {isLoading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
    {isLoading ? 'Processing...' : children}
  </button>
)
