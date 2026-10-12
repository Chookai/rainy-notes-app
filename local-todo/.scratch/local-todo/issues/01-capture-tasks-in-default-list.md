# 01 — Capture tasks in a persistent default list

**What to build:** A locally running Next.js app using Magic UI and persistent SQLite, with an overview and list detail screen. The user can capture unfinished tasks in the initial "My Tasks" list, navigate between both screens, and see accurate per-list and combined counts. This is the first complete browser-to-database slice, not a standalone setup ticket.

**Blocked by:** None — can start immediately.

Status: ready-for-agent
Resolution: implemented

- [x] The app runs on localhost without accounts or cloud services and uses a local app server to access persistent SQLite.
- [x] A fresh database receives exactly one "My Tasks" list. Repeated startup does not duplicate it, and initialization state is stored independently of whether lists exist.
- [x] The overview displays the list card and combined total, completed, and remaining counts. Selecting the card opens its detail screen; the user can return to the overview.
- [x] The user can create and read tasks in the default list. New tasks are unfinished and belong to that list only.
- [x] Task titles are trimmed, whitespace-only titles are rejected in both UI and server operations, and duplicate titles create independent tasks.
- [x] Unfinished tasks appear newest first with deterministic creation ordering. Adding a task increments total and remaining counts in both scopes without changing completed count.
- [x] An empty list is usable and has zero counts; at all times total count equals completed count plus remaining count.
- [x] Both screens use Magic UI, with list cards, simple task rows, restrained animation, usable desktop/mobile-sized layouts, and light/dark mode.
- [x] Primary actions have semantic labels and work through keyboard interaction.
- [x] Browser refresh and a local server restart with the same database retain tasks and counts.
- [x] The app can run against a disposable SQLite test database without touching the user's normal database.
- [x] Verify the complete slice through Chrome DevTools against the real server and isolated database. Record reproducible scenarios, visible outcomes, viewport/theme checks, and relevant console/network failures or testing limitations.
