import type { DeckManifest } from "./types";
import { vmemPitchDeck } from "./vmem-pitch";

export const DECKS: Record<string, DeckManifest> = {
  [vmemPitchDeck.id]: vmemPitchDeck,
};

export const DECK_LIST = Object.values(DECKS);

export function getDeck(deckId: string): DeckManifest | undefined {
  return DECKS[deckId];
}

export function deckPath(deckId: string): string {
  return `/d/${deckId}`;
}
