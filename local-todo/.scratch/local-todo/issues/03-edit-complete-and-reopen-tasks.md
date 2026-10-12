# 03 — Edit, complete, and reopen tasks

**What to build:** The user can correct task titles, mark work completed, and reopen completed tasks. Unfinished work remains above a visible completed section, and completion changes are reflected consistently in per-list and combined counts.

**Blocked by:** 01 — Capture tasks in a persistent default list.

**Status:** resolved

- [x] The user can edit titles of unfinished and completed tasks. Editing preserves identity, list ownership, completion state, and original creation ordering.
- [x] Edited titles are trimmed, blank titles rejected by the UI and server, and duplicate titles allowed.
- [x] The user can mark an unfinished task completed and mark a completed task unfinished again.
- [x] Completed tasks remain visible in a separate section below unfinished tasks, with struck-through titles.
- [x] Completion reduces remaining count and increases completed count; reopening reverses those changes. Neither action changes total count.
- [x] Both per-list and combined counts reflect successful changes and satisfy total equals completed plus remaining.
- [x] Reopened tasks return to their position in newest-created-first unfinished ordering rather than being treated as newly created.
- [x] Editing or toggling one of two identically titled tasks leaves the other unchanged. The behavior is demonstrable in the default list without requiring list-creation functionality.
- [x] Title and completion changes survive browser refresh and server restart.
- [x] Controls and both task sections remain usable by keyboard, at desktop/mobile-sized viewports, and in both themes.
- [x] Verify the slice through Chrome DevTools against the real local server and isolated SQLite database. Record edit validation, duplicate independence, completion/reopening, ordering, counts, persistence, and visible outcomes.
