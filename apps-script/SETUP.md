# Star FM 102.9 — Studio Operations Setup Guide

This guide shows you how to connect the Star FM website to a Google Sheet so that:
- Listener song requests appear live on a tablet in the studio
- The Top 10 chart updates automatically as people vote
- The schedule is editable without redeploying the site
- Contact form submissions become leads in a sheet

**Total setup time: ~20 minutes. Cost: Free.**

---

## Step 1 — Create the Google Sheet

1. Go to [sheets.new](https://sheets.new) (creates a new Google Sheet instantly)
2. Rename it to **"Star FM Operations"** (top-left corner)
3. Leave it empty — the setup script will create all tabs automatically

---

## Step 2 — Add the Apps Script

1. In your new sheet, click **Extensions → Apps Script** (top menu)
2. A new tab opens with the Apps Script editor
3. **Delete everything** in the default `Code.gs` file
4. Open the file `/apps-script/Code.gs` from this repo
5. **Copy the entire contents** and paste it into the Apps Script editor
6. Click the **Save** icon (💾) or press `Ctrl+S`
7. Name the project "Star FM Backend"

---

## Step 3 — Run setup() (creates all tabs + seed data)

1. In the Apps Script editor, find the function dropdown (top toolbar, says `doGet` by default)
2. Change it to **`setup`**
3. Click **▶ Run** (the play button)
4. **Authorise the script** when prompted:
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Star FM Backend (unsafe)" ← this is normal for first run
   - Click "Allow"
5. Check the **Execution log** at the bottom — you should see:
   ```
   ✓ Setup complete. All tabs created with seed data.
   ✓ Weekly Monday 00:00 trigger created for Top 10 reset
   ```
6. Close the Apps Script tab and return to your Google Sheet — you'll now see 7 tabs:
   - **Schedule** — weekly show line-up (editable)
   - **Requests** — live listener requests (auto-populated)
   - **Top10** — song voting chart
   - **Leads** — contact form submissions
   - **Presenters** — DJ profiles (editable)
   - **NowPlaying** — current track (presenter updates)
   - **Stats** — lifetime counters

---

## Step 4 — Deploy as a Web App

1. In the Apps Script editor, click **Deploy → New deployment** (top-right)
2. Click the **gear icon ⚙️** next to "Select type" → choose **Web app**
3. Fill in:
   - **Description**: `Star FM Backend v1`
   - **Execute as**: **Me (your-email@gmail.com)**
   - **Who has access**: **Anyone** ← important, otherwise the website can't call it
4. Click **Deploy**
5. **Authorise access** again if prompted
6. **Copy the Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. Save this URL — you'll need it in Step 6

---

## Step 5 — Test the API (optional, but recommended)

Open your web app URL in a browser with `?action=ping` appended:
```
https://script.google.com/macros/s/AKfycb.../exec?action=ping
```

You should see JSON like:
```json
{"ok":true,"time":"2026-01-15T10:30:00.000Z","version":"1.0.0"}
```

Try these too:
- `?action=now-playing` — current show + presenter
- `?action=top10` — Top 10 chart with vote counts
- `?action=recent-requests&limit=5` — last 5 listener requests
- `?action=schedule` — full weekly grid
- `?action=presenters` — presenter profiles
- `?action=stats` — live counters

---

## Step 6 — Connect the website

1. Open the Star FM Next.js project
2. Create a file called `.env.local` in the project root:
   ```bash
   NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. Replace the URL with your actual web app URL from Step 4
4. Restart the dev server (`bun run dev`)
5. Visit the site — you should now see:
   - Live "Now On Air" badge (auto-computed from schedule)
   - Top 10 chart with real vote counts
   - Live request feed (recent submissions from the sheet)
   - Working request form (submissions appear in the sheet within seconds)
   - Working contact form (submissions become leads)
   - Working vote buttons (one vote per browser session)

---

## Step 7 — Studio operations (the magic part)

This is where it gets fun. In the studio:

1. **Presenter opens the Google Sheet** on a tablet (use the native Google Sheets app, or sheets.google.com in a browser)
2. Open the **Requests** tab
3. When a listener submits a song request on the website, a new row appears at the bottom of the sheet **within seconds** (Google Sheets auto-refreshes)
4. The presenter uses the custom **🎙️ Studio** menu (top of the sheet) to mark requests as:
   - **✅ Mark as Played** — select a row, click this, status becomes "played" + timestamp
   - **📋 Mark as Queued** — mark as next up
   - **⏭️ Mark as Skipped** — skip this request
5. When a request is marked "played", the website's public request feed updates to show it (next refresh, within 30s)

### Updating the schedule
- Edit the **Schedule** tab directly — change show names, times, presenters
- The website fetches the latest schedule on every page load
- No redeploy needed — changes appear immediately

### Updating presenter profiles
- Edit the **Presenters** tab — change bios, add photo URLs, update tags (semicolon-separated)
- The website reflects changes on next load

### Top 10 management
- Songs are seeded with 10 entries; edit them to match your station's rotation
- Every Monday at 00:00, the script **archives last week's chart** and resets all votes to 0
- The archive appears as a new tab called `Top10_Archive_2026_01_15` etc.
- Add new songs anytime by appending rows to the Top10 tab

### Now Playing (manual track updates)
- The presenter can update the "Now Playing" track by typing in the **NowPlaying** tab
- Or, if you build a studio dashboard later, it can POST to `?action=now-playing` with the track details
- The track shows on the website for 10 hours after the last update (so presenters don't need to update every song)

---

## How the data flows

```
┌─────────────────────────────────────────────────────────────┐
│  LISTENER (browser)                                          │
│  - Submits song request form                                 │
│  - Votes for Top 10 song                                     │
│  - Sends contact message                                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS POST
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE APPS SCRIPT (web app)                               │
│  - Validates input                                          │
│  - Writes row to appropriate sheet tab                      │
│  - Returns JSON confirmation                                 │
└──────────────────────────┬──────────────────────────────────┘
                           │ appendRow()
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE SHEET ("Star FM Operations")                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │ Requests │ │  Top10   │ │  Leads   │ │Schedule  │         │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘         │
│       ▲                                                       │
│       │ Real-time auto-refresh                               │
└───────┼─────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│  PRESENTER TABLET (Google Sheets app)                        │
│  - Sees new requests appear live                             │
│  - Uses 🎙️ Studio menu to mark as played/queued/skipped     │
│  - Studio → sheet → website feedback loop                    │
└─────────────────────────────────────────────────────────────┘
```

The website also polls the Apps Script every 30-60 seconds for:
- Current "Now On Air" show (auto-computed from schedule + server time)
- Recent requests (public feed)
- Top 10 vote counts (live updates)

---

## Troubleshooting

**"The script doesn't have permission to..."**
→ Re-run `setup()` and re-authorise. Apps Script sometimes loses permissions.

**Website shows "Demo mode" instead of live data**
→ The `NEXT_PUBLIC_APPS_SCRIPT_URL` env var isn't set, or the URL is wrong.
→ Check: open the URL in a browser with `?action=ping` — you should get JSON back.

**Requests aren't appearing in the sheet**
→ Make sure you deployed as "Anyone" access, not "Only myself"
→ Check the Apps Script execution log (Apps Script editor → Executions tab on the left)

**The stream player iframe is blank**
→ This is unrelated to the Apps Script — it's the Famcast embed. See the separate stream player fix.

**Top 10 votes aren't incrementing**
→ Check that the song name in the vote request matches the sheet exactly (case-insensitive)
→ The script only allows voting for songs already in the Top 10 tab

**Weekly reset didn't happen**
→ The Monday 00:00 trigger runs on the script's timezone. Check:
   - Apps Script editor → Settings (⚙️) → "Project timezone" → set to "Africa/Johannesburg"
   - Triggers tab (⏰ icon on left) → verify the weekly trigger exists

---

## Security notes

- The web app URL is **public** (anyone can call it). This is necessary for the website to work.
- **No authentication** is required to submit requests/votes/leads — by design, for low-friction listener engagement.
- **Rate limiting**: not enforced server-side. If spam becomes a problem, options are:
  - Add a honeypot field (already in the contact form)
  - Switch to "Execute as: User accessing the web app" (requires Google sign-in — higher friction)
  - Add a simple captcha
- **Data sensitivity**: the sheet stores requester names (optional) and email addresses (contact form only). Treat the sheet as containing personal data under POPIA. Share access only with station staff.
- **Backups**: Google Sheets auto-version. For extra safety, set up a weekly export trigger.

---

## What you can edit in the sheet (no redeploy)

| Tab | What to edit | Effect on website |
|---|---|---|
| **Schedule** | Show names, times, presenters, days | Live "Now On Air" + schedule grid updates |
| **Presenters** | Bios, photos, tags | Presenter cards update on next page load |
| **Top10** | Add/remove songs, edit names | Voting widget reflects changes |
| **Requests** | Manually add requests, change status | Public feed + queue position update |
| **Leads** | Status (new/contacted/closed) | Internal CRM view |
| **NowPlaying** | Current track name + artist | "Now Playing" widget on site updates |
| **Stats** | (Auto-managed) | Counters on the homepage |

---

That's it. Once set up, the website and the studio are connected — listeners' requests appear live in the studio, votes update the chart in real-time, and station staff can update the schedule and presenter profiles without touching code.

Welcome to 2026 community radio. 🎙️
