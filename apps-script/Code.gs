/**
 * ════════════════════════════════════════════════════════════════════
 * STAR FM 102.9 — STUDIO OPERATIONS BACKEND
 * Google Apps Script Web App
 * ════════════════════════════════════════════════════════════════════
 *
 * This script turns a Google Sheet into a real-time backend for the
 * Star FM website. Listeners submit song requests, votes, and contact
 * leads through the website → this script writes them to the sheet →
 * the presenter sees them appear live on a tablet in the studio.
 *
 * SETUP:
 *   1. Create a new Google Sheet named "Star FM Operations"
 *   2. Extensions → Apps Script → paste this entire file
 *   3. Run `setup()` once (creates all tabs + seed data)
 *   4. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 *   5. Copy the deployment URL → add to website as NEXT_PUBLIC_APPS_SCRIPT_URL
 *
 * ENDPOINTS (all via the single web app URL):
 *   GET  ?action=schedule         → weekly schedule JSON
 *   GET  ?action=now-playing      → current show + presenter (auto-computed)
 *   GET  ?action=top10            → Top 10 songs with vote counts
 *   GET  ?action=recent-requests  → last N requests (public feed)
 *   GET  ?action=presenters       → presenter profiles
 *   GET  ?action=stats            → live studio stats (request count, etc.)
 *   POST ?action=request          → submit a song/topic request
 *   POST ?action=vote             → vote for a Top 10 song
 *   POST ?action=contact          → submit contact form (lead)
 *   POST ?action=now-playing      → presenter sets current track (studio only)
 *
 * ════════════════════════════════════════════════════════════════════
 */

// ── Sheet tab names ──────────────────────────────────────────────────
const TABS = {
  SCHEDULE: 'Schedule',
  REQUESTS: 'Requests',
  TOP10: 'Top10',
  LEADS: 'Leads',
  PRESENTERS: 'Presenters',
  NOW_PLAYING: 'NowPlaying',
  STATS: 'Stats',
};

// ── CORS + JSON response helper ──────────────────────────────────────
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function corsWrap() {
  // Apps Script doesn't allow setting CORS headers directly,
  // but the web app endpoint is inherently CORS-accessible.
  // We add a cache-busting header via the response meta.
}

