import { cn } from "@/slides/platform/ui";

/*
 * Eva's mark geometry, copied from Eva's `evaMark.ts`. The disc marks use a
 * thicker-waisted star than the logo, enlarged 1.45x and clipped to the disc.
 */
const DISC_STAR_TOP_POINTS = "0,256 204,222 256,64 308,222 512,256";
const DISC_STAR_BOTTOM_POINTS = "0,256 204,290 256,449 308,290 512,256";
const DISC_STAR_SCALE = 1.45;
const MARK_PURPLE = "#8B3FB8";
const MARK_BLUE = "#3B7DD8";

/**
 * Eva's current icon, as the favicon draws it: a white disc with the thicker
 * two-tone star enlarged to fill it. The disc is always white, like the
 * favicon, so it reads on dark and light stages alike.
 */
export function EvaDiscMark({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-full shadow-[0_6px_24px_-8px_rgba(59,125,216,0.45)] ring-1 ring-black/5",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 512 512"
        className="size-full"
        role="img"
        aria-label="Eva"
      >
        <circle cx="256" cy="256" r="256" fill="#ffffff" />
        <g
          transform={`translate(256 256) scale(${DISC_STAR_SCALE}) translate(-256 -256)`}
        >
          <polygon points={DISC_STAR_TOP_POINTS} fill={MARK_PURPLE} />
          <polygon points={DISC_STAR_BOTTOM_POINTS} fill={MARK_BLUE} />
        </g>
      </svg>
    </span>
  );
}
