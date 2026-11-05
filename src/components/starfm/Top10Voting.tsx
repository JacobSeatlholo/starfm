"use client";

import { useState, useEffect, useCallback } from "react";
import { Reveal } from "./Reveal";
import { getTop10, submitVote, IS_LIVE, DEMO_TOP10, type Top10Song } from "@/lib/starfm-api";

const VOTE_STORAGE_KEY = "starfm-voted-songs";

function getVotedSongs(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(VOTE_STORAGE_KEY);
    return new Set(stored ? JSON.parse(stored) : []);
  } catch {
    return new Set();
  }
}

function addVotedSong(songName: string) {
  try {
    const voted = getVotedSongs();
    voted.add(songName.toLowerCase());
    localStorage.setItem(VOTE_STORAGE_KEY, JSON.stringify([...voted]));
  } catch {
    // localStorage might be blocked
  }
}

export function Top10Voting() {
  const [songs, setSongs] = useState<Top10Song[]>(DEMO_TOP10);
  const [voted, setVoted] = useState<Set<string>>(() => typeof window === "undefined" ? new Set() : getVotedSongs());
  const [votingFor, setVotingFor] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [weekOf, setWeekOf] = useState<string>("");

  const loadData = useCallback(async () => {
    const data = await getTop10();
    if (data?.top10?.length) {
      setSongs(data.top10);
      setWeekOf(data.weekOf || "");
      setLastUpdated(new Date());
    } else if (!IS_LIVE) {
      setWeekOf(DEMO_TOP10[0]?.weekOf || "");
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const fetch = async () => {
      await loadData();
    };
    if (mounted) void fetch();
    // Refresh every 60 seconds
    const interval = setInterval(loadData, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [loadData]);

  const handleVote = async (song: Top10Song) => {
    if (voted.has(song.songName.toLowerCase())) return;
    setVotingFor(song.songName);
    const result = await submitVote({ songName: song.songName });
    if (result.ok) {
      addVotedSong(song.songName);
      setVoted(getVotedSongs());
      // Optimistic update
      setSongs((prev) =>
        prev
          .map((s) =>
            s.songName === song.songName
              ? { ...s, votes: result.data?.newVoteCount ?? s.votes + 1 }
              : s
          )
          .sort((a, b) => b.votes - a.votes)
          .map((s, i) => ({ ...s, rank: i + 1 }))
      );
    }
    setVotingFor(null);
  };

  const maxVotes = Math.max(...songs.map((s) => s.votes), 1);

  return (
    <section
      id="top10"
      style={{
        background: "var(--bg2)",
        borderTop: "1px solid var(--border)",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Reveal className="sec-label">📊 Star FM Top 10</Reveal>
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
          Vote for the <span style={{ color: "var(--star-gold)" }}>Top 10.</span>
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
          Vote once per song per week. The chart resets every Monday at 00:00, your votes decide what
          gets played. Live vote counts update automatically.
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

        <Reveal style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {songs.map((song, i) => {
            const hasVoted = voted.has(song.songName.toLowerCase());
            const isVoting = votingFor === song.songName;
            const votePercent = (song.votes / maxVotes) * 100;
            const isTop3 = song.rank <= 3;

            return (
              <div
                key={song.songName + song.artist}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: "var(--panel)",
                  border: `1px solid ${isTop3 ? "var(--border-hi)" : "var(--border)"}`,
                  borderRadius: "var(--r)",
                  padding: "14px 18px",
                  transition: "border-color 0.2s, transform 0.2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(53,189,4,0.4)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = isTop3 ? "var(--border-hi)" : "var(--border)")
                }
              >
                {/* Rank */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    borderRadius: 10,
                    background:
                      song.rank === 1
                        ? "linear-gradient(135deg, var(--star-gold), var(--star-gold-deep))"
                        : song.rank === 2
                        ? "linear-gradient(135deg, #c0c0c0, #808080)"
                        : song.rank === 3
                        ? "linear-gradient(135deg, #cd7f32, #8b4513)"
                        : "var(--panel2)",
                    color: song.rank <= 3 ? "#050A03" : "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                  }}
                >
                  {song.rank}
                </div>

                {/* Song info + vote bar */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      flexWrap: "wrap",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "var(--white)",
                      }}
                    >
                      {song.songName}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
                      {song.artist}
                    </span>
                  </div>
                  {/* Vote bar */}
                  <div
                    style={{
                      height: 4,
                      background: "rgba(53,189,4,0.08)",
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${votePercent}%`,
                        background:
                          song.rank === 1
                            ? "linear-gradient(90deg, var(--star-gold-deep), var(--star-gold))"
                            : "linear-gradient(90deg, var(--star-green-deep), var(--star-green))",
                        borderRadius: 100,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Vote count */}
                <div
                  style={{
                    fontFamily: "var(--font-syne-mono), monospace",
                    fontSize: "0.78rem",
                    color: song.rank <= 3 ? "var(--star-gold)" : "var(--muted)",
                    minWidth: 40,
                    textAlign: "right",
                    fontWeight: 700,
                  }}
                >
                  {song.votes}
                </div>

                {/* Vote button */}
                <button
                  onClick={() => handleVote(song)}
                  disabled={hasVoted || isVoting}
                  style={{
                    background: hasVoted
                      ? "var(--star-green-deep)"
                      : isVoting
                      ? "var(--panel2)"
                      : "var(--star-green)",
                    color: "#050A03",
                    border: "none",
                    borderRadius: 100,
                    padding: "8px 16px",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    cursor: hasVoted || isVoting ? "default" : "pointer",
                    transition: "all 0.2s",
                    whiteSpace: "nowrap",
                    minWidth: 80,
                  }}
                >
                  {hasVoted ? "✓ Voted" : isVoting ? "..." : "Vote ▲"}
                </button>
              </div>
            );
          })}
        </Reveal>

        {/* Footer info */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            fontSize: "0.74rem",
            color: "var(--muted)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span className="live-dot" style={{ background: "var(--star-green)" }} />
            Live counts · auto-refresh every 60s
          </div>
          {weekOf && <div>Week of {weekOf}</div>}
        </div>
      </div>
    </section>
  );
}
