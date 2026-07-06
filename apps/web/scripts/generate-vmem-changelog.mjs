import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VMEM_ROOT = path.resolve(__dirname, "../../../../vmem");
const OUT_DIR = path.resolve(__dirname, "../src/remotion/changelog");
const OUT_FILE = path.join(OUT_DIR, "vmem-7d.json");

/** Each slide gets a unique Remotion scene that visualizes the change. */
const HERO_FEATURES = [
  {
    visual: "sidebar-nav",
    title: "Sub-sidebar navigation",
    subtitle: "Teams, Wiki, Skills & Codebases each get a searchable sub-sidebar with back navigation",
    accent: "#6366f1",
    match: /sub-sidebar|team sections in sidebar|skills list in root sidebar|wiki tree in root sidebar|codebases sub-sidebar|teams sub-sidebar/i,
  },
  {
    visual: "memory-graph",
    title: "Interactive memory graph",
    subtitle: "Pan & zoom your memory graph inside Claude via MCP Apps — aligned with the web UI",
    accent: "#06b6d4",
    match: /memory graph|memory_graph|memory graph app|memory graph viewport|memory graph readability/i,
  },
  {
    visual: "optimistic-ui",
    title: "Optimistic mutations",
    subtitle: "Toggles, lists & forms update instantly — Convex patches the cache before the server responds",
    accent: "#14b8a6",
    match: /optimistic convex|optimistic.*mutation/i,
  },
  {
    visual: "gmail-sync",
    title: "Gmail connector",
    subtitle: "OAuth ingest pulls inbox messages into memories — daily full sync at 04:00 UTC",
    accent: "#10b981",
    match: /gmail ingest|gmail connector|daily.*sync|daily connector sync|delete imported connector/i,
  },
  {
    visual: "api-keys",
    title: "API key management",
    subtitle: "Rename active or revoked keys, delete stale rows, cleaner table actions",
    accent: "#f59e0b",
    match: /api-keys|api key|renaming keys|deleting revoked|icon actions on api keys/i,
  },
  {
    visual: "http-api",
    title: "HTTP Memories API",
    subtitle: "DELETE /api/v1/memories plus live integration tests for store, retrieve, patch & delete",
    accent: "#eab308",
    match: /http-api|delete endpoint|test:http-api|memories API integration/i,
  },
  {
    visual: "wiki-skills",
    title: "Wiki & Skills chrome",
    subtitle: "Editable titles in the page header, outline toggles in menus, add actions in the sidebar",
    accent: "#8b5cf6",
    match: /wiki document chrome|skills document chrome|wiki and skills header|wiki navigation and layout|skills layout polish/i,
  },
  {
    visual: "inbox-proposals",
    title: "Inbox proposals",
    subtitle: "Kind-colored accent rails and clearer cards for reviewing Dream Mode synthesis proposals",
    accent: "#f97316",
    match: /inbox proposals|proposal cards|proposals review/i,
  },
  {
    visual: "chrome-extension",
    title: "Chrome extension sync",
    subtitle: "Restart-proof auth via cookies, lightweight service worker, reliable 30-min auto-sync",
    accent: "#3b82f6",
    match: /chrome extension|auto-sync|sync-host|extension sync|offscreen auth|service worker/i,
  },
  {
    visual: "mcp-tools",
    title: "MCP tool expansion",
    subtitle: "skills_create, skills_update, wiki CRUD, memory_add_instruction & memory_related",
    accent: "#22d3ee",
    match: /skills_create|skills_update|wiki_delete|skills_delete|memory_add_instruction|memory_related|instruction store/i,
  },
  {
    visual: "agent-sdk",
    title: "@vmem/sdk",
    subtitle: "Agentic SDK over existing HTTP routes — npm publish workflow for programmatic memory access",
    accent: "#ec4899",
    match: /@vmem\/sdk|agentic vmem sdk|npm publish workflow|ship agentic/i,
  },
  {
    visual: "list-rows",
    title: "Flat list surfaces",
    subtitle: "Memory list, AI logs & activity rows use hover-only backgrounds — no resting muted fill",
    accent: "#a855f7",
    match: /list row|hover-only|flatten.*row|flat rows at rest|memory list hover/i,
  },
];

function parseCommit(line) {
  const [hash, date, author, ...messageParts] = line.split("|");
  return {
    hash: hash.slice(0, 7),
    date,
    author,
    message: messageParts.join("|").replace(/^\uFEFF/, "").trim(),
  };
}

function buildSlides(commits) {
  const used = new Set();
  const slides = [];

  for (const feature of HERO_FEATURES) {
    const matching = commits.filter(
      (commit) => feature.match.test(commit.message) && !used.has(commit.hash),
    );
    if (matching.length === 0) {
      continue;
    }
    matching.forEach((commit) => used.add(commit.hash));
    slides.push({
      id: feature.visual,
      visual: feature.visual,
      title: feature.title,
      subtitle: feature.subtitle,
      accent: feature.accent,
      commitCount: matching.length,
    });
  }

  return slides;
}

function getDateRange(commits) {
  if (commits.length === 0) {
    return "Last 7 days";
  }
  const dates = commits.map((commit) => commit.date).sort();
  return `${dates[0]} → ${dates[dates.length - 1]}`;
}

function main() {
  const raw = execSync(
    `git -C "${VMEM_ROOT}" log --since="7 days ago" --pretty=format:"%H|%ad|%an|%s" --date=short`,
    { encoding: "utf8" },
  ).trim();

  const commits = raw
    ? raw
        .split("\n")
        .map(parseCommit)
        .filter(
          (commit) =>
            !/^merge /i.test(commit.message) &&
            !/^Merge pull request/i.test(commit.message),
        )
    : [];

  const slides = buildSlides(commits);
  const payload = {
    title: "vmem Weekly Changelog",
    repo: "vmem",
    dateRange: getDateRange(commits),
    commitCount: commits.length,
    generatedAt: new Date().toISOString(),
    slides,
  };

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${OUT_FILE} (${commits.length} commits → ${slides.length} feature slides)`,
  );
}

main();
