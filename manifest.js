import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/config";

// PWA: ڕێگە دەدات سایتەکە وەک ئەپ لەسەر مۆبایل و کۆمپیوتەر دابمەزرێت
export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0D1114",
    theme_color: "#0D1114",
    lang: "ckb",
    dir: "rtl",
    icons: [
      { src: "/logo-wf.png", sizes: "192x192", type: "image/png" },
      { src: "/logo-wf.png", sizes: "512x512", type: "image/png" },
      { src: "/logo-wf.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
