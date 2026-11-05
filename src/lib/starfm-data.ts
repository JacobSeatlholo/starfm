// Star FM 102.9, all station content data
// Sourced from the original site + research-driven additions

export const STATION = {
  name: "Star FM",
  frequency: "102.9",
  unit: "MHz",
  tagline: "For The Brighter Side Of You",
  city: "Klerksdorp",
  province: "North West Province",
  country: "South Africa",
  email: "hello@starfmradio.co.za",
  domain: "starfmradio.co.za",
  streamUrl: "https://famcast.co.za/q/stations/star-fm/",
  facebook: "https://web.facebook.com/OfficialStarfm1029",
  whatsapp: "https://wa.me/27600000000", // placeholder, replace with real number
  // Famcast Android app
  appUrl: "https://play.google.com/store/apps/details?id=com.famcast.starfm",
  coverage: [
    "Klerksdorp",
    "City of Matlosana",
    "Ventersdorp",
    "Stilfontein",
    "Orkney",
    "Hartebeesfontein",
    "Dr Kenneth Kaunda District",
  ],
} as const;

// ── IMPACT STATS ──────────────────────────────────────────────────
export const IMPACT = [
  { num: "11K+", label: "Facebook community followers, growing every day" },
  { num: "102.9", label: "MHz, your frequency across Klerksdorp & Matlosana" },
  { num: "24/7", label: "Live broadcasting, every hour, every day, no pauses" },
  { num: "65km", label: "From Johannesburg, heartbeat of the Southern District" },
] as const;

// ── TICKER ────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "For The Brighter Side Of You",
  "Star FM 102.9 MHz",
  "Klerksdorp Speaks",
  "AI Literacy For All",
  "Digital Empowerment",
  "Community First",
  "Tech For The Township",
  "North West Province",
] as const;

// ── SHOWS (daily line-up) ─────────────────────────────────────────
export type Show = {
  time: string;
  name: string;
  host: string;
  tag: string;
  desc: string;
  day?: string;
};

export const SHOWS: Show[] = [
  {
    time: "06:00",
    name: "Morning Drive",
    host: "Wake up with the community",
    tag: "Daily",
    desc: "Wake up with the community, news, music, and everything Klerksdorp needs to start the day right. Local traffic, school updates, and the stories shaping your morning.",
  },
  {
    time: "09:00",
    name: "Tech Talk",
    host: "Digital tips for everyday life",
    tag: "Tech",
    desc: "Digital tips, app guides and tech news explained in plain language, no jargon, just useful. From WhatsApp Business to mobile banking, we make technology work for you.",
  },
  {
    time: "12:00",
    name: "Lunch With The Nation",
    host: "News, views & community voices",
    tag: "News",
    desc: "News, views and community voices from across the Southern District and beyond. Interviews with local leaders, entrepreneurs, and the people making change happen.",
  },
  {
    time: "15:00",
    name: "Youth Hustle Hour",
    host: "Business, entrepreneurship & opportunity",
    tag: "Biz",
    desc: "Business ideas, entrepreneurship stories and opportunities for the next generation of South African leaders. Bursaries, tenders, and the hustle mindset.",
  },
  {
    time: "18:00",
    name: "Digital Futures",
    host: "AI, technology & what's coming next",
    tag: "AI",
    desc: "AI, technology and what's coming next, explained in plain language for every listener. We break down the tools reshaping jobs, education, and daily life in South Africa.",
  },
  {
    time: "20:00",
    name: "AfroBeats & Chill",
    host: "Culture, music & the African story",
    tag: "Music",
    desc: "Culture, music and the African story, celebrating who we are and where we're going. Amapiano, AfroBeats, soul, and the sounds moving the continent forward.",
  },
];

// ── WEEKLY SCHEDULE GRID (inspired by Motsweding FM) ──────────────
export type ScheduleDay = {
  day: string;
  short: string;
  slots: { time: string; show: string; lang?: string }[];
};

