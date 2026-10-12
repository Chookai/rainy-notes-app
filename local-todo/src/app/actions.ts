"use server";

import { revalidatePath } from "next/cache";
import { addList, addTask, getList, removeList, removeTask, updateListName, updateTaskCompletion, updateTaskTitle } from "@/lib/tasks";
import { forgetListDeletions, rememberDeletion, restoreDeletion } from "@/lib/undo";

export type FormState = { error?: string; message?: string };

function textField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function revalidateListViews(listId: number) {
  revalidatePath("/");
  revalidatePath(`/lists/${listId}`);
}

export async function createList(_previous: FormState, formData: FormData): Promise<FormState> {
  const name = textField(formData, "name");
  if (!name) return { error: "Enter a list name." };
  try {
    addList(name);
  } catch (error) {
    console.error("List creation failed:", error);
    return { error: "Could not save your list. Please try again." };
  }
  revalidatePath("/");
  return { message: "List created." };
}

export async function renameList(listId: number, _previous: FormState, formData: FormData): Promise<FormState> {
  const name = textField(formData, "name");
  if (!name) return { error: "Enter a list name." };
  try {
    if (!Number.isSafeInteger(listId) || !updateListName(listId, name)) {
      return { error: "This list is no longer available." };
    }
  } catch (error) {
    console.error("List rename failed:", error);
    return { error: "Could not rename your list. Please try again." };
  }
  revalidateListViews(listId);
  return { message: "List renamed." };
}

export async function deleteList(listId: number): Promise<FormState> {
  try {
    if (!Number.isSafeInteger(listId) || !removeList(listId)) {
      return { error: "This list is no longer available." };
    }
    forgetListDeletions(listId);
  } catch (error) {
    console.error("List deletion failed:", error);
    return { error: "Could not delete your list. Please try again." };
  }
  // Refresh the overview; the client leaves the removed detail route after success.
  revalidatePath("/");
  return {};
}

export async function editTask(listId: number, taskId: number, _previous: FormState, formData: FormData): Promise<FormState> {
  const title = textField(formData, "title");
  if (!title) return { error: "Enter a task title." };
  try {
    if (!Number.isSafeInteger(listId) || !Number.isSafeInteger(taskId) || !updateTaskTitle(listId, taskId, title)) {
      return { error: "This task is no longer available." };
    }
  } catch (error) {
    console.error("Task edit failed:", error);
    return { error: "Could not save your task. Please try again." };
  }
  revalidateListViews(listId);
  return { message: "Task updated." };
}

export async function setTaskCompleted(listId: number, taskId: number, completed: boolean): Promise<FormState> {
  try {
    if (!Number.isSafeInteger(listId) || !Number.isSafeInteger(taskId) || typeof completed !== "boolean" || !updateTaskCompletion(listId, taskId, completed)) {
      return { error: "This task is no longer available." };
    }
  } catch (error) {
    console.error("Task completion failed:", error);
    return { error: "Could not update your task. Please try again." };
  }
  revalidateListViews(listId);
  return {};
}

export type DeleteTaskState = FormState & { token?: string; expiresAt?: number };

export async function deleteTask(listId: number, taskId: number): Promise<DeleteTaskState> {
  try {
    if (!Number.isSafeInteger(listId) || !Number.isSafeInteger(taskId)) {
      return { error: "This task is no longer available." };
    }
    const task = removeTask(listId, taskId);
    if (!task) return { error: "This task is no longer available." };
    const recovery = rememberDeletion(task);
    revalidateListViews(listId);
    return recovery;
  } catch (error) {
    console.error("Task deletion failed:", error);
    return { error: "Could not delete your task. Please try again." };
  }
}

export async function undoTask(token: string): Promise<FormState> {
  try {
    const listId = restoreDeletion(token);
    if (listId === undefined) return { error: "This task can no longer be restored." };
    revalidateListViews(listId);
    return {};
  } catch (error) {
    console.error("Task restoration failed:", error);
    return { error: "Could not restore your task. Please try again." };
  }
}

export async function createTask(
  listId: number,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = textField(formData, "title");
  if (!title) return { error: "Enter a task title." };
  try {
    if (!Number.isSafeInteger(listId) || !getList(listId)) {
      return { error: "This list is no longer available." };
    }
    addTask(listId, title);
  } catch (error) {
    console.error("Task creation failed:", error);
    return { error: "Could not save your task. Please try again." };
  }
  revalidateListViews(listId);
  return { message: "Task added." };
}
