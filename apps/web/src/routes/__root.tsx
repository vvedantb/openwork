import {
  Outlet,
  createRootRouteWithContext,
  Link,
  useRouterState,
} from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import type { ConvexReactClient } from "convex/react";

export type RouterContext = {
  convex: ConvexReactClient;
  auth: {
    isSignedIn: boolean;
    isLoaded: boolean;
    userId: string | null;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { location } = useRouterState();
  const isPresent = location.pathname.endsWith("/present");

  if (isPresent) {
    return <Outlet />;
  }

  const isDecks = location.pathname.startsWith("/presentations");

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="Folio home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-wordmark">
            Folio<em>.</em>
          </span>
        </Link>
        <nav aria-label="Primary">
          <SignedIn>
            <Link
              to="/presentations"
              className={`nav-link ${isDecks ? "active" : ""}`}
            >
              Decks
            </Link>
            <a
              className="nav-link"
              href="https://www.remotion.dev/docs"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
          </SignedIn>
        </nav>
        <div className="header-actions">
          <SignedIn>
            <Link to="/presentations" className="btn ghost">
              My decks
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn primary">Sign in</button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
