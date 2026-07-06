import type { Metadata } from "next";
import { siteName, VALID_LANGS, type Lang } from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";

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

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = (VALID_LANGS.includes(lang as Lang) ? lang : "en") as Lang;

  return (
    <>
      <SiteHeader lang={l} />
      {children}
    </>
  );
}
