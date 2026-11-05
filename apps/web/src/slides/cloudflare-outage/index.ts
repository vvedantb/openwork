import { SLIDES } from "./slides";
import { getSpeakerNotes } from "./speakerNotes";
import type { DeckManifest } from "@/slides/types";

export const cloudflareOutageDeck: DeckManifest = {
  id: "cloudflare-outage",
  title: "Cloudflare outage (18 Nov 2025)",
  description:
    "Friday session on the 18 Nov 2025 Cloudflare outage — impact, CDN context, and mitigation.",
  slides: SLIDES,
  getSpeakerNotes,
};
