import { v } from "convex/values";
import { mutation, query, type QueryCtx, type MutationCtx } from "./_generated/server";

async function requireIdentity(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Not authenticated");
  }
  return identity;
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireIdentity(ctx);
    const rows = await ctx.db
      .query("presentations")
      .withIndex("by_owner", (q) => q.eq("ownerSubject", identity.subject))
      .order("desc")
      .collect();
    return rows;
  },
});

export const get = query({
  args: { id: v.id("presentations") },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const presentation = await ctx.db.get(args.id);
    if (!presentation) return null;
    if (presentation.ownerSubject !== identity.subject) {
      throw new Error("Not authorised");
    }
    return presentation;
  },
});

export const create = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const now = Date.now();
    const presentationId = await ctx.db.insert("presentations", {
      ownerSubject: identity.subject,
      title: args.title,
      background: "#0b1020",
      accent: "#4f7cff",
      updatedAt: now,
    });

    await ctx.db.insert("slides", {
      presentationId,
      order: 0,
      title: args.title,
      notes: "",
      transition: "fade",
      elements: [
        {
          id: "heading-1",
          kind: "heading",
          text: args.title,
          x: 120,
          y: 220,
          width: 1680,
          height: 160,
          fontSize: 96,
          color: "#ffffff",
        },
        {
          id: "text-1",
          kind: "text",
          text: "Click to edit",
          x: 120,
          y: 420,
          width: 1680,
          height: 80,
          fontSize: 36,
          color: "#cbd5f5",
        },
      ],
    });

    return presentationId;
  },
});

export const rename = mutation({
  args: { id: v.id("presentations"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const presentation = await ctx.db.get(args.id);
    if (!presentation || presentation.ownerSubject !== identity.subject) {
      throw new Error("Not authorised");
    }
    await ctx.db.patch(args.id, { title: args.title, updatedAt: Date.now() });
  },
});

export const updateTheme = mutation({
  args: {
    id: v.id("presentations"),
    background: v.string(),
    accent: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const presentation = await ctx.db.get(args.id);
    if (!presentation || presentation.ownerSubject !== identity.subject) {
      throw new Error("Not authorised");
    }
    await ctx.db.patch(args.id, {
      background: args.background,
      accent: args.accent,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("presentations") },
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const presentation = await ctx.db.get(args.id);
    if (!presentation || presentation.ownerSubject !== identity.subject) {
      throw new Error("Not authorised");
    }
    const slides = await ctx.db
      .query("slides")
      .withIndex("by_presentation", (q) => q.eq("presentationId", args.id))
      .collect();
    for (const slide of slides) {
      await ctx.db.delete(slide._id);
    }
    await ctx.db.delete(args.id);
  },
});
