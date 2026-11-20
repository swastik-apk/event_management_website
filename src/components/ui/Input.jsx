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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted dark:text-slate-300" htmlFor={id}>
        {label}
        {required ? <span className="ml-1 text-accent-600" aria-hidden="true">*</span> : null}
      </label>
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={`min-h-10 w-full rounded-control border bg-surface px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100 disabled:cursor-not-allowed disabled:bg-slate-100 dark:border-night-700 dark:bg-night-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-accent-400 dark:focus:ring-accent-800 dark:disabled:bg-night-800 ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100 dark:border-red-500 dark:focus:ring-red-950' : 'border-line'} ${className}`}
        required={required}
        {...props}
      />
      {hint ? (
        <p id={`${id}-hint`} className="text-xs leading-5 text-muted dark:text-slate-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm font-medium text-red-700 dark:text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
