import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getTimeRemaining } from '../../utils/date'

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function Countdown({ startDate }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(startDate))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemaining(getTimeRemaining(startDate))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [startDate])

  if (!remaining || remaining.totalSeconds <= 0) return null

  return (
    <div className="flex items-center gap-2 rounded-control border border-accent-200 bg-accent-50 px-3 py-2 dark:border-accent-800 dark:bg-accent-800/40">
      <Clock3 className="shrink-0 text-accent-600 dark:text-accent-300" size={16} aria-hidden="true" />
      <div>
        <p className="text-xs font-medium text-accent-700 dark:text-accent-200">
          Starts in
        </p>
        <p className="mt-0.5 text-sm font-medium text-accent-800 dark:text-accent-100" aria-live="polite">
          {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
        </p>
      </div>
    </div>
  )
}
