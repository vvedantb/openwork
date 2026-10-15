# OpenWork

OpenWork is a platform for work that agents create: presentations, reports, posters and animations. Each piece of work is code in this repo. Agents and people edit it in git, and Vercel deploys it.

Presentations (slides) are the first supported format. Reports and posters have routes and registries but no entries yet; animations will follow the same model.

## How it works

- **Code-defined work.** Decks live in `apps/web/src/slides/`. Each deck is a folder of React slides plus a manifest.
- **Registry.** `apps/web/src/slides/registry.ts` maps deck IDs to manifests (slides, speaker notes, theme).
- **Catalogue.** `/slides` lists every registered deck. `/reports` and `/posters` list reports and posters.
- **Presenter.** `/slides/$deckId` plays a deck fullscreen, with keyboard navigation, step-gated builds and speaker notes.
- **Live sync.** Optional follow-the-presenter sessions through Convex, joined by share code.

There is no in-browser editor and no sign-in on deck routes.

## Repo layout

| Path                    | Purpose                                                       |
| ----------------------- | ------------------------------------------------------------- |
| `apps/web`              | Vite + React + TanStack Router web app (catalogue, presenter) |
| `apps/web/src/slides`   | Decks, shared slide shell, themes and registry                |
| `apps/web/src/remotion` | Remotion pipeline for the changelog video only                |
| `packages/backend`      | Convex backend for live presenter sync                        |

## Getting started

Requires Node 20.19 or later and pnpm 9.

```sh
pnpm install
cp .env.example apps/web/.env.local   # set VITE_CONVEX_URL
pnpm dev                               # web app and Convex dev server
```

Other scripts:

```sh
pnpm dev:web           # web app only
pnpm dev:backend       # Convex dev server only
pnpm typecheck         # web and backend
pnpm build             # production build of the web app
pnpm remotion:studio   # preview the changelog video
```

## Add a deck

1. Create a folder under `apps/web/src/slides/`. Put static files in `apps/web/public/media/slides/<deck-id>/`.
2. Add one entry to `apps/web/src/slides/registry.ts`.
3. Commit and deploy. The deck appears at `/slides` and plays at `/slides/<deck-id>`.

See `AGENTS.md` for the rules agents follow when they work in this repo.
