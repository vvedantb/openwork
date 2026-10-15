FOLLOW ALL OF THESE RULES

Implementation:

- Always read the CLAUDE.md file (if it exists) first to understand the codebase's specific rules
- Assume the project is greenfield — breaking changes are fine
- Have a deep think of the best solution; do not jump straight into implementation
- Prefer the simplest solution that another engineer can read and maintain
- When unsure, ask for clarification before implementing
- Prefer a detailed plan over a quick plan when scope is ambiguous
- Do not run dev / lint / build commands unless the user asks you to
- Never use `any`, `unknown`, `as` type assertions, or the non-null assertion operator `!`
- Minimize surface area of change; co-locate logic where it belongs
- Prefer explicit over magical behaviour

OpenWork (primary product):

- Decks are **code-defined** in `apps/web/src/slides/` — edit slides locally in git, deploy via Vercel
- **Registry:** `apps/web/src/slides/registry.ts` maps deck IDs to manifests (`SlideEntry[]`, speaker notes, theme)
- **Presenter:** `/slides/$deckId` — fullscreen web presenter with keyboard nav, step-gated builds, optional live sync
- **Catalog:** `/slides` lists registered decks (`/` is the landing page)
- **Reports / posters:** `/reports`, `/posters` (+ `/$id`) read `apps/web/src/{reports,posters}/registry.ts`; shared catalog UI in `apps/web/src/catalog/`
- **Shared shell:** `apps/web/src/slides/platform/` — `SlideDeck`, `SlideShell`, `PresenterView`, sync hooks
- **Themes:** `apps/web/src/slides/themes/` — motion tokens and UI variables (Tailwind on deck routes)
- **Static assets:** `apps/web/public/media/<kind>/<id>/` (served at `/media/...`, excluded from SPA rewrites) — never under `/slides/`
- **Legacy URLs:** `/d/:id` and `/decks` redirect via `apps/web/vercel.json` plus client routes; old deck ids map in `LEGACY_DECK_IDS`
- Adding a deck: new folder under `slides/` + one entry in `registry.ts`
- No in-browser editor; no Clerk auth on deck routes (public presenter)

Convex (live sync only):

- Tables: `presentationSessions`, `presentationVotes` — follow-the-presenter via share code
- API: `packages/backend/convex/presentations.ts`
- Plain `ConvexProvider` in `main.tsx` (no Clerk)
- Never manually define interfaces for Convex documents
- Always import `Doc<"tableName">`, `Id<"tableName">`, and `FunctionReturnType<typeof api.fn>`
- To typecheck Convex: `cd packages/backend && npx convex codegen --typecheck enable`
- Never run `npx convex dev` or `npx convex deploy` unless the user asks
- When the user says `pnpm dev:backend`, that means the Convex dev server

Remotion (changelog video pipeline only):

- **Not** the main web presenter — decks use Motion + React in the browser
- Studio: `pnpm remotion:studio` — preview `VmemChangelog` composition
- CLI export: changelog scripts in `apps/web/scripts/` (see `package.json`)
- Keep slide timing in `apps/web/src/remotion/changelog/constants.ts`

TanStack Router (apps/web):

- Routes live under `apps/web/src/routes/` using folder-based file routing
- Use `createFileRoute`; regenerate tree via Vite (`routeTree.gen.ts`)

Component structure:

- Max ~250 lines per client component
- Route files orchestrate data + layout; extract presentational pieces when they grow

Agent skills & commands:

- Committed skills: `.claude/skills/` + `skills-lock.json`
- Local agent installs: `.agents/skills/` (gitignored) — restore with `npx skills experimental_install -y`
- Slash commands: `.cursor/commands/` and `.claude/commands/` (`/ship`, `/stage`, `/push`, `/changelog`, etc.)

Git commits:

- Never add `Co-authored-by: Cursor` or `Made-with: Cursor` to commit messages
- `.husky/prepare-commit-msg` strips these if the IDE injects them
- Use `/ship` to stage session changes, commit, and push

Verification after implementation:

- Run typecheck in the packages you touched when the user asks or when shipping
- Run `/changelog` after medium-to-large user-facing changes
- Update AGENTS.md / CLAUDE.md if architecture decisions changed

vmem pitch deck gotchas (when editing slides):

- `initial={false}` on looping keyframe animations breaks prod builds
- `ring-foreground/<alpha>` and `outline-foreground/<alpha>` are unreliable with oklch tokens — use inline opacity

Philosophy:

This codebase will outlive you. Every shortcut becomes someone else's burden. Leave the codebase better than you found it.
