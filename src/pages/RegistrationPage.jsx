import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RegistrationForm from '../components/forms/RegistrationForm'
import EventNotFound from '../components/events/EventNotFound'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import EventImage from '../components/ui/EventImage'
import { events, getEventById } from '../data/events'
import { formatEventSchedule, formatRegistrationDate } from '../utils/date'

function RegistrationConfirmation({ registration }) {
  const event = getEventById(registration.eventId)

  return (
    <section className="section-shell py-12 sm:py-16" aria-labelledby="confirmation-heading">
      <div className="mx-auto max-w-2xl">
        <div className="surface-card overflow-hidden">
          <div className="border-b border-accent-600 bg-accent-500 px-6 py-7 text-white sm:px-8 sm:py-8">
            <span className="flex h-10 w-10 items-center justify-center rounded-control bg-white/15">
              <CheckCircle2 size={23} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <p className="mt-5 text-sm font-medium text-accent-100">Registration saved locally</p>
            <h1 id="confirmation-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              You&apos;re on the list, {registration.participantName}.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-accent-100">
              Your browser saved a local demo registration for this event. No email or SMS confirmation has been sent.
            </p>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            <dl className="grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted dark:text-slate-400">Event</dt>
                <dd className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">{event?.title || 'Event no longer listed'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted dark:text-slate-400">Reference ID</dt>
                <dd className="mt-1 font-mono text-lg font-semibold text-ink dark:text-white">{registration.registrationId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted dark:text-slate-400">Saved on</dt>
                <dd className="mt-1 text-sm font-medium text-ink dark:text-slate-100">{formatRegistrationDate(registration.registeredAt)}</dd>
              </div>
            </dl>
            <div className="border-t border-line pt-6 dark:border-night-700">
              <p className="text-sm leading-6 text-muted dark:text-slate-400">
                Keep this reference for your own records. This browser-only demo does not issue a ticket or guarantee a place at a real event.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button as={Link} to="/#events" variant="secondary">
                Browse more events <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button as={Link} to="/registrations" variant="ghost">
                View my registrations
              </Button>
            </div>
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

  useEffect(() => {
    document.title = event ? `Register for ${event.title} — Event Hub` : 'Registration unavailable — Event Hub'
  }, [event])

  if (!event) return <EventNotFound context="register for" />
  if (registration) return <RegistrationConfirmation registration={registration} />

  return (
    <section className="section-shell py-8 sm:py-12" aria-labelledby="register-heading">
      <Link className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-muted hover:text-accent-700 dark:text-slate-400 dark:hover:text-accent-300" to={`/events/${event.id}`}>
        <ArrowLeft size={16} aria-hidden="true" /> Back to event details
      </Link>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-start lg:gap-16">
        <div>
          <p className="eyebrow">Local demo registration</p>
          <h1 id="register-heading" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">
            Register for an event.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-muted dark:text-slate-400">
            Share a few details and we&apos;ll keep a simple registration reference in this browser.
          </p>
          <div className="mt-6 surface-card p-5 sm:p-6">
            <RegistrationForm events={events} selectedEventId={event.id} onSuccess={setRegistration} />
          </div>
        </div>

          <aside className="lg:sticky lg:top-24">
          <div className="surface-card overflow-hidden">
            <EventImage className="aspect-[16/9]" src={event.image} alt={`${event.title} event`} />
            <div className="p-5 sm:p-6">
              <Badge>{event.category}</Badge>
              <h2 className="mt-3 font-display text-xl font-semibold text-ink dark:text-white">{event.title}</h2>
              <dl className="mt-4 space-y-4 border-t border-line pt-4 text-sm dark:border-night-700">
                <div>
                  <dt className="flex items-center gap-2 font-medium text-muted dark:text-slate-400"><ClipboardCheck size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> When</dt>
                  <dd className="mt-1.5 font-medium leading-6 text-ink dark:text-slate-100">{formatEventSchedule(event)}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-medium text-muted dark:text-slate-400"><MapPin size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Where</dt>
                  <dd className="mt-1.5 font-medium leading-6 text-ink dark:text-slate-100">{event.venue}</dd>
                </div>
              </dl>
              <p className="mt-6 flex items-start gap-2 text-xs leading-5 text-muted dark:text-slate-400">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={15} aria-hidden="true" />
                You can change the selected event in the form before saving.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
