const variantClasses = {
  primary:
    'bg-accent-500 text-white hover:bg-accent-600 focus-visible:ring-accent-400',
  secondary:
    'border border-line bg-surface text-ink hover:border-accent-500 hover:bg-accent-50 focus-visible:ring-accent-400 dark:border-night-700 dark:bg-night-900 dark:text-slate-100 dark:hover:border-accent-400 dark:hover:bg-night-800',
  ghost:
    'text-muted hover:bg-slate-100 hover:text-ink focus-visible:ring-accent-400 dark:text-slate-300 dark:hover:bg-night-800 dark:hover:text-white',
  dark: 'bg-ink text-white hover:bg-slate-700 focus-visible:ring-accent-400 dark:bg-slate-100 dark:text-night-950 dark:hover:bg-white',
}

const sizeClasses = {
  sm: 'min-h-10 px-3 text-sm',
  md: 'min-h-10 px-4 text-sm',
  lg: 'min-h-11 px-5 text-sm',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  type,
  ...props
}) {
  const componentProps = Component === 'button' ? { type: type ?? 'button' } : {}

  return (
    <Component
      {...componentProps}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    />
  )
}