export const WEEKLY_SCHEDULE: ScheduleDay[] = [
  {
    day: "Monday",
    short: "Mon",
    slots: [
      { time: "06:00", show: "Morning Drive", lang: "EN/TN" },
      { time: "09:00", show: "Tech Talk", lang: "EN" },
      { time: "12:00", show: "Lunch With The Nation", lang: "EN/TN/ST" },
      { time: "15:00", show: "Youth Hustle Hour", lang: "EN" },
      { time: "18:00", show: "Digital Futures", lang: "EN" },
      { time: "20:00", show: "AfroBeats & Chill", lang: "Music" },
    ],
  },
  {
    day: "Tuesday",
    short: "Tue",
    slots: [
      { time: "06:00", show: "Morning Drive", lang: "EN/TN" },
      { time: "09:00", show: "Tech Talk", lang: "EN" },
      { time: "12:00", show: "Lunch With The Nation", lang: "EN/TN/ST" },
      { time: "15:00", show: "Youth Hustle Hour", lang: "EN" },
      { time: "18:00", show: "Digital Futures", lang: "EN" },
      { time: "20:00", show: "AfroBeats & Chill", lang: "Music" },
    ],
  },
  {
    day: "Wednesday",
    short: "Wed",
    slots: [
      { time: "06:00", show: "Morning Drive", lang: "EN/TN" },
      { time: "09:00", show: "Tech Talk", lang: "EN" },
      { time: "12:00", show: "Lunch With The Nation", lang: "EN/TN/ST" },
      { time: "15:00", show: "Youth Hustle Hour", lang: "EN" },
      { time: "18:00", show: "Digital Futures, Live Workshop", lang: "EN" },
      { time: "20:00", show: "AfroBeats & Chill", lang: "Music" },
    ],
  },
  {
    day: "Thursday",
    short: "Thu",
    slots: [
      { time: "06:00", show: "Morning Drive", lang: "EN/TN" },
      { time: "09:00", show: "Tech Talk", lang: "EN" },
      { time: "12:00", show: "Lunch With The Nation", lang: "EN/TN/ST" },
      { time: "15:00", show: "Youth Hustle Hour", lang: "EN" },
      { time: "18:00", show: "Digital Futures", lang: "EN" },
      { time: "20:00", show: "AfroBeats & Chill", lang: "Music" },
    ],
  },
  {
    day: "Friday",
    short: "Fri",
    slots: [
      { time: "06:00", show: "Morning Drive", lang: "EN/TN" },
      { time: "09:00", show: "Tech Talk", lang: "EN" },
      { time: "12:00", show: "Lunch With The Nation", lang: "EN/TN/ST" },
      { time: "15:00", show: "Youth Hustle Hour, Friday Flex", lang: "EN" },
      { time: "18:00", show: "Friday Night Live", lang: "Music" },
      { time: "20:00", show: "AfroBeats & Chill, Weekend Warm-up", lang: "Music" },
    ],
  },
  {
    day: "Saturday",
    short: "Sat",
    slots: [
      { time: "07:00", show: "Weekend Breakfast", lang: "EN/TN" },
      { time: "10:00", show: "Community Voices", lang: "EN/TN/ST" },
      { time: "13:00", show: "Saturday Sports Desk", lang: "EN" },
      { time: "16:00", show: "The Hive, Youth Show", lang: "EN" },
      { time: "19:00", show: "Saturday Night Mix", lang: "Music" },
    ],
  },
  {
    day: "Sunday",
    short: "Sun",
    slots: [
      { time: "07:00", show: "Sunday Gospel", lang: "EN/TN/ST" },
      { time: "10:00", show: "The Sunday Reflection", lang: "EN/TN" },
      { time: "13:00", show: "Classic AfroBeats", lang: "Music" },
      { time: "16:00", show: "Community Requests", lang: "EN/TN/ST" },
      { time: "19:00", show: "Wind-Down Sundays", lang: "Music" },
    ],
  },
];

// ── PRESENTERS / TEAM (NEW, biggest gap from research) ───────────
export type Presenter = {
  name: string;
  show: string;
  time: string;
  bio: string;
  initials: string;
  accent: string;
  tags: string[];
};

