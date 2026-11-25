import Link from "next/link";
import Poster from "./Poster";

export default function MovieCard({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <Poster movie={movie} className="text-sm transition-transform group-hover:-translate-y-1" />
      <small className="mt-1.5 block text-muted">{movie.year} · {movie.type}</small>
    </Link>
  );
}
