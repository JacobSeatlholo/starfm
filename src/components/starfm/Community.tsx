"use client";

import { useLang } from "./LangContext";
import { Reveal } from "./Reveal";

const ICONS: Record<string, string> = {
  home: "M3 12l9-9 9 9M5 10v10h14V10",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z",
  briefcase: "M20 7h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 4h4v3h-4V4z",
  music: "M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z",
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z",
};

function Icon({ name }: { name: string }) {
  const path = ICONS[name] || ICONS.globe;
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--star-green)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

const CARDS = [
  { icon: "home", title: "Hyperlocal Voices", body: "We platform local leaders, entrepreneurs, educators, and activists, giving a microphone to the people making real change in Klerksdorp." },
  { icon: "book", title: "Education First", body: "School information, adult literacy, bursary alerts, and skills training, education content runs every single day on Star FM." },
  { icon: "briefcase", title: "Economic Empowerment", body: "Tender opportunities, SMME resources, government grants and business tips that help listeners build real wealth for their families." },
  { icon: "music", title: "Culture & Identity", body: "Local music, indigenous languages, cultural heritage and stories that remind our community who they are and where they come from." },
  { icon: "heart", title: "Social Cohesion", body: "A place where all community members, regardless of background, age, or language, come to listen, learn, and belong." },
  { icon: "globe", title: "A New Model for Radio", body: "Modern, digital-first, and fundable, a community radio model worth scaling across South Africa's township and rural communities." },
];

export function Community() {
  const { t } = useLang();

  return (
    <section
      id="community"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal className="sec-label">{t("community_label")}</Reveal>
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
          {t("community_title")}
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
          {t("community_body")}
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 12,
          }}
          className="sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((card, i) => (
            <Reveal
              key={card.title}
              delay={(i % 3 === 1 ? 1 : i % 3 === 2 ? 2 : undefined) as 1 | 2 | undefined}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
                padding: "24px 20px",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(53,189,4,0.25)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ marginBottom: 14, display: "block" }}>
                <Icon name={card.icon} />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                  color: "var(--white)",
                }}
              >
                {card.title}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.65 }}>
                {card.body}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
