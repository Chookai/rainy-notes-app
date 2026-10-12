# Local To-Do App

Status: ready-for-agent

## Problem Statement

A local user needs a simple way to organize tasks into named lists, see how much work remains, and inspect and manage each list. The user wants data to survive refreshes and app restarts without accounts, cloud services, or a remotely hosted database.

## Solution

Provide a locally running, two-screen app backed by a local SQLite database. An overview presents combined counts across all lists and cards showing each list's own counts. Selecting a list opens its detail screen, where the user manages tasks and their completion state.

Use Next.js and Magic UI for a clean, responsive interface with light/dark mode and restrained animation. Persist changes through the local app server. Make individual task deletion reversible for five seconds, while requiring confirmation for deletion of a list and all its tasks.

## User Stories

1. As a local user, I want to run the app on localhost, so that I can manage tasks without a hosted service.
2. As a local user, I want to use the app without an account, so that I can begin without signing up.
3. As a local user, I want my lists and tasks stored in a local database, so that my data stays on my device.
4. As a local user, I want saved changes to survive page refreshes, so that refreshing does not lose my work.
5. As a local user, I want saved changes to survive app restarts, so that I can return to my existing lists later.
6. As a local user, I want a "My Tasks" list on first initialization, so that I have a starting place for tasks.
7. As a local user, I want an overview of all my lists, so that I can choose what to work on.
8. As a local user, I want combined total, completed, and remaining counts, so that I can see my overall workload and progress.
9. As a local user, I want each list's total, completed, and remaining counts, so that I can compare progress between lists.
10. As a local user, I want to open a list from the overview, so that I can inspect and manage its tasks.
11. As a local user, I want to return from a list's details to the overview, so that I can switch lists.
12. As a local user, I want to create named lists, so that I can organize tasks into separate groups.
13. As a local user, I want to rename a list without losing its tasks, so that I can change how I organize my work.
14. As a local user, I want to delete a list and all its tasks, so that I can remove a group I no longer need.
15. As a local user, I want confirmation before deleting a list, so that I do not accidentally remove all its tasks.
16. As a local user, I want to cancel list deletion, so that I can keep the list and its tasks unchanged.
17. As a local user, I want to delete my last list, so that I am not forced to keep an unwanted list.
18. As a local user, I want an empty overview with a "Create list" action when no lists remain, so that I can start again intentionally.
19. As a local user, I want combined counts to be zero when there are no lists, so that the overview accurately reflects the empty state.
20. As a local user, I want a deleted "My Tasks" list to stay deleted after restarting, so that the app respects my changes.
21. As a local user, I want to create a task with a required title, so that I can record something to do with minimal effort.
22. As a local user, I want new tasks to start unfinished, so that they contribute to my remaining work.
23. As a local user, I want to see the tasks belonging to the selected list, so that I can focus on that group.
24. As a local user, I want to add a task to an empty list, so that newly created lists are useful immediately.
25. As a local user, I want to edit a task's title without changing its completion state or list, so that I can correct or clarify it.
26. As a local user, I want to mark a task completed, so that I can track finished work.
27. As a local user, I want to mark a completed task unfinished again, so that I can reopen it or correct an accidental completion.
28. As a local user, I want newest unfinished tasks shown first, so that recently added work is easy to find.
29. As a local user, I want completed tasks retained in a separate section below unfinished tasks, so that finished work remains visible without obscuring remaining work.
30. As a local user, I want completed task titles struck through, so that their state is visually clear.
31. As a local user, I want completion changes reflected in both list and combined counts, so that the overview stays accurate.
32. As a local user, I want completing or reopening a task to leave total count unchanged, so that counts distinguish progress from adding or removing work.
33. As a local user, I want to delete an individual task immediately without a confirmation dialog, so that removing a task is quick.
34. As a local user, I want deleted tasks excluded from counts immediately, so that displayed progress matches the visible tasks.
35. As a local user, I want five seconds to undo a task deletion, so that I can recover from an accidental action.
36. As a local user, I want Undo to restore the task's title, list, completion state, and creation order, so that recovery returns the task to its previous state.
37. As a local user, I want Undo to restore the task's contribution to counts, so that totals remain consistent.
38. As a local user, I want Undo available while switching between the overview and detail screens, so that navigation does not remove the recovery opportunity.
39. As a local user, I want a deletion saved immediately even before Undo expires, so that refreshes or restarts do not resurrect deleted tasks.
40. As a local user, I want the Undo opportunity to expire after five seconds or on refresh or app restart, so that deletion has a clear recovery boundary.
41. As a local user, I want deleting a list to remove its tasks from combined counts, so that overall progress excludes removed work.
42. As a local user, I want duplicate list names and task titles allowed, so that I am not forced to invent unique wording.
43. As a local user, I want tasks with identical titles to remain independent, so that completing or deleting one does not change another.
44. As a local user, I want surrounding whitespace removed from names and titles and blank values rejected, so that lists and tasks have meaningful labels.
45. As a local user, I want each task associated with exactly one list, so that ownership and counts are unambiguous.
46. As a local user, I want comfortable layouts on desktop and mobile-sized screens, so that the same app is usable in either viewport.
47. As a local user, I want light and dark modes, so that I can choose a comfortable appearance.
48. As a local user, I want subtle visual feedback rather than distracting effects, so that I can focus on managing tasks.

## Implementation Decisions

