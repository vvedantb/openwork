import { SLIDES } from "@/slides/bee/slides";
import type { SpeakerNotesResult } from "@/slides/types";

/**
 * Presenter script — one entry per slide `id` in `slides/index.ts`. Eva's Bee
 * deck had no notes, so none are written yet; add them here as plain strings.
 * Rendered with `whitespace-pre-wrap` in presenter view and never sent over
 * the share session.
 */
const SPEAKER_NOTES: Record<string, string> = {};

export function getSpeakerNotes(slideNumber: number): SpeakerNotesResult {
  const entry = SLIDES[slideNumber - 1];
  if (!entry) {
    return { slideId: "", slideTitle: "", notes: "" };
  }
  return {
    slideId: entry.id,
    slideTitle: entry.title,
    notes: SPEAKER_NOTES[entry.id] ?? "",
  };
}
