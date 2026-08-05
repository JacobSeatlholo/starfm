"use client";

import { useState } from "react";
import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { WEEKLY_SCHEDULE, SHOWS } from "@/lib/starfm-data";

// Compute current show based on time
function getCurrentShow() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 = Sunday
  // Weekday schedule (Mon-Fri)
  if (day >= 1 && day <= 5) {
    for (let i = SHOWS.length - 1; i >= 0; i--) {
      const showHour = parseInt(SHOWS[i].time.split(":")[0]);
      if (hour >= showHour) return SHOWS[i];
    }
    return SHOWS[SHOWS.length - 1];
  }
  // Weekend — return a default
  return SHOWS[0];
}

export function Schedule() {
  const { t } = useLang();
  const [activeDay, setActiveDay] = useState(0);
  const currentShow = getCurrentShow();

  return (
    <section
      id="schedule"
      style={{
        background: "var(--bg)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("schedule_label")}</Reveal>
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
          {t("schedule_title")}
        </Reveal>
        <Reveal
          as="p"
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: 540,
            marginBottom: 32,
          }}
        >
          {t("schedule_body")}
        </Reveal>

        {/* Now on air card */}
        <Reveal
          style={{
            background: "linear-gradient(135deg, var(--panel) 0%, var(--panel2) 100%)",
            border: "1px solid var(--border-hi)",
            borderRadius: "var(--r2)",
            padding: "24px 28px",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
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
              background: "linear-gradient(90deg, var(--star-green), var(--star-gold), var(--star-green))",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,68,68,0.12)",
              border: "1px solid rgba(255,68,68,0.25)",
              borderRadius: 100,
              padding: "6px 14px",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--red)",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            <span className="live-dot" />
            {t("on_air")}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div
              style={{
                fontFamily: "var(--font-syne-mono), monospace",
                fontSize: "0.72rem",
                color: "var(--muted)",
                letterSpacing: "0.12em",
                marginBottom: 4,
              }}
            >
              {currentShow.time} · TODAY
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.2rem, 4vw, 1.8rem)",
                letterSpacing: "-0.02em",
                color: "var(--white)",
              }}
            >
              {currentShow.name}
            </div>
            <div style={{ fontSize: "0.84rem", color: "var(--muted)", marginTop: 2 }}>
              {currentShow.host}
            </div>
          </div>
          <div className="eq" aria-hidden="true" style={{ height: 32 }}>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </Reveal>

        {/* Day tabs */}
        <Reveal
          style={{
            display: "flex",
            gap: 4,
            overflowX: "auto",
            paddingBottom: 8,
            marginBottom: 16,
            scrollbarWidth: "thin",
          }}
        >
          {WEEKLY_SCHEDULE.map((day, i) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(i)}
              style={{
                background: activeDay === i ? "var(--star-green)" : "var(--panel)",
                color: activeDay === i ? "#050A03" : "var(--muted)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                padding: "10px 18px",
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {day.short}
            </button>
          ))}
        </Reveal>

        {/* Schedule grid for active day */}
        <Reveal
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
            overflow: "hidden",
          }}
        >
          {WEEKLY_SCHEDULE[activeDay].slots.map((slot, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                borderBottom:
                  i < WEEKLY_SCHEDULE[activeDay].slots.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--panel2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "0.78rem",
                  color: "var(--star-green)",
                  width: 56,
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                {slot.time}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--white)",
                  }}
                >
                  {slot.show}
                </div>
              </div>
              {slot.lang && (
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    padding: "4px 10px",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    flexShrink: 0,
                  }}
                >
                  {slot.lang}
                </div>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
