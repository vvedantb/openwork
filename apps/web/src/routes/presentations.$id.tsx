import { useEffect, useState } from "react";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "backend/convex/_generated/api";
import type { PresentationId, SlideDoc, SlideId } from "@/types";
import { SlideList } from "@/components/editor/SlideList";
import { SlideStage } from "@/components/editor/SlideStage";
import { SlideInspector } from "@/components/editor/SlideInspector";
import { NotesPanel } from "@/components/editor/NotesPanel";

export const Route = createFileRoute("/presentations/$id")({
  beforeLoad: ({ context }) => {
    if (context.auth.isLoaded && !context.auth.isSignedIn) {
      throw redirect({ to: "/" });
    }
  },
  component: EditorPage,
});

function EditorPage() {
  const { id } = Route.useParams();
  const presentationId = id as PresentationId;

  const presentation = useQuery(api.presentations.get, { id: presentationId });
  const slides = useQuery(api.slides.listForPresentation, { presentationId });
  const addSlide = useMutation(api.slides.add);
  const renamePresentation = useMutation(api.presentations.rename);
  const updateTheme = useMutation(api.presentations.updateTheme);
  const updateSlide = useMutation(api.slides.update);
  const removeSlide = useMutation(api.slides.remove);

  const [activeSlideId, setActiveSlideId] = useState<SlideId | null>(null);
  const [titleDraft, setTitleDraft] = useState("");

  useEffect(() => {
    if (presentation) setTitleDraft(presentation.title);
  }, [presentation?._id, presentation?.title]);

  useEffect(() => {
    if (!slides || slides.length === 0) {
      setActiveSlideId(null);
      return;
    }
    if (!activeSlideId || !slides.some((s) => s._id === activeSlideId)) {
      setActiveSlideId(slides[0]._id);
    }
  }, [slides, activeSlideId]);

  if (presentation === undefined || slides === undefined) {
    return <div className="page muted">Loading deck...</div>;
  }
  if (presentation === null) {
    return (
      <div className="page center">
        <div>
          <p>This deck does not exist or you do not have access.</p>
          <Link to="/presentations" className="btn">
            Back to decks
          </Link>
        </div>
      </div>
    );
  }

  const activeSlide: SlideDoc | undefined = slides.find(
    (s) => s._id === activeSlideId,
  );

  return (
    <div className="page" style={{ padding: 0, overflow: "hidden" }}>
      <div
        className="row spread"
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="row" style={{ gap: 10 }}>
          <Link to="/presentations" className="btn">
            ← Decks
          </Link>
          <input
            value={titleDraft}
            onChange={(event) => setTitleDraft(event.target.value)}
            onBlur={() => {
              if (titleDraft && titleDraft !== presentation.title) {
                renamePresentation({ id: presentation._id, title: titleDraft });
              }
            }}
            style={{
              background: "transparent",
              border: "1px solid transparent",
              color: "var(--text)",
              fontSize: 18,
              fontWeight: 600,
              padding: "6px 10px",
              borderRadius: 8,
              minWidth: 220,
            }}
            onFocus={(event) => {
              event.currentTarget.style.borderColor = "var(--border)";
            }}
          />
        </div>
        <div className="row" style={{ gap: 8 }}>
          <input
            type="color"
            className="color-input"
            value={presentation.background}
            onChange={(event) =>
              updateTheme({
                id: presentation._id,
                background: event.target.value,
                accent: presentation.accent,
              })
            }
            title="Background"
          />
          <input
            type="color"
            className="color-input"
            value={presentation.accent}
            onChange={(event) =>
              updateTheme({
                id: presentation._id,
                background: presentation.background,
                accent: event.target.value,
              })
            }
            title="Accent"
          />
          <Link
            to="/presentations/$id/present"
            params={{ id: presentation._id }}
            className="btn primary"
          >
            ▶ Present
          </Link>
        </div>
      </div>

      <div className="editor">
        <SlideList
          slides={slides}
          activeSlideId={activeSlideId}
          background={presentation.background}
          accent={presentation.accent}
          onSelect={setActiveSlideId}
          onAdd={async () => {
            const newId = await addSlide({ presentationId: presentation._id });
            setActiveSlideId(newId);
          }}
          onDelete={(slideId) => removeSlide({ id: slideId })}
        />

        <div className="stage-wrap">
          {activeSlide ? (
            <SlideStage
              slide={activeSlide}
              background={presentation.background}
              accent={presentation.accent}
              onUpdate={(patch) =>
                updateSlide({ id: activeSlide._id, ...patch })
              }
            />
          ) : (
            <p className="muted">No slide selected.</p>
          )}
        </div>

        <div className="side-panel">
          {activeSlide ? (
            <SlideInspector
              slide={activeSlide}
              accent={presentation.accent}
              onUpdate={(patch) =>
                updateSlide({ id: activeSlide._id, ...patch })
              }
            />
          ) : (
            <p className="muted">Add a slide to begin.</p>
          )}
        </div>

        <div className="notes-panel">
          {activeSlide ? (
            <NotesPanel
              slide={activeSlide}
              onChange={(notes) =>
                updateSlide({ id: activeSlide._id, notes })
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
