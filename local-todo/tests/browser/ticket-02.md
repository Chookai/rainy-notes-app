# Ticket 02 browser acceptance suite

Seam: Chrome DevTools against the real loopback app and disposable SQLite database.

## Scenario 1 — Create a named list

1. From the overview, create "Work".
2. Expect a new list card with 0/0/0 counts and unchanged combined task counts.
3. Open "Work", create "Draft proposal", and return to the overview.
4. Expect the task in Work only and updated Work/combined counts, without changing My Tasks.

Expected: the user can create a list and capture an independently owned task through the existing two screens.

## Scenario 2 — Rename with validation and preserved ownership

1. Open Work's Rename list control and try a whitespace-only name. Expect browser rejection; bypass browser validation and expect a server error without changing the name or tasks.
2. Rename Work to "  My Tasks  ". Expect trimmed "My Tasks", unchanged list identity, and the retained Draft proposal task and counts.
3. Add "Plan the week", matching a title in the original list. Expect independent tasks and counts.

## Scenario 3 — Duplicate lists, persistence, and presentation

1. Create another "My Tasks" list and expect a distinct, empty card.
2. Verify each identically named card opens its own tasks and has its own counts; combined counts sum all three lists.
3. Refresh and restart against the same test database; expect persisted names, tasks, and ownership.
4. Inspect creation/renaming at mobile and desktop widths, both themes, and use keyboard submission.

Expected: duplicates are independent and changes persist without extra primary screens.
