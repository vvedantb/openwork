import type { Doc, Id } from "backend/convex/_generated/dataModel";

export type Presentation = Doc<"presentations">;
export type SlideDoc = Doc<"slides">;
export type SlideElement = SlideDoc["elements"][number];
export type SlideTransition = SlideDoc["transition"];
export type PresentationId = Id<"presentations">;
export type SlideId = Id<"slides">;

export type HeadingElement = Extract<SlideElement, { kind: "heading" }>;
export type TextElement = Extract<SlideElement, { kind: "text" }>;
export type ShapeElement = Extract<SlideElement, { kind: "shape" }>;

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
