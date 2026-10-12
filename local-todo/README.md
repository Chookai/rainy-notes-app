# Small Hours

A local, two-screen task app built with Next.js, Magic UI, and SQLite.

- Overview with per-list and combined total/completed/remaining counts.
- Create, rename, and delete lists; confirmation before deleting their tasks.
- Create, edit, complete, reopen, and delete tasks, with five-second Undo.
- Persistent local data, keyboard-operable controls, responsive light/dark UI.
- No accounts, cloud services, or additional primary screens.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**. The server binds to loopback, not your network. No accounts or cloud services are required.

For an optimized local instance:

```sh
npm run build
npm start
```

The database defaults to `data/todo.sqlite` and is created on first use. SQLite's schema version records initialization independently of the number of lists. Restarting never duplicates the default list. Keep the database and its accompanying WAL files private; they are Git-ignored.

To choose another database, set `TODO_DB_PATH` before starting the server, or put it in `.env.local`. Relative paths are resolved from this project directory. Stop the server before changing its database setting. Never replace or delete a database containing data you want to keep.

## Verify

```sh
npm run typecheck
npm run lint
npm run build
```

The agreed acceptance seam is the browser-visible app against its real local server and a disposable SQLite database. Chrome DevTools MCP is the primary testing tool; no separate browser automation framework or unit-test seam is introduced.

Start an isolated acceptance instance:

```sh
TODO_DB_PATH=.test-data/acceptance.sqlite npm run dev -- --port 3017
```

Open **http://127.0.0.1:3017** for this isolated instance. A dedicated test port avoids interference with another app using port 3000.

Use a fresh file for fresh-initialization scenarios, and reuse that same file for persistence/restart scenarios. Follow the browser suites under `tests/browser/`. Verification reports live alongside the local tickets. Browser scenarios are interactive and must be run explicitly; typechecking and linting do not execute them. See `.scratch/local-todo/verification/README.md` for completed checks, screenshots, and residual notes (including development-tool advisories and a keyboard-Undo tooling timing limitation).

## Scope and sources

The spec and implementation tickets live under `.scratch/local-todo/`. The domain glossary is `CONTEXT.md`.

Magic UI's Blur Fade component is vendored from its official registry, with the upstream MIT license beside it. Icons come from Lucide. All fonts are system fonts; no external font service is needed.
