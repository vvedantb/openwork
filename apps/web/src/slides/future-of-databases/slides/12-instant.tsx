import { SlideReveal, SlideShell } from "@/slides/platform/SlideShell";

/** Two stacked statements joined by a down arrow labelled INSTANT. */
export function Slide12Instant() {
  return (
    <SlideShell center className="bg-background">
      <SlideReveal>
        <h1 className="text-6xl font-semibold tracking-[-0.03em] text-foreground">
          Feature completion (dev side)
        </h1>
      </SlideReveal>
      <SlideReveal delay={0.2} className="my-10 flex items-center gap-6">
        <span className="text-lg font-semibold uppercase tracking-[0.22em] text-muted">
          INSTANT
        </span>
        <span aria-hidden className="text-6xl leading-none text-foreground">
          ↓
        </span>
      </SlideReveal>
      <SlideReveal delay={0.4}>
        <p className="text-6xl font-semibold tracking-[-0.03em] text-foreground">
          Feature review (business side)
        </p>
      </SlideReveal>
    </SlideShell>
  );
}
