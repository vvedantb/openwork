import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/decks/types";

export const vmemPitchDeck: DeckManifest = {
  id: "vmem-pitch",
  title: "vmem pitch",
  description:
    "Product pitch deck — memory layer for AI, with step-gated builds and live presenter sync.",
  slides: SLIDES,
  getSpeakerNotes,
};
