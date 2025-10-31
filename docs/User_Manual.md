# User Manual — Anime & TV Series Tracker

## Installation

1. Ensure Node.js (16+) and npm are installed.
2. From project root:

```powershell
npm install
npm run dev
```

3. Open the dev URL (usually http://localhost:5173).

## Using the App

- Watchlist: add shows using the form. Required fields: Title, Total Episodes.
- Progress: use + and - buttons to mark watched episodes. Status dropdown changes category.
- Spoilers: use the Reveal button to show hidden reviews.
- Discover: shows AI-simulated recommendations; filter by your favorite tags.
- Clubs: create a club, post messages, and comment on posts.
- Polls & Ratings: create polls and vote; rate shows with stars—average is shown.
- Dashboard: view totals and progress.
- Admin: view JSON dump of stored data and reset all data.

## Sample Workflows

1. Add a show, mark some episodes watched, then check Dashboard to see progress.
2. Create a club and post a thread. Add comments to discuss.

## Troubleshooting

- If the app doesn't start, run `npm install --legacy-peer-deps` then `npm run dev`.

## Screenshots

Placeholders located at `docs/screenshots/` (add images there for final submission).
