# 05 — Delete lists safely and handle an empty app

**What to build:** The user can confirm deletion of a list and all its tasks, or cancel without changes. Removing the final list leaves a useful empty overview with zero counts rather than recreating the default list. Any pending task Undo for a deleted list becomes ineligible.

**Blocked by:** 02 — Create and rename lists; 04 — Delete tasks with five-second Undo.

**Status:** resolved

- [x] Deleting a list presents explicit confirmation that its tasks will also be removed. Cancellation leaves the list, its tasks, and all counts unchanged.
- [x] Confirmation persistently removes the list and its tasks together, without orphan tasks or partial successful deletion.
- [x] Combined total, completed, and remaining counts immediately exclude the deleted list's tasks. Other lists and their tasks remain unchanged, including identically named lists.
- [x] Deleting the selected list leaves the user at the overview rather than a stale detail screen.
- [x] The user can delete the final list. The empty overview shows a "Create list" action and all combined counts as zero.
- [x] Creating a list from the empty overview works and permits adding tasks through the existing detail screen.
- [x] Refreshing or restarting after deleting all lists preserves the empty state and does not recreate "My Tasks".
- [x] If a task deletion still has an Undo opportunity when its owning list is deleted, that opportunity can no longer restore the task or recreate the list.
- [x] Deleting one list does not invalidate an otherwise eligible task Undo belonging to a different surviving list.
- [x] There is no entire-list Undo or recycle-bin feature.
- [x] Confirmation, cancellation, empty-state actions, and the completed app remain usable through keyboard interactions, desktop/mobile-sized viewports, and both themes.
- [x] Verify the slice through Chrome DevTools against the real server and isolated SQLite database. Include cancellation, deleting a nonempty list, duplicate-name isolation, last-list deletion, empty-state recreation, refresh/restart, and pending task Undo interactions.
- [x] Run the integrated browser acceptance scenarios from the spec across the completed app, recording outcomes, console/network failures, and any untested cases. Preserve earlier slice behavior rather than introducing a new lower-level testing seam.
