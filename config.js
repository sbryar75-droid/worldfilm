import { getImageSize } from "next/dist/server/image-optimizer";

// ناوی سایت تەنها لێرە بگۆڕە، هەموو شوێنێک خۆی نوێ دەبێتەوە
export const SITE_NAME = "WORLD FILM";
export const SITE_DESCRIPTION = "باشترین فیلم و زنجیرەکان تەماشابکە";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
export const NAV = [
  { label: "سەرەکی", href: "/" },
  { label: "فیلم", href: "/browse?type=فیلم" },
  { label: "زنجیرە", href: "/browse?type=زنجیرە" },
];
