import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const stateMachinesDeck: DeckManifest = {
  id: "state-machines",
  title: "State machines with XState",
  description:
    "An introduction to state machines and state management with XState, using a fictional shopping-cart example.",
  slides: SLIDES,
  getSpeakerNotes,
};
