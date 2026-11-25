"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUp(fd) {
  const { data, error } = await createClient().auth.signUp({
    email: fd.get("email"),
    password: fd.get("password"),
  });
  if (error) redirect("/signup?error=" + encodeURIComponent(error.message));
  redirect(data.session ? "/account" : "/login?msg=confirm");
}

export async function signInUser(fd) {
  const { error } = await createClient().auth.signInWithPassword({
    email: fd.get("email"),
    password: fd.get("password"),
  });
  if (error) redirect("/login?error=1");
  redirect("/account");
}

export async function signOutUser() {
  await createClient().auth.signOut();
  redirect("/");
}
