# 02 — Create and rename lists

**What to build:** The user can create named lists and rename existing ones, open each list to capture its own tasks, and see each list's counts alongside combined counts. Lists and their tasks remain independent even when names or titles match.

**Blocked by:** 01 — Capture tasks in a persistent default list.

Status: ready-for-agent
Resolution: implemented

- [x] The overview offers list creation, and successful creation produces a persisted empty list with zero counts that can be opened immediately.
- [x] The user can rename a list without changing its identity, tasks, or counts. The overview and detail screen reflect its new name.
- [x] List names are trimmed and blank names rejected by both UI validation and server operations, for creation and renaming.
- [x] Duplicate list names are allowed and do not cause navigation, renaming, or task creation to affect another list.
- [x] Each task belongs to exactly one list, and a detail screen displays only that list's tasks. Shared tasks and moving tasks between lists are not introduced.
- [x] Identical task titles in separate lists remain independent.
- [x] Creating a task in one list updates that list's counts and combined counts without changing another list's counts.
- [x] Combined counts equal the sums of per-list counts, and total equals completed plus remaining in both scopes.
- [x] Lists, names, ownership, and tasks persist through browser refresh and server restart.
- [x] Creation and renaming remain within the two-screen design, usable by keyboard and at desktop/mobile-sized viewports in both themes.
- [x] Verify the slice through Chrome DevTools with the real local server and disposable SQLite database. Include duplicate names, whitespace validation, isolated list ownership, navigation, persistence, and recorded visible outcomes.