- Use Next.js with Magic UI and a local SQLite database accessed only through the local app server. The database is persistent rather than in-memory or browser storage.
- Build two screen-level interfaces: the overview and selected-list details. Creation, editing, confirmation, and Undo interactions must not introduce additional primary screens.
- Logical responsibilities are presentation/navigation, application-level list and task operations, persistence/initialization, and transient Undo coordination. These are not requirements for a particular file or class structure.
- Identify lists and tasks independently of their names or titles. Permit duplicates without coupling their behavior.
- Persist list identity and name, plus task identity, owning list identity, title, completion state, and creation ordering information. Each task belongs to exactly one existing list.
- Normalize surrounding whitespace and reject blank names or titles on the server as well as through UI validation. Renaming or editing must preserve identity and unrelated state.
- Support list creation, reading, renaming, and confirmed deletion, and task creation, reading, title editing, completion/reopening, deletion, and eligible restoration. The exact server transport is an implementation choice; this spec does not mandate REST routes versus server actions.
- Initialize "My Tasks" once for a fresh database. Persist initialization state independently of whether any lists remain, so deleting the last list never triggers reseeding on a later startup.
- New tasks start unfinished. Order unfinished tasks by creation from newest to oldest; editing or reopening does not make a task newly created. Keep completed tasks in a separate lower section with struck-through titles. No particular ordering of completed tasks was agreed.
- Calculate per-list counts from current tasks, and combined counts from all current lists. For both scopes, total count equals completed count plus remaining count. Empty scopes return zero counts.
- Completion and reopening change completed and remaining counts, not total count. All screens must reflect successful changes consistently.
- Persist task deletion immediately and remove its contribution to counts, including during the Undo interval. Preserve enough transient information to restore its prior identity, ownership, title, completion state, and creation order.
- Offer Undo for five seconds after successful deletion. Maintain its transient state across in-app navigation, but do not preserve it across refreshes or app restarts. Successful Undo persists restoration and updates counts.
- Undo cannot create an orphan task or recreate a deleted parent list. If the owning list is deleted during the Undo window, restoration into that list is no longer eligible.
- Confirm list deletion explicitly before removing the list and its tasks together. Cancellation makes no changes. Entire-list Undo is not part of the agreed scope.
- Use list cards on the overview and simple task rows on the detail screen. Support light/dark mode, responsive layouts, and restrained Magic UI animation.
- Provide a test configuration that points the real app server at a disposable SQLite database. Never run destructive acceptance scenarios against the user's normal database.

## Testing Decisions

- Use one primary, highest-level seam: the browser-visible app running against the real local server and an isolated persistent SQLite test database. Exercise presentation, application operations, and persistence together rather than mocking their internal boundaries.
- Use Chrome DevTools MCP as the primary interactive browser-testing tool, as requested by the user. Tool connectivity and browser access have been verified; the app itself has not been built or tested yet.
- Drive scenarios through visible controls and assert external behavior using page snapshots and screenshots. Inspect console messages and network requests to diagnose errors, not to assert private implementation details.
- Exercise both screen-level interfaces and their integrated list/task operations. There are no existing code modules, tests, or testing conventions to reuse.
- Test fresh-database initialization, list creation and renaming, task creation and editing, completion/reopening, independent duplicate entries, whitespace validation, and both task and list deletion.
- Verify per-list and combined counts after each mutation, including unfinished versus completed task deletion, Undo, and deleting a nonempty list. Check the count invariant and empty states.
- Verify unfinished creation ordering, completed section placement, struck-through titles, and preservation of task state through editing and Undo.
- Test Undo inside and outside its five-second window, across screen navigation, after refresh, and when its parent list has been deleted. Check visible results rather than relying on exact millisecond scheduling at the boundary.
- Verify persistence by refreshing the browser and separately restarting the local server with the same test database. Confirm that saved changes remain, deleted tasks do not return, and the default list is not recreated after deleting every list.
- Check desktop and mobile-sized viewports and light/dark modes with DevTools. Use keyboard interactions and semantic control labels to check that primary actions are operable without a pointer.
- Keep acceptance scenarios and outcomes reproducible and record any limitations or untested cases. Interactive DevTools verification is not, by itself, a committed automated regression suite; no separate browser automation framework has been selected.
- Do not add lower-level test seams by default. Add one only if an important externally observable behavior cannot be reliably exercised at the browser boundary, and justify the narrower seam.

## Out of Scope

- Accounts, authentication, user roles, collaboration, or cloud synchronization.
- Hosted deployment, a remote database, or native desktop/mobile packaging.
- Due dates, reminders, priorities, notes, tags, subtasks, or attachments.
- Shared tasks, moving tasks between lists, or completion linked by matching titles.
- Search, filters, manual sorting, or custom task ordering.
- Archiving, a recycle bin, or Undo for entire-list deletion.
- Undo lasting beyond five seconds or surviving refresh/app restart.
- Additional primary screens beyond the overview and list details.
- A separate browser automation framework, extensive unit-test scaffolding, or performance benchmarking as requirements of this first spec.

## Further Notes

- This spec synthesizes the confirmed plan and domain glossary; it does not introduce a new requirements interview.
- The primary actor is one local user. Mobile-sized layouts do not imply that access from other devices on the network has been configured.
- Browser testing requires an implemented app and a running local server. The verified DevTools connection is a tooling check, not evidence of feature correctness.
- Package versions, SQLite library choice, exact server transport, and completed-task ordering remain implementation choices within the agreed behavior.
- Publishing this spec with the ready-for-agent status does not mean implementation or acceptance testing has already occurred.
