// This page is never rendered in production — middleware redirects / to /[lang]/
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
