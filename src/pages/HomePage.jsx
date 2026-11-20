import { ArrowRight, CalendarCheck2, Compass, MapPin, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, events, formats } from '../data/events'
import EventFilters from '../components/events/EventFilters'
import EventGrid from '../components/events/EventGrid'
import Button from '../components/ui/Button'
import Countdown from '../components/ui/Countdown'
import EmptyState from '../components/ui/EmptyState'
import EventImage from '../components/ui/EventImage'
import { formatDate, formatTime } from '../utils/date'

const steps = [
  {
    icon: Compass,
    title: 'Discover by interest',
    description: 'Search by topic, city, or format, or scan curated categories from design to music.',
  },
  {
    icon: CalendarCheck2,
    title: 'Review the day plan',
    description: 'Check the full schedule, venue, and live countdown before committing your time.',
  },
  {
    icon: UsersRound,
    title: 'Save your spot locally',
    description: 'Complete registration in seconds and keep your reference stored on this device.',
  },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All categories')
  const [format, setFormat] = useState('All formats')

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
    const matchesFormat = format === 'All formats' || event.format === format
    return matchesQuery && matchesCategory && matchesFormat
  })

  const resetFilters = () => {
    setQuery('')
    setCategory('All categories')
    setFormat('All formats')
  }

  const heroEvent = events[0]

  return (
    <>
      {/* Editorial Hero */}
      <section className="border-b border-line bg-canvas dark:border-night-800 dark:bg-night-950" aria-labelledby="hero-heading">
        <div className="section-shell grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:py-16">
          <div>
            <p className="eyebrow">Curated workshops, forums & live gatherings</p>
            <h1
              id="hero-heading"
              className="mt-3 max-w-xl font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-tight text-balance text-ink dark:text-white"
            >
              Find an experience worth making time for.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted dark:text-zinc-400">
              Explore thoughtfully hosted summits, hands-on design studios, and evening sessions across six Indian cities and online.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button as={Link} to="/#events" size="lg" pill>
                Explore experiences <ArrowRight size={17} aria-hidden="true" />
              </Button>
              <Link
                to="/#about"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline-offset-4 hover:underline dark:text-zinc-100"
              >
                How it works
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm tabular-nums text-muted dark:text-zinc-400">
              <span>{events.length} upcoming listings</span>
              <span aria-hidden="true">·</span>
              <span>In person, hybrid & online</span>
              <span aria-hidden="true">·</span>
              <span>Instant local RSVP</span>
            </div>
          </div>

          {/* Spotlight Listing Card */}
          <div className="w-full">
            <Link
              to={`/events/${heroEvent.id}`}
              className="group block overflow-hidden rounded-card border border-line bg-surface shadow-card transition-transform duration-200 hover:-translate-y-0.5 dark:border-night-700 dark:bg-night-900"
            >
              <div className="relative">
                <EventImage
                  className="aspect-[4/3]"
                  src={heroEvent.image}
                  alt={`${heroEvent.title} at ${heroEvent.venue}`}
                  zoomOnHover
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                    <span>Featured spotlight</span>
                    <span aria-hidden="true">·</span>
                    <span>{heroEvent.format}</span>
                  </div>
                  <h2 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-white">
                    {heroEvent.title}
                  </h2>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/90">
                    <MapPin size={14} aria-hidden="true" />
                    <span className="truncate">{heroEvent.venue}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="text-sm tabular-nums text-muted dark:text-zinc-400">
                  <span className="font-medium text-ink dark:text-zinc-100">
                    {formatDate(heroEvent.startDate)}
                  </span>{' '}
                  · {formatTime(heroEvent.startDate)}
                </div>
                <Countdown startDate={heroEvent.startDate} compact />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore & Category Filter Section */}
      <section
        id="events"
        className="scroll-mt-24 bg-canvas py-12 dark:bg-night-950 sm:py-16"
        aria-labelledby="events-heading"
      >
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2
              id="events-heading"
              className="font-display text-2xl font-bold tracking-tight text-ink dark:text-white sm:text-3xl"
            >
              Upcoming experiences
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted dark:text-zinc-400 sm:text-base">
              Filter by category, search by city or topic, and reserve your spot directly.
            </p>
          </div>

          <div className="mt-7">
            <EventFilters
              query={query}
              category={category}
              format={format}
              categories={categories}
              formats={formats}
              resultCount={filteredEvents.length}
              onQueryChange={setQuery}
              onCategoryChange={setCategory}
              onFormatChange={setFormat}
              onReset={resetFilters}
            />
          </div>

          <div className="mt-8">
            {filteredEvents.length ? (
              <EventGrid events={filteredEvents} />
            ) : (
              <EmptyState
                title="No matching experiences"
                description="Try clearing your search keyword or switching back to all categories and formats."
                action={
                  <Button variant="secondary" pill onClick={resetFilters}>
                    Show all experiences
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="about"
        className="scroll-mt-24 border-t border-line bg-canvas py-12 dark:border-night-800 dark:bg-night-950 sm:py-16"
        aria-labelledby="about-heading"
      >
        <div className="section-shell">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
            <div>
              <p className="eyebrow">How Event Hub works</p>
              <h2
                id="about-heading"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-balance text-ink dark:text-white sm:text-3xl"
              >
                From discovery to saved seat in under a minute.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted dark:text-zinc-400 sm:text-base sm:leading-7">
                Every listing puts the schedule, location, and format upfront so you can decide quickly without clutter.
              </p>
            </div>

            <div className="grid gap-8 border-t border-line pt-8 dark:border-night-800 sm:grid-cols-3 sm:border-t-0 sm:pt-0">
              {steps.map(({ icon: Icon, title, description }, index) => (
                <div
                  key={title}
                  className="border-b border-line pb-6 last:border-b-0 last:pb-0 dark:border-night-800 sm:border-b-0 sm:border-l sm:pb-0 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-50 text-accent-500 dark:bg-accent-800/30 dark:text-accent-300">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-medium tabular-nums text-muted dark:text-zinc-500">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink dark:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
