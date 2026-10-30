import type { LogoDetail, LogoState } from "./beeLogoMotion";

/*
 * The static half of Bee's mark (see `BeeLogo`): the paint definitions and
 * the art itself. Split out of `BeeLogo` so neither component runs long; the
 * shapes are unchanged from the Bee app.
 */

const INK = "#2a1e0c";
/** The tool state's honeycomb cell, in view-box units. */
export const HEX = "50,37 57.79,41.5 57.79,50.5 50,55 42.21,50.5 42.21,41.5";
// Amber, not ink, so the antennae read on the dark surface and on white.
const ANTENNA = "#d0901a";

/** The background the mark sits on. */
export type LogoTone = "dark" | "light";

interface WingPaint {
  from: string;
  fromOpacity: number;
  to: string;
  toOpacity: number;
  stroke: string;
  strokeOpacity: number;
}

// Glassy white wings vanish on a light background, so `tone="light"` draws them grey with a darker outline.
const WINGS: Record<LogoTone, WingPaint> = {
  dark: {
    from: "#ffffff",
    fromOpacity: 0.55,
    to: "#fff4d0",
    toOpacity: 0.12,
    stroke: "#ffffff",
    strokeOpacity: 0.7,
  },
  light: {
    from: "#d4d4d8",
    fromOpacity: 0.9,
    to: "#cfcfd4",
    toOpacity: 0.6,
    stroke: "#8a8a92",
    strokeOpacity: 1,
  },
};

interface LogoDefsProps {
  /** The instance-unique id for one named part. */
  idFor: (part: string) => string;
  tone: LogoTone;
  state: LogoState;
  detail: LogoDetail;
}

