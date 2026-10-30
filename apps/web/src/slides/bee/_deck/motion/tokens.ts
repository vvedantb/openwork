import type { Transition } from "motion/react";

/**
 * The deck's motion vocabulary, ported from Eva's deck. Every primitive and
 * every Bee slide draws from these, so the whole deck moves with one hand.
 */

type Bezier = [number, number, number, number];

/** Decelerating curve, no overshoot — the deck's everyday ease. */
export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1];

export const EASE: {
  readonly out: Bezier;
  readonly expo: Bezier;
  readonly inOut: Bezier;
  readonly in: Bezier;
} = {
  /** Everyday entrances: cards, chips, rows. */
  out: EASE_OUT,
  /** Long, film-like deceleration for hero moves: titles, masks, big numbers. */
  expo: [0.16, 1, 0.3, 1],
  /** Things that travel across and leave: sheens, washes, camera pans. */
  inOut: [0.65, 0, 0.35, 1],
  /** Exits: quick to get going, then gone. */
  in: [0.5, 0, 0.75, 0],
};

/** Seconds. Pick by the size of the thing moving, not by taste. */
export const DUR: {
  readonly fast: number;
  readonly base: number;
  readonly slow: number;
  readonly hero: number;
} = {
  /** Exits, dims, colour changes. */
  fast: 0.18,
  /** Small elements: chips, labels, icons. */
  base: 0.35,
  /** Cards, rows, panels. */
  slow: 0.6,
  /** Hero moves: titles, statements, the one thing on the step. */
  hero: 0.9,
};

/** Seconds between siblings. */
export const STAGGER: {
  readonly char: number;
  readonly word: number;
  readonly item: number;
  readonly block: number;
} = {
  /** Characters inside a hero word. */
  char: 0.028,
  /** Words inside a title or statement. */
  word: 0.07,
  /** Items in a list or grid. */
  item: 0.08,
  /** Big blocks: panels, columns. */
  block: 0.14,
};

/**
 * The deck's accent pair, as CSS variables that fall back to Eva's purple and
 * blue. Bee's `Shell` sets them (`.deck-brand-bee` in `beeBrand.css`), so the
 * accent text, glow and lines are honey without a per-slide change.
 */
export const ACCENT: {
  readonly a: string;
  readonly b: string;
  readonly c: string;
} = {
  a: "var(--deck-brand-a, #8B3FB8)",
  b: "var(--deck-brand-b, #3B7DD8)",
  c: "var(--deck-brand-c, #5A5FD0)",
};

export const ACCENT_GRADIENT = `linear-gradient(90deg, ${ACCENT.a}, ${ACCENT.b})`;

/** An accent colour at a strength, for glows and washes built from `ACCENT`. */
export function accentMix(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

/** Hero entrance: long expo tween. */
export const HERO: Transition = { duration: DUR.hero, ease: EASE.expo };

/** Leaving is quieter than arriving: short, no delay. */
export const LEAVE: Transition = { duration: DUR.fast, ease: EASE.out };

/** Enter on `on` with the given delay, leave instantly otherwise. */
export function cueTransition(
  on: boolean,
  delay: number,
  enter: Transition = HERO,
): Transition {
  return on ? { ...enter, delay } : LEAVE;
}
