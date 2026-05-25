import type { PresentationId, SlideDoc, SlideId } from "@/types";
import type { DeckCompositionProps } from "./deck-props";

export const DEFAULT_SAMPLE_SLIDE = {
  _id: "sample-slide" as SlideId,
  _creationTime: 0,
  presentationId: "sample-presentation" as PresentationId,
  order: 0,
  title: "Sample slide",
  notes: "",
  transition: "fade",
  elements: [
    {
      id: "heading-1",
      kind: "heading",
      text: "Folio deck export",
      x: 120,
      y: 180,
      width: 1200,
      height: 120,
      fontSize: 72,
      color: "#f5f0e8",
    },
    {
      id: "text-1",
      kind: "text",
      text: "Rendered with Remotion",
      x: 120,
      y: 320,
      width: 900,
      height: 80,
      fontSize: 36,
      color: "#c9bfb0",
    },
  ],
} satisfies SlideDoc;

export const DEFAULT_DECK_PROPS = {
  slides: [DEFAULT_SAMPLE_SLIDE],
  background: "#1a1814",
  accent: "#e8a849",
} satisfies DeckCompositionProps;

export const DEFAULT_SLIDE_PROPS = {
  slide: DEFAULT_SAMPLE_SLIDE,
  background: DEFAULT_DECK_PROPS.background,
  accent: DEFAULT_DECK_PROPS.accent,
};
