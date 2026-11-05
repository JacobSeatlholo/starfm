"use client";

import { useLang } from "./LangContext";
import { STATION } from "@/lib/starfm-data";
import { StreamPlayer } from "./StreamPlayer";

export function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "96px 20px 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Wave background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg viewBox="0 0 1400 300" preserveAspectRatio="none" style={{ width: "100%" }}>
          <polyline
            points="0,150 60,90 120,200 180,60 240,210 300,80 360,180 420,100 480,220 540,70 600,170 660,130 720,190 780,80 840,160 900,100 960,200 1020,120 1080,180 1140,90 1200,200 1260,130 1320,160 1380,140 1400,150"
            fill="none"
            stroke="white"
            strokeWidth={1.5}
          />
        </svg>
      </div>

      {/* Logo, the star of the show, in a floating white card */}
      <div
        className="anim-up"
        style={{
          marginBottom: 32,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f4fff4 100%)",
            borderRadius: "var(--r3)",
            padding: "14px",
            boxShadow:
              "0 0 0 1px rgba(53,189,4,0.25), 0 20px 60px rgba(0,0,0,0.5), 0 0 80px rgba(53,189,4,0.2)",
            display: "inline-block",
            position: "relative",
          }}
        >
          {/* Gold star accent */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--star-gold)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 4px 16px rgba(245,197,24,0.5)",
              border: "2px solid #fff",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#050A03">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
            </svg>
          </div>
          <img
            src="/starfm-logo-full.png"
            alt="Star FM 102.9, For The Brighter Side Of You"
            width={260}
            height={184}
            style={{
              display: "block",
              borderRadius: "calc(var(--r3) - 8px)",
              width: 260,
              height: "auto",
              maxWidth: "100%",
            }}
          />
        </div>
      </div>

      {/* Badge */}
      <div
        className="anim-up"
        style={{
          animationDelay: "0.08s",
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(53,189,4,0.08)",
          border: "1px solid rgba(53,189,4,0.2)",
          borderRadius: 100,
          padding: "8px 18px",
          fontSize: "0.68rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--star-green)",
          marginBottom: 28,
        }}
      >
        <span className="live-dot" />
        <span>{t("hero_badge")}</span>
      </div>

      {/* Headline */}
      <h1
        className="anim-up"
        style={{
          animationDelay: "0.16s",
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.8rem, 11vw, 7rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          marginBottom: 24,
          margin: "0 0 24px",
        }}
      >
        <span>{t("hero_h1a")}</span>
        <br />
        <span>{t("hero_h1b")}</span>
        <br />
        <em style={{ fontStyle: "normal", color: "var(--star-green)", display: "block" }}>
          {t("hero_h1c")}
        </em>
      </h1>

      {/* Subtitle */}
      <p
        className="anim-up"
        style={{
          animationDelay: "0.24s",
          maxWidth: 560,
          fontSize: "clamp(0.92rem, 2.5vw, 1.05rem)",
          lineHeight: 1.75,
          color: "var(--muted)",
          margin: "0 auto 36px",
        }}
      >
        {t("hero_sub").split('"').map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} style={{ color: "var(--star-lime)", fontWeight: 500 }}>
              &ldquo;{part}&rdquo;
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </p>

      {/* CTAs */}
      <div
        className="anim-up"
        style={{
          animationDelay: "0.32s",
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <a
          href={STATION.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
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
          <span className="live-dot" />
          <span>{t("btn_tune_in")}</span>
        </a>
        <a
          href="#community"
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
          <span>{t("btn_mission")} →</span>
        </a>
      </div>

      {/* Player card */}
      <div
        className="anim-up"
        style={{
          animationDelay: "0.4s",
          width: "100%",
          maxWidth: 600,
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: "var(--r2)",
          padding: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, var(--star-green), transparent)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-syne-mono), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {t("player_label")}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,68,68,0.12)",
              border: "1px solid rgba(255,68,68,0.25)",
              borderRadius: 100,
              padding: "5px 12px",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--red)",
              fontWeight: 500,
            }}
          >
            <span className="live-dot" />
            {t("on_air")}
          </div>
        </div>
        <StreamPlayer />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 14,
          }}
        >
          <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
            {t("now_playing")} · <strong style={{ color: "var(--white)", fontWeight: 500 }}>Star FM 102.9</strong>
          </div>
          <div className="eq" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
