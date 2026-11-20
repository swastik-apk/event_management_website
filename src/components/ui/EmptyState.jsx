import { SearchX } from 'lucide-react'

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon = SearchX,
}) {
  return (
    <div className="surface-card flex flex-col items-center px-6 py-12 text-center sm:px-10">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-accent-50 text-accent-600 dark:bg-accent-800 dark:text-accent-200">
        <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="font-display text-xl font-semibold text-ink dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted dark:text-slate-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
