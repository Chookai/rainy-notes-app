import Link from "next/link";
import { ArrowUpRight, ListTodo } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Counts } from "@/components/counts";
import { ListForm } from "@/components/list-form";
import { DeleteListControl } from "@/components/delete-list-control";
import { getOverview } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default function OverviewPage() {
  const { lists, counts } = getOverview();

  return (
    <>
      <BlurFade duration={0.3} blur="2px" className="page-heading">
        <p className="eyebrow">A LITTLE SPACE TO GET THINGS DONE</p>
        <h1>Your lists<span className="accent">.</span></h1>
        <p className="subtitle">A little less on your mind. One task at a time.</p>
      </BlurFade>
      <section className="summary-panel" aria-label="Workspace summary">
        <div className="section-label">THE BIG PICTURE <span>Across all your lists</span></div>
        <Counts counts={counts} label="Combined counts" />
      </section>
      <section className="lists-section" aria-labelledby="lists-heading">
        <div className="section-heading">
          <h2 id="lists-heading">Your workspace</h2>
          <span className="muted">{lists.length} {lists.length === 1 ? "list" : "lists"}</span>
        </div>
        <ListForm empty={lists.length === 0} />
        {lists.length === 0 && <div className="empty-lists"><span className="empty-symbol"><ListTodo size={24} aria-hidden="true" /></span><h3>No lists yet.</h3><p>A little room to start again. Create a list when you’re ready.</p></div>}
        <div className="list-grid">
          {lists.map((list, index) => (
            <BlurFade key={list.id} delay={index * 0.04} duration={0.3} blur="2px">
              <div className="list-card-wrapper">
              <Link href={`/lists/${list.id}`} className="list-card" aria-label={`Open ${list.name}`}>
                <div className="list-card-top">
                  <span className="list-symbol"><ListTodo size={23} aria-hidden="true" /></span>
                  <ArrowUpRight className="card-arrow" size={21} aria-hidden="true" />
                </div>
                <h3>{list.name}</h3>
                <p className="card-description">{list.remaining === 0 ? "A clear space for your next idea." : `${list.remaining} ${list.remaining === 1 ? "task" : "tasks"} waiting for you.`}</p>
                <Counts counts={list} label={`${list.name} counts`} compact />
              </Link>
              <div className="list-card-footer"><DeleteListControl listId={list.id} name={list.name} /></div>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>
    </>
  );
}
