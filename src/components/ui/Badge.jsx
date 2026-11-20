export default function Badge({ children, tone = 'accent' }) {
  const toneClasses =
    tone === 'neutral'
      ? 'border-line bg-slate-100 text-muted dark:border-night-700 dark:bg-night-800 dark:text-slate-200'
      : 'border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-800 dark:bg-accent-800 dark:text-accent-100'

  return (
    <span
      className={`inline-flex w-fit items-center rounded border px-2 py-0.5 text-xs font-medium ${toneClasses}`}
    >
      {children}
    </span>
  )
}
