import EventCard from './EventCard'

export default function EventGrid({ events }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  )
}
