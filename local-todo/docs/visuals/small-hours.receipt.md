# Small Hours HTML delivery

```text
diagram_type: architecture
output: /home/kai/procurement-system/matt/docs/visuals/small-hours.html
specification_sha256: 931ac5c9f795e29089402c21b73965aa39f356c132902f69f241a89dec722898
artifact_sha256: fe71b98e17d5118a463aace5efc4bead5182abb9e255b983e523e553f56c2b12
validation: 9/9 showcase, 0 errors, 0 warnings
browser_evidence: passed
visual_review: passed
correction_rounds: 1
```

The standalone HTML opens directly from disk and needs no app server. The editable source is `small-hours-architecture.json`.

Automated browser evidence: `small-hours.visual-check.json`. Chrome measured 1440×900, 1600×1000, 1920×1080, and 2048×1320 and captured both themes at the endpoint sizes. The artifact is 709262 bytes; the receipt binds its SHA-256 independently of this perceptual review.

Perceptual review: inspected all four final endpoint/theme screenshots. Nodes, route labels, legend, and conclusion cards fit; no relationship crossings or clipped text; the largest viewport has a balanced composition. One focused correction compacted vertical gaps and consolidated conclusion cards after the initial first-screen overflow.

Supplementary Chrome DevTools smoke check on the exact final file: opened the node finder, selected Undo snapshots, inspected its incoming/outgoing semantic passport, and closed it successfully, returning to the full diagram. This supplementary check does not alter the automated evidence status.