/** Gradients, clips and filters for the mark and the active state's extras. */
export function LogoDefs({ idFor, tone, state, detail }: LogoDefsProps) {
  const wings = WINGS[tone];
  return (
    <defs>
      <radialGradient id={idFor("glow")}>
        <stop offset="0.55" stopColor="#fabe28" stopOpacity="0.4" />
        <stop offset="1" stopColor="#fabe28" stopOpacity="0" />
      </radialGradient>
      <radialGradient
        id={idFor("body")}
        cx="0.5"
        cy="0.5"
        r="0.5"
        fx="0.34"
        fy="0.28"
      >
        <stop offset="0" stopColor="#fff1b0" />
        <stop offset="0.28" stopColor="#ffd75e" />
        <stop offset="0.68" stopColor="#fabe28" />
        <stop offset="1" stopColor="#e09a12" />
      </radialGradient>
      <radialGradient id={idFor("shade")} cx="0.72" cy="0.8" r="0.62">
        <stop offset="0" stopColor="#b86b00" stopOpacity="0.45" />
        <stop offset="1" stopColor="#b86b00" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={idFor("spec")}>
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={idFor("rim")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff8d6" stopOpacity="0.7" />
        <stop offset="0.55" stopColor="#fff8d6" stopOpacity="0.1" />
        <stop offset="1" stopColor="#fff2b0" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id={idFor("wing")} x1="0" y1="0" x2="1" y2="1">
        <stop
          offset="0"
          stopColor={wings.from}
          stopOpacity={wings.fromOpacity}
        />
        <stop offset="1" stopColor={wings.to} stopOpacity={wings.toOpacity} />
      </linearGradient>
      <clipPath id={idFor("orb")}>
        <circle cx="32" cy="35" r="20" />
      </clipPath>
      {detail.grain ? (
        <filter id={idFor("grain")} x="0" y="0" width="1" height="1">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.02  0 0 0 0.9 0" />
        </filter>
      ) : null}
      {state === "error" ? (
        <filter
          id={idFor("mute")}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix type="saturate" values="0.2" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.7" />
            <feFuncG type="linear" slope="0.7" />
            <feFuncB type="linear" slope="0.7" />
          </feComponentTransfer>
        </filter>
      ) : null}
      {state === "thinking" && detail.glow ? (
        <filter id={idFor("blur")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.45" />
        </filter>
      ) : null}
      {state === "tool" ? (
        <>
          <clipPath id={idFor("hex")}>
            <polygon points={HEX} />
          </clipPath>
          <linearGradient id={idFor("honey")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd75e" />
            <stop offset="1" stopColor="#e09a12" />
          </linearGradient>
        </>
      ) : null}
    </defs>
  );
}

interface LogoArtProps {
  idFor: (part: string) => string;
  tone: LogoTone;
  detail: LogoDetail;
  /** Per-instance blink, so logos on one screen do not blink in step. */
  blink: { periodS: number; delayS: number };
}

/** The mark itself: glassy wings, antennae, the striped honey orb and pill eyes. */
export function LogoArt({ idFor, tone, detail, blink }: LogoArtProps) {
  const wings = WINGS[tone];
  return (
    <g className="bee-logo-art">
      <g className="bee-logo-wing left">
        <ellipse
          cx="17.5"
          cy="15.5"
          rx="10"
          ry="5"
          transform="rotate(30 17.5 15.5)"
          fill={`url(#${idFor("wing")})`}
          stroke={wings.stroke}
          strokeOpacity={wings.strokeOpacity}
          strokeWidth="1"
        />
      </g>
      <g className="bee-logo-wing right">
        <ellipse
          cx="46.5"
          cy="15.5"
          rx="10"
          ry="5"
          transform="rotate(-30 46.5 15.5)"
          fill={`url(#${idFor("wing")})`}
          stroke={wings.stroke}
          strokeOpacity={wings.strokeOpacity}
          strokeWidth="1"
        />
      </g>
      {detail.antennae ? (
        <g
          fill={ANTENNA}
          stroke={ANTENNA}
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <path d="M28.5 17Q27.5 10.5 24.5 6.5" fill="none" />
          <path d="M35.5 17Q36.5 10.5 39.5 6.5" fill="none" />
          <circle cx="24.5" cy="6.5" r="2.2" stroke="none" />
          <circle cx="39.5" cy="6.5" r="2.2" stroke="none" />
        </g>
      ) : null}
      <circle cx="32" cy="35" r="20" fill={`url(#${idFor("body")})`} />
      {/* Stripes bow downward to follow the sphere. */}
      <g clipPath={`url(#${idFor("orb")})`} fill={INK}>
        <path d="M10 36Q32 45 54 36V41Q32 50 10 41Z" />
        <path d="M10 45Q32 54 54 45V49.5Q32 58.5 10 49.5Z" />
        <circle cx="32" cy="35" r="20" fill={`url(#${idFor("shade")})`} />
        {detail.grain ? (
          <rect
            x="12"
            y="15"
            width="40"
            height="40"
            filter={`url(#${idFor("grain")})`}
            opacity="0.18"
          />
        ) : null}
      </g>
      <ellipse
        cx="25"
        cy="23"
        rx="8"
        ry="6"
        transform="rotate(-30 25 23)"
        fill={`url(#${idFor("spec")})`}
      />
      <circle
        cx="32"
        cy="35"
        r="19.4"
        fill="none"
        stroke={`url(#${idFor("rim")})`}
        strokeWidth="1.2"
      />
      <g
        className="bee-logo-eyes"
        style={{
          animationDelay: `${blink.delayS}s`,
          animationDuration: `${blink.periodS}s`,
        }}
      >
        <rect x="23.6" y="24.5" width="5.4" height="9" rx="2.7" fill={INK} />
        <rect x="35" y="24.5" width="5.4" height="9" rx="2.7" fill={INK} />
        {detail.catchlights ? (
          <g fill="#ffffff" opacity="0.9">
            <circle cx="25.6" cy="26.9" r="1.15" />
            <circle cx="37" cy="26.9" r="1.15" />
          </g>
        ) : null}
      </g>
    </g>
  );
}
