"use client";

import { usePathname } from "next/navigation";

const SITE = "https://tools.lucidlibs.dev";

const TOOL_META: Record<string, { name: string; desc: string }> = {
  pdf: {
    name: "PDF Tools",
    desc: "Convert PDF to Word, compress PDF, merge PDFs — all free, all in your browser.",
  },
  bmi: {
    name: "BMI Calculator",
    desc: "Calculate your Body Mass Index with WHO classification. For adults and children.",
  },
  img: {
    name: "Image Compressor",
    desc: "Compress JPG, PNG, WebP images without quality loss. Batch processing support.",
  },
  calc: {
    name: "Calculator",
    desc: "Percentage, compound interest, rule of three, tip, discount — all in one.",
  },
  qrcode: {
    name: "QR Code Generator",
    desc: "Generate QR codes for URLs, text, email, phone, WiFi, vCard. Customize colors.",
  },
};

const HOME_LABELS: Record<string, string> = {
  pt: "Início",
  tr: "Ana Sayfa",
  th: "หน้าแรก",
  vn: "Trang chủ",
  en: "Home",
};

export default function BreadcrumbJsonLd({ lang }: { lang: string }) {
  const pathname = usePathname();
  // pathname = "/pt/pdf" etc
  const homeLabel = HOME_LABELS[lang] || "Home";

  const parts = pathname.split("/").filter(Boolean);
  // parts = ["pt", "pdf"] or ["pt"] or ["en", "bmi"]
  const tool = parts[1]; // pdf, bmi, etc or undefined

  const items: { name: string; item: string }[] = [];
  items.push({ name: homeLabel, item: `${SITE}/${lang}` });

  if (tool && TOOL_META[tool]) {
    items.push({
      name: TOOL_META[tool].name,
      item: `${SITE}/${lang}/${tool}`,
    });
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item,
    })),
  };

  // WebApplication schema only on tool pages
  const toolSchema = tool && TOOL_META[tool]
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: TOOL_META[tool].name,
        description: TOOL_META[tool].desc,
        url: `${SITE}/${lang}/${tool}`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
      }
    : null;

  const schemas: Record<string, unknown>[] = [breadcrumbLd];
  if (toolSchema) schemas.push(toolSchema as unknown as Record<string, unknown>);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length > 1 ? schemas : breadcrumbLd),
      }}
    />
  );
}
