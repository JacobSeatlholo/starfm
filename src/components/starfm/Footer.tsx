"use client";

import { STATION } from "@/lib/starfm-data";

const FOOTER_COLS = [
  {
    title: "Station",
    links: [
      { label: "Show Schedule", href: "#schedule" },
      { label: "Presenters", href: "#presenters" },
      { label: "Listen Live", href: STATION.streamUrl, external: true },
      { label: "Top 10 Voting", href: "#top10" },
      { label: "Send a Request", href: "#request" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Our Mission", href: "#community" },
      { label: "Coverage Area", href: "#coverage" },
      { label: "News", href: "#news" },
      { label: "Competitions", href: "#competitions" },
      { label: "Get Involved", href: "#get-involved" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "HustlePortal", href: "https://hustleportal.online", external: true },
      { label: "AI Literacy", href: "#digital" },
      { label: "Digital Skills", href: "#digital" },
      { label: "Submit Music", href: "#contact" },
      { label: "Advertise With Us", href: "#get-involved" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: STATION.facebook,
    icon: "M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7C18.3 21.1 22 17 22 12z",
  },
  {
    label: "WhatsApp",
    href: STATION.whatsapp,
    icon: "M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z",
  },
  {
    label: "Listen Live",
    href: STATION.streamUrl,
    icon: "M8 5v14l11-7z",
  },
  {
    label: "Get the App",
    href: STATION.appUrl,
    icon: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM11 18h2",
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "48px 20px 32px",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 40,
            marginBottom: 40,
          }}
          className="md:flex-row md:justify-between"
        >
          {/* Brand */}
          <div style={{ maxWidth: 320 }}>
            <a
              href="#hero"
              aria-label="Star FM 102.9 home"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <img
                src="/starfm-logo-square.png"
                alt="Star FM 102.9"
                width={44}
                height={44}
                className="logo-badge"
                style={{ width: 44, height: 44, borderRadius: "50%" }}
              />
              <div style={{ lineHeight: 1 }}>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "1.15rem",
                    letterSpacing: "-0.02em",
                    color: "var(--white)",
                  }}
                >
                  Star<span style={{ color: "var(--star-green)" }}>FM</span>
                </strong>
                <small
                  style={{
                    display: "block",
                    fontSize: "0.5rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginTop: 1,
                  }}
                >
                  102.9 · Klerksdorp
                </small>
              </div>
            </a>
            <p
              style={{
                fontSize: "0.84rem",
                color: "var(--muted)",
                lineHeight: 1.7,
                marginTop: 14,
              }}
            >
              Broadcasting music, news, and digital skills from Klerksdorp to the whole Dr Kenneth Kaunda District. 102.9 MHz. Your community, your voice, your station.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  style={{
                    width: 38,
                    height: 38,
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "var(--muted)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--star-green)";
                    e.currentTarget.style.color = "var(--star-green)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
            }}
            className="sm:flex-row sm:gap-10"
          >
            {FOOTER_COLS.map((col) => (
              <div key={col.title} style={{ minWidth: 120 }}>
                <h5
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: 14,
                    fontWeight: 700,
                  }}
                >
                  {col.title}
                </h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        style={{
                          fontSize: "0.84rem",
                          color: "rgba(168,240,176,0.45)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--star-green)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(168,240,176,0.45)")}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* App download banner */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            padding: "20px 24px",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
            marginBottom: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, var(--star-green), var(--star-green-deep))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#050A03">
                <path d="M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zm-5 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--white)",
                }}
              >
                Star FM in your pocket
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                Listen live, catch up on podcasts, and never miss a show.
              </div>
            </div>
          </div>
          <a
            href={STATION.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--white)",
              color: "#050A03",
              borderRadius: 100,
              padding: "12px 22px",
              fontSize: "0.84rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.25s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5V3.5c0-.3.2-.5.5-.5h17c.3 0 .5.2.5.5v17c0 .3-.2.5-.5.5h-17c-.3 0-.5-.2-.5-.5zM12 7l5 5-5 5v-3H7v-4h5V7z" />
            </svg>
            Get it on Google Play
          </a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            paddingTop: 28,
            borderTop: "1px solid var(--border)",
            fontSize: "0.76rem",
            color: "rgba(168,240,176,0.4)",
            textAlign: "center",
          }}
          className="md:flex-row md:justify-between md:text-left"
        >
          <div>
            © {new Date().getFullYear()} Star FM 102.9 Community Radio
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="https://hustleportal.online"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--star-green)", textDecoration: "none" }}
            >
              Community partner: HustlePortal
            </a>
            <span>Broadcasting from Klerksdorp, North West</span>
          </div>
          <div>
            Built by{" "}
            <a
              href="https://businesshustle.co.za"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--star-green)", textDecoration: "none" }}
            >
              Business Hustle
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
