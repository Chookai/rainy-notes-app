"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { undoTask } from "@/app/actions";

type Notification = { token: string; expiresAt: number; listId: number; title: string };
type UndoContextValue = {
  notifyDeleted: (entry: Notification) => void;
  discardListUndos: (listId: number) => void;
};
const UndoContext = createContext<UndoContextValue | null>(null);

export function useUndo() {
  const value = useContext(UndoContext);
  if (!value) throw new Error("Task Undo must be inside UndoProvider.");
  return value;
}

export function UndoProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<Notification[]>([]);
  const [restoring, setRestoring] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (entries.length === 0) return;
    const expiresAt = Math.min(...entries.map((entry) => entry.expiresAt));
    const timer = setTimeout(() => {
      setEntries((current) => current.filter((entry) => entry.expiresAt > Date.now()));
    }, Math.max(0, expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [entries]);

  return (
    <UndoContext.Provider value={{
      notifyDeleted: (entry) => { setError(""); setEntries((current) => [...current, entry]); },
      discardListUndos: (listId) => setEntries((current) => current.filter((entry) => entry.listId !== listId)),
    }}>
      {children}
      <aside className="undo-notifications" aria-label="Task deletion notifications">
        <div aria-live="polite" aria-atomic="false">
          {entries.map((entry) => <div key={entry.token} className="undo-toast">
            <span><strong>Task deleted</strong><span className="deleted-title">{entry.title}</span></span>
            <button type="button" className="undo-button" disabled={restoring.includes(entry.token)} aria-label={`Undo deletion of ${entry.title}`} onClick={async () => {
              setRestoring((current) => [...current, entry.token]);
              let result;
              try {
                result = await undoTask(entry.token);
              } catch {
                result = { error: "Could not reach the local server. Please try again." };
              }
              if (!result.error) setEntries((current) => current.filter((item) => item.token !== entry.token));
              setError(result.error || "");
              setRestoring((current) => current.filter((token) => token !== entry.token));
            }}><RotateCcw size={15} aria-hidden="true" /> {restoring.includes(entry.token) ? "Restoring…" : "Undo"}</button>
          </div>)}
        </div>
        {error && <p role="alert" className="undo-toast form-error">{error}<button type="button" className="row-button" aria-label="Dismiss Undo error" onClick={() => setError("")}>×</button></p>}
      </aside>
    </UndoContext.Provider>
  );
}
