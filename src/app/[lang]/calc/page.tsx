import type { Metadata } from "next";
import { VALID_LANGS, type Lang } from "@/lib/i18n";
import { buildToolMetadata } from "@/lib/tool-meta";
import CalcClient from "./CalcClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = (VALID_LANGS.includes(lang as Lang) ? lang : "en") as Lang;
  return buildToolMetadata("calc", l);
}

export default function CalcPage() {
  return <CalcClient />;
}
