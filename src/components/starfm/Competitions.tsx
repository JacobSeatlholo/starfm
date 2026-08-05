"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { COMPETITIONS } from "@/lib/starfm-data";

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  featured: { bg: "rgba(245,197,24,0.12)", color: "var(--star-gold)", label: "Featured" },
  open: { bg: "rgba(53,189,4,0.1)", color: "var(--star-green)", label: "Open" },
  closing: { bg: "rgba(255,68,68,0.12)", color: "var(--red)", label: "Closing Soon" },
};

export function Competitions() {
  const { t } = useLang();

  return (
    <section
      id="competitions"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("competitions_label")}</Reveal>
        <Reveal
          as="h2"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.9rem, 5.5vw, 3.4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: 16,
            margin: "0 0 16px",
          }}
        >
          {t("competitions_title")}
        </Reveal>
        <Reveal
          as="p"
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: 540,
            marginBottom: 48,
          }}
        >
          {t("competitions_body")}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="md:grid-cols-3"
        >
          {COMPETITIONS.map((comp, i) => {
            const style = STATUS_STYLES[comp.status];
            return (
              <Reveal
                key={comp.title}
                delay={(i === 1 ? 1 : i === 2 ? 2 : undefined) as 1 | 2 | undefined}
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r2)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s, border-color 0.3s",
                }}
                className="card-hover"
              >
                {comp.status === "featured" && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: "linear-gradient(90deg, var(--star-gold), var(--star-green))",
                    }}
                  />
                )}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: style.bg,
                    color: style.color,
                    borderRadius: 100,
                    padding: "4px 12px",
                    fontSize: "0.62rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    width: "fit-content",
                    marginBottom: 16,
                  }}
                >
                  {style.label}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                    color: "var(--white)",
                  }}
                >
                  {comp.title}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    color: "var(--star-green)",
                    marginBottom: 8,
                  }}
                >
                  {comp.prize}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, flex: 1, marginBottom: 16 }}>
                  {comp.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                    {comp.deadline}
                  </span>
                  <a
                    href="#contact"
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      color: "var(--star-green)",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "gap 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
                  >
                    Enter →
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
