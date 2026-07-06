// This page is never rendered in production — middleware redirects /calc to /[lang]/calc
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function CalcRootPage() {
  redirect("/en/calc");
}
