// ئەگەر poster_url هەبێت وێنە پیشان دەدات، نەک ئەوا گرادیەنتی کاتی
export default function Poster({ movie, className = "" }) {
  return (
    <div className={`relative flex aspect-[2/3] items-end overflow-hidden rounded-xl p-3 font-extrabold leading-snug ${className}`}
      style={{ background: `linear-gradient(160deg, hsl(${movie.hue} 55% 38%), hsl(${movie.hue + 40} 50% 12%))` }}>
      {movie.poster_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={movie.poster_url} alt={movie.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="relative">{movie.title}</span>
        </>
      )}
    </div>
  );
}
