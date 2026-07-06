import type { ChangelogSlide, SlideVisual } from "./types";
import type { FeatureSceneProps } from "./scenes/shared";
import {
  GmailSyncScene,
  ApiKeysScene,
  HttpApiScene,
} from "./scenes/api-scenes";
import {
  SidebarNavScene,
  MemoryGraphScene,
  OptimisticUiScene,
} from "./scenes/nav-scenes";
import { AgentSdkScene, McpToolsScene } from "./scenes/platform-scenes";
import {
  WikiSkillsScene,
  InboxProposalsScene,
  ListRowsScene,
  ChromeExtensionScene,
} from "./scenes/product-scenes";

const SCENE_MAP: Record<SlideVisual, React.ComponentType<FeatureSceneProps>> = {
  "sidebar-nav": SidebarNavScene,
  "memory-graph": MemoryGraphScene,
  "optimistic-ui": OptimisticUiScene,
  "gmail-sync": GmailSyncScene,
  "api-keys": ApiKeysScene,
  "http-api": HttpApiScene,
  "wiki-skills": WikiSkillsScene,
  "inbox-proposals": InboxProposalsScene,
  "chrome-extension": ChromeExtensionScene,
  "mcp-tools": McpToolsScene,
  "agent-sdk": AgentSdkScene,
  "list-rows": ListRowsScene,
};

export function FeatureSlide({
  slide,
  index,
  total,
}: {
  slide: ChangelogSlide;
  index: number;
  total: number;
}) {
  const Scene = SCENE_MAP[slide.visual];
  if (!Scene) {
    return null;
  }
  return <Scene slide={slide} index={index} total={total} />;
}