export const PRESENTERS: Presenter[] = [
  {
    name: "Hlangagane Malungane",
    show: "Morning Drive",
    time: "Mon–Fri · 06:00",
    bio: "Founder and lead voice of Star FM 102.9. Hlangagane wakes up Klerksdorp every morning with the stories, music, and energy the community needs to start the day right. A digital literacy advocate and community media pioneer.",
    initials: "HM",
    accent: "from-[#35BD04] to-[#2A9A03]",
    tags: ["Founder", "Morning Drive", "Digital Literacy"],
  },
  {
    name: "Thabo Mokoena",
    show: "Tech Talk",
    time: "Mon–Fri · 09:00",
    bio: "Our resident tech translator. Thabo breaks down the apps, tools, and trends reshaping daily life in South Africa, from WhatsApp Business to AI, in language anyone can understand.",
    initials: "TM",
    accent: "from-[#4FE01A] to-[#35BD04]",
    tags: ["Technology", "Digital Skills", "AI"],
  },
  {
    name: "Lerato Dube",
    show: "Lunch With The Nation",
    time: "Mon–Fri · 12:00",
    bio: "News anchor and community interviewer. Lerato brings the voices of Klerksdorp, Matlosana, and the Southern District to the airwaves, leaders, entrepreneurs, and everyday heroes.",
    initials: "LD",
    accent: "from-[#F5C518] to-[#E6B800]",
    tags: ["News", "Interviews", "Community"],
  },
  {
    name: "Sipho Nkosi",
    show: "Youth Hustle Hour",
    time: "Mon–Fri · 15:00",
    bio: "Entrepreneur, mentor, and voice of the next generation. Sipho covers bursaries, tenders, side hustles, and the mindset young South Africans need to build real wealth.",
    initials: "SN",
    accent: "from-[#35BD04] to-[#4FE01A]",
    tags: ["Youth", "Business", "Entrepreneurship"],
  },
  {
    name: "Naledi Sithole",
    show: "Digital Futures",
    time: "Mon–Fri · 18:00",
    bio: "AI educator and digital futurist. Naledi runs Star FM's flagship Digital Literacy Initiative, teaching listeners how AI, automation, and the digital economy are reshaping jobs in North West Province.",
    initials: "NS",
    accent: "from-[#A8F0B0] to-[#35BD04]",
    tags: ["AI", "Education", "Future of Work"],
  },
  {
    name: "Kabelo Modise",
    show: "AfroBeats & Chill",
    time: "Mon–Fri · 20:00",
    bio: "DJ and cultural curator. Kabelo spins the Amapiano, AfroBeats, soul, and classic tracks that soundtrack the township's evenings, celebrating African music in all its forms.",
    initials: "KM",
    accent: "from-[#E6B800] to-[#F5C518]",
    tags: ["Music", "Culture", "DJ"],
  },
];

// ── NEWS ARTICLES (NEW, inspired by Capricorn FM / 5FM) ──────────
export type NewsArticle = {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured?: boolean;
};

export const NEWS: NewsArticle[] = [
  {
    category: "Station News",
    title: "Star FM Launches Digital Literacy Initiative for North West Province",
    excerpt:
      "Our flagship AI Literacy programme is now live, weekly on-air segments, free workshops, and digital skills training designed to bring every listener in Klerksdorp and the Southern District into the digital economy.",
    date: "2026-08-04",
    readTime: "4 min read",
    featured: true,
  },
  {
    category: "Community",
    title: "Klerksdorp Matric Class 2026: Bursary Deadlines You Can't Miss",
    excerpt:
      "A round-up of every major bursary closing this month, NSFAS, provincial funds, and private scholarships for North West Province matriculants heading to university next year.",
    date: "2026-08-02",
    readTime: "6 min read",
  },
  {
    category: "Business",
    title: "How Three Township SMMEs Went Digital on Star FM",
    excerpt:
      "We followed three local businesses through our Tech for Entrepreneurs programme. Here's how mobile banking, WhatsApp Business, and social media changed their bottom line.",
    date: "2026-07-30",
    readTime: "5 min read",
  },
  {
    category: "Technology",
    title: "Free AI Tools Every South African Can Use Today",
    excerpt:
      "From ChatGPT to Canva AI, here are the free tools that can help you write a CV, start a business, or learn a new skill, no laptop required, just your phone.",
    date: "2026-07-28",
    readTime: "7 min read",
  },
  {
    category: "Culture",
    title: "Amapiano to the World: The North West Sound Going Global",
    excerpt:
      "How a genre born in the townships became a global phenomenon, and the local artists from Klerksdorp and Matlosana riding the wave.",
    date: "2026-07-25",
    readTime: "5 min read",
  },
  {
    category: "Education",
    title: "Adult Literacy Returns: Free Classes Across the Southern District",
    excerpt:
      "Star FM partners with local NGOs to bring free adult literacy and digital skills classes to five community centres. Here's how to enrol.",
    date: "2026-07-22",
    readTime: "3 min read",
  },
];

// ── PODCASTS / CATCH-UP (NEW) ────────────────────────────────────
export type Podcast = {
  title: string;
  show: string;
  duration: string;
  desc: string;
  episode: string;
};

