# Issue tracker: Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`.
- Spec: `.scratch/<feature-slug>/spec.md`.
- Implementation tickets: `.scratch/<feature-slug>/issues/<NN>-<slug>.md`,
  numbered from `01`, one file per ticket.
- Triage state: a `Status:` line near the top of each ticket.
  Use the role strings in `triage-labels.md`.
- Track implementation completion separately with `Resolution: implemented`.
  Completed tickets retain their triage status but must not be queued again.
  Implementation dependencies are satisfied by this resolution, not triage status.
- Append conversation under a `## Comments` heading.

## Publishing and fetching

When a skill says "publish to the issue tracker", create the appropriate
file under `.scratch/<feature-slug>/`, creating directories as needed.

When a skill says "fetch the relevant ticket", read its referenced file.
The user will normally provide its path or number.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`, containing Notes, Decisions-so-far,
  and Fog.
- Child tickets: `.scratch/<effort>/issues/NN-<slug>.md`,
  numbered from `01`, with the question in the body.
- `Type:` is `research`, `prototype`, `grilling`, or `task`.
- Wayfinding `Status:` is `claimed` or `resolved`; an unclaimed open
  ticket has neither state. These are separate from triage roles.
- Dependencies: `Blocked by: NN, NN`. A ticket is unblocked when
  every dependency is resolved.
- Frontier: choose the first open, unblocked, unclaimed ticket by number.
- Claim: save `Status: claimed` before working.
- Resolve: append `## Answer`, set `Status: resolved`, and add a summary
  and link to the map's Decisions-so-far.
