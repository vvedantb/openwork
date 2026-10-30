import type { ReactNode } from "react";
import { cn } from "@/slides/platform/ui";
import { MaskedText } from "./motion/MaskedText";
import "./beeBrand.css";

/**
 * The slide heading. Each word rises from behind its own mask (see
 * `MaskedText`); an `Accent` phrase inside is split with its gradient kept
 * whole. Plain words take Bee's ink: Eva got it by remapping `text-white` on
 * light slides, which Tailwind 3 cannot do, so the colour is set here.
 */
export function Title({
  children,
  size = "lg",
  className,
}: {
  children: ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClass =
    size === "md" ? "text-5xl" : size === "xl" ? "text-7xl" : "text-6xl";
  return (
    <h1
      className={cn(
        // Balanced: a two-line title on a 1280px stage should not strand one
        // word on the second line. The masks leave the spaces as real text,
        // so balancing sees the same string it always did.
        "font-semibold tracking-[-0.02em] text-balance text-[#2a1e0c]",
        "leading-[1.05]",
        sizeClass,
        className,
      )}
    >
      <MaskedText>{children}</MaskedText>
    </h1>
  );
}

/**
 * The standard slide frame: full bleed, generous gutters. It also paints Bee's
 * stage (`beeBrand.css`), which Eva put on the deck itself; openwork's
 * `SlideDeck` is shared by every deck, so each Bee slide brings its own.
 * `isolate` keeps negative z-index layers (glows, threads) above the cream.
 */
export function Shell({
  children,
  className,
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cn(
        "deck-brand-bee deck-stage-bee relative isolate flex h-full w-full flex-col px-24 py-20",
        center && "items-center justify-center text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
