"use client";

import { Reveal } from "./Reveal";
import { STATION } from "@/lib/starfm-data";

/**
 * GetInvolved, replaces the old Funders section.
 *
 * This is the practical "what can I actually do here" section.
 * Four pathways for four kinds of people, plus a community toolkit
 * that naturally includes HustlePortal as a recommended resource.
 */

type Pathway = {
  icon: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  accent: string;
};

const PATHWAYS: Pathway[] = [
  {
    icon: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Listen Live",
    desc: "Tune in on 102.9 FM across Klerksdorp and Matlosana, or stream us anywhere in the world. Your morning starts here.",
    cta: "Start listening",
    href: STATION.streamUrl,
    external: true,
    accent: "#35BD04",
  },
  {
    icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    title: "Send a Request",
    desc: "Want to hear a song? Got a shoutout for a friend? Send it straight to the studio and we will play it live.",
    cta: "Request a song",
    href: "#request",
    accent: "#F5C518",
  },
  {
    icon: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2M9 2h6a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z",
    title: "Advertise With Us",
    desc: "Reach 11,000+ engaged listeners across the Dr Kenneth Kaunda District. From R500/month ad slots to full show sponsorships.",
    cta: "Get the rate card",
    href: "#contact",
    accent: "#4FE01A",
  },
  {
    icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    title: "Volunteer",
    desc: "Presenters, producers, journalists, techies, community reporters. If you have a voice and a passion, we have a microphone.",
    cta: "Join the team",
    href: "#contact",
    accent: "#A8F0B0",
  },
];

const TOOLKIT = [
  {
    name: "HustlePortal",
    url: "https://hustleportal.online",
    desc: "Free business resources, tender alerts, funding opportunities, and tools for South African entrepreneurs.",
    tag: "Recommended",
    featured: true,
  },
  {
    name: "AI Idea Generator",
    url: "#",
    desc: "Free tool to spark business ideas using AI.",
    tag: "Tool",
  },
  {
    name: "OpenTender ZA",
    url: "#",
    desc: "Search and track government tenders in your area.",
    tag: "Tenders",
  },
  {
    name: "FundingStats SA",
    url: "#",
    desc: "Find NSFAS, SETA, and private bursaries for students.",
    tag: "Bursaries",
  },
];

export function GetInvolved() {
  return (
    <section
      id="get-involved"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
        padding: "96px 20px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(53,189,4,0.05) 0%, transparent 70%)",
          top: "10%",
          left: "-10%",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Reveal className="sec-label">Get Involved</Reveal>
        <Reveal
          as="h2"
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 3.6rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            color: "var(--white)",
            margin: "0 0 20px",
          }}
        >
          This is <span style={{ color: "var(--star-green)" }}>your</span> station.
        </Reveal>
        <Reveal
          as="p"
          style={{
            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
            lineHeight: 1.7,
            color: "var(--muted)",
            maxWidth: 580,
            marginBottom: 56,
          }}
        >
          Star FM belongs to Klerksdorp. Whether you want to listen, request a song, grow your
          business, or get behind the mic, here is how to plug in.
        </Reveal>

        {/* Four pathways */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
            marginBottom: 64,
          }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >
          {PATHWAYS.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i === 1 ? 1 : i === 2 ? 2 : i === 3 ? 3 : undefined) as 1 | 2 | 3 | undefined}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "transform 0.3s, border-color 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              className="card-hover"
            >
              {/* Accent line at top */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: p.accent,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${p.accent}15`,
                  border: `1px solid ${p.accent}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={p.accent}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={p.icon} />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                  color: "var(--white)",
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.65, flex: 1 }}>
                {p.desc}
              </p>
              <a
                href={p.href}
                target={p.external ? "_blank" : undefined}
                rel={p.external ? "noopener noreferrer" : undefined}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: p.accent,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "gap 0.2s",
                  marginTop: "auto",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
              >
                {p.cta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Community Toolkit */}
        <Reveal
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r3)",
            padding: "clamp(28px, 6vw, 48px)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient */}
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
              flexDirection: "column",
              gap: 12,
              marginBottom: 32,
            }}
            className="md:flex-row md:items-end md:justify-between"
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--star-green)",
                  marginBottom: 8,
                }}
              >
                Community Toolkit
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 4vw, 2rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--white)",
                }}
              >
                Free tools to help you hustle.
              </h3>
            </div>
            <p
              style={{
                fontSize: "0.86rem",
                color: "var(--muted)",
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              We test these resources on air and share the best ones with you. No signups, no
              catch, just useful stuff for your daily grind.
            </p>
          </div>

          {/* Toolkit grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 12,
            }}
            className="sm:grid-cols-2"
          >
            {TOOLKIT.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target={tool.url.startsWith("http") ? "_blank" : undefined}
                rel={tool.url.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 20px",
                  background: tool.featured ? "rgba(53,189,4,0.06)" : "var(--bg2)",
                  border: tool.featured ? "1px solid rgba(53,189,4,0.3)" : "1px solid var(--border)",
                  borderRadius: "var(--r)",
                  textDecoration: "none",
                  transition: "all 0.25s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = tool.featured
                    ? "rgba(53,189,4,0.3)"
                    : "var(--border)";
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: tool.featured
                      ? "linear-gradient(135deg, var(--star-green), var(--star-green-deep))"
                      : "var(--panel2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {tool.featured ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#050A03">
                      <path d="M12 2L9.5 9.5H2l6.2 4.5-2.4 7.4L12 16.8l6.2 4.6-2.4-7.4L22 9.5h-7.5z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        color: "var(--white)",
                      }}
                    >
                      {tool.name}
                    </span>
                    {tool.featured && (
                      <span
                        style={{
                          fontFamily: "var(--font-syne-mono), monospace",
                          fontSize: "0.56rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--star-green)",
                          background: "rgba(53,189,4,0.12)",
                          padding: "2px 7px",
                          borderRadius: 100,
                          border: "1px solid rgba(53,189,4,0.2)",
                        }}
                      >
                        {tool.tag}
                      </span>
                    )}
                    {!tool.featured && (
                      <span
                        style={{
                          fontFamily: "var(--font-syne-mono), monospace",
                          fontSize: "0.56rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          padding: "2px 7px",
                          borderRadius: 100,
                          border: "1px solid var(--border)",
                        }}
                      >
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.5 }}>
                    {tool.desc}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={tool.featured ? "var(--star-green)" : "var(--muted)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, opacity: 0.6 }}
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ))}
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid var(--border)",
            }}
          >
            {["ICASA Licensed", "Community Radio", "Digital First", "Impact Media"].map(
              (badge, i) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: "0.64rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color:
                        i === 0 || i === 3
                          ? "rgba(168,240,176,0.6)"
                          : "rgba(168,240,176,0.35)",
                      fontWeight: 700,
                    }}
                  >
                    {badge}
                  </div>
                  {i < 3 && <div style={{ width: 1, height: 14, background: "var(--border)" }} />}
                </div>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
