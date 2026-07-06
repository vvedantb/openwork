import { Link, createFileRoute } from "@tanstack/react-router";
import { DECK_LIST, deckPath } from "@/decks/registry";

export const Route = createFileRoute("/decks")({
  component: DecksPage,
});

function DecksPage() {
  return (
    <section className="page">
      <div className="page-head">
        <div className="page-head-text stagger">
          <p className="eyebrow">Catalog</p>
          <h1 className="page-title">
            All <em>decks</em>
          </h1>
          <p className="hero-lede">
            Registered presentations in this deployment. Open any deck to
            present fullscreen or share a live session.
          </p>
        </div>
      </div>

      <div className="deck-catalog deck-catalog-page">
        {DECK_LIST.map((deck) => (
          <Link key={deck.id} to={deckPath(deck.id)} className="deck-card">
            <span className="deck-card-eyebrow">{deck.id}</span>
            <span className="deck-card-title">{deck.title}</span>
            <span className="deck-card-desc">{deck.description}</span>
            <span className="deck-card-meta">{deck.slides.length} slides</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
