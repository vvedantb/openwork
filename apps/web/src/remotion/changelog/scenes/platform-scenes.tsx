import { useCurrentFrame } from "remotion";
import type { FeatureSceneProps } from "./shared";
import { FeatureShell, MockWindow, useBeat } from "./shared";
import { COLORS, FONT_MONO } from "../theme";

export function McpToolsScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const tools = [
    { name: "skills_create", args: '{ "name": "deploy-checklist" }', t: 20 },
    { name: "wiki_delete", args: '{ "path": "/drafts/old" }', t: 55 },
    { name: "memory_related", args: '{ "memoryId": "mem_abc" }', t: 90 },
  ];

  return (
    <FeatureShell {...props}>
      <MockWindow title="Claude Desktop · vmem MCP" width={780} height={520}>
        <div
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "75%",
              padding: "12px 16px",
              borderRadius: "16px 16px 4px 16px",
              background: `${COLORS.paper}12`,
              fontSize: 15,
            }}
          >
            Create a deploy checklist skill and show related memories
          </div>
          {tools.map((tool) => {
            const show = frame >= tool.t;
            const done = frame >= tool.t + 25;
            return (
              <div
                key={tool.name}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: `${props.slide.accent}12`,
                  border: `1px solid ${props.slide.accent}33`,
                  opacity: show ? 1 : 0,
                  transform: `translateX(${show ? 0 : -20}px)`,
                  fontFamily: FONT_MONO,
                  fontSize: 13,
                }}
              >
                <div style={{ color: props.slide.accent, fontWeight: 700 }}>
                  🔧 {tool.name}()
                </div>
                <div style={{ marginTop: 6, color: COLORS.paperMuted }}>
                  {tool.args}
                </div>
                {done ? (
                  <div style={{ marginTop: 8, color: "#4ade80" }}>
                    ✓ tool result · 2.1kb
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function AgentSdkScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const codeLines = [
    'import { VmemClient } from "@vmem/sdk";',
    "",
    "const vmem = new VmemClient({ apiKey: process.env.VMEM_KEY });",
    "",
    "await vmem.memories.store({",
    '  content: "Ship weekly changelog videos",',
    '  profileId: "default",',
    "});",
  ];

  let charBudget = Math.max(0, Math.floor((frame - 25) / 1.8));
  const typed = codeLines
    .map((line) => {
      if (charBudget <= 0) {
        return "";
      }
      if (line.length <= charBudget) {
        charBudget -= line.length + 1;
        return line;
      }
      const slice = line.slice(0, charBudget);
      charBudget = 0;
      return slice;
    })
    .join("\n");

  const npmPop = useBeat(0, 22);

  return (
    <FeatureShell {...props}>
      <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
        <div
          style={{
            padding: "20px 24px",
            borderRadius: 16,
            background: COLORS.ink3,
            border: `1px solid ${COLORS.paper}14`,
            fontFamily: FONT_MONO,
            fontSize: 16,
            transform: `scale(${npmPop})`,
            opacity: npmPop,
          }}
        >
          <div style={{ color: COLORS.paperMuted }}>
            $ npm install @vmem/sdk
          </div>
          <div style={{ color: "#4ade80", marginTop: 8 }}>
            + @vmem/sdk@0.1.0
          </div>
        </div>
        <MockWindow title="agent.ts" width={620} height={400} delay={12}>
          <pre
            style={{
              margin: 0,
              padding: 20,
              fontFamily: FONT_MONO,
              fontSize: 14,
              lineHeight: 1.65,
              color: COLORS.paper,
              whiteSpace: "pre-wrap",
            }}
          >
            {typed}
            <span
              style={{
                opacity: frame % 20 < 10 ? 1 : 0,
                color: props.slide.accent,
              }}
            >
              ▍
            </span>
          </pre>
        </MockWindow>
      </div>
    </FeatureShell>
  );
}
