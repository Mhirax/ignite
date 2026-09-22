# IGNITE

A game discovery web app for browsing, filtering, and searching the full [RAWG](https://rawg.io/apidocs) games catalog, styled with a PlayStation Store-inspired dark UI.

## Features

- **Full catalog browsing** — infinite-scroll feed backed by RAWG's ~900K-game database, not a fixed sample
- **Platform filter** — All / PC / PlayStation / Xbox / Nintendo / iOS / Android, with real brand logos
- **Category filter** — All / Popular / New / Upcoming, mapped to RAWG's rating/release-date queries
- **Live search** with loading, error, and empty states
- **Game detail view** — synopsis, rating, platforms, and a screenshot gallery, opened with a smooth shared-element transition (Framer Motion)
- **Dark, PlayStation Store-inspired UI** — glassy nav, segmented pill tab navigation, hover-glow game cards, skeleton loading placeholders

## Tech stack

| Layer | Technology |
|---|---|
| Language | JavaScript (React JSX) |
| UI | [React 19](https://react.dev/) |
| State management | [Redux](https://redux.js.org/) + [Redux Thunk](https://github.com/reduxjs/redux-thunk) |
| Routing | [React Router](https://reactrouter.com/) |
| Styling | [Sass/SCSS](https://sass-lang.com/) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) (Font Awesome brand set) |
| Data source | [RAWG Video Games Database API](https://rawg.io/apidocs) |
| Tooling | Create React App (react-scripts), ESLint |

## Getting started

```bash
git clone https://github.com/Mhirax/ignite.git
cd ignite/ignite
npm install
```

Copy `.env.example` to `.env.local` and add a free RAWG API key ([get one here](https://rawg.io/apidocs)):

```
REACT_APP_RAWG_API_KEY=your_rawg_api_key_here
```

Then run the dev server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
ignite/               # CRA app root
  src/
    actions/          # Redux thunks (games, game detail)
    api.js            # RAWG endpoint builders, platform/category config
    components/       # Nav, GamesFeed, TabBar, Game card, GameDetail modal, etc.
    pages/Home.js      # Landing page (hero, filters, feed, search results)
    reducers/          # Redux reducers
    util.js            # Image resizing helper for RAWG's CDN
```
