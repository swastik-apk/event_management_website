import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RegistrationForm from '../components/forms/RegistrationForm'
import EventNotFound from '../components/events/EventNotFound'
import Button from '../components/ui/Button'
import EventImage from '../components/ui/EventImage'
import { events, getEventById } from '../data/events'
import { formatEventSchedule, formatRegistrationDate } from '../utils/date'
import { removeRegistration } from '../utils/storage'

function RegistrationConfirmation({ registration, onCancelled }) {
  const event = getEventById(registration.eventId)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const handleCancel = () => {
    setCancelError('')
    try {
      removeRegistration(registration)
      onCancelled()
    } catch (error) {
      setCancelError(error.message || 'Could not cancel this reservation.')
    }
  }

  return (
    <section className="section-shell py-12 sm:py-16" aria-labelledby="confirmation-heading">
      <div className="mx-auto max-w-2xl">
        <div className="surface-card overflow-hidden">
          <div className="border-b border-line bg-accent-500 px-6 py-8 text-white sm:px-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
              <CheckCircle2 size={24} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-semibold tracking-wide text-white/90">
              Registration confirmed locally
            </p>
            <h1 id="confirmation-heading" className="mt-1.5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              You&apos;re on the list, {registration.participantName}.
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/90">
              This browser saved your local demonstration reservation. No email or SMS confirmation was sent.
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <dl className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-muted dark:text-zinc-400">Experience</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">
                  {event?.title || 'Event no longer listed'}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted dark:text-zinc-400">Reference ID</dt>
                <dd className="mt-1 font-mono text-lg font-semibold tabular-nums text-ink dark:text-white">
                  {registration.registrationId}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-muted dark:text-zinc-400">Saved on</dt>
                <dd className="mt-1 text-sm font-medium tabular-nums text-ink dark:text-zinc-100">
                  {formatRegistrationDate(registration.registeredAt)}
                </dd>
              </div>
              {event ? (
                <div>
                  <dt className="text-xs font-medium text-muted dark:text-zinc-400">Venue</dt>
                  <dd className="mt-1 text-sm font-medium text-ink dark:text-zinc-100">
                    {event.venue}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="border-t border-line pt-5 dark:border-night-800">
              <p className="text-xs leading-5 text-muted dark:text-zinc-400">
                Keep this reference for your records. Because this is a browser-only prototype, reservations are not synced across devices.
              </p>
            </div>

            {cancelError ? (
              <p className="text-xs font-medium text-red-600 dark:text-red-400" role="alert">
                {cancelError}
              </p>
            ) : null}

            {confirmCancel ? (
              <div className="rounded-control border border-red-200 bg-red-50/80 p-4 dark:border-red-900/70 dark:bg-red-950/30">
                <p className="text-sm font-medium text-ink dark:text-zinc-100">
                  Cancel reservation {registration.registrationId}?
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full bg-red-600 px-4 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmCancel(false)}
                    className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full border border-line-strong bg-surface px-4 text-xs font-medium text-ink transition-colors hover:bg-subtle dark:border-night-700 dark:bg-night-800 dark:text-zinc-100"
                  >
                    Keep RSVP
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button as={Link} to="/registrations" pill>
                    View my registrations <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                  <Button as={Link} to="/#events" variant="secondary" pill>
                    Browse more events
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmCancel(true)}
                  className="self-start text-sm font-semibold text-red-600 underline-offset-4 hover:underline dark:text-red-400 sm:self-auto"
                >
                  Cancel RSVP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function RegistrationPage() {
  const { eventId } = useParams()
  const event = getEventById(eventId)
  const [registration, setRegistration] = useState(null)
  const [wasCancelled, setWasCancelled] = useState(false)

  useEffect(() => {
    document.title = event ? `Register for ${event.title} — Event Hub` : 'Registration unavailable — Event Hub'
  }, [event])

  if (!event) return <EventNotFound context="register for" />
  if (registration) {
    return (
      <RegistrationConfirmation
        registration={registration}
        onCancelled={() => {
          setRegistration(null)
          setWasCancelled(true)
        }}
      />
    )
  }

  return (
    <section className="section-shell py-8 sm:py-12" aria-labelledby="register-heading">
      <Link
        className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink dark:text-zinc-400 dark:hover:text-white"
        to={`/events/${event.id}`}
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back to event details
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.75fr] lg:items-start lg:gap-16">
        <div>
          <p className="eyebrow">Request your spot</p>
          <h1
            id="register-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl"
          >
            Confirm your details
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted dark:text-zinc-400 sm:text-base">
            Enter your contact information to save a local reservation reference in this browser.
          </p>

          {wasCancelled ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-5 rounded-control border border-line-strong bg-subtle px-4 py-3 text-sm text-ink dark:border-night-700 dark:bg-night-900 dark:text-zinc-100"
            >
              Your previous reservation was cancelled. You can submit the form below if you&apos;d like to register again.
            </div>
          ) : null}

          <div className="mt-7 surface-card p-6 sm:p-8">
            <RegistrationForm
              events={events}
              selectedEventId={event.id}
              onSuccess={(saved) => {
                setWasCancelled(false)
                setRegistration(saved)
              }}
            />
          </div>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="surface-card overflow-hidden p-5 sm:p-6">
            <div className="overflow-hidden rounded-control ring-1 ring-black/5 dark:ring-white/10">
              <EventImage className="aspect-[4/3]" src={event.image} alt={`${event.title} event`} />
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted dark:text-zinc-400">
                <span>{event.category}</span>
                <span aria-hidden="true">·</span>
                <span>{event.format}</span>
              </div>
              <h2 className="mt-1.5 font-display text-xl font-semibold text-ink dark:text-white">
                {event.title}
              </h2>

              <dl className="mt-5 space-y-4 border-t border-line pt-5 text-sm dark:border-night-800">
                <div className="flex items-start gap-3">
                  <CalendarDays size={17} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-muted dark:text-zinc-400">When</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-ink dark:text-zinc-100">
                      {formatEventSchedule(event)}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
                  <div>
                    <dt className="text-xs font-medium text-muted dark:text-zinc-400">Where</dt>
                    <dd className="mt-0.5 font-medium text-ink dark:text-zinc-100">{event.venue}</dd>
                  </div>
                </div>
              </dl>

              <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted dark:border-night-800 dark:text-zinc-400">
                You can change the selected experience in the form before submitting.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
