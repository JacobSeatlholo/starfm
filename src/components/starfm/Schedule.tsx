"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { WEEKLY_SCHEDULE, SHOWS } from "@/lib/starfm-data";
import { getNowPlaying, IS_LIVE, DEMO_NOW_PLAYING, type NowPlaying } from "@/lib/starfm-api";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_SHORT: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

// Compute current show based on local time (fallback when API not available)
function getCurrentShowFallback() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  if (day >= 1 && day <= 5) {
    for (let i = SHOWS.length - 1; i >= 0; i--) {
      const showHour = parseInt(SHOWS[i].time.split(":")[0]);
      if (hour >= showHour) return SHOWS[i];
    }
    return SHOWS[SHOWS.length - 1];
  }
  return SHOWS[0];
}

export function Schedule() {
  const { t } = useLang();
  const [activeDay, setActiveDay] = useState(0);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const fallbackShow = getCurrentShowFallback();

  const loadData = useCallback(async () => {
    const np = await getNowPlaying();
    if (np) setNowPlaying(np);
    // In demo mode, nowPlaying stays null and we use the fallback show
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      await loadData();
    };
    if (mounted) void fetch();
    const interval = setInterval(loadData, 60000); // refresh every 60s
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [loadData]);

  // Use API data if available, otherwise fallback
  const currentShow = nowPlaying?.currentShow
    ? {
        time: nowPlaying.currentShow.startTime,
        name: nowPlaying.currentShow.showName,
        host: nowPlaying.currentShow.presenter,
        tag: nowPlaying.currentShow.genre,
        desc: nowPlaying.currentShow.notes || "",
      }
    : fallbackShow;

  const nextShow = nowPlaying?.nextShow;

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
          {IS_LIVE && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginLeft: 8,
                padding: "3px 10px",
                background: "rgba(53,189,4,0.1)",
                border: "1px solid rgba(53,189,4,0.2)",
                borderRadius: 100,
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--star-green)",
              }}
            >
              <span className="live-dot" style={{ background: "var(--star-green)" }} />
              Live
            </span>
          )}
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
              background:
                "linear-gradient(90deg, var(--star-green), var(--star-gold), var(--star-green))",
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
              {currentShow.time} · {nowPlaying?.day || DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]}
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

        {/* Coming up next preview (auto-computed) */}
        {nextShow && (
          <Reveal
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              marginBottom: 24,
              fontSize: "0.78rem",
              color: "var(--muted)",
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: "var(--r)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne-mono), monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--star-green)",
                fontWeight: 700,
              }}
            >
              ▶ Coming Up
            </span>
            <span style={{ color: "var(--white)", fontWeight: 500 }}>{nextShow.showName}</span>
            <span>· {nextShow.presenter}</span>
            <span>· at {nextShow.startTime}</span>
          </Reveal>
        )}

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
          {(IS_LIVE && nowPlaying ? DAYS : DAYS).map((day, i) => (
            <button
              key={day}
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
              {DAY_SHORT[day] || day.slice(0, 3)}
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
          {WEEKLY_SCHEDULE[activeDay].slots.map((slot, i) => {
            // Check if this slot is the currently airing show
            const isCurrentShow = nowPlaying?.currentShow &&
              nowPlaying.currentShow.showName === slot.show &&
              nowPlaying.day === DAYS[activeDay];
            return (
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
                background: isCurrentShow ? "rgba(53,189,4,0.06)" : "transparent",
                borderLeft: isCurrentShow ? "3px solid var(--star-green)" : "3px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isCurrentShow) e.currentTarget.style.background = "var(--panel2)";
              }}
              onMouseLeave={(e) => {
                if (!isCurrentShow) e.currentTarget.style.background = "transparent";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "0.78rem",
                  color: isCurrentShow ? "var(--star-green)" : "var(--star-green)",
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
              {isCurrentShow && (
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#050A03",
                    background: "var(--star-green)",
                    padding: "3px 8px",
                    borderRadius: 100,
                    fontWeight: 700,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span className="live-dot" style={{ width: 4, height: 4 }} />
                  NOW
                </div>
              )}
            </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
