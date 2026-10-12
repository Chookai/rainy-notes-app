# Ticket 03 browser acceptance suite

Seam: Chrome DevTools against the real loopback app and disposable SQLite database.

## Scenario 1 — Complete and reopen independently

1. Open the original My Tasks list and mark one task completed.
2. Expect it in a lower Completed section with a struck-through title; total stays fixed while completed increases and remaining decreases.
3. Reopen it and expect its original position in newest-created-first unfinished ordering.
4. Complete one of two identically titled Same task entries and expect the other unchanged.

Expected: completion is independently persisted, counts stay consistent, and reopened tasks retain creation ordering.

## Scenario 2 — Edit titles without changing state or ownership

1. Edit a completed Same task entry. Try whitespace and expect browser rejection; bypass browser validation and expect the server error without changes.
2. Save "  Finished note  ". Expect a trimmed, still-completed title in the same list with unchanged counts.
3. Edit an unfinished task, cancel, and expect the original title unchanged. Save a meaningful title and expect its creation position unchanged.
4. Confirm the other duplicate and a matching task in another list are unaffected.

## Scenario 3 — Cross-screen consistency and persistence

1. Return to the overview; expect per-list and combined completed/remaining changes with unchanged totals.
2. Refresh and restart the server with the same test database; expect saved titles and completion state retained.
3. Inspect both sections and inline editing at mobile/desktop widths and both themes; toggle a task using keyboard Space and save an edit using Enter.

Expected: all saved operations survive restarts and the completed section stays below unfinished work.
