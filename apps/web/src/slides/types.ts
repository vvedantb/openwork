import type { ComponentType } from "react";
import type { WorkSummary } from "@/catalog/types";

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
  /**
   * Optional per-step waits (ms): entry i is the gap before step i + 1. Use it
   * when one beat needs longer than the rest (a flight landing, a search being
   * typed). Steps it does not cover fall back to `staggerMs`.
   */
  autoMs?: readonly number[];
}

export interface SpeakerNotesResult {
  slideId: string;
  slideTitle: string;
  notes: string;
}

export interface DeckManifest extends WorkSummary {
  slides: SlideEntry[];
  getSpeakerNotes: (slideNumber: number) => SpeakerNotesResult;
  /**
   * Optional class that turns on the deck's own scoped theme (font, colour
   * tokens). SlideDeck and the presenter preview put it on an ancestor of the
   * slide's `.light` / `.dark` element, so the deck's CSS can target
   * `.<class> .light` and `.<class> .dark`. Decks without one use OpenWork's
   * theme. Example: `intro-to-eva/evaBrand.css`.
   */
  themeClassName?: string;
}
