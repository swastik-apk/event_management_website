import { ArrowLeft, CalendarX2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function EventNotFound({ context = 'view' }) {
  return (
    <section className="section-shell py-16 sm:py-24" aria-labelledby="event-not-found-heading">
      <div className="surface-card mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center sm:px-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-subtle text-accent-500 dark:border-night-700 dark:bg-night-800">
          <CalendarX2 size={24} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5">Experience unavailable</p>
        <h1 id="event-not-found-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white">
          We couldn&apos;t {context} that event
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted dark:text-zinc-400">
          The event link may be out of date, or the listing is no longer part of the current programme.
        </p>
        <Button as={Link} to="/#events" variant="secondary" pill className="mt-7">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to events
        </Button>
      </div>
    </section>
  )
}