export const PODCASTS: Podcast[] = [
  {
    title: "AI Literacy 101: What Every South African Needs to Know",
    show: "Digital Futures",
    duration: "42 min",
    episode: "EP 12",
    desc: "We break down what AI actually is, how it's already in your phone, and the jobs it's creating in North West Province right now.",
  },
  {
    title: "From Spaza to Startup: A Klerksdorp Hustle Story",
    show: "Youth Hustle Hour",
    duration: "38 min",
    episode: "EP 08",
    desc: "Meet the 24-year-old who turned a R500 spaza shop into a registered business with three employees, and how Star FM listeners can do it too.",
  },
  {
    title: "The State of Matlosana: Mayor's Quarterly Address",
    show: "Lunch With The Nation",
    duration: "55 min",
    episode: "EP 15",
    desc: "An extended interview with the Executive Mayor on service delivery, youth employment, and the role of community media.",
  },
  {
    title: "Amapiano Origins: The North West Contribution",
    show: "AfroBeats & Chill",
    duration: "47 min",
    episode: "EP 06",
    desc: "A deep dive into how North West Province shaped the Amapiano sound, featuring unreleased tracks from local producers.",
  },
];

// ── DIGITAL LITERACY INITIATIVE (existing, enhanced) ─────────────
export const DIGITAL_CARDS = [
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
] as const;

// ── COMMUNITY MISSION CARDS (existing, kept) ─────────────────────
export const COMMUNITY_CARDS = [
  {
    icon: "home",
    title: "Hyperlocal Voices",
    body: "We platform local leaders, entrepreneurs, educators, and activists, giving a microphone to the people making real change in Klerksdorp.",
  },
  {
    icon: "book",
    title: "Education First",
    body: "School information, adult literacy, bursary alerts, and skills training, education content runs every single day on Star FM.",
  },
  {
    icon: "briefcase",
    title: "Economic Empowerment",
    body: "Tender opportunities, SMME resources, government grants and business tips that help listeners build real wealth for their families.",
  },
  {
    icon: "music",
    title: "Culture & Identity",
    body: "Local music, indigenous languages, cultural heritage and stories that remind our community who they are and where they come from.",
  },
  {
    icon: "heart",
    title: "Social Cohesion",
    body: "A place where all community members, regardless of background, age, or language, come to listen, learn, and belong.",
  },
  {
    icon: "globe",
    title: "A New Model for Radio",
    body: "Modern, digital-first, and fundable, a community radio model worth scaling across South Africa's township and rural communities.",
  },
] as const;

// ── COMPETITIONS (NEW) ────────────────────────────────────────────
export type Competition = {
  title: string;
  prize: string;
  deadline: string;
  desc: string;
  status: "open" | "closing" | "featured";
};

export const COMPETITIONS: Competition[] = [
  {
    title: "Back-to-School Bursary Draw",
    prize: "5 × R5,000 bursaries",
    deadline: "Closes 31 August 2026",
    desc: "Matriculants and first-year students in North West Province can enter to win one of five R5,000 study bursaries. Listen to Morning Drive for the daily code word, then enter via WhatsApp.",
    status: "featured",
  },
  {
    title: "Star FM Business Boost",
    prize: "R10,000 + free radio ad campaign",
    deadline: "Closes 15 September 2026",
    desc: "Existing township SMMEs in Klerksdorp and Matlosana can win a R10,000 cash injection plus a month of free ad slots. Tell us your business story in 200 words.",
    status: "open",
  },
  {
    title: "Voice of the Township",
    prize: "Guest presenter slot + R2,000",
    deadline: "Closes 30 September 2026",
    desc: "Think you have what it takes to be on radio? Submit a 60-second voice clip and you could co-host Youth Hustle Hour for a day.",
    status: "closing",
  },
];

// ── FREQUENCY / COVERAGE (NEW, inspired by SA FM frequency finder) ─
export const COVERAGE_AREAS = [
  { town: "Klerksdorp", strength: 100, note: "Studio location" },
  { town: "Matlosana", strength: 95, note: "Strong signal" },
  { town: "Stilfontein", strength: 88, note: "Strong signal" },
  { town: "Orkney", strength: 82, note: "Strong signal" },
  { town: "Hartebeesfontein", strength: 78, note: "Good signal" },
  { town: "Ventersdorp", strength: 70, note: "Good signal" },
  { town: "Dr Kenneth Kaunda District", strength: 75, note: "Regional coverage" },
];

// ── CONTACT REASONS ───────────────────────────────────────────────
export const CONTACT_REASONS = [
  "Listener",
  "Potential Funder",
  "Sponsor / Advertiser",
  "Community Partner",
  "Show Presenter",
  "Submit Music",
  "Government / NGO",
] as const;
