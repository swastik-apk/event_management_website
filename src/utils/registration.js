export function createRegistration(values) {
  return {
    registrationId: generateRegistrationId(),
    participantName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    eventId: values.eventId,
    registeredAt: new Date().toISOString(),
  }
}

function generateRegistrationId() {
  const randomPart =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID().replace(/-/g, '').slice(0, 8)
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`

  return `REG-${randomPart.toUpperCase()}`
}
