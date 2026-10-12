# Ticket 03 verification

Chrome DevTools MCP tested the real app against the isolated persistent database. The test server moved to port 3017 to avoid external interference observed on port 3000.

- **Red:** no completion checkbox existed before this slice.
- **Completion:** completed the newest task; it moved to the lower section with line-through styling and counts changed from 6/0/6 to 6/1/5.
- **Reopening:** restored the original newest-first ordering, with total unchanged.
- **Duplicates:** completed only one Same task entry; one remained unfinished and one completed.
- **Editing validation:** browser rejected whitespace; bypassing browser validation returned Enter a task title from the server.
- **Completed editing:** saved "  Finished note  " as Finished note, preserving completion, ownership, and counts.
- **Unfinished editing:** Cancel preserved the original title; keyboard Enter saved "  Next small step  " without changing creation order.
- **Keyboard completion:** Space completed Plan the week; reopening restored it and counts.
- **Cross-screen counts:** final per-list counts were 6/1/5, 2/0/2, 0/0/0 and combined counts 8/1/7. Tasks in other lists were unchanged.
- **Persistence/presentation:** refreshed and restarted as a production instance with the same database; saved titles, state, ordering, and counts remained. Mobile dark and desktop light layouts had no horizontal overflow.
- **Checks:** typecheck, lint, and production build passed.

## Independent review

### Standards

One P2 heuristic finding: paired overview/detail invalidation was repeated across mutations. Extracted the private revalidateListViews helper to centralize that existing policy. No documented breaches or blockers.

### Spec

0 findings; all ticket requirements appear implemented, with no scope creep or blockers.

Summary: Standards 1 suggestion, applied; Spec 0 findings.

Browser scenarios are interactive, not an automated CI suite. No database-side assertions or additional test seam was used.
