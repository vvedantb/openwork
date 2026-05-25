import { useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { api } from "backend/convex/_generated/api";
import { SlidePlayer } from "@/components/SlidePlayer";
import type { SlideDoc } from "@/types";

export const Route = createFileRoute("/presentations/")({
  beforeLoad: ({ context }) => {
    if (context.auth.isLoaded && !context.auth.isSignedIn) {
      throw redirect({ to: "/" });
    }
  },
  component: PresentationsPage,
});

function PresentationsPage() {
  const { isLoading: authLoading, isAuthenticated } = useConvexAuth();
  const presentations = useQuery(api.presentations.list);
  const createPresentation = useMutation(api.presentations.create);
  const removePresentation = useMutation(api.presentations.remove);
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!isAuthenticated) {
      setError(
        "Convex has not received your Clerk token yet. Check that you created a Clerk JWT template named \"convex\" and that CLERK_JWT_ISSUER_DOMAIN is set in your Convex deployment.",
      );
      return;
    }
    setCreating(true);
    setError(null);
    try {
      const id = await createPresentation({ title: "Untitled deck" });
      navigate({ to: "/presentations/$id", params: { id } });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="page stagger">
      <div className="page-head">
        <div className="page-head-text">
          <p className="eyebrow">Library — All decks</p>
          <h1 className="page-title">
            Your <em>decks</em>.
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: 16 }}>
            Open a deck to keep editing, or start a fresh one. Drafts auto-save.
          </p>
        </div>
        <button
          className="btn primary"
          onClick={handleCreate}
          disabled={creating || authLoading}
        >
          {creating ? "Creating..." : authLoading ? "Connecting..." : "+ New deck"}
        </button>
      </div>

      {error ? (
        <div className="alert">
          <strong>Could not create deck</strong>
          <p>{error}</p>
        </div>
      ) : null}

      {presentations === undefined ? (
        <p className="muted">Loading library...</p>
      ) : presentations.length === 0 ? (
        <div className="empty-state">
          <p className="eyebrow">Nothing here yet</p>
          <h3>A blank canvas, waiting.</h3>
          <p>
            Start your first deck and the library will fill up with thumbnails,
            titles, and dates.
          </p>
          <button className="btn primary" onClick={handleCreate} disabled={creating}>
            {creating ? "Creating..." : "Create your first deck"}
          </button>
        </div>
      ) : (
        <div className="deck-grid">
          {presentations.map((deck, index) => (
            <DeckCard
              key={deck._id}
              deckId={deck._id}
              index={index + 1}
              title={deck.title}
              background={deck.background}
              accent={deck.accent}
              updatedAt={deck.updatedAt}
              onDelete={() => removePresentation({ id: deck._id })}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type DeckCardProps = {
  deckId: import("@/types").PresentationId;
  index: number;
  title: string;
  background: string;
  accent: string;
  updatedAt: number;
  onDelete: () => void;
};

function DeckCard({
  deckId,
  index,
  title,
  background,
  accent,
  updatedAt,
  onDelete,
}: DeckCardProps) {
  const slides = useQuery(api.slides.listForPresentation, {
    presentationId: deckId,
  });
  const firstSlide: SlideDoc | undefined = slides?.[0];
  const indexLabel = String(index).padStart(2, "0");

  return (
    <div className="deck-card">
      <Link
        to="/presentations/$id"
        params={{ id: deckId }}
        style={{ display: "block" }}
      >
        <div className="thumb">
          <span className="deck-index">No. {indexLabel}</span>
          {firstSlide ? (
            <SlidePlayer
              slide={firstSlide}
              background={background}
              accent={accent}
              autoPlay={false}
            />
          ) : null}
        </div>
        <div className="title" style={{ marginTop: 14 }}>
          {title}
        </div>
        <div className="meta" style={{ marginTop: 6 }}>
          <span>{slides ? `${slides.length} slides` : "—"}</span>
          <span className="dot">·</span>
          <span>{formatRelative(updatedAt)}</span>
        </div>
      </Link>
      <div className="deck-card-actions">
        <Link
          to="/presentations/$id/present"
          params={{ id: deckId }}
          className="btn ghost"
        >
          Present
        </Link>
        <button
          className="btn danger"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (confirm("Delete this deck?")) onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function formatRelative(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
