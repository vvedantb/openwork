import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_MONO, POP_SPRING } from "./theme";

const ORB_COUNT = 8;
const PARTICLE_COUNT = 28;

function seeded(index: number, seed: string) {
  return random(`${seed}-${index}`);
}

export function AnimatedBackdrop({ accent }: { accent: string }) {
  return (
    <>
      <AbsoluteFill style={{ background: COLORS.ink }} />
      <AbsoluteFill
        style={{
          backgroundImage: `
            radial-gradient(900px 500px at 12% 8%, ${accent}33 0%, transparent 55%),
            radial-gradient(700px 420px at 88% 92%, ${COLORS.accentGlow} 0%, transparent 50%),
            radial-gradient(600px 360px at 50% 120%, ${accent}18 0%, transparent 60%)
          `,
        }}
      />
      <DotGrid />
      <FloatingOrbs accent={accent} />
      <FloatingParticles accent={accent} />
    </>
  );
}

function DotGrid() {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, 24], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: 0.22,
        backgroundImage: `radial-gradient(circle, ${COLORS.paper} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        backgroundPosition: `${drift}px ${drift * 0.6}px`,
      }}
    />
  );
}

function FloatingOrbs({ accent }: { accent: string }) {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: ORB_COUNT }).map((_, index) => {
        const x = seeded(index, "orb-x") * 1600 + 160;
        const y = seeded(index, "orb-y") * 900 + 90;
        const size = 80 + seeded(index, "orb-size") * 160;
        const bob = Math.sin(frame / 24 + index * 1.4) * 18;
        const color = index % 2 === 0 ? accent : COLORS.accent;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y + bob,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity: 0.07 + seeded(index, "orb-opacity") * 0.08,
              filter: "blur(40px)",
            }}
          />
        );
      })}
    </>
  );
}

function FloatingParticles({ accent }: { accent: string }) {
  const frame = useCurrentFrame();

  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => {
        const startX = seeded(index, "p-x") * 1920;
        const startY = seeded(index, "p-y") * 1080;
        const speed = 0.4 + seeded(index, "p-speed") * 1.2;
        const size = 3 + seeded(index, "p-size") * 5;
        const y = (startY - frame * speed * 2) % 1100;
        const wobble = Math.sin(frame / 16 + index) * 12;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: startX + wobble,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: index % 3 === 0 ? accent : COLORS.paper,
              opacity: 0.12 + seeded(index, "p-opacity") * 0.25,
            }}
          />
        );
      })}
    </>
  );
}

export function SceneEnter({
  children,
  durationInFrames,
}: {
  children: React.ReactNode;
  durationInFrames: number;
}) {
  const frame = useCurrentFrame();

  const enter = interpolate(frame, [0, 20], [0, 1], {
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const opacity = enter * exit;
  const scale =
    interpolate(enter, [0, 1], [0.9, 1]) * interpolate(exit, [0, 1], [0.96, 1]);
  const rotate = interpolate(enter, [0, 1], [-1.2, 0]);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

export function WordHighlight({
  word,
  color,
  delay,
}: {
  word: string;
  color: string;
  delay: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: POP_SPRING,
    durationInFrames: 22,
  });

  const scaleX = Math.max(0, Math.min(1, progress));

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -6,
          right: -6,
          top: "52%",
          height: "0.92em",
          transform: `translateY(-50%) scaleX(${scaleX})`,
          transformOrigin: "left center",
          backgroundColor: color,
          borderRadius: 8,
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{word}</span>
    </span>
  );
}

export function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: number;
  delay?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: POP_SPRING,
    durationInFrames: 36,
  });

  const current = Math.round(interpolate(progress, [0, 1], [0, value]));

  return <span>{current}</span>;
}

export function ProgressRail({
  total,
  activeIndex,
  labels,
}: {
  total: number;
  activeIndex: number;
  labels: string[];
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 72,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {Array.from({ length: total }).map((_, index) => {
        const lit = index <= activeIndex;
        const pulse = spring({
          frame: frame - (index === activeIndex ? 0 : 999),
          fps,
          config: POP_SPRING,
          durationInFrames: 18,
        });
        const width = lit
          ? interpolate(pulse, [0, 1], [10, index === activeIndex ? 56 : 24])
          : 10;

        return (
          <div
            key={labels[index] ?? index}
            title={labels[index]}
            style={{
              height: 10,
              width,
              borderRadius: 999,
              background:
                index === activeIndex
                  ? COLORS.accent
                  : lit
                    ? `${COLORS.paper}55`
                    : `${COLORS.paper}22`,
              boxShadow:
                index === activeIndex
                  ? `0 0 24px ${COLORS.accentGlow}`
                  : undefined,
            }}
          />
        );
      })}
      <span
        style={{
          marginLeft: 12,
          fontFamily: FONT_MONO,
          fontSize: 14,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.paperMuted,
        }}
      >
        {activeIndex + 1}/{total}
      </span>
    </div>
  );
}

export function FakePointer({
  target,
  activationFrame,
}: {
  target: { x: number; y: number };
  activationFrame: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const snap = spring({
    frame: frame - activationFrame,
    fps,
    config: { damping: 16, stiffness: 240, mass: 0.35 },
    durationInFrames: 14,
  });

  const wiggle = Math.sin(frame / 5) * 3;
  const clickPulse = spring({
    frame: (frame - activationFrame) % 24,
    fps,
    config: POP_SPRING,
    durationInFrames: 12,
  });

  const x = target.x + interpolate(snap, [0, 1], [50, 0]) + wiggle;
  const y = target.y + interpolate(snap, [0, 1], [36, 0]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: `2px solid ${COLORS.accent}`,
          transform: `scale(${1 + clickPulse * 0.35})`,
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          fontSize: 34,
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.35))",
          pointerEvents: "none",
        }}
      >
        👆
      </div>
    </>
  );
}

export function BlinkCursor({ frame }: { frame: number }) {
  const opacity = interpolate(frame % 20, [0, 10, 20], [1, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <span style={{ opacity, color: COLORS.accent, marginLeft: 2 }}>▍</span>
  );
}

export function ConfettiBurst({ accent }: { accent: string }) {
  const frame = useCurrentFrame();
  const pieces = 36;

  return (
    <>
      {Array.from({ length: pieces }).map((_, index) => {
        const angle = seeded(index, "confetti-angle") * Math.PI * 2;
        const speed = 4 + seeded(index, "confetti-speed") * 10;
        const radius = frame * speed;
        const x = 960 + Math.cos(angle) * radius;
        const y = 540 + Math.sin(angle) * radius + frame * 2.5;
        const rotation = frame * (6 + seeded(index, "confetti-spin") * 10);
        const colors = [
          accent,
          COLORS.accent,
          COLORS.paper,
          "#fbbf24",
          "#34d399",
        ];

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 8 + seeded(index, "confetti-size") * 10,
              height: 14,
              borderRadius: 3,
              background: colors[index % colors.length],
              opacity: interpolate(frame, [0, 90], [1, 0], {
                extrapolateRight: "clamp",
              }),
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </>
  );
}
