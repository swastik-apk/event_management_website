import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getTimeRemaining } from '../../utils/date'

function pad(value) {
  return String(value).padStart(2, '0')
}

export default function Countdown({ startDate, compact = false }) {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(startDate))

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemaining(getTimeRemaining(startDate))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [startDate])

  if (!remaining || remaining.totalSeconds <= 0) return null

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 text-xs font-medium text-muted dark:text-zinc-400" aria-live="polite">
        <Clock3 className="shrink-0 text-accent-500" size={14} aria-hidden="true" />
        <span>Starts in</span>
        <span className="font-mono font-semibold tabular-nums text-ink dark:text-zinc-100">
          {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-control border border-line bg-subtle px-4 py-3 dark:border-night-700 dark:bg-night-800/70">
      <div className="flex items-center gap-2 text-xs font-medium text-muted dark:text-zinc-400">
        <Clock3 className="shrink-0 text-accent-500" size={16} aria-hidden="true" />
        <span>Starts in</span>
      </div>
      <p className="font-mono text-sm font-semibold tabular-nums text-ink dark:text-zinc-100" aria-live="polite">
        {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
      </p>
    </div>
  )
}
