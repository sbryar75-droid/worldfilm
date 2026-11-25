// فۆرمی ئەپلۆدکردنی ژێرنووس (.srt یان .vtt). خۆکارانە دەگۆڕدرێت بۆ VTT
export default function SubtitleUpload({ action, id, movieId, has, compact = false }) {
  return (
    <form action={action} className={compact ? "flex items-center gap-2" : "mt-6 rounded-xl border border-line p-4"}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="movie_id" value={movieId} />
      {!compact && (
        <p className="mb-2 text-sm font-semibold">
          ژێرنووسی کوردی {has && <span className="font-normal text-green-400">✓ هەیە</span>}
        </p>
      )}
      <input name="file" type="file" accept=".srt,.vtt" required className="max-w-[210px] text-xs text-muted" />
      <button className="rounded-lg border border-line px-3 py-1 text-xs hover:border-accent">
        {compact && has ? "✓ گۆڕین" : "ئەپلۆد"}
      </button>
    </form>
  );
}
