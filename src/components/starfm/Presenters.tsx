"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { PRESENTERS } from "@/lib/starfm-data";

export function Presenters() {
  const { t } = useLang();

  return (
    <section
      id="presenters"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("presenters_label")}</Reveal>
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
          {t("presenters_title")}
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
          {t("presenters_body")}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="md:grid-cols-2 lg:grid-cols-3"
        >
          {PRESENTERS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 3 === 1 ? 1 : i % 3 === 2 ? 2 : undefined) as 1 | 2 | undefined}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
                padding: 24,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s, border-color 0.3s",
              }}
              className="card-hover"
            >
              {/* Gradient avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${p.accent.replace(
                      "from-[",
                      ""
                    ).replace("] to-[", ", ").replace("]", "")})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    color: "#050A03",
                    flexShrink: 0,
                    boxShadow: "0 4px 20px rgba(53,189,4,0.2)",
                  }}
                >
                  {p.initials}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      letterSpacing: "-0.01em",
                      color: "var(--white)",
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.76rem",
                      color: "var(--star-green)",
                      marginTop: 2,
                    }}
                  >
                    {p.show}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne-mono), monospace",
                      fontSize: "0.64rem",
                      color: "var(--muted)",
                      marginTop: 2,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {p.time}
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.84rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {p.bio}
              </p>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: "0.62rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "4px 9px",
                      borderRadius: 100,
                      border: "1px solid rgba(53,189,4,0.2)",
                      color: "rgba(168,240,176,0.7)",
                      fontFamily: "var(--font-syne-mono), monospace",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
