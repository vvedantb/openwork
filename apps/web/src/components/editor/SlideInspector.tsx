import { useState } from "react";
import type {
  HeadingElement,
  ShapeElement,
  SlideDoc,
  SlideElement,
  SlideTransition,
  TextElement,
} from "@/types";

export type SlideInspectorProps = {
  slide: SlideDoc;
  accent: string;
  onUpdate: (patch: {
    title?: string;
    transition?: SlideTransition;
    background?: string;
    elements?: SlideElement[];
  }) => void;
};

const TRANSITIONS: SlideTransition[] = ["none", "fade", "slide", "zoom"];

export function SlideInspector({ slide, accent, onUpdate }: SlideInspectorProps) {
  const [titleDraft, setTitleDraft] = useState(slide.title);

  function patchElements(next: SlideElement[]) {
    onUpdate({ elements: next });
  }

  function addHeading() {
    const id = `heading-${Date.now()}`;
    const element: HeadingElement = {
      id,
      kind: "heading",
      text: "New heading",
      x: 120,
      y: 220,
      width: 1680,
      height: 160,
      fontSize: 88,
      color: "#ffffff",
    };
    patchElements([...slide.elements, element]);
  }

  function addText() {
    const id = `text-${Date.now()}`;
    const element: TextElement = {
      id,
      kind: "text",
      text: "Body text",
      x: 120,
      y: 420,
      width: 1680,
      height: 200,
      fontSize: 36,
      color: "#cbd5f5",
    };
    patchElements([...slide.elements, element]);
  }

  function addShape(shape: ShapeElement["shape"]) {
    const id = `shape-${Date.now()}`;
    const element: ShapeElement = {
      id,
      kind: "shape",
      shape,
      x: 700,
      y: 360,
      width: 520,
      height: 360,
      fill: accent,
    };
    patchElements([...slide.elements, element]);
  }

  function removeElement(id: string) {
    patchElements(slide.elements.filter((element) => element.id !== id));
  }

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: 12, overflow: "auto" }}>
      <div className="field">
        <label>Slide title</label>
        <input
          value={titleDraft}
          onChange={(event) => setTitleDraft(event.target.value)}
          onBlur={() => {
            if (titleDraft !== slide.title) onUpdate({ title: titleDraft });
          }}
        />
      </div>

      <div className="field">
        <label>Transition</label>
        <select
          value={slide.transition}
          onChange={(event) =>
            onUpdate({ transition: event.target.value as SlideTransition })
          }
        >
          {TRANSITIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Slide background (overrides deck)</label>
        <div className="row" style={{ gap: 8 }}>
          <input
            type="color"
            className="color-input"
            value={slide.background ?? "#0b1020"}
            onChange={(event) => onUpdate({ background: event.target.value })}
          />
          {slide.background ? (
            <button
              className="btn"
              onClick={() => onUpdate({ background: "" })}
              title="Use deck background"
            >
              Clear
            </button>
          ) : (
            <span className="muted" style={{ fontSize: 12 }}>
              Using deck background
            </span>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="row" style={{ flexWrap: "wrap" }}>
        <button className="btn" onClick={addHeading}>
          + Heading
        </button>
        <button className="btn" onClick={addText}>
          + Text
        </button>
        <button className="btn" onClick={() => addShape("rectangle")}>
          + Rect
        </button>
        <button className="btn" onClick={() => addShape("circle")}>
          + Circle
        </button>
        <button className="btn" onClick={() => addShape("triangle")}>
          + Triangle
        </button>
      </div>

      <div className="divider" />

      <div className="field">
        <label>Elements ({slide.elements.length})</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.elements.map((element) => (
            <ElementRow
              key={element.id}
              element={element}
              onChange={(next) =>
                patchElements(
                  slide.elements.map((current) =>
                    current.id === next.id ? next : current,
                  ),
                )
              }
              onRemove={() => removeElement(element.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type ElementRowProps = {
  element: SlideElement;
  onChange: (next: SlideElement) => void;
  onRemove: () => void;
};

function ElementRow({ element, onChange, onRemove }: ElementRowProps) {
  return (
    <div
      className="card"
      style={{
        padding: 10,
        gap: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="row spread">
        <strong style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {element.kind === "shape" ? `shape · ${element.shape}` : element.kind}
        </strong>
        <button className="btn danger" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="row" style={{ gap: 6, flexWrap: "wrap" }}>
        <NumberField
          label="X"
          value={element.x}
          onChange={(value) => onChange({ ...element, x: value })}
        />
        <NumberField
          label="Y"
          value={element.y}
          onChange={(value) => onChange({ ...element, y: value })}
        />
        <NumberField
          label="W"
          value={element.width}
          onChange={(value) => onChange({ ...element, width: value })}
        />
        <NumberField
          label="H"
          value={element.height}
          onChange={(value) => onChange({ ...element, height: value })}
        />
      </div>
      {element.kind === "heading" || element.kind === "text" ? (
        <div className="row" style={{ gap: 6 }}>
          <NumberField
            label="Font"
            value={element.fontSize}
            onChange={(value) => onChange({ ...element, fontSize: value })}
          />
          <div className="field" style={{ flex: 1 }}>
            <label>Colour</label>
            <input
              type="color"
              className="color-input"
              value={element.color}
              onChange={(event) =>
                onChange({ ...element, color: event.target.value })
              }
            />
          </div>
        </div>
      ) : null}
      {element.kind === "shape" ? (
        <div className="field">
          <label>Fill</label>
          <input
            type="color"
            className="color-input"
            value={element.fill}
            onChange={(event) =>
              onChange({ ...element, fill: event.target.value })
            }
          />
        </div>
      ) : null}
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="field" style={{ width: 70 }}>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (!Number.isNaN(parsed)) onChange(parsed);
        }}
      />
    </div>
  );
}
