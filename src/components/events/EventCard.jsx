import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/date'
import EventImage from '../ui/EventImage'

export default function EventCard({ event }) {
  return (
    <article className="group flex h-full flex-col">
      <Link
        to={`/events/${event.id}`}
        className="flex h-full flex-col rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 dark:focus-visible:ring-zinc-100"
      >
        <div className="relative overflow-hidden rounded-card ring-1 ring-black/5 dark:ring-white/10">
          <EventImage
            className="aspect-[4/3]"
            src={event.image}
            alt={`${event.title} at ${event.venue}`}
            zoomOnHover
          />
        </div>

        <div className="mt-3.5 flex flex-1 flex-col">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="line-clamp-1 font-display text-base font-semibold leading-snug text-ink dark:text-white">
              {event.title}
            </h3>
            <span className="shrink-0 whitespace-nowrap text-xs font-medium text-muted dark:text-zinc-400">
              {event.format}
            </span>
          </div>

          <p className="mt-1 line-clamp-1 text-sm text-muted dark:text-zinc-400">
            {event.venue}
          </p>

          <div className="mt-0.5 flex items-center gap-1.5 text-sm tabular-nums text-muted dark:text-zinc-400">
            <span>{formatDate(event.startDate)}</span>
            <span aria-hidden="true">·</span>
            <span>{event.category}</span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted dark:text-zinc-400">
            {event.shortDescription}
          </p>

          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-ink underline-offset-4 group-hover:underline dark:text-zinc-100">
            View details
            <ArrowUpRight
              size={15}
              className="text-accent-500 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
