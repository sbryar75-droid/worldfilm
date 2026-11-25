import crypto from "node:crypto";

// واژۆکردنی لینکی ڤیدیۆ بە Token Authentication ی Bunny CDN
export function signBunnyUrl(url, { key, mode = "advanced", ttl = 6 * 3600 }) {
  const u = new URL(url);
  const dir = u.pathname.replace(/[^/]*$/, "");
  const expires = Math.floor(Date.now() / 1000) + ttl;
  const message = dir + expires + `token_path=${dir}`;
  const raw = mode === "basic"
    ? crypto.createHash("sha256").update(key + message).digest()
    : crypto.createHmac("sha256", key).update(message).digest();
  const b64 = raw.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const token = (mode === "basic" ? "" : "HS256-") + b64;
  return `${u.origin}/bcdn_token=${token}&token_path=${encodeURIComponent(dir)}&expires=${expires}${u.pathname}`;
}

// ئەگەر Bunny ڕێکنەخرابێت، لینکەکە وەک خۆی دەگەڕێتەوە
export function protectUrl(url) {
  const key = process.env.BUNNY_TOKEN_KEY;
  const host = process.env.BUNNY_CDN_HOST;
  if (!url || !key || !host) return url || null;
  try {
    if (new URL(url).host !== host) return url;
    return signBunnyUrl(url, { key, mode: process.env.BUNNY_TOKEN_MODE || "advanced" });
  } catch {
    return url;
  }
}