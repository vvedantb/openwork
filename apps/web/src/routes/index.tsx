import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="page center">
      <div style={{ maxWidth: 560 }}>
        <h2
          style={{
            fontSize: 48,
            margin: 0,
            background: "linear-gradient(135deg, #4f7cff, #8a5cff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Slide decks, rendered with Remotion.
        </h2>
        <p className="muted" style={{ fontSize: 18, marginTop: 16 }}>
          Build presentations with proper motion. Speaker notes, fullscreen
          playback, and prev/next controls work the way they should.
        </p>
        <div className="row" style={{ marginTop: 24, justifyContent: "center" }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn primary">Get started</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link to="/presentations" className="btn primary">
              Open my decks
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
