import Link from "next/link";
import Poster from "./Poster";

export default function ContinueCard({ item }) {
  const m = item.movies;
  const pct = item.duration_seconds ? Math.min(100, Math.round((item.position_seconds / item.duration_seconds) * 100)) : 0;
  const href = `/movie/${m.id}${item.episode_id ? `?ep=${item.episode_id}` : ""}`;
  return (
    <Link href={href} className="block w-36 shrink-0">
      <Poster movie={m} className="text-sm" />
      <div className="mt-2 h-1 rounded bg-line"><div className="h-1 rounded bg-accent" style={{ width: `${pct}%` }} /></div>
      <small className="text-muted">{pct}% بینراوە</small>
    </Link>
  );
}
