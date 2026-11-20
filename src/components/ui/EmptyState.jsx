import { SearchX } from 'lucide-react'

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon = SearchX,
}) {
  return (
    <div className="flex flex-col items-center rounded-card border border-line bg-subtle/60 px-6 py-14 text-center dark:border-night-700 dark:bg-night-900 sm:px-10">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-accent-500 dark:border-night-700 dark:bg-night-800">
        <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted dark:text-zinc-400">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
