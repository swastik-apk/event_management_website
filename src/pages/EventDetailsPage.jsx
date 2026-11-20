import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin, UsersRound } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import EventNotFound from '../components/events/EventNotFound'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Countdown from '../components/ui/Countdown'
import EventImage from '../components/ui/EventImage'
import { getEventById } from '../data/events'
import { formatDate, formatEventSchedule, formatTime } from '../utils/date'

export default function EventDetailsPage() {
  const { eventId } = useParams()
  const event = getEventById(eventId)

  useEffect(() => {
    document.title = event ? `${event.title} — Event Hub` : 'Event not found — Event Hub'
  }, [event])

  if (!event) return <EventNotFound />

  return (
    <>
      <section className="border-b border-line bg-surface dark:border-night-800 dark:bg-night-900" aria-labelledby="event-title">
        <div className="section-shell py-8 sm:py-12">
          <Link className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted hover:text-accent-700 dark:text-slate-400 dark:hover:text-accent-300" to="/#events">
            <ArrowLeft size={16} aria-hidden="true" /> Back to all events
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <Badge>{event.category}</Badge>
              <h1 id="event-title" className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink dark:text-white sm:text-4xl">
                {event.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted dark:text-slate-400">
                {event.shortDescription}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button as={Link} to={`/register/${event.id}`} size="lg">
                  Register for this event <ArrowRight size={17} aria-hidden="true" />
                </Button>
                <Countdown startDate={event.startDate} />
              </div>
            </div>
            <EventImage className="aspect-[16/10] rounded-card" src={event.image} alt={`${event.title} event`} />
          </div>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16" aria-label="Event information">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="eyebrow">About the event</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink dark:text-white">A good day, deliberately planned</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink dark:text-slate-200">{event.description}</p>

            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">At a glance</h2>
              <dl className="mt-4 divide-y divide-line border-y border-line dark:divide-night-700 dark:border-night-700">
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm font-medium text-muted dark:text-slate-400"><CalendarDays size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Date and time</dt>
                  <dd className="text-sm font-medium leading-6 text-ink dark:text-slate-100">{formatEventSchedule(event)}</dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm font-medium text-muted dark:text-slate-400"><MapPin size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Location</dt>
                  <dd className="text-sm font-medium leading-6 text-ink dark:text-slate-100">{event.venue}</dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm font-medium text-muted dark:text-slate-400"><Clock3 size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Format</dt>
                  <dd className="text-sm font-medium leading-6 text-ink dark:text-slate-100">{event.format}</dd>
                </div>
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr]">
                  <dt className="flex items-center gap-2 text-sm font-medium text-muted dark:text-slate-400"><UsersRound size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Organiser</dt>
                  <dd className="text-sm font-medium leading-6 text-ink dark:text-slate-100">{event.organizer} <span className="font-normal text-muted dark:text-slate-400">(sample)</span></dd>
                </div>
              </dl>
            </div>
          </div>

          <aside className="lg:pt-8">
            <div className="surface-card p-5 sm:p-6">
              <p className="eyebrow">The day</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink dark:text-white">A simple rhythm</h2>
              <ol className="mt-5 divide-y divide-line dark:divide-night-700">
                {event.agenda.map((item) => (
                  <li className="flex gap-4 py-3 first:pt-0 last:pb-0" key={`${item.time}-${item.title}`}>
                    <span className="w-12 shrink-0 pt-0.5 text-sm font-medium text-accent-600 dark:text-accent-300">{formatTime(`2026-01-01T${item.time}:00`)}</span>
                    <span className="text-sm font-medium leading-6 text-ink dark:text-slate-100">{item.title}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-line pt-5 dark:border-night-700">
                <p className="flex items-start gap-2 text-sm leading-6 text-muted dark:text-slate-400">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={17} aria-hidden="true" />
                  Registration closes {formatDate(event.registrationDeadline)}. This is sample event content.
                </p>
              </div>
              <Button as={Link} to={`/register/${event.id}`} className="mt-5 w-full">
                Save your spot <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
