/**
 * Star FM API client — talks to the Google Apps Script backend.
 *
 * If NEXT_PUBLIC_APPS_SCRIPT_URL is not set, falls back to demo data
 * so the site still looks fully functional for previews/demos.
 */

const API_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
export const IS_LIVE = Boolean(API_URL);

// ── Types ───────────────────────────────────────────────────────────
export type ShowSlot = {
  day: string;
  startTime: string;
  endTime: string;
  showName: string;
  presenter: string;
  genre: string;
  language: string;
  notes?: string;
};

export type NowPlaying = {
  currentShow: ShowSlot | null;
  nextShow: ShowSlot | null;
  track: {
    trackName: string;
    artist: string;
    presenter: string;
    show: string;
    duration: string;
    setAt: string;
  } | null;
  serverTime: string;
  day: string;
  time: string;
};

export type Top10Song = {
  rank: number;
  songName: string;
  artist: string;
  votes: number;
  lastVotedAt: string;
  weekOf: string;
};

export type ListenerRequest = {
  timestamp: string;
  type: "song" | "topic";
  songName: string;
  artist: string;
  requesterName: string;
  message: string;
  status: "new" | "queued" | "played" | "skipped";
  playedAt?: string;
};

export type Presenter = {
  name: string;
  show: string;
  time: string;
  bio: string;
  initials: string;
  tags: string[];
  photoUrl?: string;
};

export type StudioStats = {
  totalRequests: number;
  totalVotes: number;
  totalLeads: number;
  pendingRequests: number;
  weekOf: string;
  serverTime: string;
};

// ── Data coercion helpers ───────────────────────────────────────────
// The Apps Script may return dates as ISO strings (e.g. "1899-12-30T04:30:00.000Z")
// when the sheet auto-formats time columns. These helpers convert them back to
// clean "HH:mm" strings or numbers on the client side.

function coerceTime(val: unknown): string {
  if (typeof val === "string") {
    // If it's a date string like "1899-12-30T04:30:00.000Z", extract HH:mm
    const dateMatch = val.match(/T(\d{2}):(\d{2})/);
    if (dateMatch) return `${dateMatch[1]}:${dateMatch[2]}`;
    return val;
  }
  if (val instanceof Date) {
    return val.toTimeString().slice(0, 5);
  }
  return String(val);
}

