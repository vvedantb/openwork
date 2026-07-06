import { interpolate, useCurrentFrame } from "remotion";
import type { FeatureSceneProps } from "./shared";
import { FeatureShell, MockWindow, useBeat } from "./shared";
import { COLORS, FONT_MONO } from "../theme";

export function GmailSyncScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const gmailPop = useBeat(0, 22);
  const flow = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cron = useBeat(100, 24);

  return (
    <FeatureShell {...props}>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 28,
            background: "#ea4335",
            display: "grid",
            placeItems: "center",
            fontSize: 64,
            boxShadow: "0 20px 60px rgba(234,67,53,0.35)",
            transform: `scale(${gmailPop})`,
          }}
        >
          ✉️
        </div>
        <div style={{ width: 120, position: "relative", height: 8 }}>
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: `${COLORS.paper}18`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: 8,
              width: `${flow * 100}%`,
              borderRadius: 999,
              background: props.slide.accent,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${flow * 100}%`,
              top: -8,
              transform: "translateX(-50%)",
              fontSize: 22,
            }}
          >
            📨
          </div>
        </div>
        <MockWindow title="vmem · memories" width={520} height={380} delay={20}>
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {[
              "Re: Q2 roadmap thread",
              "Invoice from Stripe",
              "GitHub PR review",
            ].map((subject, index) => {
              const appear = interpolate(
                frame,
                [40 + index * 14, 58 + index * 14],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              );
              return (
                <div
                  key={subject}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: `${props.slide.accent}18`,
                    border: `1px solid ${props.slide.accent}33`,
                    opacity: appear,
                    transform: `translateX(${interpolate(appear, [0, 1], [40, 0])}px)`,
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{subject}</div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.paperMuted,
                      marginTop: 4,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    sourceType: gmail · synced
                  </div>
                </div>
              );
            })}
          </div>
        </MockWindow>
      </div>
      <div
        style={{
          position: "absolute",
          top: 72,
          right: 100,
          padding: "12px 18px",
          borderRadius: 12,
          background: COLORS.ink3,
          border: `1px solid ${props.slide.accent}44`,
          fontFamily: FONT_MONO,
          fontSize: 13,
          opacity: cron,
          transform: `translateY(${interpolate(cron, [0, 1], [-16, 0])}px)`,
        }}
      >
        ⏰ Daily cron · 04:00 UTC full sync
      </div>
    </FeatureShell>
  );
}

export function ApiKeysScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const renameAt = 50;
  const deleteAt = 95;
  const renamed = frame >= renameAt;
  const deleted = frame >= deleteAt;

  return (
    <FeatureShell {...props}>
      <MockWindow title="Settings → API → Keys" width={780} height={440}>
        <div style={{ padding: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 80px",
              gap: 12,
              fontFamily: FONT_MONO,
              fontSize: 12,
              color: COLORS.paperMuted,
              marginBottom: 12,
            }}
          >
            <span>Name</span>
            <span>Status</span>
            <span>Actions</span>
          </div>
          {[
            {
              name: renamed ? "Production CI" : "Untitled key",
              status: "active",
            },
            { name: "Local dev", status: deleted ? "removed" : "revoked" },
          ].map((row, index) => {
            const show = index === 0 || !deleted;
            if (!show) {
              return (
                <div
                  key={row.name}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: `1px dashed ${COLORS.paper}22`,
                    color: COLORS.paperMuted,
                    fontStyle: "italic",
                    opacity: interpolate(
                      frame,
                      [deleteAt, deleteAt + 15],
                      [0, 1],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      },
                    ),
                  }}
                >
                  Key deleted ✓
                </div>
              );
            }
            return (
              <div
                key={row.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 100px 80px",
                  gap: 12,
                  alignItems: "center",
                  padding: "14px 16px",
                  borderRadius: 12,
                  background: COLORS.ink3,
                  marginBottom: 10,
                  border:
                    index === 0 && frame >= renameAt && frame < deleteAt
                      ? `2px solid ${props.slide.accent}`
                      : `1px solid ${COLORS.paper}10`,
                }}
              >
                <span style={{ fontWeight: 600 }}>{row.name}</span>
                <span style={{ color: props.slide.accent }}>{row.status}</span>
                <span>{index === 0 ? "✎ 🗑" : "🗑"}</span>
              </div>
            );
          })}
        </div>
      </MockWindow>
    </FeatureShell>
  );
}

export function HttpApiScene(props: FeatureSceneProps) {
  const frame = useCurrentFrame();
  const lines = [
    { t: 0, text: "$ curl -X DELETE api.vmem.ai/v1/memories \\" },
    { t: 18, text: '    -H "Authorization: Bearer vmem_..." \\' },
    { t: 32, text: '    -d \'{"memoryId": "mem_7x9k"}\'' },
    { t: 55, text: "" },
    { t: 58, text: "HTTP/1.1 200 OK" },
    { t: 72, text: '{ "deleted": true, "memoryId": "mem_7x9k" }' },
    { t: 90, text: "" },
    { t: 94, text: "✓ pnpm test:http-api — 4/4 passed" },
  ];

  return (
    <FeatureShell {...props}>
      <MockWindow title="terminal · integration tests" width={820} height={460}>
        <div
          style={{
            padding: 24,
            fontFamily: FONT_MONO,
            fontSize: 15,
            lineHeight: 1.7,
            height: "100%",
            background: "#0a0a0a",
          }}
        >
          {lines.map((line) => {
            const visible = frame >= line.t;
            const isSuccess =
              line.text.includes("200") || line.text.includes("passed");
            return (
              <div
                key={line.t}
                style={{
                  opacity: visible ? 1 : 0,
                  color: isSuccess
                    ? "#4ade80"
                    : line.text.startsWith("$")
                      ? props.slide.accent
                      : COLORS.paper,
                }}
              >
                {line.text || "\u00A0"}
              </div>
            );
          })}
        </div>
      </MockWindow>
    </FeatureShell>
  );
}
