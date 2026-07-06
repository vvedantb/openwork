export type SlideVisual =
  | "sidebar-nav"
  | "memory-graph"
  | "optimistic-ui"
  | "gmail-sync"
  | "api-keys"
  | "http-api"
  | "wiki-skills"
  | "inbox-proposals"
  | "chrome-extension"
  | "mcp-tools"
  | "agent-sdk"
  | "list-rows";

export type ChangelogSlide = {
  id: string;
  visual: SlideVisual;
  title: string;
  subtitle: string;
  accent: string;
  commitCount: number;
};

export type ChangelogCompositionProps = {
  title: string;
  repo: string;
  dateRange: string;
  commitCount: number;
  slides: ChangelogSlide[];
};
