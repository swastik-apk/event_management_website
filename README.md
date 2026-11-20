# Event Hub

Event Hub is a responsive React event-discovery prototype. Visitors can browse a curated sample programme, search and filter events, read complete event details, and save a local demo registration in the browser.

## Features

- Responsive homepage with hero, featured events, and catalogue sections.
- Search across event titles, categories, venues, formats, and descriptions.
- Composable category filtering with empty and reset states.
- Event detail and registration routes powered by React Router.
- Accessible controlled registration form with explicit name, email, phone, and event validation.
- Safe Local Storage persistence under `eventHub.registrations.v1`.
- Duplicate registration prevention for the same email and event.
- Local confirmation reference and a **My registrations** view.
- Light/dark theme toggle saved under `eventHub.theme.v1`.
- Responsive mobile navigation, keyboard-friendly controls, focus states, reduced-motion support, and image fallbacks.

> This is a frontend-only demonstration. Registrations are stored only in the current browser and are not tickets, paid bookings, or synced account data. No email or SMS is sent.

## Technology stack

- React 18
- Vite
- React Router
- Tailwind CSS 3
- Lucide React icons
- Browser Local Storage

## Visual system

The UI uses an Event Hub token layer adapted from public guidance in the Atlassian Design System and Shopify Polaris: neutral-dominant surfaces, an 8px spacing rhythm, restrained corner radii, border-led grouping, sentence-case copy, and consistent card header/body/footer structure. It is an original implementation for this project, not an official Atlassian or Shopify product theme.

- [Atlassian Design foundations](https://atlassian.design/foundations)
- [Atlassian spacing](https://atlassian.design/foundations/spacing/)
- [Shopify Polaris layout and structure](https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/components/layout-and-structure)
- [Shopify Polaris card layout](https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/patterns/card-layout)

## Project structure

```text
src/
├── components/
│   ├── events/       # Cards, filters, grids, and event states
│   ├── forms/        # Controlled registration form
│   ├── layout/       # Navbar and footer
│   └── ui/           # Reusable buttons, inputs, badges, and states
├── data/events.js    # Single source of truth for sample events
├── hooks/useTheme.jsx
├── pages/            # Route-level views
├── utils/            # Dates, validation, registration, and storage
├── App.jsx
├── index.css
└── main.jsx
```

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite in a browser.

## Production build

```bash
npm run build
```

## Preview the production build

```bash
npm run preview
```

## Routes

- `/` — home and event catalogue
- `/events/:eventId` — event details
- `/register/:eventId` — registration form
- `/registrations` — registrations saved in this browser
- `*` — not-found state

## Notes for deployment

This is a client-side routed application. A static host must serve `index.html` as the fallback for routes such as `/events/evt-ai-summit`. The event images are stable Unsplash URLs with an in-app fallback if a remote image cannot be loaded.

## Verification

The production build is the primary automated check. Manually verify the core flow at mobile and desktop widths: search and category filters, event details, invalid routes, invalid and valid registration submissions, refresh persistence, duplicate prevention, mobile navigation, theme switching, and the My registrations view.
