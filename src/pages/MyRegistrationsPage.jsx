import { ArrowRight, CalendarDays, CheckCircle2, ClipboardList, MapPin, UserRound, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import EventImage from '../components/ui/EventImage'
import { getEventById } from '../data/events'
import { formatEventSchedule, formatRegistrationDate } from '../utils/date'
import { getRegistrations, removeRegistration } from '../utils/storage'

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState(() => getRegistrations())
  const [pendingCancelKey, setPendingCancelKey] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    document.title = 'My registrations — Event Hub'
  }, [])

  const orderedRegistrations = [...registrations].reverse()

  const handleConfirmCancel = (registration, eventTitle) => {
    setErrorMessage('')
    try {
      const updated = removeRegistration(registration)
      setRegistrations(updated)
      setPendingCancelKey(null)
      const label = eventTitle || 'the selected experience'
      const refText = registration.registrationId ? ` (${registration.registrationId})` : ''
      setFeedbackMessage(`Cancelled reservation${refText} for ${label}.`)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to cancel this reservation right now.')
    }
  }

  return (
    <section className="section-shell py-10 sm:py-16" aria-labelledby="registrations-heading">
      <div className="max-w-2xl">
        <p className="eyebrow">Saved on this device</p>
        <h1
          id="registrations-heading"
          className="mt-2 font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl"
        >
          My registrations
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted dark:text-zinc-400 sm:text-base">
          View or cancel local reservations saved in this browser. Changes take effect immediately on this device.
        </p>
      </div>

      {feedbackMessage ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex items-center justify-between gap-4 rounded-control border border-line-strong bg-subtle px-4 py-3 text-sm text-ink dark:border-night-700 dark:bg-night-900 dark:text-zinc-100"
        >
          <span className="inline-flex items-center gap-2.5">
            <CheckCircle2 size={17} className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>{feedbackMessage}</span>
          </span>
          <button
            type="button"
            onClick={() => setFeedbackMessage('')}
            aria-label="Dismiss message"
            className="inline-flex min-h-8 min-w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink dark:text-zinc-400 dark:hover:bg-night-800 dark:hover:text-white"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {errorMessage ? (
        <div
          role="alert"
          className="mt-6 rounded-control border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="mt-8">
        {orderedRegistrations.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="No saved registrations yet"
            description="When you reserve a spot for an experience, its reference ID and schedule will appear here."
            action={
              <Button as={Link} to="/#events" pill>
                Explore experiences <ArrowRight size={16} aria-hidden="true" />
              </Button>
            }
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {orderedRegistrations.map((registration, index) => {
              const event = getEventById(registration.eventId)
              const key =
                registration.registrationId ||
                `${registration.eventId}-${registration.registeredAt}-${index}`
              const isConfirming = pendingCancelKey === key

              return (
                <article
                  className="surface-card flex flex-col overflow-hidden sm:flex-row"
                  key={key}
                >
                  {event ? (
                    <div className="sm:w-44 sm:shrink-0">
                      <EventImage
                        className="aspect-[4/3] h-full w-full sm:aspect-auto"
                        src={event.image}
                        alt={`${event.title} preview`}
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted dark:text-zinc-400">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Confirmed locally
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-ink dark:text-zinc-200">
                        {registration.registrationId || 'Reference unavailable'}
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-lg font-semibold leading-snug text-ink dark:text-white">
                      {event?.title || 'Event no longer listed'}
                    </h2>

                    {registration.participantName || registration.email ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted dark:text-zinc-400">
                        <UserRound size={13} className="shrink-0" aria-hidden="true" />
                        <span className="truncate">
                          {[registration.participantName, registration.email].filter(Boolean).join(' · ')}
                        </span>
                      </p>
                    ) : null}

                    {event ? (
                      <div className="mt-3 space-y-1.5 text-sm text-muted dark:text-zinc-400">
                        <p className="flex items-start gap-2 tabular-nums">
                          <CalendarDays
                            className="mt-0.5 shrink-0 text-accent-500"
                            size={15}
                            aria-hidden="true"
                          />
                          <span>{formatEventSchedule(event)}</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <MapPin
                            className="mt-0.5 shrink-0 text-accent-500"
                            size={15}
                            aria-hidden="true"
                          />
                          <span>{event.venue}</span>
                        </p>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm leading-6 text-muted dark:text-zinc-400">
                        This event is no longer part of the current sample programme.
                      </p>
                    )}

                    {isConfirming ? (
                      <div className="mt-5 rounded-control border border-red-200 bg-red-50/80 p-3.5 dark:border-red-900/70 dark:bg-red-950/30">
                        <p className="text-xs font-medium text-ink dark:text-zinc-100">
                          Cancel this reservation? This removes your reservation.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleConfirmCancel(registration, event?.title)}
                            className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full bg-red-600 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => setPendingCancelKey(null)}
                            className="inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink transition-colors hover:bg-subtle dark:border-night-700 dark:bg-night-800 dark:text-zinc-100 dark:hover:bg-night-700"
                          >
                            Keep RSVP
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-xs text-muted dark:border-night-800 dark:text-zinc-400">
                        <span className="tabular-nums">
                          Saved {formatRegistrationDate(registration.registeredAt)}
                        </span>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setFeedbackMessage('')
                              setErrorMessage('')
                              setPendingCancelKey(key)
                            }}
                            className="whitespace-nowrap text-xs font-semibold text-red-600 underline-offset-4 transition-colors hover:underline dark:text-red-400"
                          >
                            Cancel RSVP
                          </button>
                          {event ? (
                            <Link
                              className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-ink underline-offset-4 hover:underline dark:text-zinc-100"
                              to={`/events/${event.id}`}
                            >
                              View details <ArrowRight size={13} aria-hidden="true" />
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
