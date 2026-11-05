import { SLIDES } from "@/slides/nh-cost-calculator/slides";
import type { SpeakerNotesResult } from "@/slides/types";

/**
 * Presenter script — one entry per slide `id` in `slides/index.ts`, copied
 * verbatim from the source PowerPoint's speaker notes ("" where it had none).
 * Rendered with `whitespace-pre-wrap` in presenter view.
 */
const SPEAKER_NOTES: Record<string, string> = {
  "01": "",
  "02": "",
  "03": "",
  "04": "",
  "05": "",
  "06": "",
  "07": "",
  "08": "",
  "09": "",
  "10": "",
  "11": "",
  "12": "",
  "13": "",
  "14": "",
  "15": "",
  "16": "",
  "17": "",
  "18": "",
  "19": "",
  "20": "",
  "21": "",
};

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
