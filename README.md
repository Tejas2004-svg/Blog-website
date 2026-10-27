# Signal & Next

A responsive technology editorial built with React, TypeScript, Vite, React Router, and Framer Motion. The default edition is a static editorial demo: every supplied story is generated sample content and is clearly labeled as such. It is not live reporting.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL (normally `http://localhost:5173`). To create and preview a production build:

```bash
npm run build
npm run preview
```

## Optional live headlines

The site can fetch current headlines from [GNews](https://gnews.io/) when an API key is configured:

1. Copy `.env.example` to `.env`.
2. Set `VITE_GNEWS_API_KEY` to your GNews API key.
3. Restart the Vite server.

When configured, the site labels the external headline feed, identifies publishers, and links readers to the original article. Live headlines are not presented as full articles written by Signal & Next. If the provider is unavailable or rejects a key, the site shows an explicit error and retains its labeled demo stories.

**Deployment note:** Vite's `VITE_` variables are included in browser code. Do not put a private or production-sensitive key there. For a public deployment, proxy GNews through a server-side endpoint, keep the key on the server, and apply suitable rate limits and caching. The included adapter is intended for local demos and development.

## Features

- Home, latest, trending, topic directories and filters, article details, search, saved stories, About, Contact, and not-found routes.
- Responsive navigation, a persistent dark/light theme, search, pagination, related stories, share actions, and accessible keyboard focus states.
- Browser-persisted bookmarks, theme preferences, newsletter signups, and local contact-form demo submissions. No user data leaves the browser.
- Motion-enhanced page transitions, scroll reveals, responsive layouts, and reduced-motion support.
- Per-page titles, descriptions, Open Graph metadata, and a custom favicon.

## Notes

- Sample stories, dates, authors, and article copy are fictional demonstration content and must not be interpreted as real-time news or reporting.
- Newsletter signups and contact messages are saved only in the current browser's `localStorage`; no email delivery or remote backend is configured.
- Article photography is loaded from Unsplash and the typefaces from Google Fonts, so those assets require an internet connection.
