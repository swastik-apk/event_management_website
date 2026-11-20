import EventCard from './EventCard'

export default function EventGrid({ events }) {
  return (
    <div id="events-grid" className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