// ════════════════════════════════════════════════════════════════════
// SETUP — run this ONCE to initialise the sheet structure
// ════════════════════════════════════════════════════════════════════
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ── Schedule tab ──────────────────────────────────────────────────
  const sched = getOrCreateSheet(ss, TABS.SCHEDULE);
  sched.getRange(1, 1, 1, 8).setValues([[
    'day', 'startTime', 'endTime', 'showName', 'presenter', 'genre', 'language', 'notes'
  ]]);
  sched.getRange(2, 1, 7, 8).setValues([
    ['Monday',    '06:00', '09:00', 'Morning Drive',          'Jacob Seatlholo', 'Talk',      'EN/TN', 'News, traffic, school updates'],
    ['Monday',    '09:00', '12:00', 'Tech Talk',               'Thabo Mokoena',   'Tech',      'EN',     'Digital tips, app guides'],
    ['Monday',    '12:00', '15:00', 'Lunch With The Nation',   'Lerato Dube',     'News',      'EN/TN/ST','Community voices, interviews'],
    ['Monday',    '15:00', '18:00', 'Youth Hustle Hour',       'Sipho Nkosi',     'Business',  'EN',     'Bursaries, tenders, hustle'],
    ['Monday',    '18:00', '20:00', 'Digital Futures',         'Naledi Sithole',  'AI/Tech',   'EN',     'AI literacy, future of work'],
    ['Monday',    '20:00', '23:00', 'AfroBeats & Chill',       'Kabelo Modise',   'Music',     'Music',  'Amapiano, AfroBeats, soul'],
    ['Tuesday',   '06:00', '09:00', 'Morning Drive',           'Jacob Seatlholo', 'Talk',      'EN/TN', ''],
  ]);
  // Duplicate Monday-Friday pattern for Tue-Fri
  const days = ['Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const baseShows = [
    ['06:00', '09:00', 'Morning Drive',          'Jacob Seatlholo', 'Talk',      'EN/TN', ''],
    ['09:00', '12:00', 'Tech Talk',               'Thabo Mokoena',   'Tech',      'EN',     ''],
    ['12:00', '15:00', 'Lunch With The Nation',   'Lerato Dube',     'News',      'EN/TN/ST',''],
    ['15:00', '18:00', 'Youth Hustle Hour',       'Sipho Nkosi',     'Business',  'EN',     ''],
    ['18:00', '20:00', 'Digital Futures',         'Naledi Sithole',  'AI/Tech',   'EN',     ''],
    ['20:00', '23:00', 'AfroBeats & Chill',       'Kabelo Modise',   'Music',     'Music',  ''],
  ];
  let row = 9; // after Monday's 7 rows (header + 6) + Tuesday Morning Drive
  days.forEach(day => {
    // Skip Tuesday Morning Drive since we added it above
    const shows = day === 'Tuesday' ? baseShows.slice(1) : baseShows;
    shows.forEach(show => {
      sched.getRange(row, 1, 1, 8).setValues([[day, ...show]]);
      row++;
    });
  });
  // Saturday
  const satShows = [
    ['Saturday', '07:00', '10:00', 'Weekend Breakfast',    'Jacob Seatlholo', 'Talk',    'EN/TN', ''],
    ['Saturday', '10:00', '13:00', 'Community Voices',     'Lerato Dube',     'Talk',    'EN/TN/ST','Outside broadcast'],
    ['Saturday', '13:00', '16:00', 'Saturday Sports Desk', 'Sipho Nkosi',     'Sports',  'EN',    'Local + PSL'],
    ['Saturday', '16:00', '19:00', 'The Hive — Youth Show','Naledi Sithole',  'Youth',   'EN',    ''],
    ['Saturday', '19:00', '23:00', 'Saturday Night Mix',   'Kabelo Modise',   'Music',   'Music', ''],
  ];
  satShows.forEach(show => {
    sched.getRange(row, 1, 1, 8).setValues([show]);
    row++;
  });
  // Sunday
  const sunShows = [
    ['Sunday', '07:00', '10:00', 'Sunday Gospel',         'Lerato Dube',     'Gospel',  'EN/TN/ST',''],
    ['Sunday', '10:00', '13:00', 'The Sunday Reflection', 'Jacob Seatlholo', 'Talk',    'EN/TN', ''],
    ['Sunday', '13:00', '16:00', 'Classic AfroBeats',     'Kabelo Modise',   'Music',   'Music', ''],
    ['Sunday', '16:00', '19:00', 'Community Requests',    'Thabo Mokoena',   'Music',   'EN/TN/ST','Listener requests'],
    ['Sunday', '19:00', '23:00', 'Wind-Down Sundays',     'Naledi Sithole',  'Music',   'Music', ''],
  ];
  sunShows.forEach(show => {
    sched.getRange(row, 1, 1, 8).setValues([show]);
    row++;
  });
  sched.setFrozenRows(1);
  sched.autoResizeColumns(1, 8);

  // ── Requests tab ─────────────────────────────────────────────────
  const req = getOrCreateSheet(ss, TABS.REQUESTS);
  req.getRange(1, 1, 1, 8).setValues([[
    'timestamp', 'type', 'songName', 'artist', 'requesterName', 'message', 'status', 'playedAt'
  ]]);
  // Seed a few demo requests
  req.getRange(2, 1, 5, 8).setValues([
    [new Date(Date.now() - 5*60*1000), 'song', 'Sofa Silahlane', 'DJy Zan SA', 'Thabo from Klerksdorp', 'Big up to my girl Lerato!', 'played', new Date(Date.now() - 2*60*1000)],
    [new Date(Date.now() - 12*60*1000), 'song', 'Paris',         'Mondo Ghana', 'Naledi',                'Please play Paris for the morning crew', 'queued', ''],
    [new Date(Date.now() - 18*60*1000), 'topic', '',             '',            'Anonymous',            'Can we discuss load-shedding schedules?', 'new', ''],
    [new Date(Date.now() - 25*60*1000), 'song', 'Tanzania',      'Uncle Waffles','Sipho from Matlosana', 'Birthday shoutout to my sister Palesa!', 'played', new Date(Date.now() - 20*60*1000)],
    [new Date(Date.now() - 35*60*1000), 'song', 'Wadibusa',      'Uncle Waffles','Lerato',               '', 'played', new Date(Date.now() - 30*60*1000)],
  ]);
  req.setFrozenRows(1);
  req.autoResizeColumns(1, 8);

  // ── Top10 tab ────────────────────────────────────────────────────
  const top = getOrCreateSheet(ss, TABS.TOP10);
  top.getRange(1, 1, 1, 6).setValues([[
    'rank', 'songName', 'artist', 'votes', 'lastVotedAt', 'weekOf'
  ]]);
  top.getRange(2, 1, 10, 6).setValues([
    [1, 'Wadibusa',        'Uncle Waffles', 47, new Date(Date.now() - 3600000), getWeekOf()],
    [2, 'Tanzania',        'Uncle Waffles', 39, new Date(Date.now() - 7200000), getWeekOf()],
    [3, 'Sofa Silahlane',  'DJy Zan SA',    31, new Date(Date.now() - 5400000), getWeekOf()],
    [4, 'Paris',           'Mondo Ghana',   28, new Date(Date.now() - 9000000), getWeekOf()],
    [5, 'Yahyuppiyah',     'Tyla',          24, new Date(Date.now() - 10800000), getWeekOf()],
    [6, 'Mnike',           'Tony Duardo',   21, new Date(Date.now() - 14400000), getWeekOf()],
    [7, 'Water',           'Tyla',          19, new Date(Date.now() - 18000000), getWeekOf()],
    [8, 'Kwenzekile',      'Sofa Silahlane',16, new Date(Date.now() - 21600000), getWeekOf()],
    [9, 'Saka',            'Sofa Silahlane',14, new Date(Date.now() - 25200000), getWeekOf()],
    [10,'Asambe',          'Sofa Silahlane',11, new Date(Date.now() - 28800000), getWeekOf()],
  ]);
  top.setFrozenRows(1);
  top.autoResizeColumns(1, 6);

  // ── Leads tab (contact form submissions) ─────────────────────────
  const leads = getOrCreateSheet(ss, TABS.LEADS);
  leads.getRange(1, 1, 1, 7).setValues([[
    'timestamp', 'name', 'email', 'type', 'message', 'status', 'source'
  ]]);
  leads.setFrozenRows(1);
  leads.autoResizeColumns(1, 7);

  // ── Presenters tab ──────────────────────────────────────────────
  const pres = getOrCreateSheet(ss, TABS.PRESENTERS);
  pres.getRange(1, 1, 1, 7).setValues([[
    'name', 'show', 'time', 'bio', 'initials', 'tags', 'photoUrl'
  ]]);
  pres.getRange(2, 1, 6, 7).setValues([
    ['Jacob Seatlholo', 'Morning Drive',        'Mon–Fri · 06:00', 'Founder and lead voice of Star FM 102.9. Jacob wakes up Klerksdorp every morning with the stories, music, and energy the community needs. Digital literacy advocate.', 'JS', 'Founder;Morning Drive;Digital Literacy', ''],
    ['Thabo Mokoena',   'Tech Talk',             'Mon–Fri · 09:00', 'Our resident tech translator. Thabo breaks down apps, tools, and trends reshaping daily life in South Africa.', 'TM', 'Technology;Digital Skills;AI', ''],
    ['Lerato Dube',     'Lunch With The Nation', 'Mon–Fri · 12:00', 'News anchor and community interviewer. Lerato brings the voices of Klerksdorp, Matlosana, and the Southern District to the airwaves.', 'LD', 'News;Interviews;Community', ''],
    ['Sipho Nkosi',     'Youth Hustle Hour',     'Mon–Fri · 15:00', 'Entrepreneur, mentor, and voice of the next generation. Covers bursaries, tenders, side hustles, and the mindset young South Africans need.', 'SN', 'Youth;Business;Entrepreneurship', ''],
    ['Naledi Sithole',  'Digital Futures',       'Mon–Fri · 18:00', 'AI educator and digital futurist. Runs Star FM\'s flagship Digital Literacy Initiative.', 'NS', 'AI;Education;Future of Work', ''],
    ['Kabelo Modise',   'AfroBeats & Chill',     'Mon–Fri · 20:00', 'DJ and cultural curator. Spins Amapiano, AfroBeats, soul, and classic tracks that soundtrack the township\'s evenings.', 'KM', 'Music;Culture;DJ', ''],
  ]);
  pres.setFrozenRows(1);
  pres.autoResizeColumns(1, 7);

  // ── NowPlaying tab (presenter-controlled current track) ─────────
  const np = getOrCreateSheet(ss, TABS.NOW_PLAYING);
  np.getRange(1, 1, 1, 6).setValues([[
    'timestamp', 'trackName', 'artist', 'presenter', 'show', 'duration'
  ]]);
  np.getRange(2, 1, 1, 6).setValues([[
    new Date(), 'Wadibusa', 'Uncle Waffles', 'Kabelo Modise', 'AfroBeats & Chill', '3:42'
  ]]);
  np.setFrozenRows(1);

  // ── Stats tab (counters) ─────────────────────────────────────────
  const stats = getOrCreateSheet(ss, TABS.STATS);
  stats.getRange(1, 1, 1, 4).setValues([[
    'key', 'value', 'updatedAt', 'note'
  ]]);
  stats.getRange(2, 1, 4, 4).setValues([
    ['totalRequests',   47,  new Date(), 'Lifetime song/topic requests'],
    ['totalVotes',      250,  new Date(), 'Lifetime Top 10 votes'],
    ['totalLeads',       12,  new Date(), 'Lifetime contact form leads'],
    ['weeklyResetAt',    '',  getNextMonday(), 'Top 10 auto-resets every Monday 00:00'],
  ]);
  stats.setFrozenRows(1);

  // Format only the date/timestamp columns (col 1 in most tabs, col 5 in Top10)
  // IMPORTANT: do NOT apply date format to numeric columns (votes) or text columns (startTime, endTime)
  const dateFormats = {
    [TABS.REQUESTS]:   [1, 8],          // timestamp (col 1), playedAt (col 8)
    [TABS.TOP10]:      [5],              // lastVotedAt (col 5) — votes is col 4, keep as number!
    [TABS.NOW_PLAYING]: [1],             // timestamp (col 1)
    [TABS.STATS]:      [3],              // updatedAt (col 3)
    [TABS.LEADS]:      [1],              // timestamp (col 1)
  };
  Object.entries(dateFormats).forEach(([tab, cols]) => {
    const sheet = ss.getSheetByName(tab);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        cols.forEach(col => {
          sheet.getRange(2, col, lastRow - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
        });
      }
    }
  });

  // Ensure votes column (Top10 col 4) is formatted as number, not date
  const top10Sheet = ss.getSheetByName(TABS.TOP10);
  if (top10Sheet && top10Sheet.getLastRow() > 1) {
    top10Sheet.getRange(2, 4, top10Sheet.getLastRow() - 1, 1).setNumberFormat('0');
  }
  // Ensure schedule times are plain text (not dates)
  const schedSheet = ss.getSheetByName(TABS.SCHEDULE);
  if (schedSheet && schedSheet.getLastRow() > 1) {
    schedSheet.getRange(2, 2, schedSheet.getLastRow() - 1, 2).setNumberFormat('@'); // startTime, endTime as text
  }
  // Ensure Stats values are numbers
  const statsSheet = ss.getSheetByName(TABS.STATS);
  if (statsSheet && statsSheet.getLastRow() > 1) {
    statsSheet.getRange(2, 2, statsSheet.getLastRow() - 1, 1).setNumberFormat('0');
  }

  // Set up weekly trigger for Top 10 reset
  const triggers = ScriptApp.getProjectTriggers();
  const hasWeeklyReset = triggers.some(t => t.getHandlerFunction() === 'resetTop10Weekly');
  if (!hasWeeklyReset) {
    ScriptApp.newTrigger('resetTop10Weekly')
      .timeBased()
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(0)
      .create();
    Logger.log('✓ Weekly Monday 00:00 trigger created for Top 10 reset');
  }

  Logger.log('✓ Setup complete. All tabs created with seed data.');
  Logger.log('Now: Deploy → New deployment → Web app → Anyone can access');
}

