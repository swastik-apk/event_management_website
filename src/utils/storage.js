export const REGISTRATIONS_KEY = 'eventHub.registrations.v1'
export const THEME_KEY = 'eventHub.theme.v1'

export class StorageError extends Error {
  constructor(message = 'Your registration could not be saved in this browser.') {
    super(message)
    this.name = 'StorageError'
    this.code = 'STORAGE_ERROR'
  }
}

export class DuplicateRegistrationError extends Error {
  constructor() {
    super('This email is already registered for this event.')
    this.name = 'DuplicateRegistrationError'
    this.code = 'DUPLICATE_REGISTRATION'
  }
}

function getBrowserStorage() {
  if (typeof window === 'undefined') return null

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function readRecords(storage) {
  if (!storage) return []

  try {
    const raw = storage.getItem(REGISTRATIONS_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

export function getRegistrations() {
  return readRecords(getBrowserStorage())
}

export function getRegistrationsByEventId(eventId) {
  return getRegistrations().filter((record) => record?.eventId === eventId)
}

export function saveRegistration(registration) {
  const storage = getBrowserStorage()
  if (!storage) throw new StorageError()

  const existing = readRecords(storage)
  const normalizedEmail = registration.email.trim().toLowerCase()
  const duplicate = existing.some(
    (record) =>
      record?.eventId === registration.eventId &&
      typeof record?.email === 'string' &&
      record.email.trim().toLowerCase() === normalizedEmail,
  )

  if (duplicate) throw new DuplicateRegistrationError()

  try {
    storage.setItem(REGISTRATIONS_KEY, JSON.stringify([...existing, registration]))
    return registration
  } catch {
    throw new StorageError()
  }
}

export function removeRegistration(target) {
  const storage = getBrowserStorage()
  if (!storage) {
    throw new StorageError('Your registration could not be updated in this browser.')
  }

  const existing = readRecords(storage)
  const targetId = typeof target === 'string' ? target : target?.registrationId

  let removed = false
  const next = existing.filter((record) => {
    if (removed) return true

    const matchesById = targetId && record?.registrationId === targetId
    const matchesByComposite =
      !targetId &&
      typeof target === 'object' &&
      target !== null &&
      record?.eventId === target.eventId &&
      record?.registeredAt === target.registeredAt &&
      record?.email === target.email

    if (matchesById || matchesByComposite) {
      removed = true
      return false
    }

    return true
  })

  try {
    storage.setItem(REGISTRATIONS_KEY, JSON.stringify(next))
    return next
  } catch {
    throw new StorageError('Your registration could not be updated in this browser.')
  }
}
