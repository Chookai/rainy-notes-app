# Application architecture delivery

Open: http://127.0.0.1:3018/application-architecture.html

Previous features/runtime view: http://127.0.0.1:3018/small-hours.html

```text
diagram_type: architecture
output: /home/kai/procurement-system/matt/docs/visuals/application-architecture.html
specification_sha256: 0432ad4898ca6390ccc0eda24bce18570bb038413c7aa7b40885116b861ea474
artifact_sha256: e9bcb6b9827a5571bf167fdf284d487c843bae127f34e5b7cf48833b2df587fd
validation: 9/9 showcase, 0 errors, 0 warnings
browser_evidence: passed
visual_review: passed
correction_rounds: 0
```

The application map explicitly shows shared layout/providers, the two server-rendered routes, interactive client components, Server Actions, the task/list repository, SQLite, and the temporary Undo registry. Dependencies distinguish direct server-page reads from action-mediated writes. RootLayout and its client Providers are grouped as the shared shell, not presented as a single server-only implementation.

Automated evidence is recorded in `application-architecture.visual-check.json`: desktop measurements at 1440×900, 1600×1000, 1920×1080, and 2048×1320, plus light/dark screenshots at the endpoint sizes. Perceptual review inspected all four final screenshots: node/label fit, distinct read/write paths, no crossings, complete legend, balanced largest-screen composition, and no clipping.

The final file is 710039 bytes. Chrome DevTools also opened the HTTP URL successfully; fetching that URL produced exactly the artifact SHA-256 above. The existing task application on port 3017 was not changed or restarted.

The diagram server is loopback-only, rooted at `docs/visuals`, with PID recorded in `/tmp/small-hours-architecture-server.pid` and log in `/tmp/small-hours-architecture-server.log`. To restart it if needed:

```sh
python3 -m http.server 3018 --bind 127.0.0.1 --directory docs/visuals
```

Both HTML diagrams also work directly from disk without that server.
