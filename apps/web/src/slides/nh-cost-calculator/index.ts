import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

/*
 * The `nh-cost-calculator` id is kept only for URL stability; the deck itself
 * is a generic state-machine / XState teaching talk.
 */
export const nhCostCalculatorDeck: DeckManifest = {
  id: "nh-cost-calculator",
  title: "State machines with XState",
  description:
    "An introduction to state machines and state management with XState, using a fictional shopping-cart example.",
  slides: SLIDES,
  getSpeakerNotes,
};
