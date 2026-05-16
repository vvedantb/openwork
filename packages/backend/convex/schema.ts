import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const slideElement = v.union(
  v.object({
    id: v.string(),
    kind: v.literal("heading"),
    text: v.string(),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    fontSize: v.number(),
    color: v.string(),
  }),
  v.object({
    id: v.string(),
    kind: v.literal("text"),
    text: v.string(),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    fontSize: v.number(),
    color: v.string(),
  }),
  v.object({
    id: v.string(),
    kind: v.literal("shape"),
    shape: v.union(
      v.literal("rectangle"),
      v.literal("circle"),
      v.literal("triangle"),
    ),
    x: v.number(),
    y: v.number(),
    width: v.number(),
    height: v.number(),
    fill: v.string(),
  }),
);

export const slideTransition = v.union(
  v.literal("none"),
  v.literal("fade"),
  v.literal("slide"),
  v.literal("zoom"),
);

export default defineSchema({
  presentations: defineTable({
    ownerSubject: v.string(),
    title: v.string(),
    background: v.string(),
    accent: v.string(),
    updatedAt: v.number(),
  }).index("by_owner", ["ownerSubject"]),

  slides: defineTable({
    presentationId: v.id("presentations"),
    order: v.number(),
    title: v.string(),
    notes: v.string(),
    transition: slideTransition,
    elements: v.array(slideElement),
    background: v.optional(v.string()),
  })
    .index("by_presentation", ["presentationId"])
    .index("by_presentation_order", ["presentationId", "order"]),
});
