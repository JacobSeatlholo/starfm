"use client";

import { useState } from "react";
import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { SHOWS } from "@/lib/starfm-data";
import { STATION } from "@/lib/starfm-data";

export function Shows() {
  const { t } = useLang();
  const [activeShow, setActiveShow] = useState(0);
  const show = SHOWS[activeShow];

  return (
    <section
      id="shows"
      style={{
        background: "var(--bg)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("shows_label")}</Reveal>
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
          {t("shows_title")}
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
          {t("shows_body")}
        </Reveal>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
          className="lg:flex-row lg:items-start"
        >
          {/* Show list */}
          <Reveal style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            {SHOWS.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveShow(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: "var(--r)",
                  cursor: "pointer",
                  border: activeShow === i ? "1px solid var(--border-hi)" : "1px solid transparent",
                  background: activeShow === i ? "var(--panel)" : "transparent",
                  transition: "all 0.25s",
                  WebkitTapHighlightColor: "transparent",
                  textAlign: "left",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (activeShow !== i) {
                    e.currentTarget.style.background = "var(--panel)";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeShow !== i) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "transparent";
                  }
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.7rem",
                    color: activeShow === i ? "var(--star-green)" : "var(--muted)",
                    width: 56,
                    flexShrink: 0,
                    transition: "color 0.25s",
                  }}
                >
                  {s.time}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      letterSpacing: "-0.01em",
                      color: "var(--white)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {s.name}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "var(--muted)", marginTop: 2 }}>
                    {s.host}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 9px",
                    borderRadius: 100,
                    border: "1px solid rgba(53,189,4,0.2)",
                    color: "rgba(168,240,176,0.7)",
                    flexShrink: 0,
                  }}
                >
                  {s.tag}
                </div>
              </button>
            ))}
          </Reveal>

          {/* Feature card */}
          <Reveal
            delay={1}
            style={{
              flex: 1,
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r2)",
              padding: 28,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 120,
                background:
                  "linear-gradient(180deg, rgba(53,189,4,0.06) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Wave */}
            <div style={{ height: 50, opacity: 0.5, position: "relative", zIndex: 1 }}>
              <svg viewBox="0 0 400 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
                <path
                  d="M0,30 Q25,8 50,30 Q75,52 100,30 Q125,8 150,30 Q175,52 200,30 Q225,8 250,30 Q275,52 300,30 Q325,8 350,30 Q375,52 400,30"
                  fill="none"
                  stroke="#35BD04"
                  strokeWidth={1.5}
                  opacity={0.7}
                />
                <path
                  d="M0,30 Q25,15 50,30 Q75,45 100,30 Q125,15 150,30 Q175,45 200,30 Q225,15 250,30 Q275,45 300,30 Q325,15 350,30 Q375,45 400,30"
                  fill="none"
                  stroke="#35BD04"
                  strokeWidth={0.8}
                  opacity={0.3}
                />
              </svg>
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                position: "relative",
                zIndex: 1,
              }}
            >
              {show.time} · {show.name}
            </div>
            <div
              style={{
                fontSize: "0.87rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                position: "relative",
                zIndex: 1,
              }}
            >
              {show.desc}
            </div>
            <a
              href={STATION.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--star-green)",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                transition: "gap 0.2s",
                position: "relative",
                zIndex: 1,
                width: "fit-content",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
            >
              Listen Now →
            </a>
            <div
              style={{
                paddingTop: 16,
                borderTop: "1px solid var(--border)",
                marginTop: 8,
              }}
            >
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginBottom: 10 }}>
                Want your show on Star FM?
              </p>
              <a
                href="#contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "var(--star-green)",
                  color: "#050A03",
                  borderRadius: 100,
                  padding: "10px 20px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit a Proposal
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
