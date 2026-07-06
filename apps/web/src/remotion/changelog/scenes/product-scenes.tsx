import { interpolate, useCurrentFrame } from "remotion";
import type { FeatureSceneProps } from "./shared";
import { FeatureShell, MockWindow, Sidebar, useBeat } from "./shared";
import { COLORS, FONT_MONO } from "../theme";

export function WikiSkillsScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const showWiki = frame < 75;
  const crossfade = interpolate(frame, [65, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const skillsIn = useBeat(75, 26);

  return (
    <FeatureShell {...props}>
      <MockWindow
        title={
          showWiki
            ? "app.vmem.ai/wiki/architecture"
            : "app.vmem.ai/skills/cypher"
        }
        width={960}
        height={560}
      >
        <div style={{ display: "flex", height: "100%" }}>
          <Sidebar
            items={
              showWiki
                ? ["← Back", "Architecture", "Onboarding", "API"]
                : ["← Back", "cypher-guide", "convex-rules", "tdd"]
            }
            activeIndex={1}
            width={200}
          />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                padding: "16px 24px",
                borderBottom: `1px solid ${COLORS.paper}10`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <input
                readOnly
                value={
                  showWiki ? "Architecture overview" : "neo4j-cypher-guide"
                }
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  background: "transparent",
                  border: "none",
                  color: COLORS.paper,
                  outline: `2px solid ${props.slide.accent}55`,
                  borderRadius: 6,
                  padding: "4px 8px",
                }}
              />
              <div style={{ fontSize: 13, color: COLORS.paperMuted }}>
                ⋯ menu
              </div>
            </div>
            <div style={{ flex: 1, position: "relative", padding: 24 }}>
              <div
                style={{
                  opacity: showWiki ? crossfade : 0,
                  position: "absolute",
                  inset: 24,
                }}
              >
                <div
                  style={{
                    color: COLORS.paperMuted,
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                  }}
                >
                  # Architecture
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 16,
                    lineHeight: 1.6,
                    maxWidth: 520,
                  }}
                >
                  Convex backend, Neo4j graph, MCP over SSE…
                </div>
              </div>
              <div
                style={{
                  opacity: showWiki ? 0 : skillsIn,
                  transform: `translateY(${interpolate(skillsIn, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    color: COLORS.paperMuted,
                    fontFamily: FONT_MONO,
                    fontSize: 13,
                  }}
                >
                  ## When to use
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontSize: 16,
                    lineHeight: 1.6,
                    maxWidth: 520,
                  }}
                >
                  Modern Cypher patterns for Neo4j 2025…
                </div>
              </div>
            </div>
          </div>
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function InboxProposalsScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const kinds = [
    { kind: "synthesis", color: "#8b5cf6", title: "Merge onboarding docs" },
    { kind: "update", color: "#06b6d4", title: "Refresh API key copy" },
    { kind: "synthesis", color: "#8b5cf6", title: "Link Gmail memories" },
  ];

  return (
    <FeatureShell {...props}>
      <MockWindow title="Inbox → Proposals" width={800} height={500}>
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {kinds.map((card, index) => {
            const appear = interpolate(
              frame,
              [12 + index * 18, 32 + index * 18],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );
            return (
              <div
                key={card.title}
                style={{
                  display: "flex",
                  borderRadius: 14,
                  overflow: "hidden",
                  background: COLORS.ink3,
                  border: `1px solid ${COLORS.paper}12`,
                  opacity: appear,
                  transform: `translateY(${interpolate(appear, [0, 1], [24, 0])}px)`,
                }}
              >
                <div style={{ width: 6, background: card.color }} />
                <div style={{ padding: "18px 20px", flex: 1 }}>
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: card.color,
                    }}
                  >
                    {card.kind}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: COLORS.paperMuted,
                      marginTop: 6,
                    }}
                  >
                    Review proposed memory changes from Dream Mode
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 14px",
                      borderRadius: 8,
                      background: `${props.slide.accent}22`,
                      fontSize: 13,
                    }}
                  >
                    Accept
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function ListRowsScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const after = frame >= 70;
  const afterPop = useBeat(70, 24);
  const hoverRow = frame >= 95 ? 1 : -1;

  const rows = [
    "Memory: React hooks patterns",
    "Memory: Convex auth flow",
    "Memory: Gmail import rules",
  ];

  return (
    <FeatureShell {...props}>
      <div style={{ display: "flex", gap: 32 }}>
        <MockWindow title="Before" width={400} height={360} delay={0}>
          <div style={{ padding: 12 }}>
            {rows.map((row) => (
              <div
                key={row}
                style={{
                  padding: "14px 16px",
                  marginBottom: 8,
                  borderRadius: 10,
                  background: `${COLORS.paper}14`,
                  fontSize: 14,
                  opacity: after ? 0.35 : 1,
                }}
              >
                {row}
              </div>
            ))}
            {!after ? (
              <div
                style={{ fontSize: 12, color: COLORS.paperMuted, marginTop: 8 }}
              >
                Resting muted fill on every row
              </div>
            ) : null}
          </div>
        </MockWindow>
        <div
          style={{
            opacity: after ? afterPop : 0,
            transform: `translateX(${interpolate(afterPop, [0, 1], [30, 0])}px)`,
          }}
        >
          <MockWindow title="After" width={400} height={360}>
            <div style={{ padding: 12 }}>
              {rows.map((row, index) => (
                <div
                  key={row}
                  style={{
                    padding: "14px 16px",
                    marginBottom: 8,
                    borderRadius: 10,
                    background:
                      hoverRow === index
                        ? `${props.slide.accent}22`
                        : "transparent",
                    border:
                      hoverRow === index
                        ? `1px solid ${props.slide.accent}55`
                        : "1px solid transparent",
                    fontSize: 14,
                    transform: hoverRow === index ? "scale(1.01)" : "scale(1)",
                  }}
                >
                  {row}
                </div>
              ))}
              <div
                style={{
                  fontSize: 12,
                  color: props.slide.accent,
                  marginTop: 8,
                }}
              >
                Hover-only — flat at rest ✓
              </div>
            </div>
          </MockWindow>
        </div>
      </div>
    </FeatureShell>
  );
}

export function ChromeExtensionScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const syncWave = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const auth = useBeat(15, 24);

  return (
    <FeatureShell {...props}>
      <MockWindow title="Chrome · vmem extension" width={880} height={500}>
        <div style={{ padding: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: 16,
              borderRadius: 14,
              background: COLORS.ink3,
              opacity: auth,
            }}
          >
            <div style={{ fontSize: 32 }}>🧩</div>
            <div>
              <div style={{ fontWeight: 700 }}>Sync host auth restored</div>
              <div
                style={{
                  fontSize: 13,
                  color: COLORS.paperMuted,
                  fontFamily: FONT_MONO,
                }}
              >
                chrome.cookies → __clerk_db_jwt (no popup needed)
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24, position: "relative", height: 80 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 36,
                height: 4,
                background: `${COLORS.paper}14`,
                borderRadius: 999,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 36,
                height: 4,
                width: `${syncWave * 100}%`,
                background: props.slide.accent,
                borderRadius: 999,
                boxShadow: `0 0 20px ${props.slide.accent}`,
              }}
            />
            {["History", "Bookmarks", "Catch-up"].map((label, index) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: `${index * 33 + 5}%`,
                  top: 0,
                  fontSize: 12,
                  fontFamily: FONT_MONO,
                  color:
                    syncWave > index / 3
                      ? props.slide.accent
                      : COLORS.paperMuted,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 12,
              background: `${props.slide.accent}14`,
              fontFamily: FONT_MONO,
              fontSize: 13,
            }}
          >
            Service worker: 70KB · auto-sync every 30min ✓
          </div>
        </div>
      </MockWindow>
    </FeatureShell>
  );
}
