"use client";

import { LangProvider } from "@/components/starfm/LangContext";
import { CustomCursor } from "@/components/starfm/CustomCursor";
import { Nav } from "@/components/starfm/Nav";
import { Hero } from "@/components/starfm/Hero";
import { Ticker } from "@/components/starfm/Ticker";
import { Impact } from "@/components/starfm/Impact";
import { Schedule } from "@/components/starfm/Schedule";
import { Presenters } from "@/components/starfm/Presenters";
import { Shows } from "@/components/starfm/Shows";
import { Digital } from "@/components/starfm/Digital";
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
          <Hero />
          <Ticker />
          <Impact />
          <Schedule />
          <Presenters />
          <Shows />
          <Digital />
          <News />
          <Podcasts />
          <Community />
          <Competitions />
          <Coverage />
          <Funders />
          <Contact />
        </main>
        <Footer />
        <StickyPlayer />
        {/* Spacer for sticky player */}
        <div style={{ height: 60 }} aria-hidden="true" />
      </div>
    </LangProvider>
  );
}
