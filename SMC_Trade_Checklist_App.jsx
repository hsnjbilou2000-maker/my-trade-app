import { useState, useEffect } from "react";

const SECTIONS = [
  {
    id: "4h",
    label: "4H — Big picture",
    caption: "Identify the macro trend",
    color: "#10b981",
    bg: "#ecfdf5",
    textColor: "#065f46",
    steps: [
      { id: 1, text: "Direction confirmed (bull / bear)" },
      { id: 2, text: "Key S/R levels marked" },
      { id: 3, text: "Supply & Demand zones mapped" },
    ],
  },
  {
    id: "1h",
    label: "1H — Smart money",
    caption: "Follow institutional flow",
    color: "#3b82f6",
    bg: "#eff6ff",
    textColor: "#1e40af",
    steps: [
      { id: 4, text: "BOS / CHoCH spotted" },
      { id: 5, text: "Order Block (OB) identified" },
      { id: 6, text: "Fair Value Gap (FVG) marked" },
      { id: 7, text: "Liquidity pools noted" },
    ],
  },
  {
    id: "30m",
    label: "30min — Entry",
    caption: "Time the execution",
    color: "#f59e0b",
    bg: "#fffbeb",
    textColor: "#92400e",
    steps: [
      { id: 8, text: "Reversal signal present" },
      { id: 9, text: "Confirmation candle closed" },
    ],
  },
  {
    id: "risk",
    label: "Risk — Non negotiable",
    caption: "Protect capital first",
    color: "#ef4444",
    bg: "#fef2f2",
    textColor: "#991b1b",
    steps: [
      { id: 10, text: "SL placed beyond OB / FVG" },
      { id: 11, text: "RR ≥ 1:2 & size calculated" },
    ],
  },
];

const TOTAL = 11;

