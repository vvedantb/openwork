import { AbsoluteFill, Series } from "remotion";
import type { DeckCompositionProps } from "./deck-props";
import { SLIDE_DURATION_IN_FRAMES } from "./constants";
import { SlideComposition } from "./SlideComposition";

export type { DeckCompositionProps } from "./deck-props";

export function DeckComposition({
  slides,
  background,
  accent,
}: DeckCompositionProps) {
  if (slides.length === 0) {
    return (
      <AbsoluteFill
        style={{
          background,
          color: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          fontSize: 48,
        }}
      >
        Empty deck
      </AbsoluteFill>
    );
  }

  return (
    <Series>
      {slides.map((slide) => (
        <Series.Sequence
          key={slide._id}
          durationInFrames={SLIDE_DURATION_IN_FRAMES}
        >
          <SlideComposition slide={slide} background={background} accent={accent} />
        </Series.Sequence>
      ))}
    </Series>
  );
}
