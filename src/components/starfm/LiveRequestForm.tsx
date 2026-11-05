"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "./LangContext";
import { submitRequest, IS_LIVE } from "@/lib/starfm-api";

type RequestType = "song" | "topic";

export function LiveRequestForm() {
  const { t } = useLang();
  const [type, setType] = useState<RequestType>("song");
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [queuePos, setQueuePos] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "song" && !songName.trim()) return;
    if (type === "topic" && !message.trim()) return;

    setStatus("sending");
    const result = await submitRequest({
      type,
      songName: type === "song" ? songName.trim() : undefined,
      artist: type === "song" ? artist.trim() : undefined,
      requesterName: requesterName.trim() || "Anonymous",
      message: message.trim() || undefined,
    });

    if (result.ok && result.data?.ok) {
      setStatus("sent");
      setQueuePos(result.data.queuePosition ?? null);
      setSongName("");
      setArtist("");
      setRequesterName("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="request"
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)",
        padding: "80px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(53,189,4,0.08) 0%, transparent 70%)",
          top: -100,
          left: -100,
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal className="sec-label">🎙️ Live Studio Requests</Reveal>
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
          Send a Request <span style={{ color: "var(--star-green)" }}>Live to the Studio.</span>
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
          Want to hear a song, send a shoutout, or raise a topic? Your request lands in front of
          the presenter in seconds, live in the studio queue.
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

        <Reveal
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r2)",
            padding: "28px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent */}
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

          {/* Type toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {(["song", "topic"] as RequestType[]).map((tType) => (
              <button
                key={tType}
                type="button"
                onClick={() => setType(tType)}
                style={{
                  flex: 1,
                  background: type === tType ? "var(--star-green)" : "var(--panel2)",
                  color: type === tType ? "#050A03" : "var(--muted)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r)",
                  padding: "12px 16px",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                {tType === "song" ? "🎵 Song Request" : "💬 Topic / Shoutout"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {type === "song" && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    Song Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    placeholder="e.g. Wadibusa"
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "13px 16px",
                      color: "var(--white)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.92rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      width: "100%",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    Artist (optional)
                  </label>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="e.g. Uncle Waffles"
                    style={{
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      padding: "13px 16px",
                      color: "var(--white)",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.92rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      width: "100%",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
              </>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Your Name (optional)
              </label>
              <input
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                placeholder="e.g. Thabo from Klerksdorp"
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "13px 16px",
                  color: "var(--white)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.92rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "100%",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {type === "song" ? "Dedication / Message" : "Topic or shoutout *"}
              </label>
              <textarea
                required={type === "topic"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === "song"
                    ? "Big up to my girl Lerato for her birthday!"
                    : "Can we discuss youth unemployment in Matlosana?"
                }
                rows={3}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: "13px 16px",
                  color: "var(--white)",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.92rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  width: "100%",
                  resize: "vertical",
                  minHeight: 80,
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                width: "100%",
                background:
                  status === "sent"
                    ? "var(--star-green-deep)"
                    : status === "error"
                    ? "var(--red)"
                    : "var(--star-green)",
                color: "#050A03",
                border: "none",
                borderRadius: 100,
                padding: "15px 28px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: status === "sending" ? "wait" : "pointer",
                transition: "all 0.25s",
                opacity: status === "sending" ? 0.7 : 1,
              }}
            >
              {status === "idle" && "📡 Send to Studio →"}
              {status === "sending" && "📡 Sending to studio..."}
              {status === "sent" &&
                `✓ Sent! ${queuePos ? `You're #${queuePos} in the queue` : ""}`}
              {status === "error" && "✗ Something went wrong, try again"}
            </button>
          </form>

          {/* Live indicator */}
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.72rem",
              color: "var(--muted)",
            }}
          >
            <span className="live-dot" />
            Requests appear in the studio queue in real-time. Presenter sees them on their tablet.
          </div>
        </Reveal>
      </div>
    </section>
  );
}
