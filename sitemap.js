import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-dynamic";

// نەخشەی سایت: هەموو فیلم و زنجیرەکان خۆکارانە زیاد دەبن بۆ گووگڵ
export default async function sitemap() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data } = await supabase.from("movies").select("id,created_at");
  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/browse`, lastModified: new Date() },
    ...(data ?? []).map((m) => ({ url: `${SITE_URL}/movie/${m.id}`, lastModified: new Date(m.created_at) })),
  ];
}
