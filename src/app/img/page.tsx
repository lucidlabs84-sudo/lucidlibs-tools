// This page is never rendered in production — middleware redirects /img to /[lang]/img
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function ImgRootPage() {
  redirect("/en/img");
}
