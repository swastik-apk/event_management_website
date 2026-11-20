import { ImageOff } from 'lucide-react'
import { useState } from 'react'

export default function EventImage({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-accent-100 dark:bg-night-800 ${className}`}>
      {hasError ? (
        <div className="flex h-full min-h-32 items-center justify-center bg-accent-100 text-accent-700 dark:bg-night-800 dark:text-accent-200">
          <div className="flex flex-col items-center gap-2 text-center">
            <ImageOff size={28} strokeWidth={1.6} aria-hidden="true" />
            <span className="px-4 text-xs font-semibold">Event image unavailable</span>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  )
}
