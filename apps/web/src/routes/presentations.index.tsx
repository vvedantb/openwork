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
        "Convex hasn't received your Clerk token yet. Check that you created a Clerk JWT template named \"convex\" and that CLERK_JWT_ISSUER_DOMAIN is set in your Convex deployment.",
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
    <div className="page">
      <div className="row spread">
        <div>
          <h2 style={{ margin: 0 }}>Your decks</h2>
          <p className="muted" style={{ margin: "4px 0 0" }}>
            Create a deck and start building slides.
          </p>
        </div>
        <button
          className="btn primary"
          onClick={handleCreate}
          disabled={creating || authLoading}
        >
          {creating ? "Creating..." : authLoading ? "Connecting..." : "New deck"}
        </button>
      </div>

      {error ? (
        <div
          className="card"
          style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
        >
          <strong>Could not create deck</strong>
          <p style={{ margin: "6px 0 0", whiteSpace: "pre-wrap" }}>{error}</p>
        </div>
      ) : null}

      {presentations === undefined ? (
        <p className="muted">Loading...</p>
      ) : presentations.length === 0 ? (
        <div className="card center" style={{ padding: 48 }}>
          <div>
            <p className="muted" style={{ marginTop: 0 }}>
              Nothing here yet.
            </p>
            <button className="btn primary" onClick={handleCreate} disabled={creating}>
              Create your first deck
            </button>
          </div>
        </div>
      ) : (
        <div className="grid">
          {presentations.map((deck) => (
            <DeckCard
              key={deck._id}
              deckId={deck._id}
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
  title: string;
  background: string;
  accent: string;
  updatedAt: number;
  onDelete: () => void;
};

function DeckCard({
  deckId,
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

  return (
    <div className="card deck-card">
      <Link
        to="/presentations/$id"
        params={{ id: deckId }}
        style={{ color: "inherit" }}
      >
        <div className="thumb">
          {firstSlide ? (
            <SlidePlayer
              slide={firstSlide}
              background={background}
              accent={accent}
              autoPlay={false}
            />
          ) : null}
        </div>
        <div className="title" style={{ marginTop: 8 }}>
          {title}
        </div>
        <div className="meta">
          {slides ? `${slides.length} slides` : "..."} · Updated {" "}
          {new Date(updatedAt).toLocaleString()}
        </div>
      </Link>
      <div className="row spread">
        <Link
          to="/presentations/$id/present"
          params={{ id: deckId }}
          className="btn"
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
