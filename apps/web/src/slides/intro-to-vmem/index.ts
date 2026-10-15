import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const introToVmemDeck: DeckManifest = {
  id: "intro-to-vmem",
  title: "Intro to vmem",
  description:
    "Product pitch deck — memory layer for AI, with step-gated builds and live presenter sync.",
  slides: SLIDES,
  getSpeakerNotes,
};
