import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import Button from '../ui/Button'

const navLinkClasses = ({ isActive }) =>
  `inline-flex whitespace-nowrap shrink-0 items-center border-b-2 py-1 text-sm font-medium transition-colors duration-150 ${
    isActive
      ? 'border-ink text-ink dark:border-white dark:text-white'
      : 'border-transparent text-muted hover:border-line-strong hover:text-ink dark:text-zinc-400 dark:hover:border-night-700 dark:hover:text-white'
  }`

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition-colors hover:bg-subtle dark:border-night-700 dark:bg-night-900 dark:text-zinc-100 dark:hover:bg-night-800"
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, hash])

  const closeMenu = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-md dark:border-night-800 dark:bg-night-950/95">
      <div className="section-shell flex min-h-16 items-center justify-between gap-8 lg:min-h-20">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg text-ink focus-visible:outline-none dark:text-white"
          to="/"
          onClick={closeMenu}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-accent-500"
          >
            <rect x="2" y="2" width="24" height="24" rx="7" fill="currentColor" />
            <path
              d="M9.5 14.5C9.5 11.7386 11.7386 9.5 14.5 9.5C17.2614 9.5 19.5 11.7386 19.5 14.5C19.5 17.2614 17.2614 19.5 14.5 19.5H9.5V14.5Z"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight text-accent-500">Event Hub</span>
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          <NavLink className={navLinkClasses} to="/" end>
            Explore
          </NavLink>
          <Link
            className="inline-flex shrink-0 whitespace-nowrap items-center border-b-2 border-transparent py-1 text-sm font-medium text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink dark:text-zinc-400 dark:hover:border-night-700 dark:hover:text-white"
            to="/#events"
          >
            Experiences
          </Link>
          <Link
            className="inline-flex shrink-0 whitespace-nowrap items-center border-b-2 border-transparent py-1 text-sm font-medium text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink dark:text-zinc-400 dark:hover:border-night-700 dark:hover:text-white"
            to="/#about"
          >
            How it works
          </Link>
          <NavLink className={navLinkClasses} to="/registrations">
            My registrations
          </NavLink>
        </nav>

        {/* Zone 3: Theme toggle & primary action */}
        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <ThemeToggleButton />
          <Button as={Link} to="/#events" size="sm" pill>
            Find an event
          </Button>
        </div>

        {/* Mobile theme toggle beside hamburger menu */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <ThemeToggleButton />
          <button
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-subtle dark:border-night-700 dark:text-zinc-100 dark:hover:bg-night-800"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${mobileOpen ? 'block' : 'hidden'} border-t border-line bg-canvas px-4 pb-5 pt-3 dark:border-night-800 dark:bg-night-950 lg:hidden`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
          <NavLink
            className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-ink hover:bg-subtle dark:text-zinc-100 dark:hover:bg-night-800"
            to="/"
            onClick={closeMenu}
          >
            Explore
          </NavLink>
          <Link
            className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-muted hover:bg-subtle hover:text-ink dark:text-zinc-300 dark:hover:bg-night-800 dark:hover:text-white"
            to="/#events"
            onClick={closeMenu}
          >
            Experiences
          </Link>
          <Link
            className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-muted hover:bg-subtle hover:text-ink dark:text-zinc-300 dark:hover:bg-night-800 dark:hover:text-white"
            to="/#about"
            onClick={closeMenu}
          >
            How it works
          </Link>
          <NavLink
            className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium text-muted hover:bg-subtle hover:text-ink dark:text-zinc-300 dark:hover:bg-night-800 dark:hover:text-white"
            to="/registrations"
            onClick={closeMenu}
          >
            My registrations
          </NavLink>
          <div className="mt-2 border-t border-line pt-3 dark:border-night-800">
            <Button as={Link} to="/#events" size="sm" pill className="w-full" onClick={closeMenu}>
              Find an event
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
