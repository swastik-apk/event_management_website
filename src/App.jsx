import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import { ThemeProvider } from './hooks/useTheme'
import EventDetailsPage from './pages/EventDetailsPage'
import HomePage from './pages/HomePage'
import MyRegistrationsPage from './pages/MyRegistrationsPage'
import NotFoundPage from './pages/NotFoundPage'
import RegistrationPage from './pages/RegistrationPage'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-canvas text-ink dark:bg-night-950 dark:text-zinc-100">
        <a
          className="sr-only z-50 rounded-full bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          href="#main-content"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events/:eventId" element={<EventDetailsPage />} />
            <Route path="/register/:eventId" element={<RegistrationPage />} />
            <Route path="/registrations" element={<MyRegistrationsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
