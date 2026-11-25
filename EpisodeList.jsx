import Link from "next/link";

export default function EpisodeList({ movieId, episodes, currentId }) {
  const seasons = episodes.reduce((acc, e) => ((acc[e.season] ||= []).push(e), acc), {});
  return (
    <div className="mt-8 space-y-6">
      {Object.entries(seasons).map(([s, list]) => (
        <section key={s}>
          <h2 className="mb-3 font-semibold">وەرزی {s}</h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
            {list.map((e) => (
              <Link key={e.id} href={`/movie/${movieId}?ep=${e.id}`}
                className={`rounded-lg border px-3 py-2 text-sm ${e.id === currentId ? "border-accent bg-accent/10 text-accent" : "border-line bg-surface hover:border-muted"}`}>
                {e.number}. {e.title || `ئەپیسۆدی ${e.number}`}
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