function getOrCreateSheet(ss, name) {
  let s = ss.getSheetByName(name);
  if (!s) s = ss.insertSheet(name);
  return s;
}

function getWeekOf() {
  const d = new Date();
  const day = d.getDay() || 7; // Sunday = 7
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 1);
  return Utilities.formatDate(monday, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function getNextMonday() {
  const d = new Date();
  const day = d.getDay() || 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - day + 8); // next Monday
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// ════════════════════════════════════════════════════════════════════
// WEEKLY TRIGGER — resets Top 10 every Monday 00:00
// ════════════════════════════════════════════════════════════════════
function resetTop10Weekly() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const top = ss.getSheetByName(TABS.TOP10);
  if (!top) return;
  const lastRow = top.getLastRow();
  if (lastRow < 2) return;
  // Archive last week's results into a new sheet
  const archiveName = 'Top10_Archive_' + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy_MM_dd');
  const archive = ss.insertSheet(archiveName);
  top.getRange(1, 1, lastRow, top.getLastColumn()).copyTo(archive.getRange(1, 1));
  // Reset votes to 0, keep song list
  top.getRange(2, 4, lastRow - 1, 1).setValue(0); // votes = 0
  top.getRange(2, 5, lastRow - 1, 1).setValue(''); // lastVotedAt = ''
  top.getRange(2, 6, lastRow - 1, 1).setValue(getWeekOf()); // weekOf = this week
  Logger.log('✓ Top 10 reset for new week. Archived to ' + archiveName);
}

