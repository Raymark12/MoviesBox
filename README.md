# MovieBox

A movie recommendation web app: search by title, open a movie to see details and IMDb rating, mark favorites, and leave reviews with star ratings. Built with React, TypeScript, Chakra UI, and the OMDB API.

## Prerequisites

- **Node.js** 18+ (or current LTS)
- **OMDB API key** — [get a free key](https://www.omdbapi.com/apikey.aspx) and add it to `.env` (see below)

## Stack

- **React** 19 + **TypeScript**
- **React Router v7** (SPA mode)
- **Chakra UI v3** (theme, components)
- **Vite** (build tool)
- **Vitest** + **React Testing Library** (tests)

## Features

- **Home:** Debounced search, movie grid with poster/title/year, TV Series tag, favorite heart (read-only), pagination, result count
- **Movie detail:** Poster, title, year, runtime, rating, overview, cast, genre, director, writers; “Ongoing” for unfinished TV series; add/remove from favorites; comments section
- **Favorites:** Stored in `localStorage`, toggle on detail page, reflected on home
- **Comments:** Per-movie reviews with optional star rating (1–5), optional title, optional name; stored in `localStorage`

## How to build and start the project

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Configure the API key**

   Copy the example env file and add your [OMDB API key](https://www.omdbapi.com/apikey.aspx):

   ```bash
   cp .env.example .env
   ```

   In `.env`, set:

   ```
   VITE_OMDB_API_KEY=your_actual_key
   ```

   The app won’t load movie data without this.

3. **Run the app**

   ```bash
   npm run dev
   ```

   Open **http://localhost:5173** in your browser. You can search for movies, open a detail page, add favorites, and leave comments (stored in your browser).

4. **Production build**

   ```bash
   npm run build
   ```

   The output is in `build/client`. For Vercel, just connect your repo—`vercel.json` handles routing, and deployment is automatic.

## Scripts

| Script              | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start development server     |
| `npm run build`     | Production build             |
| `npm run typecheck` | Generate route types + `tsc` |
| `npm run test`      | Run tests (watch mode)       |
| `npm run test:run`  | Run tests once               |

## How to run tests

```bash
npm run test        # watch mode
npm run test:run    # single run
```

Tests use **Vitest** and **React Testing Library** (jsdom). No API key is required. Coverage includes: **services** (favorites and comments: localStorage, validation, sorting) and **components** (CommentForm: submit, reset, callbacks).

## Project structure

```
app/
├── components/       # Reusable UI (SearchBar, MovieCard, CommentForm, CommentList, etc.)
├── routes/           # Pages: home, movie/:imdbId
├── services/         # API (omdb) and client state (favorites, comments)
├── test/             # Vitest setup (jest-dom, localStorage clear)
├── theme.ts          # Chakra theme tokens
├── types.ts          # Shared types (movie, API responses)
└── root.tsx          # Layout, error boundary, Chakra provider
```

## How long did it take

I completed the project in less than 2 days.

## Deployed application

https://movies-box-gamma.vercel.app

---

## Future improvements

**What I left out for now**

- A real API for comments — I stuck with localStorage as suggested.
- E2E tests — I added unit and component tests; I’d add Playwright (or similar) for the main flows next.
- Server-side rendering — I kept it as a SPA; I’d consider SSR if we needed better SEO.

**What I’d improve next**

- Backend or sync for favorites and comments so they don’t depend on one device.
- Pagination or “load more” for comments so the list doesn’t get too long.
- Filters or sort on the home page (year, type, rating).
- Nicer loading states (e.g. skeletons on the detail page).
- Better accessibility (keyboard, focus, ARIA).
- Retry / rate limiting / cache around the OMDB calls.

---

## API

Movie data comes from the [OMDB API](https://www.omdbapi.com/). The free tier is enough for this app. Set your key in `.env` as `VITE_OMDB_API_KEY` (see “How to build and start” above).
