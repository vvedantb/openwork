import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const beeDeck: DeckManifest = {
  id: "bee",
  title: "Bee",
  description:
    "Meeting assistant deck: Bee listens to your meeting and finds what you already know. Written for colleagues who are not technical.",
  slides: SLIDES,
  getSpeakerNotes,
};
