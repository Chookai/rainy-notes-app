# Local To-Do App Plan

Status: implemented. All five tickets have been browser-verified, independently reviewed, and committed.

## Agreed scope

- Run locally on localhost using Next.js, Magic UI, and a persistent SQLite database accessed through the local app server.
- No accounts or cloud services.
- Two screens: an overview of named lists and a selected list's detail screen.
- Overview: show combined total, completed, and remaining task counts across all lists at the top, plus each list's own counts; selecting a list opens its details. Combined counts are zero when no lists exist.
- Create, rename, and delete lists. Create one list named "My Tasks" only on first initialization, not whenever no lists exist.
- Allow deleting the last list. When no lists remain, show an empty overview with a "Create list" button.
- Tasks have a required title and a done/not-done state; no notes, priorities, or due dates in the first version.
- Allow duplicate list names and task titles; names and titles are not unique identifiers. Trim surrounding whitespace and reject blank list names or task titles.
- Create, read, edit, and delete tasks. Mark tasks complete or unfinished again.
- Each task belongs to exactly one list. Similar tasks in different lists are independent; shared tasks and moving tasks between lists are out of scope.
- Show newest unfinished tasks first. Keep completed tasks visible in a separate section below, with struck-through titles.
- Persist individual task deletions immediately and offer Undo for 5 seconds. Undo remains available while navigating between screens, but expires on page refresh or app restart.
- Counts update immediately on deletion, including while Undo is available. Undo restores the task and its contribution to counts: unfinished tasks affect total and remaining; completed tasks affect total and completed.
- Confirm deletion of an entire list and its tasks.
- Clean, responsive layout with overview cards, simple task rows, light/dark mode, and subtle Magic UI animations.

## Domain language

Use the definitions in [CONTEXT.md](../CONTEXT.md): List, Task, Completed task, Unfinished task, Total count, Completed count, and Remaining count.

## Domain rules

- For each list and across all lists: total count = completed count + remaining count.
- Counts exclude deleted tasks immediately, even while Undo remains available.
- Completing or reopening a task changes completed and remaining counts, but not total count.
- Deleting a list removes all its tasks and their contributions to combined counts.

## Review status

All identified domain questions have been resolved, and the user has confirmed the updated plan captures our shared understanding. The user authorized ticket 01, then continuation through tickets 02–05.

## Decision records

No ADRs yet: the agreed choices do not currently justify a separate record under the domain-modeling criteria. Record an ADR only if clarification produces a consequential, non-obvious trade-off.
