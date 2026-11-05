# Star FM 102.9 — Production Deployment Guide

This guide covers deploying the Star FM website to Vercel and connecting it to the Google Sheet backend.

---

## Prerequisites

- A Vercel account (free at [vercel.com](https://vercel.com))
- The Google Sheet set up (see `/apps-script/SETUP.md`)
- The Apps Script Web App URL (looks like `https://script.google.com/macros/s/AKfycb.../exec`)

---

## Step 1 — Push to GitHub

The code is already in `/home/z/my-project`. To deploy to Vercel:

1. Initialize a git repo (if not already):
   ```bash
   cd /home/z/my-project
   git init
   git add .
   git commit -m "Star FM 102.9 — production build with live studio operations"
   ```

2. Create a GitHub repo and push:
   ```bash
   # Create a new repo on GitHub first (don't add README/license)
   git remote add origin https://github.com/JacobSeatlholo/starfm.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2 — Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo (`JacobSeatlholo/starfm`)
3. Vercel auto-detects Next.js — keep the default settings:
   - Framework Preset: Next.js
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
4. **Before clicking Deploy**, add the environment variable:
   - Key: `NEXT_PUBLIC_APPS_SCRIPT_URL`
   - Value: `https://script.google.com/macros/s/AKfycb.../exec` (your web app URL)
5. Click **Deploy**
6. Wait ~2 minutes for the build to complete
7. You'll get a URL like `starfm-xxx.vercel.app`

---

## Step 3 — Add your custom domain

1. In Vercel, go to your project → **Settings → Domains**
2. Add your domain (e.g., `starfmradio.co.za` or `starfm.co.za`)
3. Vercel gives you DNS records to add at your domain registrar
4. Once DNS propagates (usually 1-24 hours), HTTPS is automatic

---

## Step 4 — Verify everything works

Visit your deployed site and check:

- [ ] Hero loads with logo and stream player
- [ ] **StudioPulse** shows "On Air" with the current show (auto-computed from sheet)
- [ ] **Top 10 Voting** shows real vote counts from the sheet
- [ ] **Live Request Form** — submit a test request, then check the Google Sheet → it should appear in the Requests tab within seconds
- [ ] **Live Request Feed** — your test request appears in the public feed
- [ ] **Contact Form** — submit a test message, check the Leads tab in the sheet
- [ ] **Schedule** — shows the weekly grid from the sheet
- [ ] Mobile view — hamburger menu works, layout is responsive

If any of these show "Demo Mode" badges, the `NEXT_PUBLIC_APPS_SCRIPT_URL` env var is missing or wrong.

---

## Step 5 — Studio operations (for the presenter)

1. The presenter opens the Google Sheet on a tablet (native Google Sheets app or browser)
2. Opens the **Requests** tab
3. When a listener submits a request on the website, a new row appears at the bottom within seconds
4. Presenter uses the **🎙️ Studio** menu (top of the sheet) to:
   - ✅ Mark as Played
   - 📋 Mark as Queued
   - ⏭️ Mark as Skipped
5. The website's public feed updates to show the status on next refresh (30 seconds)

**Tip:** Pin the Requests tab on the tablet by starring it (⭐) in the Google Sheets app.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | Yes (for live data) | Google Apps Script Web App URL |
| `DATABASE_URL` | No | Only needed if using Prisma (not required for this build) |

If `NEXT_PUBLIC_APPS_SCRIPT_URL` is not set, the site runs in **demo mode** — all sections render with realistic seed data, but no data is written to or read from the sheet.

---

## Updating content (no redeploy needed)

| What to change | Where | How |
|---|---|---|
| Show schedule | Google Sheet → Schedule tab | Edit cells directly |
| Presenter profiles | Google Sheet → Presenters tab | Edit cells directly |
| Top 10 songs | Google Sheet → Top10 tab | Edit song names/artists |
| Now playing track | Google Sheet → NowPlaying tab | Add a row with track details |
| News articles | Code (`src/lib/starfm-data.ts`) | Edit and redeploy |
| Competitions | Code (`src/lib/starfm-data.ts`) | Edit and redeploy |

Schedule, presenters, Top 10, requests, and leads are all editable in the sheet — no redeploy needed. News and competitions are currently in code (could be moved to the sheet later if desired).

---

## Troubleshooting

### "Demo Mode" badges still showing
- Check the `NEXT_PUBLIC_APPS_SCRIPT_URL` env var is set in Vercel
- Redeploy after adding the env var (Vercel → Settings → Environment Variables → add → Redeploy)
- Verify the URL works: open it in a browser with `?action=ping` — should return JSON

### Stream player shows "Connecting..." forever
- The Famcast iframe may be blocked or slow
- The fallback "Tap to listen live →" button appears after 5 seconds
- This opens the stream in a new tab as a backup

### Requests not appearing in the sheet
- Make sure the Apps Script is deployed as "Anyone" access (not "Only myself")
- Check the Apps Script execution log: Apps Script editor → Executions tab
- Verify the sheet has the Requests tab (run `setup()` if not)

### Top 10 votes not counting
- Check the song name in the vote request matches the sheet (case-insensitive)
- The script only allows voting for songs already in the Top10 tab

### Weekly reset didn't happen
- Check the script timezone: Apps Script editor → Settings → Project timezone → set to `Africa/Johannesburg`
- Check the trigger exists: Apps Script editor → Triggers tab (⏰ icon)

---

## Performance notes

- The site polls the Apps Script every 30-60 seconds for live data
- Apps Script web apps have a quota: ~20,000 calls/day for free accounts — plenty for a radio station
- Google Sheets auto-refreshes every ~5 minutes in the native app, or every 60 seconds if you manually refresh
- For faster studio updates, the presenter can refresh the sheet manually (pull down on mobile)

---

## Security checklist for production

- [ ] Contact form has honeypot field (✅ already implemented)
- [ ] No sensitive data in client-side env vars (only `NEXT_PUBLIC_*` values are exposed)
- [ ] Google Sheet access is limited to station staff (share with specific emails, not "anyone with link")
- [ ] Apps Script web app is "Anyone" access (required for the site to call it — this is read/write to the sheet only, not the sheet itself)
- [ ] POPIA: add a privacy policy page (the contact form collects name + email)
- [ ] Cookie/banner: not needed — no tracking cookies are set

---

## What's next (future enhancements)

These are not required for launch but worth planning:

1. **PWA / offline support** — installable app, cached schedule for load-shedding
2. **WhatsApp Business integration** — listeners message the studio directly
3. **Studio webcam** — live video feed from the studio
4. **News CMS** — move news articles to the Google Sheet for non-technical editing
5. **Analytics** — privacy-friendly tracking (Plausible/Fathom)
6. **Sponsor/ad management** — configurable banner slots per show
