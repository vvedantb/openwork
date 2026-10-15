# Changelog

## Slides, reports and posters routes - 2026-10-15

- Moved the deck presenter from `/d/$deckId` to `/slides/$deckId` and the catalog from `/decks` to `/slides`
- Added `/reports`, `/reports/$reportId`, `/posters` and `/posters/$posterId`, each reading its own registry, with empty and not-found states
- Renamed the `vmem-pitch` deck to `intro-to-vmem` (title "Intro to vmem"); old id still resolves
- Moved deck assets to `/media/slides/intro-to-vmem/`, outside SPA routes and excluded from rewrites
- Added Vercel redirects (`/d/:id`, `/d/vmem-pitch`, `/decks`) plus client redirect routes as a fallback
- Renamed `apps/web/src/decks/` to `apps/web/src/slides/`; unknown deck ids now show a not-found state instead of redirecting home

## OpenWork rename - 2026-10-15

- Renamed the product from OpenDesign to OpenWork across package name, page title, header wordmark, landing copy and agent docs
- Added a README describing OpenWork as a platform for agent-created presentations, reports, posters and animations
- Corrected agent docs: the deck catalog lives at `/decks`, not `/`

## Slide deployment platform - 2026-07-06

- Replaced the Folio web editor with a code-defined slide platform — decks live in the repo and deploy via git/Vercel
- Added deck catalog at `/` and fullscreen presenter at `/d/$deckId` with keyboard nav, step builds, and presenter notes
- Ported the vmem pitch deck as the first registered deck (`vmem-pitch`)
- Swapped Convex from Folio CRUD to anonymous live-sync sessions (`presentationSessions`, `presentationVotes`)
- Removed Clerk auth — public deck routes use plain Convex for optional follow-the-presenter sync
- Removed Folio editor, Remotion Deck/Slide compositions, and deck MP4 export; Remotion retained for changelog video only
