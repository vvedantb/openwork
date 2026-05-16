import { useEffect, useRef, useState } from "react";
import { SlidePlayer } from "@/components/SlidePlayer";
import type { SlideDoc } from "@/types";

export type SlideStageProps = {
  slide: SlideDoc;
  background: string;
  accent: string;
  onUpdate: (patch: { elements: SlideDoc["elements"] }) => void;
};

export function SlideStage({
  slide,
  background,
  accent,
  onUpdate,
}: SlideStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [draftText, setDraftText] = useState("");

  useEffect(() => {
    setEditing(null);
  }, [slide._id]);

  function startEditing(elementId: string, currentText: string) {
    setEditing(elementId);
    setDraftText(currentText);
  }

  function commitEditing() {
    if (!editing) return;
    const next = slide.elements.map((element) => {
      if (element.id !== editing) return element;
      if (element.kind === "heading" || element.kind === "text") {
        return { ...element, text: draftText };
      }
      return element;
    });
    onUpdate({ elements: next });
    setEditing(null);
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        maxHeight: "100%",
        maxWidth: "100%",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <SlidePlayer
          slide={slide}
          background={background}
          accent={accent}
          autoPlay
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {slide.elements.map((element) => {
          if (element.kind !== "heading" && element.kind !== "text") {
            return null;
          }
          const isEditing = editing === element.id;
          return (
            <div
              key={element.id}
              onDoubleClick={() => startEditing(element.id, element.text)}
              style={{
                position: "absolute",
                left: `${(element.x / 1920) * 100}%`,
                top: `${(element.y / 1080) * 100}%`,
                width: `${(element.width / 1920) * 100}%`,
                height: `${(element.height / 1080) * 100}%`,
                pointerEvents: "auto",
                cursor: "text",
                outline: isEditing
                  ? "2px solid var(--accent)"
                  : "1px dashed rgba(255,255,255,0.08)",
                borderRadius: 4,
                padding: 2,
                background: isEditing ? "rgba(0,0,0,0.4)" : "transparent",
                display: "flex",
                alignItems: element.kind === "heading" ? "center" : "flex-start",
              }}
            >
              {isEditing ? (
                <textarea
                  autoFocus
                  value={draftText}
                  onChange={(event) => setDraftText(event.target.value)}
                  onBlur={commitEditing}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setEditing(null);
                    }
                    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                      commitEditing();
                    }
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    border: "none",
                    color: element.color,
                    outline: "none",
                    resize: "none",
                    fontWeight: element.kind === "heading" ? 800 : 400,
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        className="muted"
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: 11,
          pointerEvents: "none",
        }}
      >
        Double-click text to edit
      </div>
    </div>
  );
}