export default function App() {
  const [checked, setChecked] = useState({});
  const [ripple, setRipple] = useState(null);

  const count = Object.values(checked).filter(Boolean).length;
  const percent = Math.round((count / TOTAL) * 100);
  const unlocked = count === TOTAL;

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    setRipple(id);
    setTimeout(() => setRipple(null), 350);
  }

  function reset() {
    setChecked({});
  }

  function sectionCount(sec) {
    return sec.steps.filter((s) => checked[s.id]).length;
  }

  const progressColor = unlocked
    ? "#10b981"
    : percent > 60
    ? "#3b82f6"
    : percent > 30
    ? "#f59e0b"
    : "#94a3b8";

  return (
    <div style={styles.shell}>
      {/* Status bar simulation */}
      <div style={styles.statusBar}>
        <span style={styles.statusTime}>
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <span style={styles.statusIcons}>📶 🔋</span>
      </div>

      {/* App header */}
      <div style={styles.appBar}>
        <div>
          <div style={styles.appTitle}>Trade Checklist</div>
          <div style={styles.appSubtitle}>SMC · {count}/{TOTAL} steps</div>
        </div>
        <button onClick={reset} style={styles.resetBtn}>
          ↺ Reset
        </button>
      </div>

      {/* Scrollable content */}
      <div style={styles.scrollArea}>
        {/* Progress card */}
        <div style={styles.progressCard}>
          <div style={styles.progressRow}>
            <span style={styles.progressLabel}>Overall progress</span>
            <span style={{ ...styles.progressPct, color: progressColor }}>{percent}%</span>
          </div>
          <div style={styles.track}>
            <div
              style={{
                ...styles.fill,
                width: `${percent}%`,
                background: progressColor,
                transition: "width 0.4s ease, background 0.4s ease",
              }}
            />
          </div>
          <div style={styles.miniStats}>
            {SECTIONS.map((sec) => (
              <div key={sec.id} style={styles.miniStat}>
                <div
                  style={{
                    ...styles.miniDot,
                    background: sec.color,
                    opacity: sectionCount(sec) === sec.steps.length ? 1 : 0.3,
                  }}
                />
                <span style={styles.miniLabel}>
                  {sectionCount(sec)}/{sec.steps.length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map((sec) => {
          const done = sectionCount(sec);
          const total = sec.steps.length;
          const allDone = done === total;
          return (
            <div key={sec.id} style={styles.card}>
              {/* Section header */}
              <div style={{ ...styles.sectionHeader, background: sec.bg }}>
                <div
                  style={{ ...styles.sectionStripe, background: sec.color }}
                />
                <div style={styles.sectionMeta}>
                  <span style={{ ...styles.sectionLabel, color: sec.textColor }}>
                    {sec.label}
                  </span>
                  <span style={{ ...styles.sectionCaption, color: sec.textColor }}>
                    {sec.caption}
                  </span>
                </div>
                <div
                  style={{
                    ...styles.badge,
                    background: allDone ? sec.color : "rgba(0,0,0,0.08)",
                    color: allDone ? "#fff" : sec.textColor,
                  }}
                >
                  {done}/{total}
                </div>
              </div>

              {/* Steps */}
              {sec.steps.map((step, idx) => {
                const isChecked = !!checked[step.id];
                const isRippling = ripple === step.id;
                return (
                  <div
                    key={step.id}
                    onClick={() => toggle(step.id)}
                    style={{
                      ...styles.stepRow,
                      background: isRippling
                        ? "#f0fdf4"
                        : isChecked
                        ? "#fafafa"
                        : "#fff",
                      borderBottom:
                        idx < sec.steps.length - 1
                          ? "1px solid #f1f5f9"
                          : "none",
                    }}
                  >
                    {/* Custom checkbox */}
                    <div
                      style={{
                        ...styles.checkbox,
                        background: isChecked ? sec.color : "transparent",
                        border: `2px solid ${isChecked ? sec.color : "#cbd5e1"}`,
                        transform: isRippling ? "scale(1.2)" : "scale(1)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isChecked && (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path
                            d="M1 4L4 7L10 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span
                      style={{
                        ...styles.stepText,
                        color: isChecked ? "#94a3b8" : "#1e293b",
                        textDecoration: isChecked ? "line-through" : "none",
                      }}
                    >
                      {step.text}
                    </span>
                    {isChecked && (
                      <span style={{ fontSize: 14, marginLeft: 4 }}>✓</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Lock panel */}
        <div
          style={{
            ...styles.lockPanel,
            background: unlocked ? "#ecfdf5" : "#f8fafc",
            border: unlocked ? "2px solid #10b981" : "2px dashed #cbd5e1",
            boxShadow: unlocked ? "0 0 20px rgba(16,185,129,0.2)" : "none",
            transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>
            {unlocked ? "🔓" : "🔒"}
          </div>
          <div
            style={{
              ...styles.lockTitle,
              color: unlocked ? "#047857" : "#475569",
            }}
          >
            {unlocked ? "Signal Unlocked!" : "Signal Locked"}
          </div>
          <div
            style={{
              ...styles.lockDesc,
              color: unlocked ? "#065f46" : "#94a3b8",
            }}
          >
            {unlocked
              ? "✅ Ready to Execute"
              : `${TOTAL - count} step${TOTAL - count !== 1 ? "s" : ""} remaining`}
          </div>
        </div>

        {/* Bottom padding */}
        <div style={{ height: 32 }} />
      </div>

      {/* Bottom nav bar */}
      <div style={styles.navBar}>
        {["📋 Checklist", "📊 Stats", "⚙️ Settings"].map((item, i) => (
          <div
            key={i}
            style={{
              ...styles.navItem,
              color: i === 0 ? "#10b981" : "#94a3b8",
              fontWeight: i === 0 ? 700 : 400,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  shell: {
    width: 390,
    height: 844,
    background: "#f1f5f9",
    borderRadius: 44,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
    border: "10px solid #1a1a1a",
    margin: "0 auto",
    position: "relative",
  },
  statusBar: {
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px 6px",
    fontSize: 12,
    fontWeight: 600,
    color: "#1e293b",
  },
  statusTime: { fontSize: 13, fontWeight: 700 },
  statusIcons: { fontSize: 12 },
  appBar: {
    background: "#fff",
    padding: "8px 20px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e2e8f0",
  },
  appTitle: { fontSize: 20, fontWeight: 800, color: "#0f172a" },
  appSubtitle: { fontSize: 12, color: "#64748b", marginTop: 2 },
  resetBtn: {
    background: "#f1f5f9",
    border: "none",
    borderRadius: 20,
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600,
    color: "#475569",
    cursor: "pointer",
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    padding: "12px 14px 0",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  progressCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "16px 18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressLabel: { fontSize: 13, fontWeight: 600, color: "#334155" },
  progressPct: { fontSize: 16, fontWeight: 800 },
  track: {
    height: 8,
    borderRadius: 4,
    background: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 12,
  },
  fill: { height: "100%", borderRadius: 4 },
  miniStats: { display: "flex", gap: 16 },
  miniStat: { display: "flex", alignItems: "center", gap: 5 },
  miniDot: { width: 8, height: 8, borderRadius: 4 },
  miniLabel: { fontSize: 11, color: "#64748b", fontWeight: 600 },
  card: {
    background: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    padding: "12px 14px",
    gap: 10,
  },
  sectionStripe: { width: 4, height: 36, borderRadius: 2, flexShrink: 0 },
  sectionMeta: { flex: 1, display: "flex", flexDirection: "column", gap: 1 },
  sectionLabel: { fontSize: 13, fontWeight: 700 },
  sectionCaption: { fontSize: 11, opacity: 0.75 },
  badge: {
    borderRadius: 12,
    padding: "3px 10px",
    fontSize: 12,
    fontWeight: 700,
    transition: "all 0.3s ease",
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 16px",
    gap: 12,
    cursor: "pointer",
    transition: "background 0.2s ease",
    minHeight: 52,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { flex: 1, fontSize: 14, lineHeight: 1.4 },
  lockPanel: {
    borderRadius: 16,
    padding: "28px 20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lockTitle: { fontSize: 16, fontWeight: 700, marginBottom: 4 },
  lockDesc: { fontSize: 14, fontWeight: 600 },
  navBar: {
    background: "#fff",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0 16px",
  },
  navItem: { fontSize: 11, display: "flex", flexDirection: "column", alignItems: "center" },
};
