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
    <div className="slide-list">
      <button className="btn primary" onClick={onAdd}>
        + Add slide
      </button>
      {slides.map((slide, index) => (
        <button
          key={slide._id}
          className={`slide-thumb ${slide._id === activeSlideId ? "active" : ""}`}
          onClick={() => onSelect(slide._id)}
        >
          <span className="index">{index + 1}</span>
          <span className="mini">
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
