import { CalendarDays } from 'lucide-react'
import { useState } from 'react'

export default function EventImage({ src, alt, className = '', zoomOnHover = false }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-subtle dark:bg-night-800 ${className}`}>
      {hasError || !src ? (
        <div className="flex h-full min-h-32 w-full flex-col items-center justify-center bg-gradient-to-br from-subtle via-zinc-100 to-accent-50 p-6 text-center text-muted dark:from-night-800 dark:via-night-900 dark:to-night-800 dark:text-zinc-400">
          <CalendarDays size={28} strokeWidth={1.6} className="text-accent-500" aria-hidden="true" />
          <span className="mt-2 max-w-[16rem] text-xs font-medium text-ink dark:text-zinc-200">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className={`h-full w-full object-cover ${
            zoomOnHover ? 'transition-transform duration-200 ease-out group-hover:scale-[1.03]' : ''
          }`}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
