import { createFileRoute, redirect } from "@tanstack/react-router";
import { resolveDeckId } from "@/slides/registry";

/** Legacy deck URL; Vercel redirects first, this covers dev and preview. */
export const Route = createFileRoute("/d/$deckId")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/slides/$deckId",
      params: { deckId: resolveDeckId(params.deckId) },
      search: true,
      replace: true,
    });
  },
});
