import { ArrowRight, CalendarDays, ClipboardList, Hash, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import { getEventById } from '../data/events'
import { formatRegistrationDate, formatEventSchedule } from '../utils/date'
import { getRegistrations } from '../utils/storage'

export default function MyRegistrationsPage() {
  const [registrations] = useState(() => getRegistrations())

  useEffect(() => {
    document.title = 'My registrations — Event Hub'
  }, [])

  const orderedRegistrations = [...registrations].reverse()

  return (
    <section className="section-shell py-10 sm:py-16" aria-labelledby="registrations-heading">
      <div className="max-w-2xl">
        <p className="eyebrow">Saved on this device</p>
        <h1 id="registrations-heading" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
          My registrations
        </h1>
        <p className="mt-3 text-base leading-7 text-muted dark:text-slate-400">
          A private view of the local demo registrations stored by this browser. They are not synced to an account or available on another device.
        </p>
      </div>

      <div className="mt-8">
        {orderedRegistrations.length === 0 ? (
          <EmptyState
            icon={ClipboardList}
            title="Nothing saved yet"
            description="When you register for an event, its reference and event details will appear here."
            action={<Button as={Link} to="/#events">Explore events <ArrowRight size={17} aria-hidden="true" /></Button>}
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {orderedRegistrations.map((registration, index) => {
              const event = getEventById(registration.eventId)
              const key = registration.registrationId || `${registration.eventId}-${registration.registeredAt}-${index}`

              return (
                <article className="surface-card p-5 sm:p-6" key={key}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-control bg-accent-50 text-accent-600 dark:bg-accent-800 dark:text-accent-200">
                      <CalendarDays size={20} aria-hidden="true" />
                    </span>
                    <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">Saved locally</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-7 text-ink dark:text-white">
                    {event?.title || 'Event no longer listed'}
                  </h2>
                  {event ? (
                    <div className="mt-4 space-y-2 text-sm text-muted dark:text-slate-400">
                      <p className="flex items-start gap-2"><CalendarDays className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" /> {formatEventSchedule(event)}</p>
                      <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" /> {event.venue}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-muted dark:text-slate-400">The event details are no longer present in the current sample programme.</p>
                  )}
                  <div className="mt-6 border-t border-line pt-5 text-sm dark:border-night-700">
                    <p className="flex items-center gap-2 text-muted dark:text-slate-400"><Hash size={15} aria-hidden="true" /> <span className="font-mono font-semibold text-ink dark:text-slate-200">{registration.registrationId || 'Reference unavailable'}</span></p>
                    <p className="mt-2 text-xs text-muted dark:text-slate-500">Saved {formatRegistrationDate(registration.registeredAt)}</p>
                  </div>
                  {event ? (
                    <Link className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent-600 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200" to={`/events/${event.id}`}>
                      View event details <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                  ) : null}
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
