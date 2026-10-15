import type { DeckManifest } from "./types";
import { introToVmemDeck } from "./intro-to-vmem";

export const DECKS: Record<string, DeckManifest> = {
  [introToVmemDeck.id]: introToVmemDeck,
};

export const DECK_LIST = Object.values(DECKS);

/** Old deck ids that still resolve, so shared links keep working. */
const LEGACY_DECK_IDS = new Map<string, string>([
  ["vmem-pitch", introToVmemDeck.id],
]);

export function resolveDeckId(deckId: string): string {
  return LEGACY_DECK_IDS.get(deckId) ?? deckId;
}

export function getDeck(deckId: string): DeckManifest | undefined {
  return DECKS[deckId];
}

export function deckPath(deckId: string): string {
  return `/slides/${deckId}`;
}
