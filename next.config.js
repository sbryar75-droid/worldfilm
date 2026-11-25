// هێدەری پاراستن بۆ هەموو پەڕەکان
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: { serverActions: { bodySizeLimit: "3mb" } }, // بۆ فایلی ژێرنووس
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};