// ════════════════════════════════════════════════════════════════════
// GET HANDLER — read endpoints
// ════════════════════════════════════════════════════════════════════
function doGet(e) {
  const action = (e.parameter.action || '').toLowerCase();
  try {
    switch (action) {
      case 'schedule':        return json(getSchedule());
      case 'now-playing':     return json(getNowPlaying());
      case 'top10':            return json(getTop10());
      case 'recent-requests': return json(getRecentRequests(e.parameter.limit || 10));
      case 'presenters':       return json(getPresenters());
      case 'stats':            return json(getStats());
      case 'ping':             return json({ ok: true, time: new Date(), version: '1.0.0' });
      default:                 return json({ error: 'Unknown action: ' + action });
    }
  } catch (err) {
    Logger.log('GET error: ' + err);
    return json({ error: err.toString() });
  }
}

// ════════════════════════════════════════════════════════════════════
// POST HANDLER — write endpoints
// ════════════════════════════════════════════════════════════════════
function doPost(e) {
  const action = (e.parameter.action || '').toLowerCase();
  let body = {};
  try { body = JSON.parse(e.postData.contents || '{}'); } catch (err) { body = {}; }
  try {
    switch (action) {
      case 'request':      return json(submitRequest(body));
      case 'vote':         return json(submitVote(body));
      case 'contact':      return json(submitLead(body));
      case 'now-playing':  return json(setNowPlaying(body));
      default:             return json({ error: 'Unknown action: ' + action });
    }
  } catch (err) {
    Logger.log('POST error: ' + err);
    return json({ error: err.toString() });
  }
}

