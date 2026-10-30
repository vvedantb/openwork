import type { SlideEntry } from "@/slides/types";
import { BeeBlank } from "./b00-blank";
import { BeeTitle } from "./b01-title";
import { BeeProblem } from "./b02-problem";
import { BeeBackground } from "./b12-background";
import { BeeNotch } from "./b03-notch";
import { BeeListens } from "./b04-listens";
import { BeeWeb } from "./b05-web";
import { BeeRealMeeting } from "./b11-real-meeting";
import { BeeSummary } from "./b06-summary";
import { BeeTeams } from "./b07-teams";
import { BeePrivate } from "./b08-private";
import { BeeCost } from "./b13-cost";
import { BeeCompare } from "./b14-compare";
import { BeeTools } from "./b09-tools";
import { BeeClose } from "./b10-close";

/**
 * Bee, for colleagues who are not technical: the problem, what it does in a
 * meeting, privacy, and the ask. Ported from Eva's Bee deck; each slide's
 * `Shell` paints Bee's cream stage, honey accents and typeface.
 *
 * `autoMs` is the wait before each build step, as Eva timed it. Eva left the
 * compare, private, tools and background slides to the presenter's clicks;
 * openwork plays every step on its own, so those four carry openwork-only
 * timings that let each beat finish before the next.
 */
const BEE_SLIDES: Omit<SlideEntry, "theme">[] = [
  {
    id: "bee-00-blank",
    title: "Blank",
    Component: BeeBlank,
    steps: 0,
  },
  {
    id: "bee-01-title",
    title: "Bee",
    Component: BeeTitle,
    steps: 2,
    // The flight lands at about 3 s; then the name, then the line under it.
    autoMs: [3100, 1400],
  },
  {
    id: "bee-02-problem",
    title: "The problem",
    Component: BeeProblem,
    steps: 2,
    // The clock runs while you search: leave time to watch it.
    autoMs: [1100, 4500],
  },
  {
    id: "bee-03-notch",
    title: "Meet the notch",
    Component: BeeNotch,
    steps: 2,
    // A moment on the wide call before the zoom, then time to watch it listen.
    autoMs: [2800, 3200],
  },
  {
    id: "bee-04-listens",
    title: "Listens, finds, tips",
    Component: BeeListens,
    steps: 3,
    autoMs: [1100, 2200, 2200],
  },
  {
    id: "bee-05-web",
    title: "Answers from the web",
    Component: BeeWeb,
    // Three questions: each is heard and searched, then its sources show.
    steps: 6,
    autoMs: [1100, 2800, 2600, 2800, 2600, 2800],
  },
  {
    id: "bee-11-real-meeting",
    title: "A convo with Krzys",
    Component: BeeRealMeeting,
    steps: 3,
    // Each round types four searches (about 10.7 s) before moving on.
    autoMs: [1100, 11400, 11400],
  },
  {
    id: "bee-06-summary",
    title: "The summary",
    Component: BeeSummary,
    steps: 5,
    autoMs: [3000, 1800, 1500, 1800, 1800],
  },
  {
    id: "bee-07-teams",
    title: "Better together",
    Component: BeeTeams,
    steps: 7,
    // Six lines of conversation, each typed out before the next voice, then the point.
    autoMs: [1300, 2200, 2200, 2200, 2200, 2200, 2200],
  },
  {
    id: "bee-14-compare",
    title: "Teams and Bee",
    Component: BeeCompare,
    steps: 3,
    // Openwork-only: one row at a time, with time to read each.
    autoMs: [1100, 2200, 2200],
  },
  {
    id: "bee-08-private",
    title: "Private by design",
    Component: BeePrivate,
    steps: 2,
    // Openwork-only: the bar hides as you share, then the four promises.
    autoMs: [1100, 2600],
  },
  {
    id: "bee-13-cost",
    title: "Already paid for",
    Component: BeeCost,
    steps: 2,
    autoMs: [1100, 4500],
  },
  {
    id: "bee-09-tools",
    title: "Your tools",
    Component: BeeTools,
    steps: 2,
    // Openwork-only: the first three connect, then Outlook and Teams.
    autoMs: [1100, 2400],
  },
  {
    id: "bee-12-background",
    title: "Works in the background",
    Component: BeeBackground,
    steps: 4,
    // Openwork-only: the chores list and the thread each finish building
    // before the next beat.
    autoMs: [1100, 3000, 3200, 2400],
  },
  {
    id: "bee-10-close",
    title: "Try it",
    Component: BeeClose,
    steps: 4,
    autoMs: [1600, 1700, 1800, 1400],
  },
];

/** Light stage throughout. */
export const SLIDES: SlideEntry[] = BEE_SLIDES.map(
  (slide): SlideEntry => ({ ...slide, theme: "light" }),
);
