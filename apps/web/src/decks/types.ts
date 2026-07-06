import type { ComponentType } from "react";

export type SlideTheme = "dark" | "light";

export interface SlideEntry {
  id: string;
  title: string;
  theme: SlideTheme;
  Component: ComponentType;
  steps: number;
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
