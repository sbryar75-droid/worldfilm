import Link from "next/link";
import { signUp, signInUser } from "@/app/account/actions";

const field = "w-full rounded-lg border border-line bg-surface px-3 py-2";

export default function AuthForm({ mode, searchParams = {} }) {
  const isSignup = mode === "signup";
  return (
    <section className="mx-auto max-w-sm px-[5vw] py-16">
      <h1 className="mb-6 text-2xl font-bold">{isSignup ? "دروستکردنی ئەکاونت" : "چوونەژوورەوە"}</h1>
      {searchParams.msg === "confirm" && (
        <p className="mb-4 rounded-lg border border-line bg-surface p-3 text-sm">ئیمەیڵەکەت بپشکنە و هەژمارەکە پشتڕاست بکەرەوە، پاشان بچۆ ژوورەوە.</p>
      )}
      <form action={isSignup ? signUp : signInUser} className="space-y-3">
        <input name="email" type="email" required placeholder="ئیمەیڵ" dir="ltr" className={field} />
        <input name="password" type="password" required minLength={6} placeholder="وشەی نهێنی (٦ پیت یان زیاتر)" dir="ltr" className={field} />
        {searchParams.error && (
          <p className="text-sm text-red-400">{isSignup ? searchParams.error : "ئیمەیڵ یان وشەی نهێنی هەڵەیە."}</p>
        )}
        <button className="w-full rounded-lg bg-accent py-2 font-semibold text-black">{isSignup ? "دروستکردن" : "چوونەژوورەوە"}</button>
      </form>
      <p className="mt-5 text-sm text-muted">
        {isSignup ? "پێشتر ئەکاونتت هەیە؟ " : "ئەکاونتت نییە؟ "}
        <Link href={isSignup ? "/login" : "/signup"} className="text-accent hover:underline">{isSignup ? "بچۆ ژوورەوە" : "دروستی بکە"}</Link>
      </p>
    </section>
  );
}
