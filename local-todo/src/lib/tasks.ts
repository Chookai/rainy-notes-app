import "server-only";

import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

export type Counts = {
  total: number;
  completed: number;
  remaining: number;
};

export type TaskList = Counts & { id: number; name: string };
export type Task = { id: number; title: string; completed: 0 | 1 };
export type DeletedTask = Task & { listId: number };

const databaseCache = globalThis as typeof globalThis & {
  todoDatabase?: Database.Database;
};

function database() {
  if (databaseCache.todoDatabase) return databaseCache.todoDatabase;

  const path = resolve(process.env.TODO_DB_PATH || "data/todo.sqlite");
  mkdirSync(dirname(path), { recursive: true });
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.transaction(() => {
    const version = db.pragma("user_version", { simple: true });
    if (version === 0) {
      db.exec(`
        CREATE TABLE lists (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL CHECK(length(trim(name)) > 0)
        );
        CREATE TABLE tasks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          list_id INTEGER NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
          title TEXT NOT NULL CHECK(length(trim(title)) > 0),
          completed INTEGER NOT NULL DEFAULT 0 CHECK(completed IN (0, 1))
        );
        CREATE INDEX tasks_by_list ON tasks(list_id, id DESC);
        INSERT INTO lists (name) VALUES ('My Tasks');
        PRAGMA user_version = 1;
      `);
    }
  })();

  databaseCache.todoDatabase = db;
  return db;
}

const listCounts = `
  SELECT lists.id, lists.name, COUNT(tasks.id) AS total,
    COALESCE(SUM(tasks.completed), 0) AS completed,
    COUNT(tasks.id) - COALESCE(SUM(tasks.completed), 0) AS remaining
  FROM lists LEFT JOIN tasks ON tasks.list_id = lists.id
`;

export function getOverview() {
  const lists = database()
    .prepare(`${listCounts} GROUP BY lists.id ORDER BY lists.id`)
    .all() as TaskList[];
  const counts = lists.reduce<Counts>(
    (sum, list) => ({
      total: sum.total + list.total,
      completed: sum.completed + list.completed,
      remaining: sum.remaining + list.remaining,
    }),
    { total: 0, completed: 0, remaining: 0 },
  );
  return { lists, counts };
}

export function getList(id: number) {
  return database()
    .prepare(`${listCounts} WHERE lists.id = ? GROUP BY lists.id`)
    .get(id) as TaskList | undefined;
}

export function addList(name: string) {
  return Number(database().prepare("INSERT INTO lists (name) VALUES (?)").run(name).lastInsertRowid);
}

export function removeList(id: number) {
  return database().prepare("DELETE FROM lists WHERE id = ?").run(id).changes > 0;
}

export function updateListName(id: number, name: string) {
  return database().prepare("UPDATE lists SET name = ? WHERE id = ?").run(name, id).changes > 0;
}

export function addTask(listId: number, title: string) {
  database().prepare("INSERT INTO tasks (list_id, title) VALUES (?, ?)").run(listId, title);
}

export function updateTaskTitle(listId: number, taskId: number, title: string) {
  return database().prepare("UPDATE tasks SET title = ? WHERE id = ? AND list_id = ?")
    .run(title, taskId, listId).changes > 0;
}

export function updateTaskCompletion(listId: number, taskId: number, completed: boolean) {
  return database().prepare("UPDATE tasks SET completed = ? WHERE id = ? AND list_id = ?")
    .run(completed ? 1 : 0, taskId, listId).changes > 0;
}

export function removeTask(listId: number, taskId: number) {
  return database().prepare(
    "DELETE FROM tasks WHERE id = ? AND list_id = ? RETURNING id, list_id AS listId, title, completed",
  ).get(taskId, listId) as DeletedTask | undefined;
}

export function restoreTask(task: DeletedTask) {
  return database().prepare(`
    INSERT INTO tasks (id, list_id, title, completed)
    SELECT ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM lists WHERE id = ?)
  `).run(task.id, task.listId, task.title, task.completed, task.listId).changes > 0;
}

export function getTasks(listId: number) {
  return database()
    .prepare("SELECT id, title, completed FROM tasks WHERE list_id = ? ORDER BY id DESC")
    .all(listId) as Task[];
}
