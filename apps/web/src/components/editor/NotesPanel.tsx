import { useEffect, useState } from "react";
import type { SlideDoc } from "@/types";

export type NotesPanelProps = {
  slide: SlideDoc;
  onChange: (notes: string) => void;
};

export function NotesPanel({ slide, onChange }: NotesPanelProps) {
  const [draft, setDraft] = useState(slide.notes);

  useEffect(() => {
    setDraft(slide.notes);
  }, [slide._id, slide.notes]);

  return (
    <textarea
      className="notes-textarea"
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={() => {
        if (draft !== slide.notes) onChange(draft);
      }}
      placeholder="Write the words you'll say. Only you see them in present mode."
    />
  );
}
