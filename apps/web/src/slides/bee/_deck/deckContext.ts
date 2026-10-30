import { createContext, useContext } from "react";
import {
  SlideStepContext,
  SlideThemeContext,
} from "@/slides/platform/SlideShell";
import type { SlideTheme } from "@/slides/types";

/**
 * The current build step of the active slide, read from openwork's
 * `SlideStepContext` (provided by `SlideDeck` and the slide previews). 0 = the
 * slide's resting state, before any step has played.
 */
export function useDeckStep(): number {
  return useContext(SlideStepContext);
}

/** The surface the active slide is painted on, from `SlideThemeContext`. */
export function useDeckTheme(): SlideTheme {
  return useContext(SlideThemeContext);
}

/**
 * When a self-animating primitive should play, and after what delay.
 * `MaskedText` provides it per word, so anything nested in a word lands with
 * that word. Outside any provider the cue is "on, now".
 */
export interface MotionCue {
  on: boolean;
  delay: number;
}

export const MotionCueContext = createContext<MotionCue>({
  on: true,
  delay: 0,
});

/**
 * Resolves when a primitive should play. An explicit `step` wins and starts
 * the clock at the primitive's own `delay`; without one, the primitive follows
 * the enclosing cue and adds its `delay` on top.
 */
export function useMotionCue(step?: number, delay = 0): MotionCue {
  const cue = useContext(MotionCueContext);
  const deckStep = useDeckStep();
  if (step !== undefined) return { on: deckStep >= step, delay };
  return { on: cue.on, delay: cue.delay + delay };
}
