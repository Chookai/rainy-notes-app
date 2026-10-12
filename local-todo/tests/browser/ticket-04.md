# Ticket 04 browser acceptance suite

Seam: Chrome DevTools against the real loopback app and disposable SQLite database, using port 3017 when port 3000 is shared.

## Scenario 1 — Delete and Undo an unfinished task

1. Delete a known unfinished task without confirmation.
2. Expect it removed immediately and total/remaining counts reduced, even while an Undo notification is present.
3. Activate Undo within five seconds.
4. Expect the original task, title, ownership, completion state, creation position, and counts restored.

Expected: deletion persists immediately and eligible Undo restores the original task rather than a new copy.

## Scenario 2 — Completed deletion and navigation-safe Undo

1. Delete a completed task; expect total/completed reduced and remaining unchanged.
2. Navigate to the overview before five seconds expire; expect the same Undo opportunity and updated combined counts.
3. Undo from the overview; expect original completion state and counts restored on both screens.
4. Submit Undo using keyboard interaction.

## Scenario 3 — Expiry, refresh, restart, and duplicate independence

1. Delete one of two matching titles in different lists; expect only that list/task affected.
2. Wait beyond five seconds; expect no Undo control and no restored task.
3. Delete another task and refresh immediately; expect deletion retained and Undo absent.
4. Restart against the same database and refresh; expect saved deletion retained and no recovery opportunity.
5. Inspect deletion/Undo controls at desktop/mobile widths in both themes, including multiple independent notifications.

Parent-list deletion and cross-list invalidation are verified in ticket 05 when list deletion becomes available.
