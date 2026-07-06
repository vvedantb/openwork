import { loadFont as loadDisplayFont } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadSansFont } from "@remotion/google-fonts/Manrope";
import { loadFont as loadMonoFont } from "@remotion/google-fonts/JetBrainsMono";

const display = loadDisplayFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const sans = loadSansFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const mono = loadMonoFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

export const FONT_DISPLAY = display.fontFamily;
export const FONT_SANS = sans.fontFamily;
export const FONT_MONO = mono.fontFamily;

export const COLORS = {
  ink: "#0f0f0f",
  ink2: "#1a1a1a",
  ink3: "#262626",
  paper: "#f2ede3",
  paperMuted: "#8b867a",
  accent: "#c2410c",
  accentSoft: "rgba(194, 65, 12, 0.18)",
  accentGlow: "rgba(194, 65, 12, 0.45)",
};

export const SECTION_EMOJI: Record<string, string> = {
  navigation: "🧭",
  "wiki-skills": "📚",
  mcp: "🧠",
  connectors: "🔌",
  api: "🔑",
  backend: "⚡",
  "web-polish": "✨",
  mobile: "📱",
  other: "🎁",
};

export const POP_SPRING = { damping: 14, stiffness: 180, mass: 0.55 };
export const SNAPPY_SPRING = { damping: 18, stiffness: 220, mass: 0.45 };
