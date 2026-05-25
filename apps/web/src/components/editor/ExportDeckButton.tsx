import { useState } from "react";
import type { SlideDoc } from "@/types";
import type { DeckCompositionProps } from "@/remotion/deck-props";

type ExportDeckButtonProps = {
  title: string;
  background: string;
  accent: string;
  slides: SlideDoc[];
};

function sanitizeFilename(title: string): string {
  const cleaned = title.trim().replace(/[^\w\- ]+/g, "").replace(/\s+/g, "-");
  return cleaned.length > 0 ? cleaned : "deck";
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ExportDeckButton({
  title,
  background,
  accent,
  slides,
}: ExportDeckButtonProps) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function exportMp4() {
    if (slides.length === 0) {
      return;
    }

    setExporting(true);
    setError(null);

    const props: DeckCompositionProps = {
      slides,
      background,
      accent,
    };
    const filename = `${sanitizeFilename(title)}.mp4`;

    try {
      if (import.meta.env.DEV) {
        const response = await fetch("/api/render-deck", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(props),
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const blob = await response.blob();
        downloadBlob(blob, filename);
        return;
      }

      const propsBlob = new Blob([JSON.stringify(props, null, 2)], {
        type: "application/json",
      });
      downloadBlob(propsBlob, `${sanitizeFilename(title)}-props.json`);
      setError(
        "Downloaded deck props. Render locally with: pnpm render:deck --props=./deck-props.json",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setExporting(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
      <button
        type="button"
        className="btn ghost"
        onClick={() => void exportMp4()}
        disabled={exporting || slides.length === 0}
        title={
          slides.length === 0
            ? "Add slides before exporting"
            : "Render deck to MP4 via Remotion"
        }
      >
        {exporting ? "Rendering…" : "Export MP4"}
      </button>
      {error ? (
        <span className="muted" style={{ fontSize: 12, maxWidth: 260, textAlign: "right" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
