import MovieCard from "./MovieCard";

export default function MovieRow({ title, items }) {
  return (
    <section className="px-[5vw] py-4">
      <h2 className="mb-3 text-lg font-semibold">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((m) => (<div key={m.id} className="w-36 shrink-0"><MovieCard movie={m} /></div>))}
      </div>
    </section>
  );
}
