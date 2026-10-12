"use client";

import { useActionState, useId, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { createList, renameList, type FormState } from "@/app/actions";

export function ListForm({ listId, initialName = "", empty = false }: { listId?: number; initialName?: string; empty?: boolean }) {
  const id = useId();
  const [name, setName] = useState(initialName);
  const renaming = listId !== undefined;
  const [state, action, pending] = useActionState(async (previous: FormState, data: FormData) => {
    let result: FormState;
    try {
      result = renaming ? await renameList(listId, previous, data) : await createList(previous, data);
    } catch {
      return { error: "Could not reach the local server. Please try again." };
    }
    if (!result.error) setName(renaming ? name.trim() : "");
    return result;
  }, {} as FormState);

  return (
    <details className="list-editor">
      <summary className={renaming ? "secondary-button" : "primary-button"}>
        {renaming ? <Pencil size={15} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        {renaming ? "Rename list" : empty ? "Create list" : "New list"}
      </summary>
      <form action={action} aria-label={renaming ? "Rename list" : "Create a list"} className="list-form">
        <label htmlFor={id}>List name</label>
        <div className="name-entry">
          <input id={id} name="name" value={name} onChange={(event) => setName(event.target.value)} required pattern={".*\\S.*"} title="Enter a non-blank list name." readOnly={pending} aria-invalid={state.error ? true : undefined} aria-describedby={`${id}-feedback`} placeholder="e.g. Work, Home, Someday" />
          <button type="submit" className="primary-button" disabled={pending}>{pending ? "Saving…" : renaming ? "Save name" : "Create list"}</button>
        </div>
        <p id={`${id}-feedback`} className={state.error ? "form-feedback form-error" : "form-feedback"} aria-live="polite">{state.error || state.message || "A place for things that belong together."}</p>
      </form>
    </details>
  );
}
