"use client";

import { useActionState, useRef, useState } from "react";
import { Plus, ArrowRight, LoaderCircle } from "lucide-react";
import { createTask, type FormState } from "@/app/actions";

export function TaskForm({ listId }: { listId: number }) {
  const input = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [state, formAction, pending] = useActionState(
    async (previous: FormState, formData: FormData) => {
      let result: FormState;
      try {
        result = await createTask(listId, previous, formData);
      } catch {
        return { error: "Could not reach the local server. Please try again." };
      }
      if (!result.error) {
        setTitle("");
        input.current?.focus();
      }
      return result;
    },
    {} as FormState,
  );

  return (
    <form action={formAction} className="task-form" aria-label="Add a task">
      <div className="task-entry">
        <label htmlFor="task-title" className="visually-hidden">Task title</label>
        <Plus size={19} aria-hidden="true" />
        <input
          ref={input}
          id="task-title"
          name="title"
          placeholder="What's your next small step?"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoComplete="off"
          readOnly={pending}
          required
          pattern={".*\\S.*"}
          title="Enter a title containing at least one non-whitespace character."
          aria-describedby="task-feedback"
          aria-invalid={state.error ? true : undefined}
        />
        <button type="submit" className="primary-button" disabled={pending}>
          {pending ? <LoaderCircle size={16} className="loading-icon" aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}
          {pending ? "Adding…" : "Add task"}
        </button>
      </div>
      <p id="task-feedback" aria-live="polite" className={state.error ? "form-feedback form-error" : "form-feedback"}>
        {state.error || state.message || "Keep it simple. A title is all you need."}
      </p>
    </form>
  );
}
