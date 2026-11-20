import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/date'
import Badge from '../ui/Badge'
import EventImage from '../ui/EventImage'

export default function EventCard({ event }) {
  return (
    <article className="group surface-card flex h-full flex-col overflow-hidden transition-colors duration-150 hover:border-accent-300 dark:hover:border-accent-600">
      <EventImage className="aspect-[16/9]" src={event.image} alt={`${event.title} event`} />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <Badge>{event.category}</Badge>
          <span className="text-xs text-muted dark:text-slate-400">{event.format}</span>
        </div>
        <h3 className="mt-4 line-clamp-2 min-h-[3.5rem] font-display text-xl font-semibold leading-7 text-ink dark:text-white">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted dark:text-slate-400">{event.shortDescription}</p>
        <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm dark:border-night-700">
          <div className="flex items-start gap-2 text-muted dark:text-slate-300">
            <CalendarDays className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-start gap-2 text-muted dark:text-slate-300">
            <MapPin className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
        <Link
          className="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:text-accent-300 dark:hover:text-accent-200"
          to={`/events/${event.id}`}
        >
          View details
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
