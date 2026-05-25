import { useEffect, useState } from "react";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { api } from "backend/convex/_generated/api";
import type { PresentationId, SlideDoc, SlideId } from "@/types";
import { SlideList } from "@/components/editor/SlideList";
import { SlideStage } from "@/components/editor/SlideStage";
import { SlideInspector } from "@/components/editor/SlideInspector";
import { NotesPanel } from "@/components/editor/NotesPanel";

export const Route = createFileRoute("/presentations/$id/")({
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
    return (
      <div className="page">
        <p className="muted">Loading deck...</p>
      </div>
    );
  }
  if (presentation === null) {
    return (
      <div className="page">
        <div className="empty-state">
          <p className="eyebrow">Not found</p>
          <h3>This deck is unavailable.</h3>
          <p>It may have been deleted, or you may not have access.</p>
          <Link to="/presentations" className="btn primary">
            Back to library
          </Link>
        </div>
      </div>
    );
  }

  const activeSlide: SlideDoc | undefined = slides.find(
    (s) => s._id === activeSlideId,
  );
  const activeIndex = activeSlide
    ? slides.findIndex((s) => s._id === activeSlide._id) + 1
    : 0;

  return (
    <div className="editor-shell">
      <div className="editor-bar">
        <div className="editor-bar-left">
          <Link to="/presentations" className="btn ghost" title="Back to library">
            ← Library
          </Link>
          <div className="editor-bar-meta">
            <span className="crumb">Deck — {slides.length} slides</span>
            <input
              className="editor-title-input"
              value={titleDraft}
              onChange={(event) => setTitleDraft(event.target.value)}
              onBlur={() => {
                if (titleDraft && titleDraft !== presentation.title) {
                  renamePresentation({ id: presentation._id, title: titleDraft });
                }
              }}
              placeholder="Untitled deck"
            />
          </div>
        </div>
        <div className="editor-bar-right">
          <div className="field-label" style={{ marginRight: 4 }}>
            Theme
          </div>
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
            Present →
          </Link>
        </div>
      </div>

      <div className="editor-grid">
        <div className="editor-pane pane-list">
          <div className="pane-header">
            <span className="pane-header-title">Slides</span>
            <span
              className="pane-header-title"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {activeIndex}/{slides.length}
            </span>
          </div>
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
        </div>

        <div className="editor-pane pane-stage">
          <div className="pane-header">
            <span className="pane-header-title">Canvas</span>
            <span className="pane-header-title">
              {activeSlide?.title ?? "—"}
            </span>
          </div>
          <div className="stage-wrap">
            {activeSlide ? (
              <div className="stage-frame">
                <SlideStage
                  slide={activeSlide}
                  background={presentation.background}
                  accent={presentation.accent}
                  onUpdate={(patch) =>
                    updateSlide({ id: activeSlide._id, ...patch })
                  }
                />
              </div>
            ) : (
              <p className="muted">No slide selected.</p>
            )}
          </div>
        </div>

        <div className="editor-pane pane-inspector">
          <div className="pane-header">
            <span className="pane-header-title">Inspector</span>
          </div>
          <div className="pane-body">
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
        </div>

        <div className="editor-pane pane-notes">
          <div className="pane-header">
            <span className="pane-header-title">Speaker notes</span>
            <span className="pane-header-title">Only you see this</span>
          </div>
          <div className="pane-body">
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
    </div>
  );
}
