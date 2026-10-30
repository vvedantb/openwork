import { useId, useInsertionEffect } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/slides/platform/ui";
import {
  EIGHT,
  ORBIT,
  blinkTiming,
  eightAt,
  logoDetail,
  logoMotion,
  logoMotionCss,
  orbitAt,
  trailTurn,
} from "./beeLogoMotion";
import type { LogoState } from "./beeLogoMotion";
import { HEX, LogoArt, LogoDefs } from "./BeeLogoArt";
import type { LogoTone } from "./BeeLogoArt";
import "./beeLogo.css";

export type { LogoState };

const SPARK =
  "M0 -4.5Q0.7 -0.7 4.5 0Q0.7 0.7 0 4.5Q-0.7 0.7 -4.5 0Q-0.7 -0.7 0 -4.5Z";
const MOTION_CSS = logoMotionCss();
const MOTION_STYLE_ID = "bee-logo-motion";

/**
 * Adds the generated path keyframes to the document once, however many logos
 * are on screen. Eva hoists a `<style href precedence>`, which only React 19
 * dedupes; React 18 would render one copy per logo.
 */
function useLogoMotionCss() {
  useInsertionEffect(() => {
    if (document.getElementById(MOTION_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = MOTION_STYLE_ID;
    style.textContent = MOTION_CSS;
    document.head.append(style);
  }, []);
}

/**
 * Bee's mark, ported from the Bee app (`src/renderer/src/BeeLogo.tsx`): a
 * glossy honey orb with two stripes, glassy wings, antennae and pill eyes.
 * Motion is CSS only (`beeLogo.css`, plus generated paths from
 * `beeLogoMotion.ts`): one pose and set of extras per `state`, as in the app.
 * `tone` is the background the mark sits on; `glow` turns the honey halo off.
 */
export function BeeLogo({
  size = 64,
  state = "idle",
  tone = "light",
  glow = true,
  className,
}: {
  size?: number;
  state?: LogoState;
  tone?: LogoTone;
  /** The soft honey halo behind the orb. */
  glow?: boolean;
  className?: string;
}) {
  useLogoMotionCss();
  // useId holds characters that are awkward inside url(#…).
  const uid = useId().replace(/[^\w-]/g, "");
  const idFor = (part: string) => `bee-${uid}-${part}`;
  const detail = logoDetail(size);
  const blink = blinkTiming(uid);
  const motion = logoMotion(size);
  const vars: CSSProperties & Record<`--${string}`, string | number> = {
    "--blink-delay": `${blink.delayS}s`,
    "--level": 0.5,
    "--ring-gain": motion.ringGain,
    "--echo-scale": motion.echoScale,
    "--eight-x": `${motion.eightX}px`,
    "--eight-y": `${motion.eightY}px`,
    "--orbit-x": `${motion.orbitX}px`,
    "--loop-r": `${motion.loopR}px`,
    "--mute": `url(#${idFor("mute")})`,
    // A sub-pixel blur is invisible in the tiny view, so it is not paid for there.
    ...(detail.glow ? { "--blur": `url(#${idFor("blur")})` } : {}),
  };
  const halo =
    glow && detail.glow ? (
      <circle
        className="bee-logo-glow"
        cx="32"
        cy="35"
        r="29"
        fill={`url(#${idFor("glow")})`}
      />
    ) : null;
  const orbit = (layer: "front" | "back") => (
    <g className={`bee-fx-orbit ${layer}`} fill="#ffd75e">
      {[0, 1, 2].map((k) => (
        <circle
          key={k}
          cx="32"
          cy="35"
          r="1.9"
          style={{
            ...orbitAt(k / 3 + 0.08, layer),
            animationDelay: `${-((k / 3) * ORBIT.periodS).toFixed(2)}s`,
          }}
        />
      ))}
    </g>
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("bee-logo animated", className)}
      data-state={state}
      style={vars}
      width={size}
      height={size}
      viewBox={motion.viewBox}
      aria-hidden
      focusable="false"
    >
      <LogoDefs idFor={idFor} tone={tone} state={state} detail={detail} />
      {state === "listening" ? (
        <g fill="none" stroke="#fabe28">
          <circle
            className="bee-fx-ring echo"
            cx="32"
            cy="35"
            r={motion.ringR}
            strokeWidth="1"
          />
          <circle
            className="bee-fx-ring level"
            cx="32"
            cy="35"
            r={motion.ringR}
            strokeWidth="1.4"
          />
        </g>
      ) : null}
      {state === "searching" ? (
        <g className="bee-fx-trail" fill="#fabe28">
          {Array.from({ length: EIGHT.dots - 1 }, (_, i) => i + 1).map((k) => (
            <circle
              key={k}
              cx="32"
              cy="35"
              r={(1.6 - k * 0.1).toFixed(2)}
              opacity={(0.7 - k * 0.07).toFixed(2)}
              style={{
                ...eightAt(trailTurn(k)),
                animationDelay: `${-(EIGHT.periodS - k * EIGHT.lagS).toFixed(2)}s`,
              }}
            />
          ))}
        </g>
      ) : null}
      {state === "tool" ? (
        <g>
          <polygon points={HEX} fill="#221e17" />
          <g clipPath={`url(#${idFor("hex")})`}>
            <rect
              className="bee-fx-honey"
              x="41"
              y="36"
              width="18"
              height="19"
              fill={`url(#${idFor("honey")})`}
            />
          </g>
          <polygon
            points={HEX}
            fill="none"
            stroke="#fabe28"
            strokeOpacity="0.85"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </g>
      ) : null}
      <g className="bee-flight">
        {halo}
        {state === "thinking" ? orbit("back") : null}
        <LogoArt idFor={idFor} tone={tone} detail={detail} blink={blink} />
        {state === "thinking" ? orbit("front") : null}
        {state === "searching" ? (
          <g className="bee-fx-glass">
            <circle
              cx="50"
              cy="51"
              r="4.6"
              fill="#17140f"
              fillOpacity="0.55"
              stroke="#f4efe6"
              strokeWidth="1.9"
            />
            <path
              d="M53.3 54.3L57 58"
              stroke="#f4efe6"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </g>
        ) : null}
      </g>
      {state === "done" ? (
        <g fill="#fff1b0">
          <g
            transform={`translate(${motion.sparkAt.x} ${motion.sparkAt.y}) scale(${motion.sparkAt.scale})`}
          >
            <path className="bee-fx-spark" d={SPARK} />
          </g>
          <g transform="translate(8 28) scale(0.65)">
            <path className="bee-fx-spark late" d={SPARK} />
          </g>
        </g>
      ) : null}
      {state === "error" ? (
        <circle
          cx="52"
          cy="11"
          r="3.6"
          fill="#ff8a7a"
          stroke="#17140f"
          strokeWidth="1.6"
        />
      ) : null}
    </svg>
  );
}
