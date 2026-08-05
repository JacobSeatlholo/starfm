"use client";

import { TICKER_ITEMS } from "@/lib/starfm-data";

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      className="ticker-wrap"
      style={{
        background: "var(--star-green)",
        overflow: "hidden",
        padding: "13px 0",
      }}
      aria-hidden="true"
    >
      <div className="ticker-anim">
        {items.map((item, i) => (
          <div
            key={i}
            className="ti marquee-dot"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "0 28px",
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#050a03",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
