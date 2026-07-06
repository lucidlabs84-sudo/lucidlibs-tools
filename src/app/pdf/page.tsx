// This page is never rendered in production — middleware redirects /pdf to /[lang]/pdf
// Exists only for Next.js build completion
import { redirect } from "next/navigation";

export default function PdfRootPage() {
  redirect("/en/pdf");
}