// ════════════════════════════════════════════════════════════════════
// READ: Schedule (weekly grid)
// ════════════════════════════════════════════════════════════════════
function getSchedule() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.SCHEDULE);
  if (!sheet) return { schedule: [], error: 'Schedule tab not found. Run setup() first.' };
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = r[i];
      // Convert dates to strings, keep times as plain strings
      if (val instanceof Date) {
        val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'HH:mm');
      }
      obj[h] = val;
    });
    return obj;
  });
  // Group by day
  const byDay = {};
  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].forEach(d => byDay[d] = []);
  rows.forEach(r => { if (byDay[r.day]) byDay[r.day].push(r); });
  return { schedule: byDay, updatedAt: new Date() };
}

// ════════════════════════════════════════════════════════════════════
// READ: Now Playing (auto-computed current show + last set track)
// ════════════════════════════════════════════════════════════════════
function getNowPlaying() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tz = Session.getScriptTimeZone();

  // 1. Compute current show from schedule
  const now = new Date();
  const dayName = Utilities.formatDate(now, tz, 'EEEE'); // "Monday"
  const hhmm = Utilities.formatDate(now, tz, 'HH:mm');    // "14:30"

  const sheet = ss.getSheetByName(TABS.SCHEDULE);
  let currentShow = null, nextShow = null;
  if (sheet) {
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const dayIdx = headers.indexOf('day');
    const startIdx = headers.indexOf('startTime');
    const endIdx = headers.indexOf('endTime');
    const rows = data.slice(1).filter(r => r[dayIdx] === dayName);
    // Helper to convert a cell value to a time string "HH:mm"
    function toTimeStr(v) {
      if (v instanceof Date) return Utilities.formatDate(v, tz, 'HH:mm');
      return String(v);
    }
    // Sort by start time
    rows.sort((a, b) => toTimeStr(a[startIdx]).localeCompare(toTimeStr(b[startIdx])));
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const obj = {};
      headers.forEach((h, j) => {
        let val = r[j];
        // Convert times to "HH:mm" strings
        if (h === 'startTime' || h === 'endTime') {
          val = toTimeStr(val);
        }
        obj[h] = val;
      });
      if (String(obj.startTime) <= hhmm && String(obj.endTime) > hhmm) {
        currentShow = obj;
        if (rows[i + 1]) {
          nextShow = {};
          headers.forEach((h, j) => {
            let val = rows[i + 1][j];
            if (h === 'startTime' || h === 'endTime') val = toTimeStr(val);
            nextShow[h] = val;
          });
        }
        break;
      }
      if (String(obj.startTime) > hhmm && !nextShow) {
        nextShow = obj;
      }
    }
  }

  // 2. Get last manually-set track from NowPlaying tab
  let track = null;
  const npSheet = ss.getSheetByName(TABS.NOW_PLAYING);
  if (npSheet && npSheet.getLastRow() > 1) {
    const lastRow = npSheet.getRange(npSheet.getLastRow(), 1, 1, npSheet.getLastColumn()).getValues()[0];
    const trackTime = new Date(lastRow[0]);
    const ageMin = (now - trackTime) / 60000;
    if (ageMin < 600) { // 10 hours
      // Duration might be a date if sheet auto-formatted it
      let duration = lastRow[5];
      if (duration instanceof Date) {
        duration = Utilities.formatDate(duration, tz, 'm:ss');
      }
      track = {
        trackName: lastRow[1],
        artist: lastRow[2],
        presenter: lastRow[3],
        show: lastRow[4],
        duration: String(duration),
        setAt: trackTime.toISOString(),
      };
    }
  }

  return {
    currentShow,
    nextShow,
    track,
    serverTime: now.toISOString(),
    day: dayName,
    time: hhmm,
  };
}

