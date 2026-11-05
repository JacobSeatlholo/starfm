"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LangContext";
import { LANGS } from "@/lib/i18n";
import { STATION } from "@/lib/starfm-data";

const NAV_LINKS = [
  { href: "#shows", key: "nav_shows" },
  { href: "#schedule", key: "nav_schedule" },
  { href: "#presenters", key: "nav_presenters" },
  { href: "#news", key: "nav_news" },
  { href: "#digital", key: "nav_digital" },
  { href: "#community", key: "nav_community" },
  { href: "#get-involved", key: "nav_partners" },
  { href: "#contact", key: "nav_contact" },
] as const;

export function Nav() {
  const { lang, setLang, t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        id="nav"
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
          borderBottom: stuck ? "1px solid var(--border)" : "1px solid transparent",
          background: stuck ? "rgba(5,10,3,0.92)" : "transparent",
          backdropFilter: stuck ? "blur(24px)" : "none",
          WebkitBackdropFilter: stuck ? "blur(24px)" : "none",
          boxShadow: stuck ? "0 8px 40px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          aria-label="Star FM 102.9 home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <img
            src="/starfm-logo-square.png"
            alt="Star FM 102.9 logo"
            width={40}
            height={40}
            className="logo-badge"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <div style={{ lineHeight: 1 }}>
            <strong
              style={{
                display: "block",
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "1.1rem",
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

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ul
            role="list"
            className="nav-links-desktop"
            style={{
              listStyle: "none",
              gap: 22,
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontSize: "0.78rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--star-green)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--muted)")
                  }
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Language switcher */}
          <div
            role="group"
            aria-label="Language selector"
            style={{
              display: "flex",
              gap: 2,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              padding: 3,
            }}
          >
            {LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                aria-label={l.name}
                style={{
                  background: lang === l.code ? "var(--star-green)" : "none",
                  border: "none",
                  padding: "5px 9px",
                  borderRadius: 100,
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: lang === l.code ? "#050A03" : "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Live button */}
          <a
            href={STATION.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tune in to Star FM live stream"
            className="nav-tunein"
            style={{
              alignItems: "center",
              gap: 7,
              background: "rgba(255,68,68,0.1)",
              border: "1px solid rgba(255,68,68,0.3)",
              borderRadius: 100,
              padding: "8px 16px",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--red)",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,68,68,0.2)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,68,68,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span className="live-dot" />
            <span>{t("btn_tune_in")}</span>
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="nav-hamburger"
            style={{
              flexDirection: "column",
              gap: 5,
              cursor: "pointer",
              padding: 6,
              background: "none",
              border: "none",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: "var(--white)",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: open
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 1
                      ? "scaleX(0)"
                      : "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          id="drawer"
          role="dialog"
          aria-label="Navigation menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 190,
            background: "rgba(5,10,3,0.98)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {[...NAV_LINKS].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(1.6rem, 7vw, 2.6rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--white)",
                textDecoration: "none",
                padding: "6px 24px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--star-green)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--white)")
              }
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href={STATION.streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              marginTop: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,68,68,0.12)",
              border: "1px solid rgba(255,68,68,0.3)",
              borderRadius: 100,
              padding: "14px 28px",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--red)",
              textDecoration: "none",
            }}
          >
            <span className="live-dot" />
            {t("btn_tune_in")}
          </a>
        </div>
      )}
    </>
  );
}
