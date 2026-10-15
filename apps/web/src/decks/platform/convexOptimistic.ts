import type { OptimisticLocalStore } from "convex/browser";
import type { FunctionArgs, FunctionReturnType } from "convex/server";
import { api } from "backend/convex/_generated/api";

// Optimistic local-store patches for the live-share and poll mutations, so
// votes and slide moves render instantly instead of after the round-trip.

type PollResults = FunctionReturnType<typeof api.presentations.pollResults>;

function bumpPollOption(
  results: PollResults,
  optionId: string,
  delta: number,
): PollResults {
  const options = results.options.map((option) =>
    option.optionId === optionId
      ? { ...option, count: Math.max(0, option.count + delta) }
      : option,
  );
  if (delta > 0 && !options.some((option) => option.optionId === optionId)) {
    options.push({ optionId, count: delta });
  }
  return {
    options: options.filter((option) => option.count > 0),
    total: Math.max(0, results.total + delta),
  };
}

export function applySendVoteOptimistic(
  localStore: OptimisticLocalStore,
  args: FunctionArgs<typeof api.presentations.sendVote>,
): void {
  const myArgs = {
    code: args.code,
    pollId: args.pollId,
    participantKey: args.participantKey,
  };
  const mine = localStore.getQuery(
    api.presentations.getMyPollSelections,
    myArgs,
  );
  const results = localStore.getQuery(api.presentations.pollResults, {
    code: args.code,
    pollId: args.pollId,
  });
  const previous = mine?.[0];
  if (previous === args.optionId) {
    return;
  }
  if (mine !== undefined) {
    localStore.setQuery(api.presentations.getMyPollSelections, myArgs, [
      args.optionId,
    ]);
  }
  if (results === undefined) return;
  let next = results;
  if (previous !== undefined) {
    next = bumpPollOption(next, previous, -1);
  }
  next = bumpPollOption(next, args.optionId, 1);
  localStore.setQuery(
    api.presentations.pollResults,
    { code: args.code, pollId: args.pollId },
    next,
  );
}

export function applyTogglePollOptionOptimistic(
  localStore: OptimisticLocalStore,
  args: FunctionArgs<typeof api.presentations.togglePollOption>,
): void {
  const myArgs = {
    code: args.code,
    pollId: args.pollId,
    participantKey: args.participantKey,
  };
  const mine = localStore.getQuery(
    api.presentations.getMyPollSelections,
    myArgs,
  );
  const results = localStore.getQuery(api.presentations.pollResults, {
    code: args.code,
    pollId: args.pollId,
  });
  const selected = new Set(mine ?? []);
  const removing = selected.has(args.optionId);
  if (mine !== undefined) {
    if (removing) selected.delete(args.optionId);
    else selected.add(args.optionId);
    localStore.setQuery(api.presentations.getMyPollSelections, myArgs, [
      ...selected,
    ]);
  }
  if (results === undefined) return;
  localStore.setQuery(
    api.presentations.pollResults,
    { code: args.code, pollId: args.pollId },
    bumpPollOption(results, args.optionId, removing ? -1 : 1),
  );
}

export function applyClearPollVotesOptimistic(
  localStore: OptimisticLocalStore,
  args: FunctionArgs<typeof api.presentations.clearPollVotes>,
): void {
  const empty: PollResults = { options: [], total: 0 };
  localStore.setQuery(
    api.presentations.pollResults,
    { code: args.code, pollId: args.pollId },
    empty,
  );
  for (const entry of localStore.getAllQueries(
    api.presentations.getMyPollSelections,
  )) {
    if (
      entry.args.code !== args.code ||
      entry.args.pollId !== args.pollId ||
      entry.value === undefined
    ) {
      continue;
    }
    localStore.setQuery(api.presentations.getMyPollSelections, entry.args, []);
  }
}

export function applySetSlideOptimistic(
  localStore: OptimisticLocalStore,
  args: FunctionArgs<typeof api.presentations.setSlide>,
): void {
  const session = localStore.getQuery(api.presentations.getSession, {
    code: args.code,
  });
  if (session == null) return;
  localStore.setQuery(
    api.presentations.getSession,
    { code: args.code },
    { ...session, slide: args.slide },
  );
}

export function applyStopSharingOptimistic(
  localStore: OptimisticLocalStore,
  args: FunctionArgs<typeof api.presentations.stopSharing>,
): void {
  const session = localStore.getQuery(api.presentations.getSession, {
    code: args.code,
  });
  if (session == null) return;
  localStore.setQuery(
    api.presentations.getSession,
    { code: args.code },
    { ...session, status: "ended" },
  );
}
