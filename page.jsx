import Link from "next/link";
import { redirect } from "next/navigation";
import MovieCard from "@/components/movie/MovieCard";
import ContinueCard from "@/components/movie/ContinueCard";
import { getUser, getFavorites, getContinueWatching } from "@/lib/user";
import { isAdmin } from "@/lib/admin";
import { signOutUser } from "./actions";

export const metadata = { title: "ئەکاونتی من" };

export default async function AccountPage() {
  const user = await getUser();
  if (!user) redirect("/login");
  const [favorites, continuing] = await Promise.all([getFavorites(), getContinueWatching()]);

  return (
    <section className="px-[5vw] py-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">ئەکاونتی من</h1>
          <p dir="ltr" className="text-start text-sm text-muted">{user.email}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {isAdmin(user) && <Link href="/admin" className="text-accent hover:underline">پانێلی ئەدمین</Link>}
          <form action={signOutUser}><button className="rounded-full border border-line px-4 py-1.5">دەرچوون</button></form>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-semibold">درێژەدان بە سەیرکردن</h2>
      {continuing.length ? (
        <div className="mb-10 flex gap-4 overflow-x-auto pb-2">{continuing.map((i) => <ContinueCard key={i.movie_id} item={i} />)}</div>
      ) : (
        <p className="mb-10 text-sm text-muted">هێشتا هیچت سەیر نەکردووە. فیلمێک دەستپێبکە و شوێنی وەستانت خۆکارانە پاشەکەوت دەکرێت.</p>
      )}

      <h2 className="mb-3 text-lg font-semibold">لیستی دڵخوازەکان</h2>
      {favorites.length ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">{favorites.map((m) => <MovieCard key={m.id} movie={m} />)}</div>
      ) : (
        <p className="text-sm text-muted">لیستەکەت بەتاڵە. لە پەڕەی هەر فیلمێک دوگمەی ♡ بکە.</p>
      )}
    </section>
  );
}
