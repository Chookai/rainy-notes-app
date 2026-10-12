import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty-tasks">
      <h1>That list isn’t here.</h1>
      <p>Head back to your workspace to find your lists.</p>
      <Link href="/" className="primary-button">All lists</Link>
    </div>
  );
}
