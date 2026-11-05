import type { ReactNode } from "react";
import {
  SlideItem,
  SlideReveal,
  SlideShell,
  SlideStagger,
} from "@/slides/platform/SlideShell";

/*
 * Layout pieces for decks ported from PowerPoint. Slide files pass the
 * source text verbatim; these only decide how it sits on the 1280×720 stage.
 */

/** One paragraph from the source text box. */
export type Line =
  | { kind: "bullet"; text: ReactNode; level: 0 | 1; bold: boolean }
  | { kind: "plain"; text: ReactNode; bold: boolean }
  | { kind: "gap" };

/** Top-level bullet. */
export function b(text: ReactNode, bold = false): Line {
  return { kind: "bullet", text, level: 0, bold };
}

/** Second-level (indented) bullet. */
export function sub(text: ReactNode, bold = false): Line {
  return { kind: "bullet", text, level: 1, bold };
}

/** Paragraph without a bullet marker. */
export function plain(text: ReactNode, bold = false): Line {
  return { kind: "plain", text, bold };
}

/** Empty paragraph in the source — kept as vertical space. */
export const gap: Line = { kind: "gap" };

interface BulletsProps {
  lines: Line[];
  /** Number top-level bullets 1, 2, 3… (PowerPoint auto-numbering). */
  numbered?: boolean;
  size?: "md" | "sm";
}

/** Source text box: bullets, sub-bullets, plain lines and gaps. */
export function Bullets({
  lines,
  numbered = false,
  size = "md",
}: BulletsProps) {
  const textSize = size === "md" ? "text-2xl" : "text-xl";
  let count = 0;
  return (
    <SlideStagger className="flex flex-col gap-3" delayChildren={0.15}>
      {lines.map((line, index) => {
        const key = `${line.kind}-${index}`;
        if (line.kind === "gap") {
          return <div key={key} aria-hidden className="h-3" />;
        }
        const weight = line.bold ? "font-semibold" : "font-normal";
        if (line.kind === "plain") {
          return (
            <SlideItem key={key}>
              <p
                className={`${textSize} ${weight} leading-snug text-foreground`}
              >
                {line.text}
              </p>
            </SlideItem>
          );
        }
        if (line.level === 0) count += 1;
        const marker =
          numbered && line.level === 0 ? (
            <span className="w-8 shrink-0 tabular-nums text-muted">
              {count}.
            </span>
          ) : (
            <span
              aria-hidden
              className={`mt-[0.6em] shrink-0 rounded-full bg-foreground ${line.level === 0 ? "h-2 w-2" : "h-1.5 w-1.5"}`}
              style={{ opacity: line.level === 0 ? 0.6 : 0.4 }}
            />
          );
        return (
          <SlideItem key={key}>
            <div
              className={`flex items-start gap-4 ${line.level === 1 ? "pl-10" : ""}`}
            >
              {marker}
              <span
                className={`${line.level === 0 ? textSize : "text-xl"} ${weight} leading-snug ${line.level === 0 ? "text-foreground" : "text-muted"}`}
              >
                {line.text}
              </span>
            </div>
          </SlideItem>
        );
      })}
    </SlideStagger>
  );
}

interface ContentSlideProps {
  title: ReactNode;
  /** Small label in the top-right corner, e.g. "USERS PERSPECTIVE". */
  tag?: string;
  children: ReactNode;
}

/** Title-and-content slide: heading on top, content fills the rest. */
export function ContentSlide({ title, tag, children }: ContentSlideProps) {
  return (
    <SlideShell className="bg-background">
      {tag ? (
        <p className="absolute right-10 top-8 text-xs font-medium uppercase tracking-[0.22em] text-muted">
          {tag}
        </p>
      ) : null}
      <SlideReveal>
        <h1 className="text-5xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
          {title}
        </h1>
      </SlideReveal>
      <div className="mt-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </SlideShell>
  );
}

interface TitleSlideProps {
  title: ReactNode;
  subtitle?: ReactNode;
  author: string;
}

/** Opening slide: title, optional subtitle line, presenter name. */
export function TitleSlide({ title, subtitle, author }: TitleSlideProps) {
  return (
    <SlideShell center className="bg-background text-center">
      <SlideReveal>
        <h1 className="max-w-5xl text-7xl font-semibold leading-tight tracking-[-0.03em] text-foreground">
          {title}
        </h1>
      </SlideReveal>
      {subtitle ? (
        <SlideReveal delay={0.1}>
          <p className="mt-6 text-3xl text-muted">{subtitle}</p>
        </SlideReveal>
      ) : null}
      <SlideReveal delay={0.2}>
        <p className="mt-12 text-xl text-muted">{author}</p>
      </SlideReveal>
    </SlideShell>
  );
}

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  /** Caption above the image instead of below. */
  captionTop?: boolean;
  className?: string;
}

/** Image from the source deck, scaled to fit its box. */
export function Figure({
  src,
  alt,
  caption,
  captionTop = false,
  className = "",
}: FigureProps) {
  const label = caption ? (
    <figcaption
      className={`text-center text-sm font-semibold uppercase tracking-[0.18em] text-muted ${captionTop ? "mb-3" : "mt-3"}`}
    >
      {caption}
    </figcaption>
  ) : null;
  return (
    <SlideReveal delay={0.2} className={`flex min-h-0 flex-col ${className}`}>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center">
        {captionTop ? label : null}
        <img
          src={src}
          alt={alt}
          className="min-h-0 w-full flex-1 object-contain"
        />
        {captionTop ? null : label}
      </figure>
    </SlideReveal>
  );
}