function rowToObj(headers, row) {
  const obj = {};
  headers.forEach((h, i) => { obj[h] = row[i]; });
  return obj;
}

// ════════════════════════════════════════════════════════════════════
// READ: Top 10 with vote counts
// ════════════════════════════════════════════════════════════════════
function getTop10() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.TOP10);
  if (!sheet) return { top10: [], error: 'Top10 tab not found' };
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = r[i];
      // Coerce votes to number
      if (h === 'votes') val = Number(val) || 0;
      // Coerce rank to number
      if (h === 'rank') val = Number(val) || 0;
      // Format dates as ISO strings
      if (h === 'lastVotedAt' && val instanceof Date) val = val.toISOString();
      if (h === 'weekOf' && val instanceof Date) val = Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd');
      obj[h] = val;
    });
    return obj;
  });
  // Re-sort by votes desc
  rows.sort((a, b) => Number(b.votes) - Number(a.votes));
  // Re-rank
  rows.forEach((r, i) => { r.rank = i + 1; });
  return { top10: rows, weekOf: getWeekOf(), updatedAt: new Date() };
}

// ════════════════════════════════════════════════════════════════════
// READ: Recent requests (public feed)
// ════════════════════════════════════════════════════════════════════
function getRecentRequests(limit) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet) return { requests: [], error: 'Requests tab not found' };
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return { requests: [] };
  const numRows = Math.min(Number(limit) || 10, lastRow - 1);
  // Read last N rows (most recent at the bottom, so reverse)
  const data = sheet.getRange(lastRow - numRows + 1, 1, numRows, sheet.getLastColumn()).getValues();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rows = data.reverse().map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = r[i];
      // Convert dates to ISO strings
      if (val instanceof Date) val = val.toISOString();
      obj[h] = val;
    });
    return obj;
  });
  return { requests: rows, total: lastRow - 1 };
}

