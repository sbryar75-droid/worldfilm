import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";

const font = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "600", "800"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} - فیلم و زنجیرە`, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "ckb_IQ", title: SITE_NAME, description: SITE_DESCRIPTION },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
};
export const viewport = { themeColor: "#0D1114", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="ckb" dir="rtl">
      <body className={font.className}>
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
