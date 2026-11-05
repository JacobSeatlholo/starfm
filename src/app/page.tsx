"use client";

import { LangProvider } from "@/components/starfm/LangContext";
import { CustomCursor } from "@/components/starfm/CustomCursor";
import { Nav } from "@/components/starfm/Nav";
import { Hero } from "@/components/starfm/Hero";
import { StudioPulse } from "@/components/starfm/StudioPulse";
import { Ticker } from "@/components/starfm/Ticker";
import { Impact } from "@/components/starfm/Impact";
import { Schedule } from "@/components/starfm/Schedule";
import { Presenters } from "@/components/starfm/Presenters";
import { Shows } from "@/components/starfm/Shows";
import { Digital } from "@/components/starfm/Digital";
import { Top10Voting } from "@/components/starfm/Top10Voting";
import { LiveRequestForm } from "@/components/starfm/LiveRequestForm";
import { LiveRequestFeed } from "@/components/starfm/LiveRequestFeed";
import { News } from "@/components/starfm/News";
import { Podcasts } from "@/components/starfm/Podcasts";
import { Community } from "@/components/starfm/Community";
import { Competitions } from "@/components/starfm/Competitions";
import { Coverage } from "@/components/starfm/Coverage";
import { Funders } from "@/components/starfm/Funders";
import { Contact } from "@/components/starfm/Contact";
import { Footer } from "@/components/starfm/Footer";
import { StickyPlayer } from "@/components/starfm/StickyPlayer";

export default function Home() {
  return (
    <LangProvider>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--bg)",
        }}
      >
        <CustomCursor />
        <Nav />
        <main style={{ flex: 1 }}>
          {/* Hero — logo, headline, CTAs, live stream */}
          <Hero />

          {/* Studio Pulse — live "Now On Air" + track + stats (auto-refreshing) */}
          <StudioPulse />

          {/* Scrolling brand ticker */}
          <Ticker />

          {/* Impact stats */}
          <Impact />

          {/* Weekly schedule (auto-fetches from sheet, highlights current show) */}
          <Schedule />

          {/* Presenter profiles */}
          <Presenters />

          {/* Interactive show selector */}
          <Shows />

          {/* Digital Literacy Initiative + terminal */}
          <Digital />

          {/* Top 10 Voting — live vote counts, one-vote-per-session */}
          <Top10Voting />

          {/* Live Request Form — song/topic requests → studio sheet */}
          <LiveRequestForm />

          {/* Live Request Feed — public feed of recent requests with status */}
          <LiveRequestFeed />

          {/* News articles */}
          <News />

          {/* Podcasts / Catch-Up */}
          <Podcasts />

          {/* Community mission */}
          <Community />

          {/* Competitions */}
          <Competitions />

          {/* Coverage map + frequency */}
          <Coverage />

          {/* Funders / investors */}
          <Funders />

          {/* Contact form (submits leads to sheet) */}
          <Contact />
        </main>
        <Footer />
        <StickyPlayer />
        {/* Spacer for sticky player — ensures footer content isn't hidden */}
        <div style={{ height: 80 }} aria-hidden="true" />
      </div>
    </LangProvider>
  );
}
