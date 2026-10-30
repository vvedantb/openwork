import {
  SlideShell,
  SlideReveal,
  SlideKicker,
} from "@/slides/platform/SlideShell";
import { BlurWordsTitle } from "../components/BlurWordsTitle";

export function Slide02Gap() {
  return (
    <SlideShell className="bg-background">
      <SlideReveal>
        <SlideKicker>The Problem</SlideKicker>
      </SlideReveal>
      <BlurWordsTitle
        lines={["AI coding tools", "are siloed."]}
        size="2xl"
        step={0}
        delay={0.15}
      />
      <SlideReveal step={0} delay={0.8}>
        {/* opacity-70 stands in for Eva's text-foreground/70 (no CSS here). */}
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-foreground opacity-70">
          Your context is scattered across chat windows, browser tabs, and
          terminal sessions. Eva brings it together in one unified workspace.
        </p>
      </SlideReveal>
    </SlideShell>
  );
}
