"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { IMPACT } from "@/lib/starfm-data";

export function Impact() {
  const { t } = useLang();

  return (
    <section
      id="impact"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("impact_label")}</Reveal>
        <Reveal
          as="h2"
          className="sec-title"
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
          {t("impact_title")}
        </Reveal>
        <Reveal
          as="p"
          className="sec-body"
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: 540,
          }}
        >
          {t("impact_body")}
        </Reveal>

        <Reveal
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
            overflow: "hidden",
            marginTop: 48,
          }}
          className="sm:grid-cols-2 md:grid-cols-4"
        >
          {IMPACT.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--panel)",
                padding: "32px 24px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--panel2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--panel)")}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
                  fontWeight: 800,
                  color: "var(--star-green)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.num}
              </div>
              <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