function coerceNumber(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    // If it's a date string like "1900-02-14T22:30:00.000Z"
    if (val.includes("T")) {
      const d = new Date(val);
      // Google Sheets stores numbers as days since 1899-12-30
      // Votes like 47 would be stored as 47 days = 1900-02-15
      // The timezone matters: Sheets uses the script's timezone (Africa/Johannesburg = UTC+2)
      // Parse as local date at midnight to get the correct day count
      const epoch = new Date("1899-12-30T00:00:00");
      const voteDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      const epochDate = new Date(epoch.getFullYear(), epoch.getMonth(), epoch.getDate());
      const diffDays = Math.round((voteDate.getTime() - epochDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return Number(val) || 0;
  }
  return 0;
}

function coerceDate(val: unknown): string {
  if (val instanceof Date) return val.toISOString();
  return String(val);
}

// Coerce a NowPlaying response — handle date-formatted times and votes
function coerceNowPlaying(data: NowPlaying): NowPlaying {
  const coerceShow = (show: ShowSlot | null): ShowSlot | null => {
    if (!show) return null;
    return {
      ...show,
      startTime: coerceTime(show.startTime),
      endTime: coerceTime(show.endTime),
    };
  };
  return {
    ...data,
    currentShow: coerceShow(data.currentShow),
    nextShow: coerceShow(data.nextShow),
    track: data.track
      ? {
          ...data.track,
          duration: data.track.duration?.includes("T")
            ? new Date(data.track.duration).toTimeString().slice(3, 8)
            : data.track.duration,
          setAt: coerceDate(data.track.setAt),
        }
      : null,
    serverTime: coerceDate(data.serverTime),
  };
}

function coerceTop10(data: { top10: Top10Song[]; weekOf: string }): {
  top10: Top10Song[];
  weekOf: string;
} {
  return {
    top10: data.top10.map((s) => ({
      ...s,
      votes: coerceNumber(s.votes),
      rank: coerceNumber(s.rank),
      lastVotedAt: coerceDate(s.lastVotedAt),
      weekOf: s.weekOf?.includes("T")
        ? new Date(s.weekOf).toISOString().split("T")[0]
        : s.weekOf,
    })),
    weekOf: data.weekOf?.includes("T")
      ? new Date(data.weekOf).toISOString().split("T")[0]
      : data.weekOf,
  };
}

// ── Fetch helper ────────────────────────────────────────────────────
async function apiGet<T>(action: string, params?: Record<string, string>): Promise<T | null> {
  if (!IS_LIVE) return null;
  try {
    const url = new URL(API_URL);
    url.searchParams.set("action", action);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString(), {
      method: "GET",
      // Apps Script returns JSON, no preflight needed for simple GETs
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function apiPost<T>(
  action: string,
  body: Record<string, unknown>
): Promise<{ ok: boolean; data?: T; error?: string }> {
  if (!IS_LIVE) {
    // Demo mode — simulate success after a short delay
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true, data: { ok: true, demo: true } as unknown as T };
  }
  try {
    const url = new URL(API_URL);
    url.searchParams.set("action", action);
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      // text/plain avoids CORS preflight for Apps Script
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    const data = (await res.json()) as T;
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

// ── Public API ──────────────────────────────────────────────────────

export async function getNowPlaying(): Promise<NowPlaying | null> {
  const data = await apiGet<NowPlaying>("now-playing");
  return data ? coerceNowPlaying(data) : null;
}

export async function getTop10(): Promise<{ top10: Top10Song[]; weekOf: string } | null> {
  const data = await apiGet<{ top10: Top10Song[]; weekOf: string }>("top10");
  return data ? coerceTop10(data) : null;
}

export async function getRecentRequests(
  limit = 10
): Promise<{ requests: ListenerRequest[]; total: number } | null> {
  return apiGet<{ requests: ListenerRequest[]; total: number }>("recent-requests", {
    limit: String(limit),
  });
}

export async function getSchedule(): Promise<{
  schedule: Record<string, ShowSlot[]>;
} | null> {
  return apiGet<{ schedule: Record<string, ShowSlot[]> }>("schedule");
}

export async function getPresenters(): Promise<{ presenters: Presenter[] } | null> {
  return apiGet<{ presenters: Presenter[] }>("presenters");
}

export async function getStats(): Promise<StudioStats | null> {
  return apiGet<StudioStats>("stats");
}

export async function submitRequest(body: {
  type: "song" | "topic";
  songName?: string;
  artist?: string;
  requesterName?: string;
  message?: string;
}): Promise<{ ok: boolean; data?: { ok: boolean; queuePosition?: number; message?: string }; error?: string }> {
  return apiPost("request", body);
}

export async function submitVote(body: {
  songName: string;
  voterId?: string;
}): Promise<{ ok: boolean; data?: { ok: boolean; newVoteCount?: number }; error?: string }> {
  return apiPost("vote", body);
}

export async function submitLead(body: {
  name: string;
  email: string;
  type?: string;
  message: string;
  website?: string; // honeypot
}): Promise<{ ok: boolean; data?: { ok: boolean; message?: string }; error?: string }> {
  return apiPost("contact", body);
}

// ── Demo data (used when API not configured) ───────────────────────

export const DEMO_NOW_PLAYING: NowPlaying = {
  currentShow: {
    day: "Monday",
    startTime: "12:00",
    endTime: "15:00",
    showName: "Lunch With The Nation",
    presenter: "Lerato Dube",
    genre: "News",
    language: "EN/TN/ST",
    notes: "Community voices, interviews",
  },
  nextShow: {
    day: "Monday",
    startTime: "15:00",
    endTime: "18:00",
    showName: "Youth Hustle Hour",
    presenter: "Sipho Nkosi",
    genre: "Business",
    language: "EN",
    notes: "Bursaries, tenders, hustle",
  },
  track: {
    trackName: "Wadibusa",
    artist: "Uncle Waffles",
    presenter: "Lerato Dube",
    show: "Lunch With The Nation",
    duration: "3:42",
    setAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  serverTime: new Date().toISOString(),
  day: "Monday",
  time: "12:30",
};

export const DEMO_TOP10: Top10Song[] = [
  { rank: 1, songName: "Wadibusa", artist: "Uncle Waffles", votes: 47, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 2, songName: "Tanzania", artist: "Uncle Waffles", votes: 39, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 3, songName: "Sofa Silahlane", artist: "DJy Zan SA", votes: 31, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 4, songName: "Paris", artist: "Mondo Ghana", votes: 28, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 5, songName: "Yahyuppiyah", artist: "Tyla", votes: 24, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 6, songName: "Mnike", artist: "Tony Duardo", votes: 21, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 7, songName: "Water", artist: "Tyla", votes: 19, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 8, songName: "Kwenzekile", artist: "Sofa Silahlane", votes: 16, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 9, songName: "Saka", artist: "Sofa Silahlane", votes: 14, lastVotedAt: "", weekOf: "2026-01-13" },
  { rank: 10, songName: "Asambe", artist: "Sofa Silahlane", votes: 11, lastVotedAt: "", weekOf: "2026-01-13" },
];

export const DEMO_REQUESTS: ListenerRequest[] = [
  {
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: "song",
    songName: "Sofa Silahlane",
    artist: "DJy Zan SA",
    requesterName: "Thabo from Klerksdorp",
    message: "Big up to my girl Lerato!",
    status: "played",
    playedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    type: "song",
    songName: "Paris",
    artist: "Mondo Ghana",
    requesterName: "Naledi",
    message: "Please play Paris for the morning crew",
    status: "queued",
  },
  {
    timestamp: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    type: "topic",
    songName: "",
    artist: "",
    requesterName: "Anonymous",
    message: "Can we discuss load-shedding schedules in Matlosana?",
    status: "new",
  },
  {
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    type: "song",
    songName: "Tanzania",
    artist: "Uncle Waffles",
    requesterName: "Sipho from Matlosana",
    message: "Birthday shoutout to my sister Palesa!",
    status: "played",
    playedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    type: "song",
    songName: "Wadibusa",
    artist: "Uncle Waffles",
    requesterName: "Lerato",
    message: "",
    status: "played",
    playedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

export const DEMO_STATS: StudioStats = {
  totalRequests: 47,
  totalVotes: 250,
  totalLeads: 12,
  pendingRequests: 3,
  weekOf: "2026-01-13",
  serverTime: new Date().toISOString(),
};
