"use client";

import { useEffect, useState } from "react";
import { STATION } from "@/lib/starfm-data";
import { StreamPlayer } from "./StreamPlayer";

export function StickyPlayer() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past hero (roughly 80% of viewport)
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="sticky-player"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 180,
        background: "rgba(5,10,3,0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderTop: "1px solid var(--border)",
        padding: "10px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",
      }}
    >
      {/* Left — station info */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--star-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 0 16px rgba(53,189,4,0.4)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#050A03">
            <path d="M12 2L9.5 9.5H2l6.2 4.5-2.4 7.4L12 16.8l6.2 4.5-2.4-7.4L22 9.5h-7.5z" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: "0.82rem",
              color: "var(--white)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Star FM 102.9
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span className="live-dot" style={{ width: 5, height: 5 }} />
            <span className="hidden sm:inline">Live now</span>
            <span className="sm:hidden">Live</span>
          </div>
        </div>
      </div>

      {/* Center — equalizer (desktop) */}
      <div className="hidden md:flex" style={{ alignItems: "flex-end", gap: 3, height: 24 }}>
        {[0.5, 0.8, 0.4, 1, 0.7, 0.3, 0.9, 0.6, 0.85].map((h, i) => (
          <div
            key={i}
            className="freq-bar"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>

      {/* Right — play button */}
      <a
        href={STATION.streamUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setExpanded(!expanded);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--star-green)",
          color: "#050A03",
          borderRadius: 100,
          padding: "9px 18px",
          fontSize: "0.78rem",
          fontWeight: 600,
          textDecoration: "none",
          whiteSpace: "nowrap",
          transition: "all 0.2s",
          border: "none",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--star-green-bright)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--star-green)")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#050A03">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span>Listen</span>
      </a>

      {/* Expanded player */}
      {expanded && (
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: 0,
            right: 0,
            background: "rgba(5,10,3,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid var(--border)",
            padding: "12px 16px",
          }}
        >
          <StreamPlayer compact />
        </div>
      )}
    </div>
  );
}
