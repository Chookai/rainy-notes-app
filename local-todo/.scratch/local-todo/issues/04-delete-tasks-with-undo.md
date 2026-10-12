# 04 — Delete tasks with five-second Undo

**What to build:** The user can immediately delete an individual task without a confirmation dialog, see counts change, and restore it within five seconds. The recovery opportunity stays available while navigating between the overview and list details, but does not survive refresh or app restart.

**Blocked by:** 03 — Edit, complete, and reopen tasks.

**Status:** resolved

- [x] Deleting an individual unfinished or completed task requires no confirmation and persists deletion immediately rather than waiting for Undo expiry.
- [x] The task disappears and its count contributions are removed immediately, including while Undo is available. Unfinished deletion reduces total and remaining; completed deletion reduces total and completed.
- [x] The user can Undo a successful task deletion for five seconds; after that window, the task cannot be restored through that action.
- [x] Successful Undo restores the original identity, owning list, title, completion state, creation ordering, and relevant per-list and combined counts.
- [x] Undo remains available across in-app navigation between overview and details without resetting its five-second window.
- [x] Browser refresh or app restart removes the transient Undo opportunity and does not resurrect the deleted task.
- [x] Deletion and restoration do not affect any other task, including tasks with identical titles.
- [x] Counts remain consistent in both screens and satisfy total equals completed plus remaining before deletion, during the recovery window, and after Undo or expiry.
- [x] Restoration requires the original owning list still to exist. It cannot create an orphan task or recreate a deleted list; the list-deletion interaction is verified when that functionality lands.
- [x] Deletion and Undo are usable by keyboard at desktop/mobile-sized viewports in both themes.
- [x] Verify the slice through Chrome DevTools against the real server and disposable SQLite database. Include unfinished/completed deletion, timely Undo, expiry, navigation, refresh, and server restart. Record actual visible results and any timing limitations rather than relying on exact millisecond boundaries.
