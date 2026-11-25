import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdmin } from "@/lib/admin";

// لەسەر هەموو پەڕەکان: نوێکردنەوەی session ی بەکارهێنەر. پاراستنی /admin
export async function middleware(req) {
  let res = NextResponse.next({ request: req });
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => req.cookies.set(name, value));
        res = NextResponse.next({ request: req });
        list.forEach(({ name, value, options }) => res.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();
  const p = req.nextUrl.pathname;
  if (p.startsWith("/admin") && p !== "/admin/login" && !isAdmin(user)) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
