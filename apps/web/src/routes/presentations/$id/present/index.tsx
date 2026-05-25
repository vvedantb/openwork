import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "backend/convex/_generated/api";
import { SlidePlayer } from "@/components/SlidePlayer";
import type { PresentationId } from "@/types";

export const Route = createFileRoute("/presentations/$id/present/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isLoaded && !context.auth.isSignedIn) {
      throw redirect({ to: "/" });
    }
  },
  component: PresentPage,
});

function PresentPage() {
  const { id } = Route.useParams();
  const presentationId = id as PresentationId;
  const navigate = useNavigate();
  const presentation = useQuery(api.presentations.get, { id: presentationId });
  const slides = useQuery(api.slides.listForPresentation, { presentationId });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(true);
  const shellRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = slides?.length ?? 0;

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, Math.max(total - 1, 0)));
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    }
    navigate({
      to: "/presentations/$id",
      params: { id: presentationId },
    });
  }, [navigate, presentationId]);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    const element = shellRef.current;
    if (element && element.requestFullscreen) {
      await element.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "PageUp":
        case "Backspace":
          event.preventDefault();
          goPrev();
          break;
        case "Home":
          event.preventDefault();
          setCurrentIndex(0);
          break;
        case "End":
          event.preventDefault();
          setCurrentIndex(Math.max(total - 1, 0));
          break;
        case "f":
        case "F":
          event.preventDefault();
          void toggleFullscreen();
          break;
        case "n":
        case "N":
          event.preventDefault();
          setNotesOpen((value) => !value);
          break;
        case "Escape":
          event.preventDefault();
          exit();
          break;
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, exit, toggleFullscreen, total]);

  useEffect(() => {
    function onChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  if (presentation === undefined || slides === undefined) {
    return (
      <div className="present-shell">
        <p style={{ color: "var(--type-ink-muted)" }}>Loading...</p>
      </div>
    );
  }
  if (presentation === null || !slides || slides.length === 0) {
    return (
      <div className="present-shell">
        <div style={{ textAlign: "center", color: "var(--type-ink)" }}>
          <p style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24 }}>
            This deck has no slides.
          </p>
          <button className="present-ctrl" onClick={exit}>
            Back to editor
          </button>
        </div>
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, slides.length - 1);
  const currentSlide = slides[safeIndex];

  return (
    <div ref={shellRef} className="present-shell">
      <div className="present-deck-label">
        <span className="brand-mark" style={{ width: 14, height: 14 }} aria-hidden="true" />
        {presentation.title}
      </div>

      <div className="present-stage">
        <div className="present-frame">
          <SlidePlayer
            key={currentSlide._id}
            slide={currentSlide}
            background={presentation.background}
            accent={presentation.accent}
            autoPlay
          />
        </div>

        {notesOpen && currentSlide.notes ? (
          <div className="present-notes">
            <p className="present-notes-label">Speaker notes</p>
            <p className="present-notes-body">{currentSlide.notes}</p>
          </div>
        ) : null}

        <div className="present-counter">
          <strong>{String(safeIndex + 1).padStart(2, "0")}</strong>
          {" / "}
          {String(slides.length).padStart(2, "0")}
        </div>

        <div className="present-controls">
          <button
            className="present-ctrl"
            onClick={goPrev}
            disabled={safeIndex === 0}
            title="Previous (←)"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="present-ctrl"
            onClick={goNext}
            disabled={safeIndex === slides.length - 1}
            title="Next (→)"
            aria-label="Next slide"
          >
            →
          </button>
          <span className="present-ctrl-divider" aria-hidden="true" />
          <button
            className="present-ctrl"
            onClick={() => setNotesOpen((value) => !value)}
            title="Toggle notes (N)"
          >
            {notesOpen ? "Hide notes" : "Notes"}
          </button>
          <button
            className="present-ctrl"
            onClick={() => void toggleFullscreen()}
            title="Fullscreen (F)"
          >
            {isFullscreen ? "Windowed" : "Fullscreen"}
          </button>
          <span className="present-ctrl-divider" aria-hidden="true" />
          <button
            className="present-ctrl accent"
            onClick={exit}
            title="Exit (Esc)"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
