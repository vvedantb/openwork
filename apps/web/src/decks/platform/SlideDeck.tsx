import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { motionDuration, motionEase } from "@/decks/platform/ui";
import type { SlideEntry } from "@/decks/types";
import {
  SlideStepContext,
  SlideThemeContext,
} from "@/decks/platform/SlideShell";
import { SlideOutlinePanel } from "./SlideOutlinePanel";

const DESIGN_W = 1280;
const DESIGN_H = 720;
const DEFAULT_STAGGER_MS = 1000;

function readDocumentTheme(): "dark" | "light" {
  if (typeof document === "undefined") {
    return "dark";
  }
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

interface SlideDeckProps {
  slides: SlideEntry[];
  slide: number;
  onNavigate: (slide: number) => void;
  allowNavigation?: boolean;
  showOutline?: boolean;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function SlideDeck({
  slides,
  slide,
  onNavigate,
  allowNavigation = true,
  showOutline = true,
}: SlideDeckProps) {
  const total = slides.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const stageAreaRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const initialThemeRef = useRef(readDocumentTheme());
  const [scale, setScale] = useState(1);
  const prevSlideRef = useRef(slide);
  const direction = slide >= prevSlideRef.current ? 1 : -1;
  const [step, setStep] = useState(0);

  const index = clamp(slide - 1, 0, Math.max(total - 1, 0));

  useEffect(() => {
    prevSlideRef.current = slide;
  }, [slide]);

  useEffect(() => {
    setStep(0);
    const entry = slides[clamp(slide - 1, 0, Math.max(total - 1, 0))];
    if (!entry || entry.steps === 0) return;
    const stagger = entry.staggerMs ?? DEFAULT_STAGGER_MS;
    const timers: number[] = [];
    for (let s = 1; s <= entry.steps; s++) {
      timers.push(window.setTimeout(() => setStep(s), stagger * s));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [slide, slides, total]);

  const go = useCallback(
    (next: number, opts?: { delta?: number }) => {
      const delta = opts?.delta;
      const target =
        delta === 1
          ? clamp(slide + 1, 1, total)
          : delta === -1
            ? clamp(slide - 1, 1, total)
            : clamp(next, 1, total);
      if (target === slide) return;
      onNavigate(target);
    },
    [slide, onNavigate, total],
  );

  useEffect(() => {
    const el = stageAreaRef.current;
    if (!el) return;

    function measure() {
      const node = stageAreaRef.current;
      if (!node) return;
      const { width, height } = node.getBoundingClientRect();
      setScale(Math.min(width / DESIGN_W, height / DESIGN_H));
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!allowNavigation) return;
    function onKey(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          go(0, { delta: 1 });
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(0, { delta: -1 });
          break;
        case "Home":
          e.preventDefault();
          go(1);
          break;
        case "End":
          e.preventDefault();
          go(total);
          break;
        case "f":
        case "F":
          if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(() => undefined);
          } else {
            document.exitFullscreen().catch(() => undefined);
          }
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slide, go, allowNavigation, total]);

  function handleStageClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!allowNavigation) return;
    if (
      e.target instanceof Element &&
      e.target.closest('button, a, [role="button"]')
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;
    if (x < third) {
      go(0, { delta: -1 });
    } else if (x > third * 2) {
      go(0, { delta: 1 });
    }
  }

  const entry = slides[index];
  if (!entry) {
    return null;
  }

  const { Component, theme, id } = entry;
  const showOrbs = id !== "00" && id !== "01";

  useEffect(() => {
    const root = document.documentElement;
    const opposite = theme === "dark" ? "light" : "dark";
    const enforce = () => {
      if (
        root.classList.contains(opposite) ||
        !root.classList.contains(theme)
      ) {
        root.classList.remove("dark", "light");
        root.classList.add(theme);
      }
    };
    enforce();
    const observer = new MutationObserver(enforce);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      observer.disconnect();
      const restore = initialThemeRef.current;
      root.classList.remove("dark", "light");
      root.classList.add(restore);
    };
  }, [theme]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: motionDuration.base, ease: motionEase },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -24 : 24,
      transition: { duration: motionDuration.fast, ease: motionEase },
    }),
  };

  const progressPct = ((slide - 1) / Math.max(1, total - 1)) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex overflow-hidden bg-background font-sans antialiased"
    >
      <SlideOutlinePanel
        slides={slides}
        slide={slide}
        onNavigate={go}
        hidden={!showOutline}
      />

      <div
        ref={stageAreaRef}
        className={`relative flex min-w-0 flex-1 items-center justify-center overflow-hidden ${theme}`}
      >
        <div
          ref={stageRef}
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
          className="relative shrink-0 cursor-pointer overflow-hidden"
          onClick={handleStageClick}
          role="presentation"
        >
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
            aria-hidden
            style={{ opacity: showOrbs ? 1 : 0 }}
          >
            <motion.div
              className={`absolute -left-44 -top-40 h-[560px] w-[560px] rounded-full blur-[110px] ${
                theme === "dark"
                  ? "bg-foreground opacity-[0.14]"
                  : "bg-[#e3d5b8] opacity-[0.26]"
              }`}
              animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute -bottom-52 -right-40 h-[640px] w-[640px] rounded-full blur-[120px] ${
                theme === "dark"
                  ? "bg-foreground opacity-[0.12]"
                  : "bg-[#e8dcc4] opacity-[0.22]"
              }`}
              animate={{ x: [0, -80, 0], y: [0, -55, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className={`absolute left-[52%] top-[58%] h-[380px] w-[380px] rounded-full blur-[100px] ${
                theme === "dark"
                  ? "bg-foreground opacity-[0.09]"
                  : "bg-[#e3d5b8] opacity-[0.16]"
              }`}
              animate={{ x: [0, 55, 0], y: [0, -65, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={slide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <SlideThemeContext.Provider value={theme}>
                <SlideStepContext.Provider value={step}>
                  <Component />
                </SlideStepContext.Provider>
              </SlideThemeContext.Provider>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/5">
          <div
            className="h-full bg-foreground/25 transition-[width] duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="pointer-events-none absolute bottom-3 right-4 font-mono text-xs tabular-nums text-muted/40">
          {slide} / {total}
        </div>
      </div>
    </div>
  );
}
