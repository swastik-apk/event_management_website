const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-IN', {
  hour: 'numeric',
  minute: '2-digit',
})

const dateOnlyFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})

function getValidDate(value) {
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value) {
  const date = getValidDate(value)
  return date ? dateFormatter.format(date) : 'Date to be announced'
}

export function formatDateOnly(value) {
  const date = getValidDate(value)
  return date ? dateOnlyFormatter.format(date) : 'Date to be announced'
}

export function formatTime(value) {
  const date = getValidDate(value)
  return date ? timeFormatter.format(date) : 'Time to be announced'
}

export function formatEventSchedule(event) {
  const start = getValidDate(event.startDate)
  const end = getValidDate(event.endDate)

  if (!start) return 'Date to be announced'
  if (!end) return `${formatDate(start)} · ${formatTime(start)}`

  const sameDay = start.toDateString() === end.toDateString()
  return sameDay
    ? `${formatDate(start)} · ${formatTime(start)} – ${formatTime(end)}`
    : `${formatDate(start)} · ${formatTime(start)} – ${formatDate(end)} · ${formatTime(end)}`
}

export function formatRegistrationDate(value) {
  const date = getValidDate(value)
  return date ? `${formatDateOnly(date)} at ${formatTime(date)}` : 'Date unavailable'
}

export function getTimeRemaining(value) {
  const target = getValidDate(value)
  if (!target) return null

  const difference = Math.max(0, target.getTime() - Date.now())
  const totalSeconds = Math.floor(difference / 1000)
  return {
    totalSeconds,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}
