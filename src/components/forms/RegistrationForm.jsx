import { AlertCircle, ArrowRight, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { createRegistration } from '../../utils/registration'
import { saveRegistration } from '../../utils/storage'
import { hasValidationErrors, validateRegistration } from '../../utils/validation'

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  eventId: '',
}

export default function RegistrationForm({ events, selectedEventId, onSuccess }) {
  const [values, setValues] = useState(() => ({ ...initialValues, eventId: selectedEventId }))
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field, value) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors
      const nextErrors = { ...currentErrors }
      delete nextErrors[field]
      return nextErrors
    })
    setSubmitError('')
  }

  const focusFirstInvalidField = (validationErrors) => {
    const firstInvalidField = Object.keys(values).find((field) => validationErrors[field])
    if (!firstInvalidField) return

    window.requestAnimationFrame(() => {
      document.getElementById(firstInvalidField)?.focus()
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateRegistration(values, events)
    setErrors(validationErrors)
    if (hasValidationErrors(validationErrors)) {
      focusFirstInvalidField(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      const savedRegistration = saveRegistration(createRegistration(values))
      setValues({ ...initialValues, eventId: selectedEventId })
      setErrors({})
      onSuccess(savedRegistration)
    } catch (error) {
      setSubmitError(error.message || 'Your registration could not be saved. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" noValidate onSubmit={handleSubmit}>
      {submitError ? (
        <div className="flex items-start gap-3 rounded-control border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200" role="alert">
          <AlertCircle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
          <p>{submitError}</p>
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="fullName"
          label="Full name"
          name="fullName"
          autoComplete="name"
          value={values.fullName}
          required
          maxLength={80}
          placeholder="Alex Morgan"
          error={errors.fullName}
          onChange={(event) => updateField('fullName', event.target.value)}
        />
        <Input
          id="email"
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          required
          placeholder="alex@example.com"
          error={errors.email}
          onChange={(event) => updateField('email', event.target.value)}
        />
      </div>

      <Input
        id="phone"
        label="Phone number"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={values.phone}
        required
        maxLength={25}
        placeholder="+91 98765 43210"
        hint="Use 10–15 digits. Spaces, hyphens, parentheses, and an optional + are accepted."
        error={errors.phone}
        onChange={(event) => updateField('phone', event.target.value)}
      />

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-ink dark:text-slate-100" htmlFor="eventId">
          Selected event <span className="ml-1 text-accent-600" aria-hidden="true">*</span>
        </label>
        <select
          id="eventId"
          name="eventId"
          className={`min-h-10 w-full rounded-control border bg-surface px-3 text-sm text-ink outline-none transition focus:border-accent-400 focus:ring-2 focus:ring-accent-100 dark:bg-night-900 dark:text-slate-100 dark:focus:border-accent-400 dark:focus:ring-accent-800 ${errors.eventId ? 'border-red-400 dark:border-red-500' : 'border-line dark:border-night-700'}`}
          value={values.eventId}
          aria-describedby={errors.eventId ? 'eventId-error' : undefined}
          aria-invalid={Boolean(errors.eventId)}
          required
          onChange={(event) => updateField('eventId', event.target.value)}
        >
          <option value="">Choose an event</option>
          {events.map((event) => <option key={event.id} value={event.id}>{event.title}</option>)}
        </select>
        {errors.eventId ? <p id="eventId-error" className="text-sm font-medium text-red-700 dark:text-red-300" role="alert">{errors.eventId}</p> : null}
        <p className="text-xs leading-5 text-muted dark:text-slate-400">You can change the event before submitting if your plans change.</p>
      </div>

      <div className="flex items-start gap-3 rounded-control bg-canvas p-4 text-xs leading-5 text-muted dark:bg-night-800 dark:text-slate-400">
        <LockKeyhole className="mt-0.5 shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" />
        <p>Your details are saved only in this browser for this local demo. No email or SMS will be sent.</p>
      </div>

      <Button className="w-full sm:w-auto" type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Saving registration…' : 'Complete registration'}
        {!isSubmitting ? <ArrowRight size={18} aria-hidden="true" /> : null}
      </Button>
    </form>
  )
}
