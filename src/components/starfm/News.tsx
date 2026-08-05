"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";
import { NEWS } from "@/lib/starfm-data";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
}

export function News() {
  const { t } = useLang();
  const [featured, ...rest] = NEWS;

  return (
    <section
      id="news"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("news_label")}</Reveal>
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
          {t("news_title")}
        </Reveal>
        <Reveal
          as="p"
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            lineHeight: 1.8,
            color: "var(--muted)",
            maxWidth: 540,
            marginBottom: 48,
          }}
        >
          {t("news_body")}
        </Reveal>

        {/* Featured article */}
        <Reveal
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border-hi)",
            borderRadius: "var(--r2)",
            padding: 0,
            overflow: "hidden",
            marginBottom: 16,
            display: "grid",
            gridTemplateColumns: "1fr",
            position: "relative",
            transition: "transform 0.3s, border-color 0.3s",
          }}
          className="card-hover md:grid-cols-[1fr_1.4fr]"
        >
          {/* Image / gradient block */}
          <div
            style={{
              minHeight: 220,
              background:
                "linear-gradient(135deg, #2A9A03 0%, #35BD04 50%, #4FE01A 100%)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Layered decorative elements */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.2) 0%, transparent 50%)",
              }}
            />
            {/* Wave pattern */}
            <svg
              aria-hidden="true"
              style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: "100%", opacity: 0.3 }}
              viewBox="0 0 400 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q50,20 100,50 T200,50 T300,50 T400,50 L400,100 L0,100 Z"
                fill="rgba(255,255,255,0.15)"
              />
              <path
                d="M0,60 Q50,30 100,60 T200,60 T300,60 T400,60 L400,100 L0,100 Z"
                fill="rgba(0,0,0,0.1)"
              />
            </svg>
            {/* Star icon */}
            <svg width="90" height="90" viewBox="0 0 24 24" fill="rgba(255,255,255,0.4)" style={{ position: "relative", zIndex: 1 }}>
              <path d="M12 2L9.5 9.5H2l6.2 4.5-2.4 7.4L12 16.8l6.2 4.5-2.4-7.4L22 9.5h-7.5z" />
            </svg>
            {/* Featured badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                borderRadius: 100,
                padding: "5px 12px",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#fff",
                zIndex: 2,
              }}
            >
              ★ Featured
            </div>
          </div>
          {/* Content */}
          <div style={{ padding: "28px 32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-syne-mono), monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--star-green)",
                  background: "rgba(53,189,4,0.1)",
                  padding: "4px 10px",
                  borderRadius: 100,
                  border: "1px solid rgba(53,189,4,0.2)",
                }}
              >
                {featured.category}
              </span>
              <span style={{ fontSize: "0.74rem", color: "var(--muted)" }}>
                {formatDate(featured.date)} · {featured.readTime}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 12,
                color: "var(--white)",
              }}
            >
              {featured.title}
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 }}>
              {featured.excerpt}
            </p>
            <a
              href="#news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--star-green)",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "gap 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
            >
              Read full story →
            </a>
          </div>
        </Reveal>

        {/* Article grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((article, i) => (
            <Reveal
              key={article.title}
              delay={(i === 1 ? 1 : i === 2 ? 2 : undefined) as 1 | 2 | undefined}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
                padding: 24,
                cursor: "pointer",
                transition: "transform 0.3s, border-color 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
              className="card-hover"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--star-green)",
                    background: "rgba(53,189,4,0.08)",
                    padding: "3px 9px",
                    borderRadius: 100,
                  }}
                >
                  {article.category}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                  color: "var(--white)",
                }}
              >
                {article.title}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, flex: 1 }}>
                {article.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: "1px solid var(--border)",
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                }}
              >
                <span>{formatDate(article.date)}</span>
                <span>{article.readTime}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
