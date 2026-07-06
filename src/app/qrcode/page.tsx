// This page is never rendered in production — middleware redirects /qrcode to /[lang]/qrcode
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function QrcodeRootPage() {
  redirect("/en/qrcode");
}
