import Link from "next/link";
import { toggleFavorite } from "@/app/watch/actions";

const base = "rounded-full border px-4 py-1.5 text-sm transition-colors";

export default function FavoriteButton({ movieId, active, loggedIn }) {
  if (!loggedIn) {
    return <Link href="/login" className={`${base} border-line text-muted hover:text-white`}>♡ زیادکردن بۆ دڵخوازەکان</Link>;
  }
  return (
    <form action={toggleFavorite}>
      <input type="hidden" name="movie_id" value={movieId} />
      <button className={`${base} ${active ? "border-accent bg-accent/10 text-accent" : "border-line hover:border-muted"}`}>
        {active ? "♥ لە دڵخوازەکانە" : "♡ زیادکردن بۆ دڵخوازەکان"}
      </button>
    </form>
  );
}
