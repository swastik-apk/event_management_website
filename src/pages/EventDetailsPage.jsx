import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock3, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import EventNotFound from '../components/events/EventNotFound'
import Button from '../components/ui/Button'
import Countdown from '../components/ui/Countdown'
import EventImage from '../components/ui/EventImage'
import { getEventById } from '../data/events'
import { formatDate, formatEventSchedule, formatTime } from '../utils/date'
import { getRegistrationsByEventId, removeRegistration } from '../utils/storage'

export default function EventDetailsPage() {
  const { eventId } = useParams()
  const event = getEventById(eventId)
  const [savedRegistrations, setSavedRegistrations] = useState(() =>
    eventId ? getRegistrationsByEventId(eventId) : [],
  )
  const [confirmCancelId, setConfirmCancelId] = useState(null)
  const [cancelFeedback, setCancelFeedback] = useState('')

  useEffect(() => {
    document.title = event ? `${event.title} — Event Hub` : 'Event not found — Event Hub'
    setSavedRegistrations(eventId ? getRegistrationsByEventId(eventId) : [])
    setConfirmCancelId(null)
    setCancelFeedback('')
  }, [event, eventId])

  if (!event) return <EventNotFound />

  const latestRegistration = savedRegistrations[savedRegistrations.length - 1] || null

  const handleCancelReservation = (registration) => {
    try {
      removeRegistration(registration)
      const remaining = getRegistrationsByEventId(event.id)
      setSavedRegistrations(remaining)
      setConfirmCancelId(null)
      setCancelFeedback(
        registration.registrationId
          ? `Reservation ${registration.registrationId} has been cancelled.`
          : 'Your reservation has been cancelled.',
      )
    } catch {
      setCancelFeedback('Could not update your local reservation. Please try again.')
    }
  }

  return (
    <div className="section-shell py-8 sm:py-12">
      <Link
        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink dark:text-zinc-400 dark:hover:text-white"
        to="/#events"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to all experiences
      </Link>

      {/* Airbnb Listing Header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-muted dark:text-zinc-400">
          <span>{event.category}</span>
          <span aria-hidden="true">·</span>
          <span>{event.format}</span>
        </div>
        <h1 className="mt-2 max-w-3xl font-display text-[clamp(1.875rem,3.5vw,2.75rem)] font-bold leading-tight tracking-tight text-balance text-ink dark:text-white">
          {event.title}
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5 font-medium text-ink dark:text-zinc-200">
            <MapPin size={15} className="text-accent-500" aria-hidden="true" />
            {event.venue}
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">{formatDate(event.startDate)}</span>
        </p>
      </header>

      {/* Wide Hero Photography */}
      <div className="mt-6 overflow-hidden rounded-card ring-1 ring-black/5 dark:ring-white/10">
        <EventImage
          className="aspect-[16/9] max-h-[460px] w-full"
          src={event.image}
          alt={`${event.title} at ${event.venue}`}
        />
      </div>

      {/* 2-Column Airbnb Detail Split */}
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
        <div>
          {/* Host Row */}
          <div className="flex items-center justify-between gap-4 border-b border-line pb-6 dark:border-night-800">
            <div>
              <h2 className="font-display text-xl font-semibold text-ink dark:text-white">
                Hosted by {event.organizer}
              </h2>
              <p className="mt-1 text-sm text-muted dark:text-zinc-400">
                {event.format} gathering · Sample programme listing
              </p>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white dark:bg-zinc-100 dark:text-night-950"
              aria-hidden="true"
            >
              EH
            </div>
          </div>

          {/* Overview */}
          <div className="border-b border-line py-7 dark:border-night-800">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-white">
              About this experience
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-ink/90 dark:text-zinc-200">
              {event.description}
            </p>
          </div>

          {/* Key Details */}
          <div className="border-b border-line py-7 dark:border-night-800">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-white">
              What to know
            </h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <CalendarDays size={19} className="mt-0.5 shrink-0 text-ink dark:text-zinc-200" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-ink dark:text-white">Date and time</dt>
                  <dd className="mt-0.5 text-sm tabular-nums text-muted dark:text-zinc-400">
                    {formatEventSchedule(event)}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-ink dark:text-zinc-200" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-ink dark:text-white">Location</dt>
                  <dd className="mt-0.5 text-sm text-muted dark:text-zinc-400">{event.venue}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 size={19} className="mt-0.5 shrink-0 text-ink dark:text-zinc-200" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-ink dark:text-white">Format</dt>
                  <dd className="mt-0.5 text-sm text-muted dark:text-zinc-400">{event.format}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-ink dark:text-zinc-200" aria-hidden="true" />
                <div>
                  <dt className="text-sm font-semibold text-ink dark:text-white">RSVP deadline</dt>
                  <dd className="mt-0.5 text-sm tabular-nums text-muted dark:text-zinc-400">
                    {formatDate(event.registrationDeadline)}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Schedule / Agenda */}
          <div className="pt-7">
            <h2 className="font-display text-lg font-semibold text-ink dark:text-white">
              Schedule for the day
            </h2>
            <ol className="mt-4 divide-y divide-line border-t border-line dark:divide-night-800 dark:border-night-800">
              {event.agenda.map((item) => (
                <li
                  className="flex items-baseline gap-6 py-3.5"
                  key={`${item.time}-${item.title}`}
                >
                  <span className="w-20 shrink-0 font-mono text-sm font-medium tabular-nums text-accent-500">
                    {formatTime(`2026-01-01T${item.time}:00`)}
                  </span>
                  <span className="text-sm font-medium text-ink dark:text-zinc-100">
                    {item.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sticky Airbnb Reservation Card */}
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-card border border-line-strong bg-surface p-6 shadow-overlay dark:border-night-700 dark:bg-night-900">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-display text-xl font-bold text-ink dark:text-white">
                Free RSVP
              </p>
              <span className="text-xs font-medium text-muted dark:text-zinc-400">
                {event.format}
              </span>
            </div>

            <div className="mt-4 rounded-control border border-line dark:border-night-700">
              <div className="border-b border-line px-4 py-3 dark:border-night-700">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-zinc-400">
                  Date &amp; time
                </p>
                <p className="mt-0.5 text-sm font-medium tabular-nums text-ink dark:text-zinc-100">
                  {formatEventSchedule(event)}
                </p>
              </div>
              <div className="px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-zinc-400">
                  Venue
                </p>
                <p className="mt-0.5 text-sm font-medium text-ink dark:text-zinc-100">
                  {event.venue}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Countdown startDate={event.startDate} />
            </div>

            {cancelFeedback ? (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 rounded-control border border-line bg-subtle px-3.5 py-2.5 text-xs font-medium text-ink dark:border-night-700 dark:bg-night-800 dark:text-zinc-100"
              >
                {cancelFeedback}
              </p>
            ) : null}

            {latestRegistration ? (
              <div className="mt-5 space-y-3 rounded-control border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="font-semibold text-ink dark:text-white">
                      You have a saved RSVP
                      {savedRegistrations.length > 1 ? ` (${savedRegistrations.length})` : ''}
                    </p>
                    <p className="mt-0.5 truncate text-muted dark:text-zinc-300">
                      {latestRegistration.participantName} ·{' '}
                      <span className="font-mono tabular-nums">
                        {latestRegistration.registrationId}
                      </span>
                    </p>
                  </div>
                </div>

                {confirmCancelId === latestRegistration.registrationId ? (
                  <div className="border-t border-emerald-200 pt-3 dark:border-emerald-900/60">
                    <p className="text-xs font-medium text-ink dark:text-zinc-100">
                      Cancel this reservation?
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleCancelReservation(latestRegistration)}
                        className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full bg-red-600 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmCancelId(null)}
                        className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink transition-colors hover:bg-subtle dark:border-night-700 dark:bg-night-800 dark:text-zinc-100"
                      >
                        Keep RSVP
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-200 pt-3 text-xs dark:border-emerald-900/60">
                    <button
                      type="button"
                      onClick={() => {
                        setCancelFeedback('')
                        setConfirmCancelId(latestRegistration.registrationId)
                      }}
                      className="font-semibold text-red-600 underline-offset-4 hover:underline dark:text-red-400"
                    >
                      Cancel RSVP
                    </button>
                    <Link
                      to="/registrations"
                      className="font-semibold text-ink underline-offset-4 hover:underline dark:text-zinc-100"
                    >
                      Manage in My registrations
                    </Link>
                  </div>
                )}
              </div>
            ) : null}

            <Button as={Link} to={`/register/${event.id}`} size="lg" className="mt-5 w-full">
              {latestRegistration ? 'Register another attendee' : 'Reserve your spot'}{' '}
              <ArrowRight size={17} aria-hidden="true" />
            </Button>

            <p className="mt-4 text-center text-xs leading-5 text-muted dark:text-zinc-400">
              Saves a local reference in your browser. Registration closes{' '}
              <span className="tabular-nums font-medium text-ink dark:text-zinc-200">
                {formatDate(event.registrationDeadline)}
              </span>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
