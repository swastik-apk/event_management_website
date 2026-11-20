import { ArrowLeft, CalendarX2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function EventNotFound({ context = 'view' }) {
  return (
    <section className="section-shell py-16 sm:py-24" aria-labelledby="event-not-found-heading">
      <div className="surface-card mx-auto flex max-w-2xl flex-col items-center px-6 py-12 text-center sm:px-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-control bg-accent-50 text-accent-600 dark:bg-accent-800 dark:text-accent-200">
          <CalendarX2 size={26} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5">Event unavailable</p>
        <h1 id="event-not-found-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white">
          We couldn&apos;t {context} that event
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
          The event link may be out of date, or the event may no longer be part of this sample programme.
        </p>
        <Button as={Link} to="/#events" variant="secondary" className="mt-7">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to events
        </Button>
      </div>
    </section>
  )
}
