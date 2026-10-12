import "server-only";

import { randomUUID } from "node:crypto";
import { restoreTask, type DeletedTask } from "@/lib/tasks";

type UndoEntry = { task: DeletedTask; expiresAt: number };
const cache = globalThis as typeof globalThis & { taskUndos?: Map<string, UndoEntry> };
const undos = cache.taskUndos ??= new Map<string, UndoEntry>();

export function rememberDeletion(task: DeletedTask) {
  const token = randomUUID();
  const expiresAt = Date.now() + 5_000;
  undos.set(token, { task, expiresAt });
  setTimeout(() => undos.delete(token), 5_000).unref();
  return { token, expiresAt };
}

export function forgetListDeletions(listId: number) {
  for (const [token, entry] of undos) {
    if (entry.task.listId === listId) undos.delete(token);
  }
}

export function restoreDeletion(token: string) {
  const entry = typeof token === "string" ? undos.get(token) : undefined;
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    undos.delete(token);
    return undefined;
  }
  if (!restoreTask(entry.task)) {
    undos.delete(token);
    return undefined;
  }
  undos.delete(token);
  return entry.task.listId;
}
