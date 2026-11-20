import { CalendarDays, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import Button from '../ui/Button'

const navLinkClasses = ({ isActive }) =>
  `inline-flex min-h-11 items-center border-b-2 px-2 text-sm font-medium transition-colors lg:min-h-16 ${
    isActive
      ? 'border-accent-500 text-accent-700 dark:border-accent-400 dark:text-accent-200'
      : 'border-transparent text-muted hover:border-line hover:text-ink dark:text-slate-300 dark:hover:border-night-700 dark:hover:text-white'
  }`

function Brand({ onClick }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 rounded-control text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:text-white"
      to="/"
      onClick={onClick}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-control bg-accent-50 text-accent-700 dark:bg-accent-800 dark:text-accent-200">
        <CalendarDays size={17} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="font-display text-base font-semibold">Event Hub</span>
    </Link>
  )
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-control border border-line text-muted transition-colors hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:border-night-700 dark:text-slate-300 dark:hover:bg-night-800 dark:hover:text-white"
      type="button"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
    >
      {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
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
    <header className="sticky top-0 z-40 border-b border-line bg-surface dark:border-night-800 dark:bg-night-900">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <Brand onClick={closeMenu} />

        <nav className="hidden items-center gap-4 lg:flex" aria-label="Primary navigation">
          <NavLink className={navLinkClasses} to="/">
            Home
          </NavLink>
          <Link className="inline-flex min-h-16 items-center border-b-2 border-transparent px-2 text-sm font-medium text-muted transition-colors hover:border-line hover:text-ink dark:text-slate-300 dark:hover:border-night-700 dark:hover:text-white" to="/#events">
            Explore events
          </Link>
          <NavLink className={navLinkClasses} to="/registrations">
            My registrations
          </NavLink>
          <Link className="inline-flex min-h-16 items-center border-b-2 border-transparent px-2 text-sm font-medium text-muted transition-colors hover:border-line hover:text-ink dark:text-slate-300 dark:hover:border-night-700 dark:hover:text-white" to="/#about">
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <ThemeButton />
          <Button as={Link} to="/#events" size="sm">
            Find an event
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeButton />
          <button
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-control border border-line text-ink transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 dark:border-night-700 dark:text-slate-100 dark:hover:bg-night-800"
            type="button"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((isOpen) => !isOpen)}
          >
            {mobileOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${mobileOpen ? 'block' : 'hidden'} border-t border-line bg-surface px-4 pb-4 pt-2 dark:border-night-800 dark:bg-night-900 lg:hidden`}
      >
        <nav className="section-shell flex flex-col gap-1 px-0" aria-label="Mobile navigation">
          <NavLink className={navLinkClasses} to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <Link className="inline-flex min-h-11 items-center rounded-control px-2 text-sm font-medium text-muted transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-night-800 dark:hover:text-white" to="/#events" onClick={closeMenu}>
            Explore events
          </Link>
          <NavLink className={navLinkClasses} to="/registrations" onClick={closeMenu}>
            My registrations
          </NavLink>
          <Link className="inline-flex min-h-11 items-center rounded-control px-2 text-sm font-medium text-muted transition-colors hover:bg-slate-100 hover:text-ink dark:text-slate-300 dark:hover:bg-night-800 dark:hover:text-white" to="/#about" onClick={closeMenu}>
            About
          </Link>
          <Button as={Link} to="/#events" className="mt-3 w-full" onClick={closeMenu}>
            Find an event
          </Button>
        </nav>
      </div>
    </header>
  )
}
