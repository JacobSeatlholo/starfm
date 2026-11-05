"use client";

import { useState, useEffect, useCallback } from "react";
import { Reveal } from "./Reveal";
import {
  getRecentRequests,
  IS_LIVE,
  DEMO_REQUESTS,
  type ListenerRequest,
} from "@/lib/starfm-api";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMin = Math.floor((now - then) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

const STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string; icon: string }
> = {
  new: { label: "New", color: "#EDF7EE", bg: "rgba(237,247,238,0.08)", icon: "🆕" },
  queued: { label: "Queued", color: "var(--star-gold)", bg: "rgba(245,197,24,0.1)", icon: "📋" },
  played: { label: "Played", color: "var(--star-green)", bg: "rgba(53,189,4,0.1)", icon: "✓" },
  skipped: { label: "Skipped", color: "var(--muted)", bg: "rgba(255,255,255,0.04)", icon: "⏭" },
};

export function LiveRequestFeed() {
  const [requests, setRequests] = useState<ListenerRequest[]>(DEMO_REQUESTS);
  const [totalCount, setTotalCount] = useState<number>(DEMO_REQUESTS.length);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = useCallback(async () => {
    const data = await getRecentRequests(8);
    if (data?.requests?.length) {
      setRequests(data.requests);
      setTotalCount(data.total);
      setLastUpdated(new Date());
    }
    // In demo mode, totalCount is already set from initial state
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      await loadData();
    };
    if (mounted) void fetch();
    // Refresh every 30 seconds, this is the "live" feed
    const interval = setInterval(loadData, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [loadData]);

  return (
    <section
      id="feed"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal className="sec-label">📡 Live Studio Activity</Reveal>
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
          What's Happening <span style={{ color: "var(--star-green)" }}>Right Now.</span>
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
          Real-time requests from listeners across Klerksdorp, Matlosana, and beyond, feeding
          directly into the studio. When a presenter plays a request, the status updates here.
          {!IS_LIVE && (
            <span
              style={{
                display: "inline-block",
                marginLeft: 8,
                padding: "2px 8px",
                background: "rgba(245,197,24,0.1)",
                border: "1px solid rgba(245,197,24,0.3)",
                borderRadius: 100,
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--star-gold)",
              }}
            >
              Demo Mode
            </span>
          )}
        </Reveal>

        {/* Stats row */}
        <Reveal
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Total Requests", value: totalCount, color: "var(--star-green)" },
            {
              label: "In Queue Now",
              value: requests.filter((r) => r.status === "new" || r.status === "queued").length,
              color: "var(--star-gold)",
            },
            {
              label: "Played Today",
              value: requests.filter((r) => r.status === "played").length,
              color: "var(--star-lime)",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                padding: "12px 18px",
                flex: "1 1 140px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  color: stat.color,
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Request list */}
        <Reveal
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
            overflow: "hidden",
          }}
        >
          {requests.length === 0 && (
            <div
              style={{
                padding: "40px 24px",
                textAlign: "center",
                color: "var(--muted)",
                fontSize: "0.88rem",
              }}
            >
              No requests yet, be the first! Submit a request above.
            </div>
          )}
          {requests.map((req, i) => {
            const status = STATUS_STYLES[req.status] || STATUS_STYLES.new;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  padding: "16px 20px",
                  borderBottom:
                    i < requests.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--panel2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Status icon */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                    borderRadius: 8,
                    background: status.bg,
                    color: status.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                  }}
                >
                  {status.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                        color: "var(--white)",
                      }}
                    >
                      {req.requesterName || "Anonymous"}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                      · {timeAgo(req.timestamp)}
                    </span>
                  </div>
                  {req.type === "song" ? (
                    <div style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                      Requested{" "}
                      <span style={{ color: "var(--star-green)", fontWeight: 500 }}>
                        {req.songName}
                      </span>
                      {req.artist && ` by ${req.artist}`}
                    </div>
                  ) : (
                    <div style={{ fontSize: "0.84rem", color: "var(--muted)" }}>
                      Topic:{" "}
                      <span style={{ color: "var(--star-lime)" }}>{req.message}</span>
                    </div>
                  )}
                  {req.message && req.type === "song" && (
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: "var(--muted)",
                        marginTop: 4,
                        fontStyle: "italic",
                      }}
                    >
                      &ldquo;{req.message}&rdquo;
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <div
                  style={{
                    background: status.bg,
                    color: status.color,
                    borderRadius: 100,
                    padding: "3px 10px",
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    flexShrink: 0,
                    fontFamily: "var(--font-syne-mono), monospace",
                  }}
                >
                  {status.label}
                </div>
              </div>
            );
          })}
        </Reveal>

        {/* Last updated */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.72rem",
            color: "var(--muted)",
          }}
        >
          <span className="live-dot" style={{ background: "var(--star-green)" }} />
          Auto-refreshing every 30s
          {lastUpdated && <span>· Last updated {timeAgo(lastUpdated.toISOString())}</span>}
        </div>
      </div>
    </section>
  );
}
