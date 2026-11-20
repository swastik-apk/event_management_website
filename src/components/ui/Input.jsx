export default function Input({
  id,
  label,
  error,
  hint,
  required = false,
  className = '',
  ...props
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-ink dark:text-zinc-200" htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-accent-500" aria-hidden="true">*</span> : null}
      </label>
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={`min-h-12 w-full rounded-control border bg-surface px-4 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-zinc-400 focus:border-ink focus:ring-1 focus:ring-ink disabled:cursor-not-allowed disabled:bg-subtle dark:bg-night-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100 dark:disabled:bg-night-800 ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-red-500 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400'
            : 'border-line-strong dark:border-night-700'
        } ${className}`}
        required={required}
        {...props}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-5 text-muted dark:text-zinc-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
