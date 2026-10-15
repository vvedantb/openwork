import { createFileRoute } from "@tanstack/react-router";
import { CatalogPage } from "@/catalog/CatalogPage";
import { DECK_LIST, deckPath } from "@/slides/registry";

export const Route = createFileRoute("/slides/")({
  component: SlidesPage,
});

function SlidesPage() {
  return (
    <CatalogPage
      noun="slides"
      lede="Registered decks in this deployment. Open any deck to present fullscreen or share a live session."
      items={DECK_LIST.map((deck) => ({
        ...deck,
        href: deckPath(deck.id),
        meta: `${deck.slides.length} slides`,
      }))}
    />
  );
}
