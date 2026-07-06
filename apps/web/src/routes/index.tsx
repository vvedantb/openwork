import { Link, createFileRoute } from "@tanstack/react-router";
import { DECK_LIST, deckPath } from "@/decks/registry";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="landing">
      <div className="landing-copy stagger">
        <p className="eyebrow">OpenDesign</p>
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

        <div className="deck-catalog">
          {DECK_LIST.map((deck) => (
            <Link key={deck.id} to={deckPath(deck.id)} className="deck-card">
              <span className="deck-card-eyebrow">{deck.id}</span>
              <span className="deck-card-title">{deck.title}</span>
              <span className="deck-card-desc">{deck.description}</span>
              <span className="deck-card-meta">
                {deck.slides.length} slides
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
