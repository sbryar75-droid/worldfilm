import { createClient } from "@/lib/supabase/server";

// هەموو پرسیارەکانی داتابەیس لێرەن. پەڕەکان تەنها ئەم فانکشنانە بانگ دەکەن
export async function getMovies({ type, q, sort = "created_at" } = {}) {
  let query = createClient().from("movies").select("*").order(sort, { ascending: false });
  if (type) query = query.eq("type", type);
  if (q) {
    const s = q.replace(/[%,()]/g, "").trim();
    if (s) query = query.or(`title.ilike.%${s}%,genre.ilike.%${s}%`);
  }
  const { data } = await query;
  return data ?? [];
}

export async function getMovie(id) {
  if (!/^\d+$/.test(String(id))) return null;
  const { data } = await createClient().from("movies").select("*").eq("id", id).maybeSingle();
  return data;
}

export async function getEpisodes(movieId) {
  const { data } = await createClient().from("episodes").select("*")
    .eq("movie_id", movieId).order("season").order("number");
  return data ?? [];
}
