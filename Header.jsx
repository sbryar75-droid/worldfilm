import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, NAV } from "@/lib/config";
import { getUser } from "@/lib/user";

export default async function Header() {
  const user = await getUser();
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line bg-bg/90 px-[5vw] py-3 backdrop-blur">
      <Link href="/" className="me-auto flex items-center gap-3">
  <Image src="/logo-wf.jpg" alt="" width={48} height={48} priority className="h-12 w-12 rounded-lg object-cover" />
  <span dir="ltr" className="text-xl font-extrabold text-accent">{SITE_NAME}</span>
</Link>
      <nav className="flex gap-1 text-sm">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="rounded-full px-3 py-1.5 text-muted hover:text-white">{n.label}</Link>
        ))}
      </nav>
      <form action="/browse" className="min-w-[200px] flex-1 sm:max-w-xs">
        <input name="q" type="search" placeholder="گەڕان بۆ فیلم یان زنجیرە..." aria-label="گەڕان"
          className="w-full rounded-full border border-line bg-surface px-4 py-1.5 text-sm placeholder:text-muted" />
      </form>
      <Link href={user ? "/account" : "/login"} className="rounded-full border border-line px-3 py-1.5 text-sm">
        {user ? "ئەکاونت" : "چوونەژوورەوە"}
      </Link>
    </header>
  );
}
