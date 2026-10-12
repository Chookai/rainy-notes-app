# Rainy Notes App

This branch preserves the existing project and adds the completed local task app alongside it.

| Directory | Project |
| --- | --- |
| [`rainy-notes-app/`](rainy-notes-app/README.md) | Existing frontend/backend application |
| [`local-todo/`](local-todo/README.md) | Small Hours: Next.js, Magic UI, and local SQLite |

## Run Small Hours

Requires Node.js 22 or newer.

```sh
cd local-todo
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The app creates its own local SQLite database; no existing task database or environment secrets are included in this branch.

## Architecture

Download and open these standalone HTML files in a browser:

- [Application architecture](local-todo/docs/visuals/application-architecture.html): layouts, routes, React controls, server actions, repository, and SQLite.
- [Features and runtime flow](local-todo/docs/visuals/small-hours.html): features, counts, persistence, and Undo.

The app's README links its specification, completed tickets, and browser-verification records.
