import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const nhCostCalculatorDeck: DeckManifest = {
  id: "nh-cost-calculator",
  title: "State machines / NH cost calculator",
  description:
    "Friday session on using XState state machines for the nursing-home cost calculator.",
  slides: SLIDES,
  getSpeakerNotes,
};
