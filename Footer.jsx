import { SITE_NAME } from "@/lib/config";
export default function Footer() {
  return <footer className="border-t border-line px-[5vw] py-8 text-sm text-muted">{SITE_NAME} © {new Date().getFullYear()}</footer>;
  
}
