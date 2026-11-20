import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'

export default function FeaturedEvents({ events }) {
  return (
    <section className="section-shell py-12 sm:py-16" aria-labelledby="featured-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">On the calendar</p>
          <h2 id="featured-heading" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white">
            Featured events
          </h2>
          <p className="mt-2 max-w-xl text-base leading-7 text-muted dark:text-slate-400">
            A short list of upcoming workshops, conversations, and gatherings.
          </p>
        </div>
        <Link className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200" to="/#events">
          View all events <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {events.map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  )
}
