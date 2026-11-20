import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="section-shell py-16 sm:py-24" aria-labelledby="not-found-heading">
      <div className="surface-card mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center sm:px-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-subtle text-accent-500 dark:border-night-700 dark:bg-night-800">
          <Compass size={24} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5 tabular-nums">404 · Page not found</p>
        <h1
          id="not-found-heading"
          className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white"
        >
          We can&apos;t seem to find that page.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted dark:text-zinc-400">
          The page may have moved, or the address might be mistyped. Head back to explore upcoming experiences.
        </p>
        <Button as={Link} to="/" variant="secondary" pill className="mt-7">
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </Button>
      </div>
    </section>
  )
}
