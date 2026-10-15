import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import type { ConvexReactClient } from "convex/react";
import { getDeck } from "@/slides/registry";

export type RouterContext = {
  convex: ConvexReactClient;
};

const NAV_LINKS: { to: "/slides" | "/reports" | "/posters"; label: string }[] =
  [
    { to: "/slides", label: "Slides" },
    { to: "/reports", label: "Reports" },
    { to: "/posters", label: "Posters" },
  ];

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { location } = useRouterState();
  const deckMatch = location.pathname.match(/^\/slides\/([^/]+)/);
  const deckId = deckMatch?.[1];
  const deck = deckId ? getDeck(deckId) : undefined;
  const isPresenter = location.searchStr.includes("view=presenter");
  // Unknown ids keep the header so the not-found state has navigation.
  const isDeckStage = Boolean(deck) && !isPresenter;

  if (isDeckStage || isPresenter) {
    return <Outlet />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="OpenWork home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-wordmark">
            Open<em>Work</em>
          </span>
        </Link>
        <nav aria-label="Site">
          <Link
            to="/"
            className="nav-link"
            activeOptions={{ exact: true }}
            activeProps={{ className: "nav-link active" }}
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              activeProps={{ className: "nav-link active" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {deck ? <span className="nav-deck-title">{deck.title}</span> : null}
      </header>
      <Outlet />
    </div>
  );
}
