import { useCallback, useEffect, useState } from "react";
import { Button } from "@/decks/platform/ui";
import {
  IconChevronLeft,
  IconChevronRight,
  IconNotes,
} from "@tabler/icons-react";
import { usePresentationSync } from "@/decks/platform/usePresentationSync";
import type { DeckManifest } from "@/decks/types";
import { PresentationDeckProvider } from "@/decks/platform/PresentationDeckContext";
import { SlideMiniPreview } from "./SlideMiniPreview";
import { SlidesPasswordGate } from "./SlidesPasswordGate";
import { isPresenterUnlocked } from "@/decks/platform/slidesGate";
import { postPresenterMessage } from "@/decks/platform/presenterWindowSync";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

interface PresenterViewProps {
  deck: DeckManifest;
  deckPath: string;
  slide: number;
  session: string | undefined;
  updateSearch: (next: { slide?: number; session?: string }) => void;
}

/**
 * Pop-out presenter window — current slide (left) + script (right). Drives
 * the stage window via BroadcastChannel; never screen-shared.
 */
export function PresenterView({
  deck,
  deckPath,
  slide,
  session,
  updateSearch,
}: PresenterViewProps) {
  const [unlocked, setUnlocked] = useState(() => isPresenterUnlocked());
  const total = deck.slides.length;

  const sync = usePresentationSync({
    slide,
    sessionCode: session,
    updateSearch,
    deckPath,
  });

  const current = sync.effectiveSlide;
  const { slideTitle, notes } = deck.getSpeakerNotes(current);
  const hasNotes = notes.trim().length > 0;

  const navigate = useCallback(
    (target: number) => {
      const clamped = clamp(target, 1, total);
      sync.onNavigate(clamped);
      postPresenterMessage({ type: "slide", slide: clamped });
    },
    [sync, total],
  );

  useEffect(() => {
    postPresenterMessage({ type: "presenter-open" });
    const onUnload = () => postPresenterMessage({ type: "presenter-closed" });
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      postPresenterMessage({ type: "presenter-closed" });
    };
  }, []);

  useEffect(() => {
    postPresenterMessage({ type: "slide", slide: current });
  }, [current]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          navigate(current + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          navigate(current - 1);
          break;
        case "Home":
          e.preventDefault();
          navigate(1);
          break;
        case "End":
          e.preventDefault();
          navigate(total);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, navigate, total]);

  const deckContext = {
    sessionCode: session,
    participantKey: sync.participantKey,
    hostKey: sync.hostKey,
  };

  if (!unlocked) {
    return <SlidesPasswordGate onUnlocked={() => setUnlocked(true)} />;
  }

  return (
    <PresentationDeckProvider value={deckContext}>
      <div className="flex h-dvh flex-col bg-background text-foreground">
        <header className="flex shrink-0 items-center gap-2 px-4 py-2.5">
          <IconNotes size={18} className="shrink-0 text-muted" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Presenter view
            </p>
            <p className="truncate text-sm font-medium">
              {current}. {slideTitle}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
            {current}/{total}
          </span>
        </header>

        <div className="flex min-h-0 flex-1">
          <div className="flex w-1/2 min-w-0 flex-col justify-center p-4">
            <SlideMiniPreview slides={deck.slides} slideNumber={current} />
          </div>

          <div className="flex w-1/2 min-w-0 flex-col bg-surface-secondary/40">
            <p className="shrink-0 px-4 pb-2 pt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted">
              Script
            </p>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              {hasNotes ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {notes}
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-muted">
                  No script for this slide — edit{" "}
                  <span className="font-mono text-xs">speakerNotes.ts</span>.
                </p>
              )}
            </div>
          </div>
        </div>

        <footer className="flex shrink-0 items-center justify-between gap-3 bg-surface-secondary/60 px-4 py-3">
          <Button
            size="sm"
            variant="secondary"
            disabled={current <= 1}
            onClick={() => navigate(current - 1)}
          >
            <IconChevronLeft size={16} />
            Back
          </Button>
          <p className="text-center text-xs text-muted">
            Arrow keys · Space to advance
          </p>
          <Button
            size="sm"
            variant="secondary"
            disabled={current >= total}
            onClick={() => navigate(current + 1)}
          >
            Next
            <IconChevronRight size={16} />
          </Button>
        </footer>
      </div>
    </PresentationDeckProvider>
  );
}
