import type { ReactNode } from "react";
import { ACCENT_GRADIENT } from "./motion/tokens";

/**
 * Which part of a longer gradient phrase this piece shows. `Title` splits an
 * `Accent` into one masked unit per word; slicing the gradient by character
 * position keeps it one continuous sweep across the phrase instead of
 * restarting on every word.
 */
export interface AccentSlice {
  start: number;
  length: number;
  total: number;
}

function sliceGeometry(slice: AccentSlice | undefined): {
  size: string;
  position: string;
} {
  if (!slice || slice.length >= slice.total) {
    return { size: "100%", position: "0%" };
  }
  return {
    size: `${(slice.total / slice.length) * 100}%`,
    position: `${(slice.start / (slice.total - slice.length)) * 100}%`,
  };
}

/**
 * Gradient text. `Accent` and `MaskedText` both render this. No sheen:
 * emphasis comes from the colour and the reveal alone.
 */
export function AccentText({
  children,
  slice,
}: {
  children: ReactNode;
  slice?: AccentSlice;
}) {
  const { size, position } = sliceGeometry(slice);
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage: ACCENT_GRADIENT,
        backgroundSize: `${size} 100%`,
        backgroundPosition: `${position} 0%`,
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </span>
  );
}

/** Brand-gradient text. Use sparingly — one phrase per slide. */
export function Accent({ children }: { children: ReactNode }) {
  return <AccentText>{children}</AccentText>;
}
