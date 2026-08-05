"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { PODCASTS, STATION } from "@/lib/starfm-data";

export function Podcasts() {
  const { t } = useLang();

  return (
    <section
      id="podcasts"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("podcasts_label")}</Reveal>
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
          {t("podcasts_title")}
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
          {t("podcasts_body")}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="md:grid-cols-2"
        >
          {PODCASTS.map((pod, i) => (
            <Reveal
              key={pod.title}
              delay={(i % 2 === 1 ? 1 : undefined) as 1 | undefined}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
                padding: 20,
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                transition: "transform 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
              className="card-hover"
            >
              {/* Play button */}
              <button
                aria-label={`Play ${pod.title}`}
                style={{
                  width: 52,
                  height: 52,
                  flexShrink: 0,
                  borderRadius: "var(--r)",
                  background: "linear-gradient(135deg, var(--star-green) 0%, var(--star-green-deep) 100%)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 16px rgba(53,189,4,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(53,189,4,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(53,189,4,0.25)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#050A03">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-syne-mono), monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--star-gold)",
                    }}
                  >
                    {pod.episode}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-syne-mono), monospace",
                      fontSize: "0.6rem",
                      color: "var(--muted)",
                    }}
                  >
                    · {pod.duration}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                    marginBottom: 6,
                    color: "var(--white)",
                  }}
                >
                  {pod.title}
                </h3>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--star-green)",
                    marginBottom: 8,
                  }}
                >
                  {pod.show}
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6 }}>
                  {pod.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Equalizer bar */}
        <Reveal
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "16px 24px",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 24 }}>
            {[0.6, 0.9, 0.4, 1, 0.7, 0.5, 0.85, 0.3, 0.95, 0.65].map((h, i) => (
              <div
                key={i}
                className="freq-bar"
                style={{
                  height: `${h * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: "0.82rem", color: "var(--muted)" }}>
            All episodes available on the{" "}
            <a
              href={STATION.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--star-green)", textDecoration: "none", fontWeight: 500 }}
            >
              Star FM app
            </a>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
