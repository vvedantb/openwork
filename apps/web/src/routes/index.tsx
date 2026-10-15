import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="landing">
      <div className="landing-copy stagger">
        <p className="eyebrow">OpenWork</p>
        <h1 className="hero-title">
          Deployed decks,
          <br />
          edited <em>locally</em>.
        </h1>
        <p className="hero-lede">
          Code-defined presentations with step-gated builds, presenter sync, and
          fullscreen playback. Ship a deck by committing to git — the site picks
          it up on deploy.
        </p>

        <div className="landing-actions">
          <Link to="/decks" className="btn primary">
            Browse decks
          </Link>
        </div>
      </div>
    </section>
  );
}
