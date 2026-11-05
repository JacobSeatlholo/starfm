"use client";

import { useState } from "react";
import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { STATION, CONTACT_REASONS } from "@/lib/starfm-data";
import { submitLead, IS_LIVE } from "@/lib/starfm-api";

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      type: String(formData.get("type") || "Listener"),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // honeypot
      source: "website",
    };
    const result = await submitLead(data);
    if (result.ok) {
      setStatus("sent");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("contact_label")}</Reveal>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 48,
          }}
          className="md:flex-row md:gap-16"
        >
          {/* Left — info */}
          <div style={{ flex: 1 }}>
            <Reveal
              as="h2"
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.9rem, 5.5vw, 3.4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: 16,
                color: "var(--white)",
              }}
            >
              {t("contact_title")}
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
              {t("contact_body")}
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z", title: t("ci_loc"), val: `${STATION.city}, ${STATION.province}, ${STATION.country}` },
                { icon: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z", title: t("ci_freq"), val: `${STATION.frequency} ${STATION.unit} FM` },
                { icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z", title: t("ci_stream"), val: "famcast.co.za/star-fm" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6", title: t("ci_email"), val: STATION.email },
              ].map((item) => (
                <Reveal key={item.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      flexShrink: 0,
                      background: "rgba(53,189,4,0.08)",
                      border: "1px solid rgba(53,189,4,0.2)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--star-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                        marginBottom: 3,
                        color: "var(--white)",
                      }}
                    >
                      {item.title}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{item.val}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={STATION.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.2)",
                borderRadius: "var(--r)",
                padding: "16px 20px",
                textDecoration: "none",
                transition: "all 0.25s",
                marginTop: 20,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.14)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(37,211,102,0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  background: "#25d366",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
                  <path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2z" />
                </svg>
              </div>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    color: "var(--white)",
                  }}
                >
                  {t("wa_title")}
                </strong>
                <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{t("wa_sub")}</span>
              </div>
            </a>
          </div>

          {/* Right — form */}
          <Reveal
            delay={1}
            style={{ flex: 1 }}
          >
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  htmlFor="f-name"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("f_name")}
                </label>
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("f_name_ph")}
                  autoComplete="name"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "13px 16px",
                    color: "var(--white)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.92rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                    WebkitAppearance: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  htmlFor="f-email"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("f_email")}
                </label>
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("f_email_ph")}
                  autoComplete="email"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "13px 16px",
                    color: "var(--white)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.92rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                    WebkitAppearance: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  htmlFor="f-type"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("f_type")}
                </label>
                <select
                  id="f-type"
                  name="type"
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "13px 16px",
                    color: "var(--white)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.92rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                    WebkitAppearance: "none",
                    cursor: "pointer",
                  }}
                >
                  {CONTACT_REASONS.map((reason) => (
                    <option key={reason} value={reason} style={{ background: "var(--panel)" }}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label
                  htmlFor="f-msg"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {t("f_msg")}
                </label>
                <textarea
                  id="f-msg"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("f_msg_ph")}
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "13px 16px",
                    color: "var(--white)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "0.92rem",
                    outline: "none",
                    transition: "border-color 0.2s",
                    width: "100%",
                    WebkitAppearance: "none",
                    resize: "vertical",
                    minHeight: 110,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              {/* Honeypot field — hidden from humans, catches bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: -9999,
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />
              <button
                type="submit"
                disabled={status !== "idle"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: "100%",
                  background: status === "sent" ? "var(--star-green-deep)" : "var(--star-green)",
                  color: "#050A03",
                  border: "none",
                  borderRadius: 100,
                  padding: "15px 28px",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: status === "idle" ? "pointer" : "default",
                  transition: "all 0.25s",
                  WebkitTapHighlightColor: "transparent",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "idle" && t("f_send") + " →"}
                {status === "sending" && "Sending to studio..."}
                {status === "sent" && "✓ Message received! We'll be in touch."}
                {status === "error" && "✗ Could not send — try again"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
