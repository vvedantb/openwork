/*
 * Bee's slide vocabulary: the parts of Eva's deck engine the Bee slides use,
 * ported to openwork (React 18, Tailwind 3, `SlideStepContext`). One import
 * for every slide.
 */
export { useDeckStep } from "./deckContext";
export { Shell, Title } from "./DeckText";
export { Accent } from "./DeckAccent";
export { Camera } from "./DeckCamera";
export type { CameraShot } from "./DeckCamera";
export { CountUp } from "./CountUp";
export { EvaDiscMark } from "./EvaDiscMark";
export { GrokMark } from "./GrokMark";
export { DUR, EASE, cueTransition } from "./motion/tokens";
export { Connector } from "./motion/Connector";
export { DrawPath } from "./motion/DrawPath";
export { Spotlight } from "./motion/Spotlight";
