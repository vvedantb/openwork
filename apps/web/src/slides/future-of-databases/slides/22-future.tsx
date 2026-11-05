import { SlideReveal, SlideShell } from "@/slides/platform/SlideShell";

export function Slide22Future() {
  return (
    <SlideShell center className="bg-background">
      <SlideReveal>
        <h1 className="text-7xl font-semibold tracking-[-0.03em] text-foreground">
          The future of databases is
        </h1>
      </SlideReveal>
      <SlideReveal delay={0.4}>
        <img
          src="/media/slides/future-of-databases/slide22-1.webp"
          alt="Convex"
          className="mt-14 h-28 w-auto"
        />
      </SlideReveal>
    </SlideShell>
  );
}
