import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="section-shell py-16 sm:py-24" aria-labelledby="not-found-heading">
      <div className="surface-card mx-auto flex max-w-2xl flex-col items-center px-6 py-12 text-center sm:px-10">
        <span className="flex h-11 w-11 items-center justify-center rounded-control bg-accent-50 text-accent-600 dark:bg-accent-800 dark:text-accent-200">
          <Compass size={27} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5">404 · Page not found</p>
        <h1 id="not-found-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-white">
          This path leads nowhere useful.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted dark:text-slate-400">
          The page may have moved, or the address may have been typed incorrectly. Let&apos;s get you back to the programme.
        </p>
        <Button as={Link} to="/" variant="secondary" className="mt-7">
          <ArrowLeft size={17} aria-hidden="true" /> Back to home
        </Button>
      </div>
    </section>
  )
}
