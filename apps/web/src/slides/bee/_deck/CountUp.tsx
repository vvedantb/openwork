import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { cn } from "@/slides/platform/ui";
import { useDeckStep } from "./deckContext";
import { EASE_OUT } from "./motion/tokens";

const DEFAULT_FORMAT = new Intl.NumberFormat("en-GB").format;

export interface CountUpProps {
  value: number;
  duration?: number;
  delay?: number;
  step?: number;
  format?: (n: number) => string;
  className?: string;
  prefix?: string;
  suffix?: string;
}

function countText(
  n: number,
  prefix: string,
  format: (n: number) => string,
  suffix: string,
): string {
  return `${prefix}${format(n)}${suffix}`;
}

/**
 * Counts from zero to `value` once the deck reaches `step`. The number is
 * written straight to the DOM node from the animation loop, so the count does
 * not re-render the slide 60 times a second. It runs in an effect keyed on the
 * reveal, so later steps re-rendering the slide do not restart it.
 */
export function CountUp({
  value,
  duration = 1.6,
  delay = 0,
  step = 0,
  format = DEFAULT_FORMAT,
  className,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const visible = useDeckStep() >= step;
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !visible) return;
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = countText(Math.round(v), prefix, format, suffix);
      },
    });
    return () => controls.stop();
  }, [visible, value, duration, delay, format, prefix, suffix]);

  return (
    <span
      key={visible ? "on" : "off"}
      ref={ref}
      className={cn("tabular-nums", !visible && "opacity-0", className)}
    >
      {countText(0, prefix, format, suffix)}
    </span>
  );
}
