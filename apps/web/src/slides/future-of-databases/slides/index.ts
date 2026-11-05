import type { SlideEntry } from "@/slides/types";
import { Slide01Title } from "./01-title";
import { Slide02Contents } from "./02-contents";
import { Slide03LiveUpdates } from "./03-live-updates";
import { Slide04LiveUpdatesEffort } from "./04-live-updates-effort";
import { Slide05WebSockets } from "./05-websockets";
import { Slide06PreviewDatabases } from "./06-preview-databases";
import { Slide07MakingAChange } from "./07-making-a-change";
import { Slide08MigrationConflicts } from "./08-migration-conflicts";
import { Slide09MigrationMerge } from "./09-migration-merge";
import { Slide10MigrationErrors } from "./10-migration-errors";
import { Slide11MigrationsMeme } from "./11-migrations-meme";
import { Slide12Instant } from "./12-instant";
import { Slide13Responsive } from "./13-responsive";
import { Slide14BusinessViability } from "./14-business-viability";
import { Slide15ItPolicies } from "./15-it-policies";
import { Slide16TooManyUpdates } from "./16-too-many-updates";
import { Slide17NoSql } from "./17-no-sql";
import { Slide18AiComponents } from "./18-ai-components";
import { Slide19AiDocs } from "./19-ai-docs";
import { Slide20Primitives } from "./20-primitives";
import { Slide21LlmLeaderboard } from "./21-llm-leaderboard";
import { Slide22Future } from "./22-future";

export const SLIDES: SlideEntry[] = [
  {
    id: "01",
    title: "Introducing Convex — A database built for the AI era",
    theme: "dark",
    Component: Slide01Title,
    steps: 0,
  },
  {
    id: "02",
    title: "Contents",
    theme: "light",
    Component: Slide02Contents,
    steps: 0,
  },
  {
    id: "03",
    title: "Benefit 1 – Live updates",
    theme: "light",
    Component: Slide03LiveUpdates,
    steps: 0,
  },
  {
    id: "04",
    title: "Benefit 1 – Live updates",
    theme: "light",
    Component: Slide04LiveUpdatesEffort,
    steps: 0,
  },
  {
    id: "05",
    title: "Benefit 1 – Live updates",
    theme: "light",
    Component: Slide05WebSockets,
    steps: 0,
  },
  {
    id: "06",
    title: "Benefit 2 – Preview databases",
    theme: "light",
    Component: Slide06PreviewDatabases,
    steps: 0,
  },
  {
    id: "07",
    title: "Benefit 3 – Making a change to the database",
    theme: "light",
    Component: Slide07MakingAChange,
    steps: 0,
  },
  {
    id: "08",
    title: "Benefit 4 – Handle migration conflicts",
    theme: "light",
    Component: Slide08MigrationConflicts,
    steps: 0,
  },
  {
    id: "09",
    title: "Benefit 4 – Handle migration conflicts",
    theme: "light",
    Component: Slide09MigrationMerge,
    steps: 0,
  },
  {
    id: "10",
    title: "Benefit 5 – Handling migration errors",
    theme: "light",
    Component: Slide10MigrationErrors,
    steps: 0,
  },
  {
    id: "11",
    title: "Database migrations",
    theme: "light",
    Component: Slide11MigrationsMeme,
    steps: 0,
  },
  {
    id: "12",
    title: "Feature completion (dev side)",
    theme: "light",
    Component: Slide12Instant,
    steps: 0,
  },
  {
    id: "13",
    title: "Benefit 6 – More responsive",
    theme: "light",
    Component: Slide13Responsive,
    steps: 0,
  },
  {
    id: "14",
    title: "Con 1 – Business viability (it’s relatively new)",
    theme: "light",
    Component: Slide14BusinessViability,
    steps: 0,
  },
  {
    id: "15",
    title: "Con 2 – IT policies in other organisations",
    theme: "light",
    Component: Slide15ItPolicies,
    steps: 0,
  },
  {
    id: "16",
    title: "Con 3 – Too many live updates!",
    theme: "light",
    Component: Slide16TooManyUpdates,
    steps: 0,
  },
  {
    id: "17",
    title: "Con 4 – Doesn’t run SQL",
    theme: "light",
    Component: Slide17NoSql,
    steps: 0,
  },
  {
    id: "18",
    title: "AI Features - Components",
    theme: "light",
    Component: Slide18AiComponents,
    steps: 0,
  },
  {
    id: "19",
    title: "Using Convex with AI – AI docs",
    theme: "light",
    Component: Slide19AiDocs,
    steps: 0,
  },
  {
    id: "20",
    title: "Using Convex with AI – Primitives",
    theme: "light",
    Component: Slide20Primitives,
    steps: 0,
  },
  {
    id: "21",
    title: "Using Convex with AI – LLM leaderboard",
    theme: "light",
    Component: Slide21LlmLeaderboard,
    steps: 0,
  },
  {
    id: "22",
    title: "The future of databases is",
    theme: "light",
    Component: Slide22Future,
    steps: 0,
  },
];
