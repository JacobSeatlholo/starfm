"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { COVERAGE_AREAS, STATION } from "@/lib/starfm-data";

export function Coverage() {
  const { t } = useLang();

  return (
    <section
      id="coverage"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("coverage_label")}</Reveal>
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
          {t("coverage_title")}
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
          {t("coverage_body")}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32,
          }}
          className="lg:grid-cols-[1.2fr_1fr]"
        >
          {/* Frequency display + bars */}
          <Reveal
            style={{
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r2)",
              padding: "32px 28px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 300,
                height: 300,
                background: "radial-gradient(circle, rgba(53,189,4,0.08) 0%, transparent 70%)",
                top: -50,
                right: -50,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-syne-mono), monospace",
                fontSize: "0.72rem",
                color: "var(--star-green)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Broadcasting on
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(3.5rem, 12vw, 5.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "var(--star-green)",
                }}
              >
                {STATION.frequency}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "1.2rem",
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                }}
              >
                {STATION.unit}
              </span>
            </div>

            {/* Signal bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {COVERAGE_AREAS.map((area) => (
                <div key={area.town} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--white)",
                      width: 160,
                      flexShrink: 0,
                    }}
                  >
                    {area.town}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      background: "rgba(53,189,4,0.1)",
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${area.strength}%`,
                        background: "linear-gradient(90deg, var(--star-green-deep), var(--star-green))",
                        borderRadius: 100,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne-mono), monospace",
                      fontSize: "0.68rem",
                      color: "var(--muted)",
                      width: 80,
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {area.note}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Map / region info */}
          <Reveal
            delay={1}
            style={{
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r2)",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--star-green)",
                  marginBottom: 8,
                }}
              >
                Studio Location
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--white)",
                  marginBottom: 4,
                }}
              >
                {STATION.city}
              </div>
              <div style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                {STATION.province}, {STATION.country}
              </div>
            </div>

            {/* Stylized map */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(53,189,4,0.06) 0%, transparent 100%)",
                borderRadius: "var(--r)",
                padding: 20,
                border: "1px solid var(--border)",
                position: "relative",
                minHeight: 180,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="100%" height="160" viewBox="0 0 240 160" fill="none">
                {/* North West province stylized shape */}
                <path
                  d="M40 40 Q60 20 90 25 Q120 15 150 30 Q180 25 200 50 Q210 80 195 110 Q170 130 140 125 Q100 135 70 120 Q45 100 40 70 Z"
                  fill="rgba(53,189,4,0.08)"
                  stroke="rgba(53,189,4,0.4)"
                  strokeWidth="1.5"
                />
                {/* Klerksdorp center */}
                <circle cx="110" cy="80" r="6" fill="var(--star-green)" />
                <circle cx="110" cy="80" r="12" fill="none" stroke="var(--star-green)" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="120" y="84" fill="var(--white)" fontSize="9" fontFamily="var(--font-syne-mono), monospace">
                  Klerksdorp
                </text>
                {/* Surrounding towns */}
                <circle cx="85" cy="60" r="3" fill="rgba(168,240,176,0.6)" />
                <circle cx="140" cy="65" r="3" fill="rgba(168,240,176,0.6)" />
                <circle cx="130" cy="105" r="3" fill="rgba(168,240,176,0.6)" />
                <circle cx="75" cy="95" r="3" fill="rgba(168,240,176,0.6)" />
                <circle cx="165" cy="90" r="3" fill="rgba(168,240,176,0.6)" />
              </svg>
            </div>

            <a
              href={STATION.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "var(--star-green)",
                color: "#050A03",
                borderRadius: 100,
                padding: "14px 24px",
                fontSize: "0.86rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--star-green-bright)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--star-green)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span className="live-dot" />
              Listen Live Now
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
