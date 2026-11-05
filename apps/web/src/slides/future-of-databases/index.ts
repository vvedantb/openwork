import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const futureOfDatabasesDeck: DeckManifest = {
  id: "future-of-databases",
  title: "The future of databases (Convex)",
  description:
    "Friday session introducing Convex — live updates, preview DBs, migrations, and AI-era primitives.",
  slides: SLIDES,
  getSpeakerNotes,
};
