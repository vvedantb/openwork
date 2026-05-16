import { v } from "convex/values";
import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";
import { slideElement, slideTransition } from "./schema";
import type { Doc, Id } from "./_generated/dataModel";

async function requireIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

async function requireOwnedPresentation(
  ctx: QueryCtx | MutationCtx,
  presentationId: Id<"presentations">,
): Promise<Doc<"presentations">> {
  const identity = await requireIdentity(ctx);
  const presentation = await ctx.db.get(presentationId);
  if (!presentation || presentation.ownerSubject !== identity.subject) {
    throw new Error("Not authorised");
  }
  return presentation;
}

async function requireOwnedSlide(
  ctx: QueryCtx | MutationCtx,
  slideId: Id<"slides">,
): Promise<Doc<"slides">> {
  const slide = await ctx.db.get(slideId);
  if (!slide) throw new Error("Slide not found");
  await requireOwnedPresentation(ctx, slide.presentationId);
  return slide;
}

export const listForPresentation = query({
  args: { presentationId: v.id("presentations") },
  handler: async (ctx, args) => {
    await requireOwnedPresentation(ctx, args.presentationId);
    const slides = await ctx.db
      .query("slides")
      .withIndex("by_presentation_order", (q) =>
        q.eq("presentationId", args.presentationId),
      )
      .collect();
    return slides.sort((a, b) => a.order - b.order);
  },
});

export const add = mutation({
  args: { presentationId: v.id("presentations") },
  handler: async (ctx, args) => {
    await requireOwnedPresentation(ctx, args.presentationId);
    const slides = await ctx.db
      .query("slides")
      .withIndex("by_presentation", (q) =>
        q.eq("presentationId", args.presentationId),
      )
      .collect();
    const nextOrder = slides.length;
    const slideId = await ctx.db.insert("slides", {
      presentationId: args.presentationId,
      order: nextOrder,
      title: `Slide ${nextOrder + 1}`,
      notes: "",
      transition: "fade",
      elements: [
        {
          id: `heading-${nextOrder + 1}`,
          kind: "heading",
          text: `Slide ${nextOrder + 1}`,
          x: 120,
          y: 220,
          width: 1680,
          height: 160,
          fontSize: 88,
          color: "#ffffff",
        },
      ],
    });
    await ctx.db.patch(args.presentationId, { updatedAt: Date.now() });
    return slideId;
  },
});

export const update = mutation({
  args: {
    id: v.id("slides"),
    title: v.optional(v.string()),
    notes: v.optional(v.string()),
    transition: v.optional(slideTransition),
    elements: v.optional(v.array(slideElement)),
    background: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slide = await requireOwnedSlide(ctx, args.id);
    const patch: Partial<Doc<"slides">> = {};
    if (args.title !== undefined) patch.title = args.title;
    if (args.notes !== undefined) patch.notes = args.notes;
    if (args.transition !== undefined) patch.transition = args.transition;
    if (args.elements !== undefined) patch.elements = args.elements;
    if (args.background !== undefined) patch.background = args.background;
    await ctx.db.patch(args.id, patch);
    await ctx.db.patch(slide.presentationId, { updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("slides") },
  handler: async (ctx, args) => {
    const slide = await requireOwnedSlide(ctx, args.id);
    await ctx.db.delete(args.id);
    const remaining = await ctx.db
      .query("slides")
      .withIndex("by_presentation_order", (q) =>
        q.eq("presentationId", slide.presentationId),
      )
      .collect();
    const sorted = remaining.sort((a, b) => a.order - b.order);
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].order !== i) {
        await ctx.db.patch(sorted[i]._id, { order: i });
      }
    }
    await ctx.db.patch(slide.presentationId, { updatedAt: Date.now() });
  },
});

export const reorder = mutation({
  args: {
    presentationId: v.id("presentations"),
    orderedIds: v.array(v.id("slides")),
  },
  handler: async (ctx, args) => {
    await requireOwnedPresentation(ctx, args.presentationId);
    for (let i = 0; i < args.orderedIds.length; i++) {
      const slide = await ctx.db.get(args.orderedIds[i]);
      if (!slide || slide.presentationId !== args.presentationId) {
        throw new Error("Slide does not belong to presentation");
      }
      if (slide.order !== i) {
        await ctx.db.patch(slide._id, { order: i });
      }
    }
    await ctx.db.patch(args.presentationId, { updatedAt: Date.now() });
  },
});
