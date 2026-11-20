import { Search, SlidersHorizontal, X } from 'lucide-react'
import Button from '../ui/Button'

export default function EventFilters({
  query,
  category,
  categories,
  onQueryChange,
  onCategoryChange,
  onReset,
  resultCount,
}) {
  const hasFilters = query.trim() || category !== 'All categories'

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(14rem,0.45fr)_auto] md:items-end">
        <div>
          <label className="mb-2 block text-sm font-medium text-muted dark:text-slate-300" htmlFor="event-search">
            Search events
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-400" size={17} aria-hidden="true" />
            <input
              id="event-search"
              className="min-h-10 w-full rounded-control border border-line bg-surface pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-accent-400 focus:ring-2 focus:ring-accent-100 dark:border-night-700 dark:bg-night-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-accent-400 dark:focus:ring-accent-800"
              type="search"
              value={query}
              placeholder="Try “design” or “online”"
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query ? (
              <button
                className="absolute right-1 top-1/2 inline-flex min-h-8 min-w-8 -translate-y-1/2 items-center justify-center rounded-control text-muted hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:text-slate-400 dark:hover:bg-night-800 dark:hover:text-white"
                type="button"
                aria-label="Clear search"
                onClick={() => onQueryChange('')}
              >
                <X size={17} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted dark:text-slate-300" htmlFor="event-category">
            <SlidersHorizontal size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" />
            Category
          </label>
          <select
            id="event-category"
            className="min-h-10 w-full rounded-control border border-line bg-surface px-3 text-sm text-ink outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100 dark:border-night-700 dark:bg-night-900 dark:text-slate-100 dark:focus:border-accent-400 dark:focus:ring-accent-800"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option>All categories</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <Button
          className="w-full md:w-auto"
          variant="ghost"
          size="md"
          type="button"
          disabled={!hasFilters}
          onClick={onReset}
        >
          Reset filters
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted dark:text-slate-400" aria-live="polite">
        <span className="font-medium text-ink dark:text-slate-100">{resultCount}</span> {resultCount === 1 ? 'event' : 'events'}
      </p>
    </div>
  )
}
