import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SlideDoc, SlideElement } from "@/types";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/types";

export type SlideCompositionProps = {
  slide: SlideDoc;
  background: string;
  accent: string;
};

function Element({ element, accent }: { element: SlideElement; accent: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.6 },
    durationInFrames: 24,
  });
  const opacity = interpolate(appear, [0, 1], [0, 1]);
  const translateY = interpolate(appear, [0, 1], [20, 0]);

  const base = {
    position: "absolute" as const,
    left: element.x,
    top: element.y,
    width: element.width,
    height: element.height,
    opacity,
    transform: `translateY(${translateY}px)`,
  };

  if (element.kind === "heading") {
    return (
      <div
        style={{
          ...base,
          color: element.color,
          fontSize: element.fontSize,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          display: "flex",
          alignItems: "center",
        }}
      >
        {element.text}
      </div>
    );
  }

  if (element.kind === "text") {
    return (
      <div
        style={{
          ...base,
          color: element.color,
          fontSize: element.fontSize,
          lineHeight: 1.35,
          whiteSpace: "pre-wrap",
        }}
      >
        {element.text}
      </div>
    );
  }

  if (element.shape === "rectangle") {
    return (
      <div
        style={{
          ...base,
          background: element.fill,
          borderRadius: 16,
        }}
      />
    );
  }
  if (element.shape === "circle") {
    return (
      <div
        style={{
          ...base,
          background: element.fill,
          borderRadius: "50%",
        }}
      />
    );
  }
  return (
    <div
      style={{
        ...base,
        background: "transparent",
      }}
    >
      <svg
        width={element.width}
        height={element.height}
        viewBox={`0 0 ${element.width} ${element.height}`}
      >
        <polygon
          points={`${element.width / 2},0 ${element.width},${element.height} 0,${element.height}`}
          fill={element.fill}
        />
      </svg>
      <span style={{ display: "none" }}>{accent}</span>
    </div>
  );
}

export function SlideComposition({ slide, background, accent }: SlideCompositionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 20, mass: 0.7 },
    durationInFrames: 18,
  });

  let containerStyle: React.CSSProperties = {};
  switch (slide.transition) {
    case "fade":
      containerStyle = { opacity: interpolate(enter, [0, 1], [0, 1]) };
      break;
    case "slide":
      containerStyle = {
        transform: `translateX(${interpolate(enter, [0, 1], [100, 0])}px)`,
        opacity: interpolate(enter, [0, 1], [0, 1]),
      };
      break;
    case "zoom":
      containerStyle = {
        transform: `scale(${interpolate(enter, [0, 1], [0.92, 1])})`,
        opacity: interpolate(enter, [0, 1], [0, 1]),
      };
      break;
    case "none":
    default:
      containerStyle = {};
  }

  const bg = slide.background ?? background;

  return (
    <AbsoluteFill style={{ background: bg }}>
      <AbsoluteFill style={containerStyle}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: SLIDE_WIDTH,
            height: SLIDE_HEIGHT,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 32,
              left: 32,
              width: 6,
              height: 60,
              background: accent,
              borderRadius: 3,
            }}
          />
          {slide.elements.map((element) => (
            <Element key={element.id} element={element} accent={accent} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
