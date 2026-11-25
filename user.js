import { createClient } from "@/lib/supabase/server";

// پرسیارەکانی تایبەت بە بەکارهێنەر. RLS دڵنیا دەکاتەوە تەنها داتای خۆی دەبینێت
export async function getUser() {
  const { data: { user } } = await createClient().auth.getUser();
  return user;
}

export async function isFavorite(movieId) {
  const { data } = await createClient().from("favorites").select("movie_id").eq("movie_id", movieId).maybeSingle();
  return !!data;
}

export async function getProgress(movieId, episodeId = 0) {
  const { data } = await createClient().from("watch_progress").select("position_seconds,duration_seconds")
    .eq("movie_id", movieId).eq("episode_id", episodeId).maybeSingle();
  return data;
}

export async function getFavorites() {
  const { data } = await createClient().from("favorites").select("movies(*)").order("created_at", { ascending: false });
  return (data ?? []).map((r) => r.movies).filter(Boolean);
}

export async function getContinueWatching() {
  const { data } = await createClient().from("watch_progress")
    .select("movie_id,episode_id,position_seconds,duration_seconds,movies(*)")
    .order("updated_at", { ascending: false }).limit(30);
  const seen = new Set();
  return (data ?? []).filter((r) => {
    if (!r.movies || seen.has(r.movie_id)) return false;
    seen.add(r.movie_id);
    const d = r.duration_seconds || 0;
    return r.position_seconds > 10 && (!d || r.position_seconds < d - 30); // تەواو نەبووبێت
  }).slice(0, 12);
}
