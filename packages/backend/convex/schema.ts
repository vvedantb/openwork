import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  presentationSessions: defineTable({
    code: v.string(),
    hostKey: v.string(),
    slide: v.number(),
    status: v.union(v.literal("live"), v.literal("ended")),
    lastActiveAt: v.number(),
  }).index("by_code", ["code"]),

  presentationVotes: defineTable({
    code: v.string(),
    pollId: v.string(),
    participantKey: v.string(),
    optionId: v.string(),
  })
    .index("by_code_poll", ["code", "pollId"])
    .index("by_code_poll_participant", ["code", "pollId", "participantKey"])
    .index("by_code_poll_participant_option", [
      "code",
      "pollId",
      "participantKey",
      "optionId",
    ]),
});
