import type { ReactNode } from "react";

/*
 * This deck's slide vocabulary, one import for every slide. Layout and motion
 * come from OpenWork's platform. The text pieces keep Eva's own classes
 * (colour alpha, `secondary` tags), which `evaBrand.css` defines under
 * `.deck-theme-eva`.
 */
export {
  SlideItem,
  SlideReveal,
  SlideShell,
  SlideStagger,
  SlideStepContext,
} from "@/slides/platform/SlideShell";

interface SlideKickerProps {
  children: ReactNode;
}

/** Small uppercase eyebrow label above the title. */
export function SlideKicker({ children }: SlideKickerProps) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-foreground/60">
      {children}
    </p>
  );
}

interface SlideTitleProps {
  children: ReactNode;
  size?: "xl" | "2xl" | "3xl";
}

/** Primary slide heading. */
export function SlideTitle({ children, size = "2xl" }: SlideTitleProps) {
  const sizeClass =
    size === "xl" ? "text-5xl" : size === "2xl" ? "text-6xl" : "text-7xl";
  return (
    <h1
      className={`font-sans ${sizeClass} font-semibold leading-tight tracking-tight text-foreground`}
    >
      {children}
    </h1>
  );
}

interface SlideBulletsProps {
  items: string[];
}

/** Dotted bullet list. */
export function SlideBullets({ items }: SlideBulletsProps) {
  return (
    <ul className="mt-6 space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            aria-hidden
            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40"
          />
          <span className="text-base leading-relaxed text-foreground/80">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface SlideTagProps {
  children: ReactNode;
}

/** Small pill label, e.g. one item in a row of technologies. */
export function SlideTag({ children }: SlideTagProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {children}
    </span>
  );
}
