"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";

const ICONS: Record<string, string> = {
  robot: "M12 2a4 4 0 014 4v2a4 4 0 11-8 0V6a4 4 0 014-4zM5 12h14v8a4 4 0 01-4 4H9a4 4 0 01-4-4v-8zM9 7h.01M15 7h.01",
  phone: "M17 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2zM11 18h2",
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
};

function Icon({ name }: { name: string }) {
  const path = ICONS[name] || ICONS.globe;
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--star-green)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

const CARDS = [
  {
    icon: "robot",
    title: "AI Literacy Segments",
    body: "Weekly on-air segments explaining what AI is, how it works, and how it's changing your daily life, in plain language, no jargon.",
  },
  {
    icon: "phone",
    title: "Digital Skills Radio",
    body: "From WhatsApp Business to mobile banking, practical digital skills your community can use today, demonstrated live on air.",
  },
  {
    icon: "globe",
    title: "Tech for Entrepreneurs",
    body: "Helping township businesses go digital, reach more customers, and compete in a connected economy, step by step.",
  },
];

export function Digital() {
  const { t } = useLang();

  return (
    <section
      id="digital"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(53,189,4,0.07) 0%, transparent 70%)",
          bottom: -100,
          right: -100,
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
          className="lg:flex-row"
        >
          {/* Left */}
          <div style={{ flex: 1 }}>
            <Reveal className="sec-label">{t("digital_label")}</Reveal>
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
              {t("digital_title").split(" ").slice(0, -2).join(" ")}{" "}
              <span style={{ color: "var(--star-green)" }}>
                {t("digital_title").split(" ").slice(-2).join(" ")}
              </span>
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
              {t("digital_body")}
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CARDS.map((card, i) => (
                <Reveal
                  key={card.title}
                  delay={(i === 1 ? 1 : i === 2 ? 2 : undefined) as 1 | 2 | undefined}
                  style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--r)",
                    padding: 20,
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "rgba(53,189,4,0.3)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      flexShrink: 0,
                      background: "rgba(53,189,4,0.08)",
                      border: "1px solid rgba(53,189,4,0.2)",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon name={card.icon} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.92rem",
                        letterSpacing: "-0.01em",
                        marginBottom: 5,
                        color: "var(--white)",
                      }}
                    >
                      {card.title}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                      {card.body}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right, Terminal + now live card */}
          <Reveal
            delay={1}
            style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}
          >
            <div
              style={{
                background: "#040d04",
                border: "1px solid rgba(53,189,4,0.25)",
                borderRadius: "var(--r2)",
                overflow: "hidden",
                fontFamily: "var(--font-syne-mono), monospace",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  background: "#081008",
                  padding: "12px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--muted)",
                    marginLeft: 8,
                    letterSpacing: "0.08em",
                  }}
                >
                  star-fm-digital, live session
                </div>
              </div>
              <div style={{ padding: "22px", fontSize: "0.78rem", lineHeight: 2.1 }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--star-green)" }}>$</span>
                  <span style={{ color: "var(--white)" }}> what-is-ai --simple</span>
                </div>
                <div style={{ color: "rgba(168,240,176,0.55)", paddingLeft: 18 }}>
                  AI = programs that learn from data to make
                  <br />
                  &nbsp;&nbsp;&nbsp;decisions, like a smart assistant.
                </div>
                <br />
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--star-green)" }}>$</span>
                  <span style={{ color: "var(--white)" }}> ai-tools --free --south-africa</span>
                </div>
                <div style={{ color: "rgba(168,240,176,0.55)", paddingLeft: 18 }}>
                  ChatGPT, Claude, Canva AI, Google Gemini...
                  <br />
                  &nbsp;&nbsp;&nbsp;All free. All accessible on your phone.
                </div>
                <br />
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--star-green)" }}>$</span>
                  <span style={{ color: "var(--white)" }}> ai-jobs-north-west</span>
                </div>
                <div style={{ color: "rgba(168,240,176,0.55)", paddingLeft: 18 }}>
                  Data labelling · Prompt engineering
                  <br />
                  &nbsp;&nbsp;&nbsp;Content creation · AI training. Growing fast.
                </div>
                <br />
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--star-green)" }}>$</span>
                  <span style={{ color: "var(--white)" }}> next-lesson</span>
                  <span className="term-cursor" />
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r)",
                padding: 20,
              }}
            >
              <div
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--star-green)",
                  marginBottom: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                This Week on Digital Futures
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.98rem",
                  marginBottom: 4,
                  color: "var(--white)",
                }}
              >
                Free AI tools for SA entrepreneurs
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                Monday at 18:00 · Live on Star FM 102.9
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
