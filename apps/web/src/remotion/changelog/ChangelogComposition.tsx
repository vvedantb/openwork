import { AbsoluteFill, Series } from "remotion";
import type { ChangelogCompositionProps } from "./types";
import { FEATURE_DURATION, INTRO_DURATION, OUTRO_DURATION } from "./constants";
import { FeatureSlide } from "./SlideRouter";
import { IntroScene, OutroScene } from "./scenes/bookends";

const DEFAULT_ACCENT = "#c2410c";

export function ChangelogComposition({
  title,
  repo,
  dateRange,
  commitCount,
  slides,
}: ChangelogCompositionProps) {
  const accent = slides[0]?.accent ?? DEFAULT_ACCENT;

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={INTRO_DURATION}>
          <IntroScene
            title={title}
            repo={repo}
            dateRange={dateRange}
            commitCount={commitCount}
            slides={slides}
            accent={accent}
          />
        </Series.Sequence>

        {slides.map((slide, index) => (
          <Series.Sequence key={slide.id} durationInFrames={FEATURE_DURATION}>
            <FeatureSlide slide={slide} index={index} total={slides.length} />
          </Series.Sequence>
        ))}

        <Series.Sequence durationInFrames={OUTRO_DURATION}>
          <OutroScene
            commitCount={commitCount}
            slideCount={slides.length}
            accent={accent}
          />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}

export type { ChangelogCompositionProps };
