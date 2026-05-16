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
    <div className="card">
      <div className="field">
        <label>Speaker notes</label>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            if (draft !== slide.notes) onChange(draft);
          }}
          placeholder="Notes that only you see during presentation mode"
        />
      </div>
    </div>
  );
}
