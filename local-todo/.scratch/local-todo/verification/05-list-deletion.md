# Ticket 05 verification

Chrome DevTools MCP against the real app on isolated port 3017, using disposable SQLite databases only.

## Focused results

- **Red:** list deletion controls were absent before this slice.
- **Confirmation/cancellation:** native dialog focused Cancel by default; cancellation preserved the nonempty list and counts 3/1/2. Mobile dialog width was 350px in a 390px viewport.
- **Parent invalidation:** deleted Same task, then its parent list while recovery was still available. The overview appeared, parent recovery disappeared, and two identically named other lists remained unchanged with combined counts 1/0/1.
- **Cross-list recovery:** deleted a task in a surviving list, removed another empty list, then restored the surviving task within its original deadline. Deleting one list did not invalidate another list's Undo.
- **Keyboard:** Escape cancelled without changes. Enter on deliberately focused confirmation deleted the final list.
- **Empty state:** no list cards remained, combined counts were 0/0/0, and Create list was available. Refresh/production restart did not recreate My Tasks.
- **Recovery:** created Fresh start from the empty overview and captured Rebuild through its details.
- **Presentation:** mobile dark and desktop light flows fit without horizontal overflow. Final screenshots were visually inspected.
- **Checks:** typecheck, lint, optimized build, and production dependency audit passed. The configurable-filesystem build warning and development-tool advisories remain documented in ticket 01.

## Full integrated acceptance pass

A separate fresh SQLite database was created for the completed app. All assertions used browser-visible state through Chrome DevTools, not database queries.

- **A:** first-use default initialization; normalized, independent duplicate Work lists; normalized duplicate task titles; newest-first ordering; client/server blank-title rejection; counts 3/0/3.
- **B:** independent completion; editing a completed title; reopening with original ordering; immediate deletion and Undo; actual 5.5-second expiry; counts 2/1/1.
- **C:** refresh while task Undo was available preserved deletion but cleared recovery; independent matching task in another list; client/server name validation and trimmed rename with preserved ownership.
- **D:** completed-task deletion and Undo from the overview; unchanged cancellation; parent-list deletion while its task Undo remained eligible, with recovery invalidation.
- **E:** another list's eligible Undo survived list deletion; last-list deletion produced zero counts and the useful empty state at mobile dark viewport.
- **F:** production-server restart retained the empty app without reseeding; Recovery could be created and keyboard Enter captured Saved after restart. A second restart retained that task and counts 1/0/1.
- **Diagnostics:** final production refresh had no console warnings/errors; document and inspected application requests returned HTTP 200. The default user database had not been created or touched during acceptance testing.

## Independent review

### Standards

0 findings; no documented breaches or actionable heuristic smells.

### Spec

One P2 presentation finding: the new rounded card wrapper clipped the outward keyboard focus outline. Reproduced visually: only the bottom stroke was visible. Changed the card link to use an inset outline; rebuilt and verified a 3px solid outline with -4px offset, then visually inspected all four intact focus strokes in the focused-card screenshot. No missing functional scope or blockers.

Summary: Standards 0 findings; Spec 1 finding, fixed. A targeted follow-up by the same independent Spec reviewer confirmed the correction introduces no new defect. The inset focus ring was also checked at the mobile dark viewport.

The browser suites remain interactive rather than an automated CI runner. The keyboard-Undo timing limitation recorded in ticket 04 remains explicit; no other acceptance defect was observed.
