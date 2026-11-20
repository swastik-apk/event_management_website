import { ArrowUp, ArrowUpRight, CalendarDays, Globe, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { events } from '../../data/events'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-line bg-subtle dark:border-night-800 dark:bg-night-900">
      {/* Main 4-column directory */}
      <div className="section-shell py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1.1fr_1fr]">
          {/* Column 1: Brand & Overview */}
          <div>
            <Link className="inline-flex items-center gap-2.5 text-ink dark:text-white" to="/">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-accent-500"
              >
                <rect x="2" y="2" width="24" height="24" rx="7" fill="currentColor" />
                <path
                  d="M9.5 14.5C9.5 11.7386 11.7386 9.5 14.5 9.5C17.2614 9.5 19.5 11.7386 19.5 14.5C19.5 17.2614 17.2614 19.5 14.5 19.5H9.5V14.5Z"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
              <span className="font-display text-lg font-bold tracking-tight text-accent-500">
                Event Hub
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted dark:text-zinc-400">
              A curated community directory for workshops, founder roundtables, design studios, and evening gatherings hosted across India and online.
            </p>
            <p className="mt-4 text-xs leading-5 text-muted dark:text-zinc-500">
              Browser-only demonstration. Registrations are saved privately in your browser&apos;s local storage with no paid booking or external sync.
            </p>
            <Link
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline dark:text-zinc-100"
              to="/#events"
            >
              Browse all {events.length} experiences <ArrowUpRight size={15} className="text-accent-500" aria-hidden="true" />
            </Link>
          </div>

          {/* Column 2: Navigation & Discovery */}
          <div>
            <h2 className="font-display text-sm font-semibold text-ink dark:text-white">
              Discover
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted dark:text-zinc-400">
              <li>
                <Link className="transition-colors hover:text-ink hover:underline dark:hover:text-white" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-ink hover:underline dark:hover:text-white" to="/#events">
                  Upcoming experiences
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-ink hover:underline dark:hover:text-white" to="/#about">
                  How Event Hub works
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-ink hover:underline dark:hover:text-white" to="/registrations">
                  My registrations
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-ink hover:underline dark:hover:text-white" to="/register/evt-ai-summit">
                  Quick RSVP form
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Programme Directory by City & Format */}
          <div>
            <h2 className="font-display text-sm font-semibold text-ink dark:text-white">
              Cities &amp; programme
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted dark:text-zinc-400">
              {events.map((event) => {
                const cityLabel = event.format === 'Online'
                  ? 'Online'
                  : event.venue.split(',').pop()?.trim() || event.venue

                return (
                  <li key={event.id}>
                    <Link
                      className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-ink hover:underline dark:hover:text-white"
                      to={`/events/${event.id}`}
                    >
                      <span className="font-medium text-ink dark:text-zinc-200">{cityLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="line-clamp-1">{event.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Column 4: Attendee Guide */}
          <div>
            <h2 className="font-display text-sm font-semibold text-ink dark:text-white">
              Attendee guide
            </h2>
            <div className="mt-4 space-y-4 text-sm text-muted dark:text-zinc-400">
              <div className="flex items-start gap-2.5">
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                <p className="leading-6">
                  Full day agendas and RSVP deadlines are listed on every event page.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                <p className="leading-6">
                  Choose from in-person venues, hybrid civic labs, or live online studios.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                <p className="leading-6">
                  Every registration generates an instant reference ID stored locally on this device.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted dark:border-night-800 dark:text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span>© 2026 Event Hub</span>
            <span aria-hidden="true">·</span>
            <span>Sample programme</span>
            <span aria-hidden="true">·</span>
            <Link className="hover:text-ink hover:underline dark:hover:text-white" to="/#events">
              Programme
            </Link>
            <span aria-hidden="true">·</span>
            <Link className="hover:text-ink hover:underline dark:hover:text-white" to="/registrations">
              Saved RSVPs
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink dark:text-zinc-200">
              <Globe size={14} aria-hidden="true" />
              English (IN)
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink transition-colors hover:border-ink dark:border-night-700 dark:bg-night-800 dark:text-zinc-100 dark:hover:border-zinc-400"
            >
              Back to top <ArrowUp size={13} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
