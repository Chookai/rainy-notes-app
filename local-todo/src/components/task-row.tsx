"use client";

import { useActionState, useId, useState, useTransition } from "react";
import { Pencil, Check, X, Trash2 } from "lucide-react";
import { deleteTask, editTask, setTaskCompleted, type FormState } from "@/app/actions";
import { useUndo } from "@/components/undo-provider";
import type { Task } from "@/lib/tasks";

export function TaskRow({ task, listId }: { task: Task; listId: number }) {
  const id = useId();
  const { notifyDeleted } = useUndo();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [error, setError] = useState("");
  const [mutationPending, startTransition] = useTransition();
  const [state, action, saving] = useActionState(async (previous: FormState, data: FormData) => {
    let result: FormState;
    try {
      result = await editTask(listId, task.id, previous, data);
    } catch {
      return { error: "Could not reach the local server. Please try again." };
    }
    if (!result.error) setEditing(false);
    return result;
  }, {} as FormState);
  const busy = saving || mutationPending;

  return (
    <li className="task-row">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed === 1}
        disabled={busy}
        aria-label={`Mark ${task.title} ${task.completed ? "unfinished" : "completed"}`}
        onChange={(event) => {
          const completed = event.target.checked;
          setError("");
          startTransition(async () => {
            try {
              const result = await setTaskCompleted(listId, task.id, completed);
              setError(result.error || "");
            } catch {
              setError("Could not reach the local server. Please try again.");
            }
          });
        }}
      />
      <div className="task-content">
        {editing ? (
          <form action={action} aria-label={`Edit ${task.title}`} className="task-edit-form">
            <label htmlFor={id} className="visually-hidden">Task title</label>
            <input id={id} name="title" value={title} onChange={(event) => setTitle(event.target.value)} required pattern={".*\\S.*"} title="Enter a non-blank task title." readOnly={busy} autoFocus aria-describedby={`${id}-feedback`} aria-invalid={state.error ? true : undefined} />
            <div className="edit-actions">
              <button type="submit" className="secondary-button" disabled={busy}><Check size={14} aria-hidden="true" /> Save</button>
              <button type="button" className="secondary-button" disabled={busy} onClick={() => setEditing(false)}><X size={14} aria-hidden="true" /> Cancel</button>
            </div>
            <p id={`${id}-feedback`} className="form-feedback form-error" aria-live="polite">{state.error}</p>
          </form>
        ) : (
          <span className={task.completed ? "task-title completed-title" : "task-title"}>{task.title}</span>
        )}
        {error && <p role="alert" className="form-feedback form-error">{error}</p>}
      </div>
      {!editing && <div className="row-actions">
        <button type="button" className="row-button" aria-label={`Edit ${task.title}`} disabled={busy} onClick={() => { setTitle(task.title); setEditing(true); }}><Pencil size={15} aria-hidden="true" /></button>
        <button type="button" className="row-button delete-button" aria-label={`Delete ${task.title}`} disabled={busy} onClick={() => {
          setError("");
          startTransition(async () => {
            try {
              const result = await deleteTask(listId, task.id);
              if (result.error) setError(result.error);
              else if (result.token && result.expiresAt) notifyDeleted({ token: result.token, expiresAt: result.expiresAt, listId, title: task.title });
            } catch {
              setError("Could not reach the local server. Please try again.");
            }
          });
        }}><Trash2 size={15} aria-hidden="true" /></button>
      </div>}
    </li>
  );
}
