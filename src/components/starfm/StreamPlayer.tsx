"use client";

import { useEffect, useState, useRef } from "react";
import { STATION } from "@/lib/starfm-data";

/**
 * Robust live stream player.
 *
 * Strategy:
 * 1. Try the Famcast embed iframe (current approach)
 * 2. If it doesn't load within 4s, show a fallback "Listen" button
 *    that opens the stream in a new tab
 * 3. The iframe stays mounted, if Famcast recovers, the player appears
 *
 * This fixes the "grey box" issue seen on the deployed wine build.
 */
export function StreamPlayer({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // If the iframe doesn't signal "loaded" within 5 seconds, show fallback
    const timer = setTimeout(() => {
      if (!iframeLoaded) setShowFallback(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [iframeLoaded]);

  return (
    <div
      style={{
        borderRadius: compact ? 8 : 12,
        overflow: "hidden",
        background: "#000",
        position: "relative",
        minHeight: compact ? 60 : 76,
      }}
    >
      <iframe
        ref={iframeRef}
        src={STATION.streamUrl}
        scrolling="no"
        title="Star FM 102.9 live stream"
        style={{
          width: "100%",
          height: compact ? 60 : 76,
          border: "none",
          display: "block",
          opacity: iframeLoaded ? 1 : 0.3,
          transition: "opacity 0.3s",
        }}
        loading="lazy"
        onLoad={() => setIframeLoaded(true)}
        onError={() => setShowFallback(true)}
      />

      {/* Loading shimmer */}
      {!iframeLoaded && !showFallback && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(90deg, #0a1208 0%, #0e1a0c 50%, #0a1208 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.72rem",
              color: "var(--muted)",
              fontFamily: "var(--font-syne-mono), monospace",
            }}
          >
            <span className="live-dot" />
            Connecting to studio...
          </div>
        </div>
      )}

      {/* Fallback button if iframe fails */}
      {showFallback && (
        <a
          href={STATION.streamUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "var(--panel)",
            color: "var(--star-green)",
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 600,
            fontFamily: "var(--font-syne), sans-serif",
          }}
        >
          <span className="live-dot" />
          Tap to listen live →
        </a>
      )}

      <style>{`
        @keyframes shimmer {
          0% { backgroundPosition: 200% 0; }
          100% { backgroundPosition: -200% 0; }
        }
      `}</style>
    </div>
  );
}
