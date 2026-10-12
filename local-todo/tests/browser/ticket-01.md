# Ticket 01 browser acceptance suite

## Agreed seam

Use Chrome DevTools against the real app at `http://127.0.0.1:3000`, backed by an isolated SQLite database. Assert visible behavior, not SQL queries or component internals. Do not use the user's default database.

## Scenario 1 — Fresh default list

1. Start the server with a fresh disposable database.
2. Open the overview in a clean browser context.
3. Expect the heading "Your lists", one "My Tasks" link, and combined total/completed/remaining counts of 0/0/0.
4. Open "My Tasks" and expect an empty list with zero counts.
5. Return to the overview.

Expected: both screens are usable, the default list appears exactly once, and empty counts are zero.

## Scenario 2 — Capture an unfinished task

1. Open the default list.
2. Enter "Plan the week" in the labeled "Task title" input and submit with the keyboard.
3. Expect one visible unfinished task and list counts of 1/0/1.
4. Return to the overview and expect both combined and list-card counts of 1/0/1.

Expected: the task-entry form works end to end, and both screens show the new task's contributions.

## Scenario 3 — Validate, trim, and allow duplicate titles

1. Try empty and whitespace-only titles; expect no task or count change.
2. Bypass the browser's validation by disabling it on the form; submit whitespace and expect a server validation message with no count change.
3. Add "  Same task  ", then "Same task"; expect both tasks displayed as "Same task", independently counted.
4. Expect the newest tasks first and preserved across navigation and refresh.

Expected: both validation boundaries reject blanks, names are normalized, and duplicate titles are allowed.

## Scenario 4 — Responsive, themed, keyboard-operable screens

1. Inspect the overview and details at 1440×900 and 390×844 in light and dark mode.
2. Expect all primary content and controls visible without horizontal page overflow.
3. Use Tab and Enter to navigate and create a task, with a visible focus indicator.
4. Toggle the theme and expect it to remain selected across navigation and refresh.
5. Check the browser console and application requests for unexpected failures.

## Scenario 5 — Persistent tasks and one-time initialization

1. Create "Plan the week", two normalized "Same task" entries, and "Keyboard task" in that order on a fresh database.
2. Expect newest-first titles: "Keyboard task", "Same task", "Same task", "Plan the week" and counts of 4/0/4.
3. Refresh the browser and expect the same tasks and counts.
4. Stop and restart the server with the same isolated database; expect the same tasks/counts and exactly one default list.

## Scenario 6 — Do not erase a draft during saving

1. Enable Slow 4G throttling in Chrome DevTools.
2. Submit a task and inspect the pending state before the response.
3. Expect the title input to be read-only and Add task disabled, preventing a second unsaved draft from being entered and erased.
4. After success, expect the input cleared, editable, and ready for the next task.

Results are recorded in the ticket's verification report. No assertion reads SQLite directly.