// ════════════════════════════════════════════════════════════════════
// READ: Presenters
// ════════════════════════════════════════════════════════════════════
function getPresenters() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.PRESENTERS);
  if (!sheet) return { presenters: [], error: 'Presenters tab not found' };
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => {
      let val = r[i];
      if (val instanceof Date) val = val.toISOString();
      obj[h] = val;
    });
    if (obj.tags) obj.tags = String(obj.tags).split(';').filter(Boolean);
    return obj;
  });
  return { presenters: rows, updatedAt: new Date().toISOString() };
}

// ════════════════════════════════════════════════════════════════════
// READ: Live stats
// ════════════════════════════════════════════════════════════════════
function getStats() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = {
    totalRequests: 0,
    totalVotes: 0,
    totalLeads: 0,
    pendingRequests: 0,
    weekOf: getWeekOf(),
  };
  // Count from each tab directly (more accurate than Stats sheet)
  const req = ss.getSheetByName(TABS.REQUESTS);
  if (req) {
    stats.totalRequests = Math.max(0, req.getLastRow() - 1);
    // Count pending (status === 'new' or 'queued')
    if (req.getLastRow() > 1) {
      const statuses = req.getRange(2, 7, req.getLastRow() - 1, 1).getValues();
      stats.pendingRequests = statuses.filter(s => s[0] === 'new' || s[0] === 'queued').length;
    }
  }
  const top = ss.getSheetByName(TABS.TOP10);
  if (top && top.getLastRow() > 1) {
    const votes = top.getRange(2, 4, top.getLastRow() - 1, 1).getValues();
    stats.totalVotes = votes.reduce((sum, v) => sum + Number(v[0] || 0), 0);
  }
  const leads = ss.getSheetByName(TABS.LEADS);
  if (leads) stats.totalLeads = Math.max(0, leads.getLastRow() - 1);
  stats.serverTime = new Date().toISOString();
  return stats;
}

// ════════════════════════════════════════════════════════════════════
// WRITE: Submit a song/topic request
// ════════════════════════════════════════════════════════════════════
function submitRequest(body) {
  // Validate
  if (!body.type || !['song', 'topic'].includes(body.type)) {
    return { ok: false, error: 'Invalid request type' };
  }
  if (body.type === 'song' && !body.songName) {
    return { ok: false, error: 'Song name is required for song requests' };
  }
  if (body.type === 'topic' && !body.message) {
    return { ok: false, error: 'Topic message is required for topic requests' };
  }
  // Rate limit: max 5 requests per hour per IP (loose check via timestamp clustering)
  // (Real rate limiting needs IP — Apps Script doesn't expose it reliably. Skip for now.)

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet) return { ok: false, error: 'Requests tab not found' };

  const timestamp = new Date();
  const row = [
    timestamp,
    body.type,
    body.songName || '',
    body.artist || '',
    (body.requesterName || 'Anonymous').toString().substring(0, 60),
    (body.message || '').toString().substring(0, 280),
    'new',
    '',
  ];
  sheet.appendRow(row);

  // Increment totalRequests in Stats
  incrementStat('totalRequests');

  // Return position in queue (count of pending requests)
  const pending = countPendingRequests();

  return {
    ok: true,
    message: 'Request received! It\'s now in the studio queue.',
    queuePosition: pending,
    timestamp: timestamp,
  };
}

function countPendingRequests() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet || sheet.getLastRow() < 2) return 0;
  const statuses = sheet.getRange(2, 7, sheet.getLastRow() - 1, 1).getValues();
  return statuses.filter(s => s[0] === 'new' || s[0] === 'queued').length;
}

