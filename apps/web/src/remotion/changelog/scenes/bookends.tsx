import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { SlideVisual } from "../types";
import {
  AnimatedBackdrop,
  AnimatedCounter,
  BlinkCursor,
  ConfettiBurst,
  SceneEnter,
} from "../ChangelogEffects";
import { INTRO_DURATION, OUTRO_DURATION } from "../constants";
import type { ChangelogSlide } from "../types";
import {
  COLORS,
  FONT_DISPLAY,
  FONT_MONO,
  FONT_SANS,
  POP_SPRING,
  SECTION_EMOJI,
} from "../theme";

const VISUAL_EMOJI: Record<SlideVisual, string> = {
  "sidebar-nav": "🧭",
  "memory-graph": "🧠",
  "optimistic-ui": "⚡",
  "gmail-sync": "✉️",
  "api-keys": "🔑",
  "http-api": "🌐",
  "wiki-skills": "📚",
  "inbox-proposals": "📥",
  "chrome-extension": "🧩",
  "mcp-tools": "🔧",
  "agent-sdk": "📦",
  "list-rows": "✨",
};

type IntroProps = {
  title: string;
  repo: string;
  dateRange: string;
  commitCount: number;
  slides: ChangelogSlide[];
  accent: string;
};

export function IntroScene({
  title,
  repo,
  dateRange,
  commitCount,
  slides,
  accent,
}: IntroProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hero = spring({ frame, fps, config: POP_SPRING, durationInFrames: 28 });
  const typedLen = Math.min(
    "What we shipped this week".length,
    Math.floor(Math.max(0, frame - 20) / 2),
  );

  return (
    <AbsoluteFill style={{ fontFamily: FONT_SANS, color: COLORS.paper }}>
      <AnimatedBackdrop accent={accent} />
      <SceneEnter durationInFrames={INTRO_DURATION}>
        <div style={{ padding: "90px 100px" }}>
          <div
            style={{
              fontFamily: FONT_MONO,
              fontSize: 14,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: accent,
              opacity: hero,
            }}
          >
            {repo} · {dateRange}
          </div>
          <h1
            style={{
              margin: "20px 0 0",
              fontFamily: FONT_DISPLAY,
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.98,
              maxWidth: 900,
              transform: `translateY(${interpolate(hero, [0, 1], [40, 0])}px)`,
              opacity: hero,
            }}
          >
            {title}
          </h1>
          <p style={{ fontSize: 30, color: COLORS.paperMuted, marginTop: 16 }}>
            {"What we shipped this week".slice(0, typedLen)}
            <BlinkCursor frame={frame} />
          </p>
          <div
            style={{
              marginTop: 32,
              display: "inline-flex",
              gap: 20,
              padding: "16px 24px",
              borderRadius: 16,
              background: `${COLORS.ink3}cc`,
              border: `1px solid ${COLORS.paper}18`,
              opacity: interpolate(frame, [30, 50], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{ fontFamily: FONT_DISPLAY, fontSize: 42, color: accent }}
            >
              <AnimatedCounter value={commitCount} delay={34} />
            </span>
            <span
              style={{
                fontSize: 18,
                color: COLORS.paperMuted,
                alignSelf: "center",
              }}
            >
              commits → {slides.length} feature stories
            </span>
          </div>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {slides.map((slide, index) => {
              const pop = spring({
                frame: frame - 45 - index * 4,
                fps,
                config: POP_SPRING,
                durationInFrames: 18,
              });
              return (
                <div
                  key={slide.id}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    background: `${slide.accent}18`,
                    border: `1px solid ${slide.accent}44`,
                    fontSize: 22,
                    transform: `scale(${interpolate(pop, [0, 1], [0.5, 1])})`,
                    opacity: pop,
                  }}
                >
                  {VISUAL_EMOJI[slide.visual] ?? SECTION_EMOJI[slide.id] ?? "✦"}
                </div>
              );
            })}
          </div>
        </div>
      </SceneEnter>
    </AbsoluteFill>
  );
}

type OutroProps = {
  commitCount: number;
  slideCount: number;
  accent: string;
};

export function OutroScene({ commitCount, slideCount, accent }: OutroProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame, fps, config: POP_SPRING, durationInFrames: 28 });
  const msg = "Ship it.".slice(
    0,
    Math.min(8, Math.floor(Math.max(0, frame - 12) / 3)),
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT_SANS,
        color: COLORS.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedBackdrop accent={accent} />
      <ConfettiBurst accent={accent} />
      <SceneEnter durationInFrames={OUTRO_DURATION}>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${pop})`,
            opacity: pop,
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 16 }}>🚀</div>
          <div
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {msg}
            <BlinkCursor frame={frame} />
          </div>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: 20,
              color: COLORS.paperMuted,
              marginTop: 20,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {commitCount} commits · {slideCount} features · vmem
          </p>
        </div>
      </SceneEnter>
    </AbsoluteFill>
  );
}
