import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'

export default function FeaturedEvents({ events }) {
  return (
    <section id="featured" className="section-shell py-12 sm:py-16" aria-labelledby="featured-heading">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Editor&apos;s selection</p>
          <h2 id="featured-heading" className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white sm:text-3xl">
            Featured gatherings
          </h2>
        </div>
        <Link
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline dark:text-zinc-100"
          to="/#events"
        >
          Explore all events <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
