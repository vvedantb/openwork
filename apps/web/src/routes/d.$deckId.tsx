import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SlideDeck } from "@/decks/platform/SlideDeck";
import { usePresentationSync } from "@/decks/platform/usePresentationSync";
import { PresentationControls } from "@/decks/platform/PresentationControls";
import { PresentationDeckProvider } from "@/decks/platform/PresentationDeckContext";
import { PresenterView } from "@/decks/platform/PresenterView";
import {
  openPresenterWindow,
  subscribePresenterChannel,
} from "@/decks/platform/presenterWindowSync";
import { deckPath, getDeck } from "@/decks/registry";
import "@/decks/deck-globals.css";

const searchSchema = z.object({
  slide: z.number().int().min(1).optional().default(1),
  // `z.coerce` guards against number-like codes (e.g. `4952e29`, which the
  // router's default `parseSearch` JSON-parses into a number before this runs):
  // coercing back to a string keeps the page from crashing on validation. New
  // codes are generated to never look like numbers (see `generateUniqueCode`).
  session: z.coerce.string().optional(),
  /** `presenter` = pop-out window with notes + controls. */
  view: z.enum(["presenter"]).optional(),
});

export const Route = createFileRoute("/d/$deckId")({
  validateSearch: searchSchema,
  beforeLoad: ({ params }) => {
    if (!getDeck(params.deckId)) {
      throw redirect({ to: "/" });
    }
  },
  component: DeckPresenterPage,
});

function DeckPresenterPage() {
  const { deckId } = Route.useParams();
  const deck = getDeck(deckId);
  const { slide, session, view } = Route.useSearch();
  const path = deckPath(deckId);
  const navigate = useNavigate({ from: "/d/$deckId" });

  const updateSearch = useCallback(
    (next: { slide?: number; session?: string }) => {
      void navigate({
        search: (prev) => ({ ...prev, ...next }),
        replace: true,
      });
    },
    [navigate],
  );

  if (!deck) {
    return null;
  }

  if (view === "presenter") {
    return (
      <div className="deck-ui">
        <PresenterView
          deck={deck}
          deckPath={path}
          slide={slide}
          session={session}
          updateSearch={updateSearch}
        />
      </div>
    );
  }

  return (
    <div className="deck-ui">
      <StageView
        deck={deck}
        deckPath={path}
        slide={slide}
        session={session}
        updateSearch={updateSearch}
      />
    </div>
  );
}

interface StageViewProps {
  deck: NonNullable<ReturnType<typeof getDeck>>;
  deckPath: string;
  slide: number;
  session: string | undefined;
  updateSearch: (next: { slide?: number; session?: string }) => void;
}

/** Full-screen deck for projection / screen sharing. */
function StageView({
  deck,
  deckPath: path,
  slide,
  session,
  updateSearch,
}: StageViewProps) {
  const [presenterDetached, setPresenterDetached] = useState(false);

  useEffect(() => {
    return subscribePresenterChannel({
      onSlide: (nextSlide) => updateSearch({ slide: nextSlide }),
      onPresenterOpen: () => setPresenterDetached(true),
      onPresenterClosed: () => setPresenterDetached(false),
    });
  }, [updateSearch]);

  const sync = usePresentationSync({
    slide,
    sessionCode: session,
    updateSearch,
    deckPath: path,
  });

  const deckContext = useMemo(
    () => ({
      sessionCode: session,
      participantKey: sync.participantKey,
      hostKey: sync.hostKey,
    }),
    [session, sync.participantKey, sync.hostKey],
  );

  const isFollower =
    session !== undefined &&
    sync.sessionState !== "none" &&
    sync.sessionState !== "notfound" &&
    !sync.isHost;
  const canDrive = !isFollower;
  /** Solo rehearsal or live host only — never on a coworker's share-link tab. */
  const canOpenPresenter = session === undefined || sync.isHost;
  const stageNavigation = canDrive && !presenterDetached;

  return (
    <>
      <PresentationDeckProvider value={deckContext}>
        <SlideDeck
          slides={deck.slides}
          slide={sync.effectiveSlide}
          onNavigate={sync.onNavigate}
          allowNavigation={stageNavigation}
          showOutline={!presenterDetached}
        />
      </PresentationDeckProvider>
      <PresentationControls
        sync={sync}
        canOpenPresenter={canOpenPresenter}
        presenterDetached={presenterDetached}
        onOpenPresenter={openPresenterWindow}
      />
    </>
  );
}
