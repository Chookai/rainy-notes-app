"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deleteList } from "@/app/actions";
import { useUndo } from "@/components/undo-provider";

export function DeleteListControl({ listId, name }: { listId: number; name: string }) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const { discardListUndos } = useUndo();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  return (
    <>
      <button type="button" className="secondary-button delete-button" aria-label={`Delete list ${name}`} onClick={() => { setError(""); setOpen(true); }}><Trash2 size={14} aria-hidden="true" /> Delete list</button>
      <dialog ref={dialog} className="confirmation-dialog" aria-labelledby={`${id}-heading`} aria-describedby={`${id}-description`} onClose={() => setOpen(false)} onCancel={(event) => { if (pending) event.preventDefault(); }}>
        <span className="dialog-symbol"><Trash2 size={23} aria-hidden="true" /></span>
        <h2 id={`${id}-heading`}>Delete {name}?</h2>
        <p id={`${id}-description`}>This removes the list and all of its tasks. This can’t be undone.</p>
        {error && <p role="alert" className="form-error">{error}</p>}
        <div className="dialog-actions">
          <button type="button" className="secondary-button" autoFocus disabled={pending} onClick={() => setOpen(false)}>Cancel</button>
          <button type="button" className="danger-button" disabled={pending} onClick={() => {
            startTransition(async () => {
              let result;
              try {
                result = await deleteList(listId);
              } catch {
                setError("Could not reach the local server. Please try again.");
                return;
              }
              if (result.error) { setError(result.error); return; }
              discardListUndos(listId);
              setOpen(false);
              if (pathname === `/lists/${listId}`) router.replace("/");
              else router.refresh();
            });
          }}>{pending ? "Deleting…" : "Delete list"}</button>
        </div>
      </dialog>
    </>
  );
}
