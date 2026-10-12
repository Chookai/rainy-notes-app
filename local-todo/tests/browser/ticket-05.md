# Ticket 05 browser acceptance suite

Seam: Chrome DevTools against the real loopback app and disposable SQLite database on the isolated test port.

## Scenario 1 — Confirm or cancel list deletion

1. Open deletion confirmation for a nonempty list.
2. Cancel or press Escape; expect the list, tasks, and counts unchanged.
3. Confirm deletion; expect the list and its tasks removed together, the overview shown, and combined counts updated.
4. Verify an identically named surviving list remains unchanged.

Expected: cancellation is harmless, and confirmed removal is persisted without orphan tasks or another primary screen.

## Scenario 2 — Undo and list boundaries

1. Delete a task and, while its Undo is available, confirm deletion of its parent list.
2. Expect that Undo opportunity removed and no ability to restore the parent or task.
3. Delete a task in a surviving list, then delete a different empty list. Expect the surviving list's eligible Undo still present and functional.

## Scenario 3 — Empty app, initialization, and recovery

1. Delete the last list and expect the empty overview, zero combined counts, and Create list action.
2. Refresh and restart with the same database; expect no automatic My Tasks reseeding.
3. Create a fresh list from the empty state, add a task, and verify both screens work.
4. Use Escape to cancel the native confirmation and keyboard Enter to confirm deliberately; inspect both themes and mobile/desktop layouts.

## Scenario 4 — Visible list-card keyboard focus

Focus a list card through keyboard navigation and inspect its outline. Expect a full inset ring on all sides, not an outward outline clipped by the rounded card wrapper. Check desktop/mobile and both themes.

## Integrated acceptance pass

On a separate fresh test database, exercise the browser scenarios from tickets 01–05: initialization, normalized independent lists/tasks, counts, editing, completion/reopening, deletion/Undo, recovery boundaries, list cancellation/deletion, empty states, and persistence. Record actual outcomes and any untested cases; do not query SQLite as an assertion.
