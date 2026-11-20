import {
  BookOpen,
  Briefcase,
  Cpu,
  LayoutGrid,
  Music2,
  Palette,
  RotateCcw,
  Search,
  Users,
  X,
} from 'lucide-react'

const categoryIcons = {
  'All categories': LayoutGrid,
  Technology: Cpu,
  Design: Palette,
  Business: Briefcase,
  Music: Music2,
  Community: Users,
  Education: BookOpen,
}

export default function EventFilters({
  query,
  category,
  format,
  categories,
  formats,
  onQueryChange,
  onCategoryChange,
  onFormatChange,
  onReset,
  resultCount,
}) {
  const hasFilters = Boolean(
    query.trim() || category !== 'All categories' || format !== 'All formats',
  )
  const categoryOptions = ['All categories', ...categories]

  return (
    <div className="space-y-6">
      {/* Airbnb-style Elevated Search & Format Bar */}
      <div className="rounded-2xl border border-line-strong bg-surface p-2 shadow-search dark:border-night-700 dark:bg-night-900 md:rounded-full">
        <div className="grid gap-2 md:grid-cols-[minmax(0,1.4fr)_auto_minmax(11rem,0.6fr)_auto] md:items-center md:gap-0">
          <div className="relative flex items-center px-3 py-1.5 md:px-5">
            <Search
              className="mr-3 shrink-0 text-ink dark:text-zinc-200"
              size={18}
              aria-hidden="true"
            />
            <div className="min-w-0 flex-1">
              <label
                htmlFor="event-search"
                className="block text-xs font-semibold text-ink dark:text-zinc-100"
              >
                Search experiences
              </label>
              <input
                id="event-search"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted dark:text-zinc-100 dark:placeholder:text-zinc-400"
                type="search"
                value={query}
                placeholder="Topic, city, or keyword (e.g. design, Mumbai)"
                onChange={(event) => onQueryChange(event.target.value)}
              />
            </div>
            {query ? (
              <button
                className="ml-2 inline-flex min-h-8 min-w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-subtle hover:text-ink dark:text-zinc-400 dark:hover:bg-night-800 dark:hover:text-white"
                type="button"
                aria-label="Clear search"
                onClick={() => onQueryChange('')}
              >
                <X size={16} aria-hidden="true" />
              </button>
            ) : null}
          </div>

          <div
            className="hidden h-8 w-px bg-line dark:bg-night-700 md:block"
            aria-hidden="true"
          />

          <div className="border-t border-line px-3 py-2 dark:border-night-700 md:border-t-0 md:px-5 md:py-1.5">
            <label
              htmlFor="event-format"
              className="block text-xs font-semibold text-ink dark:text-zinc-100"
            >
              Format
            </label>
            <select
              id="event-format"
              className="w-full cursor-pointer bg-transparent text-sm text-muted outline-none transition-colors focus:text-ink dark:text-zinc-300 dark:focus:text-white"
              value={format}
              onChange={(event) => onFormatChange(event.target.value)}
            >
              <option value="All formats" className="dark:bg-night-900">
                Any format
              </option>
              {formats.map((item) => (
                <option key={item} value={item} className="dark:bg-night-900">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 px-1 pb-1 md:p-0">
            {hasFilters ? (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium text-ink transition-colors hover:bg-subtle dark:text-zinc-200 dark:hover:bg-night-800"
              >
                <RotateCcw size={15} aria-hidden="true" />
                Reset
              </button>
            ) : null}
            <a
              href="#events-grid"
              className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent-500 px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              <Search size={16} aria-hidden="true" />
              <span>Explore</span>
            </a>
          </div>
        </div>
      </div>

      {/* Airbnb Horizontal Category Icon Strip */}
      <div className="flex flex-col gap-3 border-b border-line dark:border-night-800 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div
          className="no-scrollbar -mx-1 flex flex-1 items-stretch gap-3 overflow-x-auto px-1 pt-1.5 sm:gap-5 md:mx-0 md:justify-between md:gap-4 md:overflow-visible md:px-0 lg:gap-6"
          role="tablist"
          aria-label="Filter events by category"
        >
          {categoryOptions.map((item) => {
            const Icon = categoryIcons[item] || LayoutGrid
            const isActive = category === item

            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(item)}
                className={`group flex min-w-[4.75rem] shrink-0 flex-col items-center justify-center gap-2.5 rounded-t-control border-b-2 px-3.5 pb-3.5 pt-2.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink dark:focus-visible:ring-zinc-100 sm:min-w-[5.25rem] sm:px-4 lg:flex-1 lg:px-3 ${
                  isActive
                    ? 'border-ink text-ink dark:border-white dark:text-white'
                    : 'border-transparent text-muted hover:border-line-strong hover:bg-subtle/60 hover:text-ink dark:text-zinc-400 dark:hover:border-night-700 dark:hover:bg-night-800/60 dark:hover:text-zinc-100'
                }`}
              >
                <Icon
                  size={21}
                  strokeWidth={isActive ? 2 : 1.65}
                  className={
                    isActive
                      ? 'text-accent-500'
                      : 'text-muted transition-colors group-hover:text-ink dark:text-zinc-400 dark:group-hover:text-zinc-100'
                  }
                  aria-hidden="true"
                />
                <span>{item === 'All categories' ? 'All' : item}</span>
              </button>
            )
          })}
        </div>

        <p
          className="shrink-0 whitespace-nowrap pb-3.5 text-xs font-medium tabular-nums text-muted dark:text-zinc-400"
          aria-live="polite"
        >
          <span className="font-semibold text-ink dark:text-zinc-100">{resultCount}</span>{' '}
          {resultCount === 1 ? 'experience' : 'experiences'}
        </p>
      </div>
    </div>
  )
}