// ════════════════════════════════════════════════════════════════════
// WRITE: Vote for a Top 10 song
// ════════════════════════════════════════════════════════════════════
function submitVote(body) {
  if (!body.songName) return { ok: false, error: 'songName is required' };
  // Optional voterId for loose dedup (we still rely on client-side localStorage)
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.TOP10);
  if (!sheet) return { ok: false, error: 'Top10 tab not found' };

  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const nameIdx = headers.indexOf('songName');
  const votesIdx = headers.indexOf('votes');
  const lastVotedIdx = headers.indexOf('lastVotedAt');

  let found = false;
  let newVoteCount = 0;
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][nameIdx]).toLowerCase() === String(body.songName).toLowerCase()) {
      newVoteCount = Number(data[i][votesIdx] || 0) + 1;
      sheet.getRange(i + 1, votesIdx + 1).setValue(newVoteCount);
      sheet.getRange(i + 1, lastVotedIdx + 1).setValue(new Date());
      found = true;
      break;
    }
  }
  if (!found) return { ok: false, error: 'Song not found in Top 10' };

  incrementStat('totalVotes');
  return { ok: true, songName: body.songName, newVoteCount: newVoteCount };
}

// ════════════════════════════════════════════════════════════════════
// WRITE: Submit contact form (lead)
// ════════════════════════════════════════════════════════════════════
function submitLead(body) {
  if (!body.name || !body.email || !body.message) {
    return { ok: false, error: 'Name, email and message are required' };
  }
  // Honeypot: if 'website' field is filled, it's a bot
  if (body.website) return { ok: false, error: 'Spam detected' };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.LEADS);
  if (!sheet) return { ok: false, error: 'Leads tab not found' };

  const row = [
    new Date(),
    body.name.toString().substring(0, 80),
    body.email.toString().substring(0, 120),
    body.type || 'Listener',
    body.message.toString().substring(0, 1000),
    'new',
    body.source || 'website',
  ];
  sheet.appendRow(row);
  incrementStat('totalLeads');

  return { ok: true, message: 'Message received! We\'ll be in touch.' };
}

// ════════════════════════════════════════════════════════════════════
// WRITE: Presenter sets the current track (studio only)
// ════════════════════════════════════════════════════════════════════
function setNowPlaying(body) {
  if (!body.trackName) return { ok: false, error: 'trackName is required' };
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.NOW_PLAYING);
  if (!sheet) return { ok: false, error: 'NowPlaying tab not found' };
  sheet.appendRow([
    new Date(),
    body.trackName,
    body.artist || '',
    body.presenter || '',
    body.show || '',
    body.duration || '',
  ]);
  return { ok: true, message: 'Now Playing updated' };
}

// ════════════════════════════════════════════════════════════════════
// HELPER: increment a stat counter
// ════════════════════════════════════════════════════════════════════
function incrementStat(key) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(TABS.STATS);
  if (!sheet) return;
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      const newVal = Number(data[i][1] || 0) + 1;
      sheet.getRange(i + 1, 2).setValue(newVal);
      sheet.getRange(i + 1, 3).setValue(new Date());
      return;
    }
  }
}

// ════════════════════════════════════════════════════════════════════
// STUDIO HELPER: Mark a request as played (presenter uses this from sheet)
// Can be called via a custom menu in the sheet
// ════════════════════════════════════════════════════════════════════
function markSelectedAsPlayed() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet) return;
  const range = sheet.getActiveRange();
  if (!range) return;
  const row = range.getRow();
  if (row < 2) return;
  sheet.getRange(row, 7).setValue('played'); // status column
  sheet.getRange(row, 8).setValue(new Date()); // playedAt column
}

function markSelectedAsQueued() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet) return;
  const range = sheet.getActiveRange();
  if (!range) return;
  const row = range.getRow();
  if (row < 2) return;
  sheet.getRange(row, 7).setValue('queued');
}

function markSelectedAsSkipped() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TABS.REQUESTS);
  if (!sheet) return;
  const range = sheet.getActiveRange();
  if (!range) return;
  const row = range.getRow();
  if (row < 2) return;
  sheet.getRange(row, 7).setValue('skipped');
}

// ════════════════════════════════════════════════════════════════════
// Custom menu for studio operations (appears when opening the sheet)
// ════════════════════════════════════════════════════════════════════
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎙️ Studio')
    .addItem('✅ Mark as Played', 'markSelectedAsPlayed')
    .addItem('📋 Mark as Queued', 'markSelectedAsQueued')
    .addItem('⏭️ Mark as Skipped', 'markSelectedAsSkipped')
    .addSeparator()
    .addItem('🔄 Run Setup (Initialise)', 'setup')
    .addItem('📊 Reset Top 10 (New Week)', 'resetTop10Weekly')
    .addToUi();
}
