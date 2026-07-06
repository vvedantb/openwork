import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { getDeck } from "@/decks/registry";

export type RouterContext = {
  convex: ConvexReactClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { location } = useRouterState();
  const deckMatch = location.pathname.match(/^\/d\/([^/]+)/);
  const deckId = deckMatch?.[1];
  const deck = deckId ? getDeck(deckId) : undefined;
  const isPresenter = location.searchStr.includes("view=presenter");
  const isDeckStage = Boolean(deckId) && !isPresenter;

  if (isDeckStage || isPresenter) {
    return <Outlet />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="OpenDesign home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-wordmark">
            Open<em>Design</em>
          </span>
        </Link>
        {deck ? <span className="nav-deck-title">{deck.title}</span> : null}
      </header>
      <Outlet />
    </div>
  );
}
