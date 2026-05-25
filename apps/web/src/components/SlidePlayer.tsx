import { Player } from "@remotion/player";
import { useMemo } from "react";
import { SLIDE_DURATION_IN_FRAMES, SLIDE_FPS } from "@/remotion/constants";
import { SlideComposition } from "@/remotion/SlideComposition";
import { SLIDE_HEIGHT, SLIDE_WIDTH, type SlideDoc } from "@/types";

export type SlidePlayerProps = {
  slide: SlideDoc;
  background: string;
  accent: string;
  autoPlay?: boolean;
  controls?: boolean;
  clickToPlay?: boolean;
  style?: React.CSSProperties;
};

export function SlidePlayer({
  slide,
  background,
  accent,
  autoPlay = true,
  controls = false,
  clickToPlay = false,
  style,
}: SlidePlayerProps) {
  const inputProps = useMemo(
    () => ({ slide, background, accent }),
    [slide, background, accent],
  );

  return (
    <Player
      key={slide._id}
      component={SlideComposition}
      durationInFrames={SLIDE_DURATION_IN_FRAMES}
      fps={SLIDE_FPS}
      compositionWidth={SLIDE_WIDTH}
      compositionHeight={SLIDE_HEIGHT}
      inputProps={inputProps}
      autoPlay={autoPlay}
      loop={false}
      controls={controls}
      clickToPlay={clickToPlay}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
