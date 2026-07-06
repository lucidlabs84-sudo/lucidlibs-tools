import type { Metadata } from "next";
import { siteName, VALID_LANGS, type Lang } from "@/lib/i18n";
import { HREFLANG } from "@/lib/tool-meta";
import SiteHeader from "@/components/SiteHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l = (VALID_LANGS.includes(lang as Lang) ? lang : "en") as Lang;

  const descriptions: Record<Lang, string> = {
    pt: "Ferramentas online grátis: conversor PDF, compressor de imagens, calculadora de IMC, gerador de QR code e mais. Sem cadastro, sem anúncios.",
    tr: "Ücretsiz çevrimiçi araçlar: PDF dönüştürücü, görsel sıkıştırıcı, VKİ hesaplayıcı, QR kod oluşturucu ve daha fazlası. Kayıt yok, reklam yok.",
    th: "เครื่องมือออนไลน์ฟรี: แปลง PDF, บีบอัดรูปภาพ, คำนวณ BMI, สร้าง QR code และอื่นๆ ไม่ต้องสมัคร ไม่มีโฆษณา",
    vn: "Công cụ online miễn phí: chuyển đổi PDF, nén ảnh, tính BMI, tạo mã QR và hơn thế nữa. Không cần đăng ký, không quảng cáo.",
    en: "Free online tools: PDF converter, image compressor, BMI calculator, QR code generator, and more. No sign-up, no ads.",
  };

  const ogDescriptions: Record<Lang, string> = {
    pt: "Conversor PDF, compressor de imagens, calculadora de IMC, gerador de QR code. Grátis, rápido, privado.",
    tr: "PDF dönüştürücü, görsel sıkıştırıcı, VKİ hesaplayıcı, QR kod oluşturucu. Ücretsiz, hızlı, gizli.",
    th: "แปลง PDF, บีบอัดรูปภาพ, คำนวณ BMI, สร้าง QR code ฟรี รวดเร็ว เป็นส่วนตัว",
    vn: "Chuyển đổi PDF, nén ảnh, tính BMI, tạo QR code. Miễn phí, nhanh, riêng tư.",
    en: "PDF, image, calculator, QR code. Fast, private, no sign-up.",
  };

  return {
    title: siteName(l),
    description: descriptions[l],
    openGraph: {
      title: siteName(l),
      description: ogDescriptions[l],
      url: `https://tools.lucidlibs.dev/${l}`,
      siteName: "LucidLibs Tools",
      type: "website",
      images: [
        {
          url: "https://tools.lucidlibs.dev/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "LucidLibs Tools",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteName(l),
      description: ogDescriptions[l],
    },
    alternates: {
      languages: Object.fromEntries(
        VALID_LANGS.map((code) => [HREFLANG[code], `/${code}`])
      ),
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
