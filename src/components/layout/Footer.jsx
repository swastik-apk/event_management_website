import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface dark:border-night-800 dark:bg-night-900">
      <div className="section-shell grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-12">
        <div>
          <Link className="inline-flex items-center gap-2.5 text-ink dark:text-white" to="/">
            <span className="flex h-8 w-8 items-center justify-center rounded-control bg-accent-50 text-accent-700 dark:bg-accent-800 dark:text-accent-200">
              <CalendarDays size={18} aria-hidden="true" />
            </span>
            <span className="font-display text-base font-semibold">Event Hub</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted dark:text-slate-400">
            A thoughtful way to discover workshops, conversations, and shared experiences worth making time for.
          </p>
          <p className="mt-5 text-xs leading-5 text-muted dark:text-slate-500">
            Event Hub is a browser-only demo. Registrations stay on this device and are not tickets or paid bookings.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink dark:text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted dark:text-slate-400">
            <li><Link className="transition-colors hover:text-accent-600 dark:hover:text-accent-300" to="/#events">All events</Link></li>
            <li><Link className="transition-colors hover:text-accent-600 dark:hover:text-accent-300" to="/#about">How it works</Link></li>
            <li><Link className="transition-colors hover:text-accent-600 dark:hover:text-accent-300" to="/registrations">My registrations</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink dark:text-white">For your visit</h2>
          <p className="mt-4 text-sm leading-6 text-muted dark:text-slate-400">
            Event details include the organiser note and format for each sample event. For questions about a real event, use the organiser&apos;s own published channel.
          </p>
          <Link className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200" to="/#events">
            Browse the programme <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="border-t border-line dark:border-night-800">
        <div className="section-shell flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between dark:text-slate-500">
          <p>© 2026 Event Hub. Sample experience for demonstration.</p>
          <p>Made for curious people and useful gatherings.</p>
        </div>
      </div>
    </footer>
  )
}
