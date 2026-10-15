import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy catalog URL; Vercel redirects first, this covers dev and preview. */
export const Route = createFileRoute("/decks")({
  beforeLoad: () => {
    throw redirect({ to: "/slides", replace: true });
  },
});
