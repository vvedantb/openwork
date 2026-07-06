import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedBackdrop, SceneEnter } from "../ChangelogEffects";
import { FEATURE_DURATION } from "../constants";
import type { ChangelogSlide } from "../types";
import {
  COLORS,
  FONT_DISPLAY,
  FONT_MONO,
  FONT_SANS,
  POP_SPRING,
} from "../theme";

export type FeatureSceneProps = {
  slide: ChangelogSlide;
  index: number;
  total: number;
};

export function FeatureShell({
  slide,
  index,
  total,
  children,
}: FeatureSceneProps & { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const caption = spring({
    frame: frame - 8,
    fps,
    config: POP_SPRING,
    durationInFrames: 24,
  });

  return (
    <AbsoluteFill style={{ fontFamily: FONT_SANS, color: COLORS.paper }}>
      <AnimatedBackdrop accent={slide.accent} />
      <SceneEnter durationInFrames={FEATURE_DURATION}>
        <div
          style={{
            position: "absolute",
            inset: "48px 64px 180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 56,
            opacity: caption,
            transform: `translateY(${interpolate(caption, [0, 1], [24, 0])}px)`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 13,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: slide.accent,
              marginBottom: 10,
            }}
          >
            {index + 1}/{total} · {slide.commitCount} commits
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT_DISPLAY,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {slide.title}
          </h2>
          <p
            style={{
              margin: "12px 0 0",
              maxWidth: 980,
              fontSize: 24,
              lineHeight: 1.4,
              color: COLORS.paperMuted,
            }}
          >
            {slide.subtitle}
          </p>
        </div>
      </SceneEnter>
    </AbsoluteFill>
  );
}

export function MockWindow({
  title,
  width = 920,
  height = 560,
  children,
  delay = 0,
}: {
  title: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - delay,
    fps,
    config: POP_SPRING,
    durationInFrames: 26,
  });

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 18,
        overflow: "hidden",
        border: `1px solid ${COLORS.paper}22`,
        boxShadow: "0 40px 100px rgba(0,0,0,0.45)",
        transform: `scale(${interpolate(pop, [0, 1], [0.92, 1])}) translateY(${interpolate(pop, [0, 1], [30, 0])}px)`,
        opacity: pop,
        background: COLORS.ink2,
      }}
    >
      <div
        style={{
          height: 42,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 16px",
          borderBottom: `1px solid ${COLORS.paper}12`,
          background: COLORS.ink3,
        }}
      >
        {["#ef4444", "#eab308", "#22c55e"].map((color) => (
          <div
            key={color}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 8,
            fontFamily: FONT_MONO,
            fontSize: 12,
            color: COLORS.paperMuted,
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ height: height - 42, position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

export function useBeat(delay: number, duration = 22) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({
    frame: frame - delay,
    fps,
    config: POP_SPRING,
    durationInFrames: duration,
  });
}

export function Sidebar({
  items,
  activeIndex,
  width = 220,
}: {
  items: string[];
  activeIndex: number;
  width?: number;
}) {
  return (
    <div
      style={{
        width,
        height: "100%",
        background: COLORS.ink3,
        borderRight: `1px solid ${COLORS.paper}10`,
        padding: "16px 12px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={item}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            marginBottom: 6,
            fontSize: 14,
            fontWeight: index === activeIndex ? 700 : 500,
            background:
              index === activeIndex ? `${COLORS.paper}14` : "transparent",
            color: index === activeIndex ? COLORS.paper : COLORS.paperMuted,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
