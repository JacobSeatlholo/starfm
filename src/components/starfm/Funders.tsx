"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";

export function Funders() {
  const { t } = useLang();

  return (
    <section
      id="funders"
      style={{
        background: "var(--bg)",
        padding: "80px 20px",
      }}
    >
      <Reveal
        style={{
          maxWidth: 740,
          margin: "0 auto",
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r3)",
          padding: "clamp(36px, 8vw, 64px) clamp(24px, 6vw, 56px)",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, var(--star-green-deep), var(--star-green), var(--star-lime))",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            background: "radial-gradient(circle, rgba(53,189,4,0.07) 0%, transparent 70%)",
            top: -80,
            right: -80,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            fontFamily: "var(--font-syne-mono), monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--star-green)",
            marginBottom: 16,
          }}
        >
          {t("funder_eye")}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 16,
            color: "var(--white)",
          }}
        >
          {t("funder_title")}
        </h2>
        <p
          style={{
            fontSize: "clamp(0.87rem, 2vw, 0.97rem)",
            color: "var(--muted)",
            lineHeight: 1.8,
            maxWidth: 460,
            margin: "0 auto 32px",
          }}
        >
          {t("funder_body")}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--star-green)",
              color: "#050A03",
              border: "none",
              borderRadius: 100,
              padding: "15px 28px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.25s",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--star-green-bright)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(53,189,4,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--star-green)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t("funder_btn1")}
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "var(--white)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 100,
              padding: "15px 28px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 400,
              fontSize: "0.9rem",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.25s",
              WebkitTapHighlightColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)";
              e.currentTarget.style.background = "rgba(53,189,4,0.06)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("funder_btn2")}
          </a>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginTop: 40,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
          }}
        >
          {["ICASA Licensed", "Community Radio", "Digital-First", "Impact Media"].map(
            (badge, i) => (
              <div
                key={badge}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color:
                      i === 0 || i === 3
                        ? "rgba(168,240,176,0.55)"
                        : "rgba(168,240,176,0.3)",
                    fontWeight: 700,
                  }}
                >
                  {badge}
                </div>
                {i < 3 && <div style={{ width: 1, height: 16, background: "var(--border)" }} />}
              </div>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}
