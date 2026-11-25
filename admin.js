export function isAdmin(user) {
  const list = (process.env.ADMIN_EMAILS || "").split(",").map((s) => s.trim().toLowerCase());
  return !!user?.email && list.includes(user.email.toLowerCase());
}
