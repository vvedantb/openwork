import { createFileRoute, Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="landing">
      <div className="landing-copy stagger">
        <p className="eyebrow">Folio — Studio for slide decks</p>
        <h1 className="hero-title">
          Decks that <em>move</em>,
          <br />
          rendered with <span className="stroke">Remotion</span>.
        </h1>
        <p className="hero-lede">
          A small, opinionated studio for building presentations as code.
          Animated slides, speaker notes, fullscreen playback, and a keyboard
          that actually works.
        </p>
        <div className="landing-actions">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn primary">Start a deck</button>
            </SignInButton>
            <a
              className="btn ghost"
              href="https://www.remotion.dev"
              target="_blank"
              rel="noreferrer"
            >
              About Remotion ↗
            </a>
          </SignedOut>
          <SignedIn>
            <Link to="/presentations" className="btn primary">
              Open your decks
            </Link>
            <Link to="/presentations" className="btn ghost">
              New deck
            </Link>
          </SignedIn>
        </div>

        <div className="feature-line">
          <div className="feature">
            <span className="feature-name">01 / Motion</span>
            <span className="feature-desc">Spring entrances, no fuss.</span>
          </div>
          <div className="feature">
            <span className="feature-name">02 / Notes</span>
            <span className="feature-desc">Speaker view, only for you.</span>
          </div>
          <div className="feature">
            <span className="feature-name">03 / Keys</span>
            <span className="feature-desc">F, N, arrows, space, escape.</span>
          </div>
        </div>
      </div>

      <aside className="landing-aside">
        <div className="landing-aside-content stagger">
          <div className="aside-meta">
            <span>Vol. 01</span>
            <span>Spring &rsquo;26</span>
          </div>
          <div className="aside-stage" aria-hidden="true">
            <PreviewSlide />
          </div>
          <p className="aside-caption">
            &ldquo;The way slides ought to feel — like turning pages, not
            clicking through a wizard.&rdquo;
          </p>
        </div>
      </aside>
    </section>
  );
}

function PreviewSlide() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "8% 9%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--type-paper-muted)",
        }}
      >
        01 — Opening
      </div>
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 350,
            fontSize: "clamp(28px, 4vw, 56px)",
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: "var(--type-paper)",
            margin: 0,
            fontVariationSettings: '"opsz" 96, "SOFT" 20',
          }}
        >
          A small studio
          <br />
          for <em style={{ color: "var(--accent)" }}>quiet</em> slides.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--type-paper-muted)",
            margin: "16px 0 0",
            maxWidth: "60%",
          }}
        >
          Written in Remotion. Designed for the room, not the demo reel.
        </p>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--type-paper-muted)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Folio</span>
        <span>01 / 12</span>
      </div>
    </div>
  );
}
