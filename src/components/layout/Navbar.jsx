import { Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import Button from '../ui/Button'

const getDesktopNavClasses = (isActive) =>
  `inline-flex whitespace-nowrap shrink-0 items-center border-b-2 py-1 text-sm font-medium transition-colors duration-150 ${
    isActive
      ? 'border-ink text-ink dark:border-white dark:text-white'
      : 'border-transparent text-muted hover:border-line-strong hover:text-ink dark:text-zinc-400 dark:hover:border-night-700 dark:hover:text-white'
  }`

const getMobileNavClasses = (isActive) =>
  `inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium transition-colors ${
    isActive
      ? 'bg-subtle text-ink dark:bg-night-800 dark:text-white'
      : 'text-muted hover:bg-subtle hover:text-ink dark:text-zinc-300 dark:hover:bg-night-800 dark:hover:text-white'
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
  const [activeSection, setActiveSection] = useState('explore')
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

  useEffect(() => {
    if (pathname !== '/') return

    const updateActiveSection = () => {
      const eventsEl = document.getElementById('events')
      const aboutEl = document.getElementById('about')

      if (!eventsEl && !aboutEl) {
        setActiveSection('explore')
        return
      }

      const triggerOffset = 180
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight

      if (
        aboutEl &&
        (aboutEl.getBoundingClientRect().top <= triggerOffset || scrollBottom >= pageHeight - 40)
      ) {
        setActiveSection('about')
        return
      }

      if (eventsEl && eventsEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('events')
        return
      }

      setActiveSection('explore')
    }

    let rafId = null
    const onScroll = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        updateActiveSection()
      })
    }

    updateActiveSection()
    const timerId = window.setTimeout(updateActiveSection, 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.clearTimeout(timerId)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname, hash])

  const closeMenu = () => setMobileOpen(false)

  const handleExploreClick = () => {
    closeMenu()
    if (pathname === '/' && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSectionClick = (sectionId) => {
    closeMenu()
    if (pathname === '/' && hash === `#${sectionId}`) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  let activeNavKey = null
  if (pathname === '/') {
    activeNavKey = activeSection
  } else if (pathname.startsWith('/events/') || pathname.startsWith('/register/')) {
    activeNavKey = 'events'
  } else if (pathname === '/registrations') {
    activeNavKey = 'registrations'
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/95 backdrop-blur-md dark:border-night-800 dark:bg-night-950/95">
      <div className="section-shell flex min-h-16 items-center justify-between gap-8 lg:min-h-20">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg text-ink focus-visible:outline-none dark:text-white"
          to="/"
          onClick={handleExploreClick}
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

        {/* Zone 2: Concise single-line navigation links with scroll-spy active underline */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          <div className="flex items-center gap-7">
            <Link
              className={getDesktopNavClasses(activeNavKey === 'explore')}
              to="/"
              onClick={handleExploreClick}
            >
              Explore
            </Link>
            <Link
              className={getDesktopNavClasses(activeNavKey === 'events')}
              to="/#events"
              onClick={() => handleSectionClick('events')}
            >
              Experiences
            </Link>
            <Link
              className={getDesktopNavClasses(activeNavKey === 'about')}
              to="/#about"
              onClick={() => handleSectionClick('about')}
            >
              How it works
            </Link>
          </div>
          <span className="ml-2 h-4 w-px bg-line-strong dark:bg-night-700" aria-hidden="true" />
          <Link
            className={`${getDesktopNavClasses(activeNavKey === 'registrations')} ml-2`}
            to="/registrations"
            onClick={closeMenu}
          >
            My registrations
          </Link>
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
          <Link
            className={getMobileNavClasses(activeNavKey === 'explore')}
            to="/"
            onClick={handleExploreClick}
          >
            Explore
          </Link>
          <Link
            className={getMobileNavClasses(activeNavKey === 'events')}
            to="/#events"
            onClick={() => handleSectionClick('events')}
          >
            Experiences
          </Link>
          <Link
            className={getMobileNavClasses(activeNavKey === 'about')}
            to="/#about"
            onClick={() => handleSectionClick('about')}
          >
            How it works
          </Link>
          <Link
            className={getMobileNavClasses(activeNavKey === 'registrations')}
            to="/registrations"
            onClick={closeMenu}
          >
            My registrations
          </Link>
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
