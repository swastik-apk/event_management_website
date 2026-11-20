import { ArrowRight, CalendarCheck2, CalendarDays, Compass, MapPin, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data/events'
import EventFilters from '../components/events/EventFilters'
import EventGrid from '../components/events/EventGrid'
import FeaturedEvents from '../components/events/FeaturedEvents'
import Button from '../components/ui/Button'
import Countdown from '../components/ui/Countdown'
import EmptyState from '../components/ui/EmptyState'
import EventImage from '../components/ui/EventImage'
import { formatDate, formatTime } from '../utils/date'

const steps = [
  {
    icon: Compass,
    title: 'Find your spark',
    description: 'Browse a considered mix of events and narrow the list by what interests you.',
  },
  {
    icon: CalendarCheck2,
    title: 'Choose your moment',
    description: 'Open the details, understand the format, and pick an event that fits your day.',
  },
  {
    icon: UsersRound,
    title: 'Save your spot',
    description: 'Register in a few fields and keep a simple reference in this browser for later.',
  },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const featuredEvents = events.filter((event) => event.featured).slice(0, 3)
  const normalizedQuery = query.trim().toLowerCase()
  const filteredEvents = events.filter((event) => {
    const searchableText = [
      event.title,
      event.category,
      event.venue,
      event.shortDescription,
      event.description,
      event.format,
    ]
      .join(' ')
      .toLowerCase()

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery)
    const matchesCategory = category === 'All categories' || event.category === category
    return matchesQuery && matchesCategory
  })

  const resetFilters = () => {
    setQuery('')
    setCategory('All categories')
  }

  const heroEvent = events[0]

  return (
    <>
      <section className="overflow-hidden border-b border-line bg-surface dark:border-night-800 dark:bg-night-900" aria-labelledby="hero-heading">
        <div className="section-shell grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-20">
          <div>
            <p className="eyebrow">Event Hub</p>
            <h1 id="hero-heading" className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-ink dark:text-white sm:text-5xl">
              Find an event worth making time for.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted dark:text-slate-400">
              Browse workshops, talks, and gatherings, then choose what fits your interests and your calendar.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button as={Link} to="/#events" size="lg">
                Explore events <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Button as={Link} to="/#about" variant="secondary" size="lg">
                How it works
              </Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted dark:text-slate-400">
              <span className="inline-flex items-center gap-2"><CalendarDays size={16} className="text-accent-600 dark:text-accent-300" aria-hidden="true" /> Six upcoming events</span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-accent-500" /> Local demo registration</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-lg lg:mr-0">
            <div className="surface-card overflow-hidden">
              <EventImage className="aspect-[16/10]" src={heroEvent.image} alt={`${heroEvent.title} preview`} />
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="eyebrow">Featured event</p>
                  <span className="text-sm text-muted dark:text-slate-400">{heroEvent.format}</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-ink dark:text-white">{heroEvent.title}</h2>
                <div className="mt-4 space-y-2 text-sm text-muted dark:text-slate-300">
                  <p className="flex items-start gap-2"><CalendarDays className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" /> {formatDate(heroEvent.startDate)} · {formatTime(heroEvent.startDate)}</p>
                  <p className="flex items-start gap-2"><MapPin className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" /> {heroEvent.venue}</p>
                </div>
                <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 dark:border-night-700 sm:flex-row sm:items-center sm:justify-between">
                  <Countdown startDate={heroEvent.startDate} />
                  <Link className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 dark:text-accent-300 dark:hover:text-accent-200" to={`/events/${heroEvent.id}`}>
                    View event <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedEvents events={featuredEvents} />

      <section id="events" className="scroll-mt-24 border-y border-line bg-canvas py-12 dark:border-night-800 dark:bg-night-950 sm:py-16" aria-labelledby="events-heading">
        <div className="section-shell">
          <div className="max-w-2xl">
            <p className="eyebrow">Browse the programme</p>
            <h2 id="events-heading" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white">
              Upcoming events
            </h2>
            <p className="mt-2 text-base leading-7 text-muted dark:text-slate-400">
              Search by topic, place, or format. Every event below is sample content for this local prototype.
            </p>
          </div>

          <div className="mt-8">
            <EventFilters
              query={query}
              category={category}
              categories={[...new Set(events.map((event) => event.category))]}
              resultCount={filteredEvents.length}
              onQueryChange={setQuery}
              onCategoryChange={setCategory}
              onReset={resetFilters}
            />
          </div>

          <div className="mt-8">
            {filteredEvents.length ? (
              <EventGrid events={filteredEvents} />
            ) : (
              <EmptyState
                title="No events match that search"
                description="Try a different keyword or reset the category filter to see the full programme."
                action={<Button variant="secondary" onClick={resetFilters}>Reset filters</Button>}
              />
            )}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 section-shell py-12 sm:py-16" aria-labelledby="about-heading">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 id="about-heading" className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-white">
              A clear path from browse to RSVP.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted dark:text-slate-400">
              Event Hub keeps the useful parts of event discovery together, with enough detail to help you choose confidently.
            </p>
          </div>
          <div className="divide-y divide-line border-y border-line dark:divide-night-700 dark:border-night-700 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {steps.map(({ icon: Icon, title, description }, index) => (
              <div className="py-5 first:pt-0 last:pb-0 sm:px-5 sm:py-2 sm:first:pl-0 sm:last:pr-0" key={title}>
                <span className="flex h-8 w-8 items-center justify-center rounded-control bg-accent-50 text-accent-600 dark:bg-accent-800 dark:text-accent-200">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-medium text-muted dark:text-slate-500">0{index + 1}</p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted dark:text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
