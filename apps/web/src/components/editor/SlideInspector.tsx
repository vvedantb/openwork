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
    <>
      <div className="inspector-section">
        <p className="section-label">Slide</p>
        <div className="field">
          <span className="field-label">Title</span>
          <input
            className="input"
            value={titleDraft}
            onChange={(event) => setTitleDraft(event.target.value)}
            onBlur={() => {
              if (titleDraft !== slide.title) onUpdate({ title: titleDraft });
            }}
            placeholder="Untitled slide"
          />
        </div>
        <div className="field">
          <span className="field-label">Transition</span>
          <select
            className="input"
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
          <span className="field-label">Background override</span>
          <div className="row" style={{ gap: 8 }}>
            <input
              type="color"
              className="color-input"
              value={slide.background ?? "#0b1020"}
              onChange={(event) => onUpdate({ background: event.target.value })}
            />
            {slide.background ? (
              <button
                className="btn ghost"
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
      </div>

      <div className="inspector-section">
        <p className="section-label">Add element</p>
        <div className="tool-chip-grid">
          <button className="tool-chip" onClick={addHeading} title="Heading">
            <span className="tool-chip-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 3v10M13 3v10M3 8h10"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            Heading
          </button>
          <button className="tool-chip" onClick={addText} title="Body text">
            <span className="tool-chip-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 4h12M2 8h12M2 12h8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                />
              </svg>
            </span>
            Text
          </button>
          <button
            className="tool-chip"
            onClick={() => addShape("rectangle")}
            title="Rectangle"
          >
            <span className="tool-chip-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect
                  x="2"
                  y="3"
                  width="12"
                  height="10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </span>
            Rect
          </button>
          <button
            className="tool-chip"
            onClick={() => addShape("circle")}
            title="Circle"
          >
            <span className="tool-chip-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                />
              </svg>
            </span>
            Circle
          </button>
          <button
            className="tool-chip"
            onClick={() => addShape("triangle")}
            title="Triangle"
          >
            <span className="tool-chip-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.5 14 13H2L8 2.5z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Tri
          </button>
        </div>
      </div>

      <div className="inspector-section">
        <p className="section-label">
          Elements <span className="muted">({slide.elements.length})</span>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {slide.elements.length === 0 ? (
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              No elements yet. Add a heading or shape to get started.
            </p>
          ) : (
            slide.elements.map((element) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

type ElementRowProps = {
  element: SlideElement;
  onChange: (next: SlideElement) => void;
  onRemove: () => void;
};

function ElementRow({ element, onChange, onRemove }: ElementRowProps) {
  return (
    <div className="element-row">
      <div className="element-row-head">
        <span className="element-row-kind">
          {element.kind === "shape" ? `Shape · ${element.shape}` : element.kind}
        </span>
        <button
          className="btn danger"
          onClick={onRemove}
          style={{ padding: "4px 10px", fontSize: 11 }}
        >
          Remove
        </button>
      </div>
      <div className="field-row four">
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
        <div className="field-row">
          <NumberField
            label="Font"
            value={element.fontSize}
            onChange={(value) => onChange({ ...element, fontSize: value })}
          />
          <div className="field">
            <span className="field-label">Colour</span>
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
          <span className="field-label">Fill</span>
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
    <div className="field">
      <span className="field-label">{label}</span>
      <input
        type="number"
        className="input mono"
        value={value}
        onChange={(event) => {
          const parsed = Number(event.target.value);
          if (!Number.isNaN(parsed)) onChange(parsed);
        }}
      />
    </div>
  );
}
