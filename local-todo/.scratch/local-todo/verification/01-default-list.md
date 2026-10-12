# Ticket 01 verification

## Browser seam

Chrome DevTools MCP against the real loopback server with the disposable `.test-data/ticket-01.sqlite` database. No assertions queried SQLite directly, and the default user database was not used.

## Results

- **Fresh initialization:** one "My Tasks" list; per-list and combined counts 0/0/0; both screens and return navigation passed.
- **Capture:** "Plan the week" appeared with counts 1/0/1.
- **Validation:** whitespace rejected by browser validation; disabling browser validation and submitting whitespace reached the server and returned "Enter a task title." without changing counts.
- **Normalization/duplicates:** "  Same task  " and "Same task" appeared as two independent "Same task" entries; newest-first ordering passed.
- **Keyboard:** Tab focused Add task with a visible 3px outline; Enter created "Keyboard task".
- **Counts:** final expected ordering was Keyboard task / Same task / Same task / Plan the week, with counts 4/0/4 on details and overview.
- **Presentation:** inspected 390×844 and 1440×900 viewports and both themes; no horizontal overflow. Mobile dark overview screenshot inspected visually.
- **Persistence:** browser refresh retained task titles, ordering, counts, and selected theme. Restarting as an optimized production server against the same test database retained counts 4/0/4 and exactly one default list.
- **Diagnostics:** final detail refresh had no browser console errors or warnings; the document request returned HTTP 200.
- **Static checks:** typechecking, lint, optimized production build, and npm-ci dry run passed. Production dependency audit reported zero vulnerabilities.

## Independent review

### Standards

No documented breaches or actionable baseline smells (0 findings).

### Spec

One P2 finding: an editable title could lose a second draft while saving. Reproduced with Slow 4G, fixed by making the input read-only while pending, and reverified with the real server. No missing scope or blocking findings.

Summary: Standards 0 findings; Spec 1 finding, fixed. The title unlocks and clears after success.

## Red/green evidence

The initial browser scenario failed because no app server existed. The next capture scenario identified the missing Task title input before it was implemented. The normalization scenario then observed an untrimmed title before the server normalization fix. Each was rechecked at the same browser boundary and passed.

## Limitations / environment notes

- Acceptance scenarios are documented, interactive DevTools checks, not an automated CI regression suite.
- A development-server restart temporarily hung after build/cache changes; the annotation experiment was reverted and the final persistent-data restart passed on the production server. Background servers are launched directly with nohup/setsid for this environment.
- Next's optimized build reports a filesystem-tracing warning for the configurable runtime database path. This app is local-only, with no hosted deployment or standalone packaging requested.
- npm audit reports five inherited development-tool advisories in the Next ESLint plugin's fast-glob/micromatch/braces chain; no patched braces version was available. They do not affect production dependencies.
- Completion/editing, other list management, deletion, and Undo are intentionally left to later tickets.
