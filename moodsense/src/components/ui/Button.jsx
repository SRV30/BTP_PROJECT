import { Link } from '../../routes/routerPrimitives'
import { cx } from '../../utils/formatters'

const baseStyles = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-950'

export const Button = ({ children, className, to, variant = 'primary', ...props }) => {
  const variantStyles = {
    primary: 'bg-violet-500 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-400',
    secondary: 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15',
  }

  const classes = cx(baseStyles, variantStyles[variant], className)

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
