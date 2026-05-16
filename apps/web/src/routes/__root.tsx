import {
  Outlet,
  createRootRouteWithContext,
  Link,
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
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="row">
          <Link to="/">
            <h1>Remotion Slides</h1>
          </Link>
        </div>
        <div className="actions">
          <SignedIn>
            <Link to="/presentations" className="btn">
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
