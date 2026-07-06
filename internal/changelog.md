# Changelog

## Slide deployment platform - 2026-07-06

- Replaced the Folio web editor with a code-defined slide platform — decks live in the repo and deploy via git/Vercel
- Added deck catalog at `/` and fullscreen presenter at `/d/$deckId` with keyboard nav, step builds, and presenter notes
- Ported the vmem pitch deck as the first registered deck (`vmem-pitch`)
- Swapped Convex from Folio CRUD to anonymous live-sync sessions (`presentationSessions`, `presentationVotes`)
- Removed Clerk auth — public deck routes use plain Convex for optional follow-the-presenter sync
- Removed Folio editor, Remotion Deck/Slide compositions, and deck MP4 export; Remotion retained for changelog video only
