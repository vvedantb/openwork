import { SlidePlayer } from "@/components/SlidePlayer";
import type { SlideDoc, SlideId } from "@/types";

export type SlideListProps = {
  slides: SlideDoc[];
  activeSlideId: SlideId | null;
  background: string;
  accent: string;
  onSelect: (id: SlideId) => void;
  onAdd: () => void;
  onDelete: (id: SlideId) => void;
};

export function SlideList({
  slides,
  activeSlideId,
  background,
  accent,
  onSelect,
  onAdd,
  onDelete,
}: SlideListProps) {
  return (
    <div className="pane-body tight">
      <button
        className="btn primary"
        onClick={onAdd}
        style={{ justifyContent: "center", marginBottom: 6 }}
      >
        + Add slide
      </button>
      {slides.map((slide, index) => (
        <button
          key={slide._id}
          className={`slide-thumb ${slide._id === activeSlideId ? "active" : ""}`}
          onClick={() => onSelect(slide._id)}
        >
          <span className="slide-thumb-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="slide-thumb-frame">
            <SlidePlayer
              slide={slide}
              background={background}
              accent={accent}
              autoPlay={false}
            />
          </span>
        </button>
      ))}
      {slides.length > 1 && activeSlideId ? (
        <button
          className="btn danger"
          style={{ justifyContent: "center", marginTop: 8 }}
          onClick={() => {
            if (confirm("Delete this slide?")) onDelete(activeSlideId);
          }}
        >
          Delete current slide
        </button>
      ) : null}
    </div>
  );
}
