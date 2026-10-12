import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ListTodo, Plus } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Counts } from "@/components/counts";
import { TaskForm } from "@/components/task-form";
import { ListForm } from "@/components/list-form";
import { TaskRow } from "@/components/task-row";
import { DeleteListControl } from "@/components/delete-list-control";
import { getList, getTasks } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default async function ListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: value } = await params;
  if (!/^\d+$/.test(value)) notFound();
  const id = Number(value);
  if (!Number.isSafeInteger(id)) notFound();
  const list = getList(id);
  if (!list) notFound();
  const tasks = getTasks(id);
  const unfinished = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  return (
    <>
      <Link href="/" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> All lists</Link>
      <BlurFade duration={0.3} blur="2px" className="page-heading detail-heading">
        <span className="list-symbol"><ListTodo size={23} aria-hidden="true" /></span>
        <div><p className="eyebrow">YOUR LIST</p><h1>{list.name}</h1><p className="subtitle">Make room for what matters.</p></div>
      </BlurFade>
      <div className="list-controls"><ListForm listId={list.id} initialName={list.name} /><DeleteListControl listId={list.id} name={list.name} /></div>
      <section className="summary-panel detail-summary" aria-label="List summary">
        <Counts counts={list} label={`${list.name} counts`} />
      </section>
      <TaskForm listId={list.id} />
      <section className="task-panel" aria-labelledby="tasks-heading">
        <div className="section-heading"><h2 id="tasks-heading">Unfinished tasks</h2><span className="muted">{list.remaining} remaining</span></div>
        {unfinished.length === 0 ? (
          <div className="empty-tasks"><span className="empty-symbol"><Plus size={26} aria-hidden="true" /></span><h3>{tasks.length === 0 ? "A fresh start." : "All caught up."}</h3><p>{tasks.length === 0 ? "No tasks yet. Your next small step goes here." : "A little breathing room. You've earned it."}</p></div>
        ) : (
          <ul aria-label="Unfinished tasks" className="task-list">{unfinished.map((task) => <TaskRow key={task.id} task={task} listId={list.id} />)}</ul>
        )}
      </section>
      {completed.length > 0 && <section className="task-panel" aria-labelledby="completed-heading">
        <div className="section-heading"><h2 id="completed-heading">Completed</h2><span className="muted">{completed.length} done</span></div>
        <ul aria-label="Completed tasks" className="task-list">{completed.map((task) => <TaskRow key={task.id} task={task} listId={list.id} />)}</ul>
      </section>}
    </>
  );
}
