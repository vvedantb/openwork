import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";
import "./evaBrand.css";

export const introToEvaDeck: DeckManifest = {
  id: "intro-to-eva",
  title: "Intro to Eva",
  description:
    "Product intro to Eva, the open-source AI dev platform: quick tasks, sessions, projects, PRs and sandboxes.",
  slides: SLIDES,
  getSpeakerNotes,
  // Eva's own font and palette, scoped to this deck (evaBrand.css).
  themeClassName: "deck-theme-eva",
};
