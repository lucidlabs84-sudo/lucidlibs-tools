import type { Metadata } from "next";
import { siteName, type Lang } from "@/lib/i18n";

const VALID_LANGS: Lang[] = ["pt", "tr", "th", "vn", "en"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = (VALID_LANGS.includes(lang as Lang) ? lang : "en") as Lang;

  return {
    title: siteName(l),
    description:
      "Free online tools: PDF converter, image compressor, BMI calculator, QR code generator, and more. No sign-up, no ads.",
    alternates: {
      languages: Object.fromEntries(
        VALID_LANGS.map((code) => [code, `/${code}`])
      ),
    },
    other: {
      "google": "notranslate",
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
