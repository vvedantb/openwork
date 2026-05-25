FOLLOW ALL OF THESE RULES

Implementation:

- Always read the AGENTS.md file (if it exists) first to understand the codebase's specific rules
- Assume the project is greenfield — breaking changes are fine
- Have a deep think of the best solution; do not jump straight into implementation
- Prefer the simplest solution that another engineer can read and maintain
- When unsure, ask for clarification before implementing
- Prefer a detailed plan over a quick plan when scope is ambiguous
- Do not run dev / lint / build commands unless the user asks you to
- Never use `any`, `unknown`, `as` type assertions, or the non-null assertion operator `!`
- Minimize surface area of change; co-locate logic where it belongs
- Prefer explicit over magical behaviour

Convex:

- Never manually define interfaces for Convex documents
- Always import `Doc<"tableName">`, `Id<"tableName">`, and `FunctionReturnType<typeof api.fn>`
- Convex types are the single source of truth
- To typecheck Convex: `cd packages/backend && npx convex codegen --typecheck enable`
- Never run `npx convex dev` or `npx convex deploy` unless the user asks
- When the user says `pnpm dev:backend`, that means the Convex dev server

Remotion:

- Preview uses `@remotion/player`; full export uses `@remotion/cli` + `Deck` composition
- Keep slide timing in `apps/web/src/remotion/constants.ts`
- Dev export: **Export MP4** in the editor (POST `/api/render-deck`)
- CLI export: `pnpm render:deck --props=./deck-props.json --output=./out/deck.mp4`
- Studio: `pnpm remotion:studio`

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
- Update AGENTS.md / CLAUDE.md if architecture decisions changed

Philosophy:

This codebase will outlive you. Every shortcut becomes someone else's burden. Leave the codebase better than you found it.
