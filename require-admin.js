import { redirect } from "next/navigation";
import { getUser } from "@/lib/user";
import { isAdmin } from "@/lib/admin";

// لە سەرەتای هەر پەڕەیەکی ئەدمین بانگ دەکرێت (چینی دووەمی پاراستن)
export async function requireAdminPage() {
  const user = await getUser();
  if (!isAdmin(user)) redirect("/admin/login");
  return user;
}
