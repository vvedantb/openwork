import { interpolate, useCurrentFrame } from "remotion";
import type { FeatureSceneProps } from "./shared";
import { FeatureShell, MockWindow, Sidebar, useBeat } from "./shared";
import { COLORS, FONT_MONO } from "../theme";

export function SidebarNavScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const phase = frame < 55 ? 0 : frame < 95 ? 1 : 2;
  const subSlide = useBeat(55, 28);
  const teamSelect = useBeat(95, 24);

  const rootItems = ["Home", "Memories", "Teams", "Wiki", "Skills", "Settings"];
  const teamItems = [
    "← Back",
    "Acme Corp",
    "Overview",
    "Knowledge",
    "Members",
    "Settings",
  ];

  return (
    <FeatureShell {...props}>
      <MockWindow title="app.vmem.ai/teams" width={980} height={580}>
        <div style={{ display: "flex", height: "100%" }}>
          <Sidebar items={rootItems} activeIndex={2} width={200} />
          <div
            style={{
              width: phase >= 1 ? interpolate(subSlide, [0, 1], [0, 220]) : 0,
              overflow: "hidden",
              borderRight: phase >= 1 ? `1px solid ${COLORS.paper}10` : "none",
            }}
          >
            <Sidebar
              items={teamItems}
              activeIndex={phase >= 2 ? 3 : 2}
              width={220}
            />
          </div>
          <div style={{ flex: 1, padding: 28 }}>
            <div
              style={{
                fontFamily: FONT_MONO,
                fontSize: 12,
                color: COLORS.paperMuted,
                marginBottom: 12,
              }}
            >
              {phase === 0 && "Click Teams in root sidebar…"}
              {phase === 1 && "Sub-sidebar slides in — searchable list + back"}
              {phase === 2 && "Team sections nest under selection"}
            </div>
            <div
              style={{
                padding: 24,
                borderRadius: 16,
                background: `${props.slide.accent}12`,
                border: `1px solid ${props.slide.accent}33`,
                transform: `scale(${phase >= 2 ? teamSelect : 1})`,
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 700 }}>Knowledge</div>
              <div
                style={{ marginTop: 8, color: COLORS.paperMuted, fontSize: 16 }}
              >
                Shared team memories & wiki
              </div>
            </div>
          </div>
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function MemoryGraphScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [20, 90], [0.85, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panX = interpolate(frame, [0, 120], [0, -40], {
    extrapolateRight: "clamp",
  });
  const panY = interpolate(frame, [0, 120], [0, -24], {
    extrapolateRight: "clamp",
  });

  const nodes = [
    { x: 180, y: 120, label: "React patterns", hue: 210 },
    { x: 380, y: 80, label: "vmem SDK", hue: 330 },
    { x: 520, y: 200, label: "Gmail ingest", hue: 140 },
    { x: 300, y: 260, label: "Neo4j graph", hue: 45 },
    { x: 640, y: 140, label: "MCP tools", hue: 190 },
  ];

  const edges = [
    [0, 3],
    [1, 4],
    [2, 3],
    [3, 4],
  ];

  return (
    <FeatureShell {...props}>
      <MockWindow
        title="Claude · memory_graph MCP App"
        width={960}
        height={580}
      >
        <div
          style={{
            height: "100%",
            background: `radial-gradient(circle at 50% 40%, ${props.slide.accent}18, ${COLORS.ink} 70%)`,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <svg
            width="100%"
            height="100%"
            style={{
              transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            {edges.map(([from, to], index) => {
              const a = nodes[from];
              const b = nodes[to];
              const draw = interpolate(
                frame,
                [15 + index * 8, 35 + index * 8],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={a.x + (b.x - a.x) * draw}
                  y2={a.y + (b.y - a.y) * draw}
                  stroke={`${COLORS.paper}44`}
                  strokeWidth={2}
                />
              );
            })}
            {nodes.map((node, index) => {
              const pop = interpolate(
                frame,
                [10 + index * 6, 28 + index * 6],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              const pulse = 1 + Math.sin(frame / 10 + index) * 0.06;
              return (
                <g key={node.label} opacity={pop}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={34 * pulse}
                    fill={`hsl(${node.hue} 70% 55% / 0.35)`}
                    stroke={`hsl(${node.hue} 80% 65%)`}
                    strokeWidth={2}
                  />
                  <text
                    x={node.x}
                    y={node.y + 52}
                    textAnchor="middle"
                    fill={COLORS.paper}
                    fontSize={11}
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              display: "flex",
              gap: 8,
            }}
          >
            {["Fit", "Zoom +", "Zoom −"].map((label) => (
              <div
                key={label}
                style={{
                  padding: "8px 12px",
                  borderRadius: 8,
                  background: `${COLORS.ink3}cc`,
                  border: `1px solid ${COLORS.paper}22`,
                  fontSize: 12,
                  fontFamily: FONT_MONO,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function OptimisticUiScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const toggled = frame >= 48;
  const click = useBeat(48, 16);
  const ripple = interpolate(click, [0, 1], [0, 1]);

  return (
    <FeatureShell {...props}>
      <MockWindow title="app.vmem.ai/settings/skills" width={720} height={420}>
        <div style={{ padding: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              borderRadius: 14,
              background: COLORS.ink3,
              border: `1px solid ${COLORS.paper}14`,
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                neo4j-cypher-guide
              </div>
              <div
                style={{ fontSize: 14, color: COLORS.paperMuted, marginTop: 4 }}
              >
                {toggled ? "Enabled · saved locally" : "Disabled"}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              {ripple > 0 && ripple < 1 ? (
                <div
                  style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: 999,
                    border: `2px solid ${props.slide.accent}`,
                    opacity: 1 - ripple,
                    transform: `scale(${1 + ripple * 0.8})`,
                  }}
                />
              ) : null}
              <div
                style={{
                  width: 56,
                  height: 32,
                  borderRadius: 999,
                  background: toggled
                    ? props.slide.accent
                    : `${COLORS.paper}22`,
                  padding: 4,
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: COLORS.paper,
                    transform: `translateX(${toggled ? 24 : 0}px)`,
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 12,
              background: `${props.slide.accent}14`,
              border: `1px dashed ${props.slide.accent}55`,
              fontFamily: FONT_MONO,
              fontSize: 13,
              color: props.slide.accent,
            }}
          >
            {toggled
              ? "✓ Cache patched instantly — server confirms 120ms later"
              : "Waiting for tap…"}
          </div>
        </div>
      </MockWindow>
    </FeatureShell>
  );
}
