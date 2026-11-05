"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getNowPlaying,
  getStats,
  IS_LIVE,
  DEMO_NOW_PLAYING,
  DEMO_STATS,
  type NowPlaying,
  type StudioStats,
} from "@/lib/starfm-api";

/**
 * StudioPulse — a compact "live status" widget showing:
 * - Current show + presenter (auto-computed from schedule)
 * - Current track (if presenter has set one)
 * - Next up show
 * - Live stats (requests today, queue length)
 *
 * Auto-refreshes every 60 seconds.
 */
export function StudioPulse() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>(DEMO_NOW_PLAYING);
  const [stats, setStats] = useState<StudioStats>(DEMO_STATS);
  const [isLive, setIsLive] = useState(false);

  const loadData = useCallback(async () => {
    const [np, st] = await Promise.all([getNowPlaying(), getStats()]);
    if (np) {
      setNowPlaying(np);
      setIsLive(true);
    } else {
      setIsLive(false);
    }
    if (st) setStats(st);
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      await loadData();
    };
    if (mounted) void fetch();
    const interval = setInterval(loadData, 60000); // every 60s
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [loadData]);

  const current = nowPlaying.currentShow;
  const next = nowPlaying.nextShow;
  const track = nowPlaying.track;

  return (
    <section
      id="pulse"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* ON AIR banner */}
        <div
          style={{
            background:
              "linear-gradient(135deg, var(--panel) 0%, var(--panel2) 100%)",
            border: "1px solid var(--border-hi)",
            borderRadius: "var(--r2)",
            padding: "24px 28px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {/* Glow accent */}
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

          {/* Live badge */}
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
            On Air
          </div>

          {/* Now playing show */}
          <div style={{ flex: 1, minWidth: 200 }}>
            {current ? (
              <>
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.7rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    marginBottom: 4,
                  }}
                >
                  {current.startTime}–{current.endTime} · {nowPlaying.day}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)",
                    letterSpacing: "-0.02em",
                    color: "var(--white)",
                    lineHeight: 1.1,
                  }}
                >
                  {current.showName}
                </div>
                <div
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--star-green)",
                    marginTop: 4,
                  }}
                >
                  with {current.presenter}
                </div>
              </>
            ) : (
              <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
                Off-air — check the schedule below
              </div>
            )}
          </div>

          {/* Now playing track */}
          {track && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(53,189,4,0.06)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                padding: "10px 16px",
                flexShrink: 0,
              }}
            >
              <div className="eq" aria-hidden="true" style={{ height: 24 }}>
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.6rem",
                    color: "var(--muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ♪ Now Playing
                </div>
                <div
                  style={{
                    fontSize: "0.86rem",
                    color: "var(--white)",
                    fontWeight: 500,
                  }}
                >
                  {track.trackName}
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{track.artist}</div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexShrink: 0,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  color: "var(--star-green)",
                  lineHeight: 1,
                }}
              >
                {stats.pendingRequests}
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: 2,
                }}
              >
                In Queue
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  color: "var(--star-gold)",
                  lineHeight: 1,
                }}
              >
                {stats.totalRequests}
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  color: "var(--muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: 2,
                }}
              >
                Total Req.
              </div>
            </div>
          </div>
        </div>

        {/* Next up bar */}
        {next && (
          <div
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 20px",
              fontSize: "0.78rem",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-syne-mono), monospace",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--star-green)",
              }}
            >
              ▶ Next
            </span>
            <span style={{ color: "var(--white)", fontWeight: 500 }}>{next.showName}</span>
            <span>· {next.presenter}</span>
            <span>· at {next.startTime}</span>
          </div>
        )}

        {/* Connection status */}
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.68rem",
            color: "var(--muted)",
          }}
        >
          <span
            className="live-dot"
            style={{ background: isLive ? "var(--star-green)" : "var(--star-gold)" }}
          />
          {isLive ? "Connected to Star FM studio operations" : "Demo mode — connect Google Sheet for live data"}
        </div>
      </div>
    </section>
  );
}
