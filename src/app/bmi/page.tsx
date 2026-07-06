// This page is never rendered in production — middleware redirects /bmi to /[lang]/bmi
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function BmiRootPage() {
  redirect("/en/bmi");
}
