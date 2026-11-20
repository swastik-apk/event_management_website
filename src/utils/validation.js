const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const phonePattern = /^\+?[0-9\s()-]+$/
const letterPattern = /\p{L}/u

export function validateRegistration(values, availableEvents) {
  const errors = {}
  const name = values.fullName.trim()
  const email = values.email.trim()
  const phone = values.phone.trim()
  const digits = phone.replace(/\D/g, '')

  if (!name) {
    errors.fullName = 'Enter your full name.'
  } else if (name.length < 2 || name.length > 80) {
    errors.fullName = 'Use between 2 and 80 characters.'
  } else if (!letterPattern.test(name)) {
    errors.fullName = 'Include at least one letter in your name.'
  }

  if (!email) {
    errors.email = 'Enter your email address.'
  } else if (!emailPattern.test(email)) {
    errors.email = 'Enter a valid email address, such as name@example.com.'
  }

  if (!phone) {
    errors.phone = 'Enter your phone number.'
  } else if (!phonePattern.test(phone)) {
    errors.phone = 'Use digits with optional +, spaces, hyphens, or parentheses.'
  } else if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Use a phone number with 10 to 15 digits.'
  }

  if (!values.eventId) {
    errors.eventId = 'Choose an event.'
  } else if (!availableEvents.some((event) => event.id === values.eventId)) {
    errors.eventId = 'Choose an available event.'
  }

  return errors
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0
}
