import type { ComponentType } from "react";

export type SlideTheme = "dark" | "light";

export interface SlideEntry {
  id: string;
  title: string;
  theme: SlideTheme;
  Component: ComponentType;
  /**
   * Number of build steps beyond the initial (step 0) state. A slide where all
   * content appears on entry has steps: 0. Steps auto-reveal on a stagger once
   * the slide loads (see SlideDeck) — no clicking.
   */
  steps: number;
  /**
   * Optional per-slide override (ms) for the gap between auto-revealed build
   * steps. Defaults to DEFAULT_STAGGER_MS in SlideDeck. Use a smaller value on
   * slides with many quick steps so they do not drag.
   */
  staggerMs?: number;
}

export interface SpeakerNotesResult {
  slideId: string;
  slideTitle: string;
  notes: string;
}

export interface DeckManifest {
  id: string;
  title: string;
  description: string;
  slides: SlideEntry[];
  getSpeakerNotes: (slideNumber: number) => SpeakerNotesResult;
}
