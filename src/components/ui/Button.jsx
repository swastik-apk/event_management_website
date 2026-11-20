const variantClasses = {
  primary:
    'bg-accent-500 text-white shadow-sm hover:bg-accent-600 active:scale-[0.99] focus-visible:ring-accent-500',
  secondary:
    'border border-line-strong bg-surface text-ink hover:border-ink hover:bg-subtle active:scale-[0.99] focus-visible:ring-ink dark:border-night-700 dark:bg-night-900 dark:text-zinc-100 dark:hover:border-zinc-400 dark:hover:bg-night-800',
  ghost:
    'text-ink hover:bg-subtle focus-visible:ring-ink dark:text-zinc-200 dark:hover:bg-night-800 dark:hover:text-white',
  dark: 'bg-ink text-white hover:bg-zinc-800 active:scale-[0.99] focus-visible:ring-ink dark:bg-zinc-100 dark:text-night-950 dark:hover:bg-white',
}

const sizeClasses = {
  sm: 'min-h-10 px-4 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  pill = false,
  className = '',
  type,
  ...props
}) {
  const componentProps = Component === 'button' ? { type: type ?? 'button' } : {}
  const radiusClass = pill ? 'rounded-full' : 'rounded-control'

  return (
    <Component
      {...componentProps}
      {...props}
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-display font-semibold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${radiusClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    />
  )
}
