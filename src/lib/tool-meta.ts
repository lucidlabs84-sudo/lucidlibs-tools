import type { Metadata } from "next";
import { VALID_LANGS, type Lang } from "@/lib/i18n";

export type ToolKey = "pdf" | "img" | "bmi" | "qrcode" | "calc";
export const TOOL_KEYS: ToolKey[] = ["pdf", "img", "bmi", "qrcode", "calc"];

/** Maps our internal URL language code to the correct ISO 639-1 code for hreflang tags. */
export const HREFLANG: Record<Lang, string> = {
  pt: "pt",
  tr: "tr",
  th: "th",
  vn: "vi", // "vn" is a country code, not a language code — hreflang must use "vi"
  en: "en",
};

type ToolCopy = { title: string; desc: string };

export const TOOL_META: Record<Lang, Record<ToolKey, ToolCopy>> = {
  pt: {
    pdf: { title: "Ferramentas PDF", desc: "Converter PDF para Word, comprimir PDF, juntar PDFs — tudo grátis, tudo no seu navegador." },
    img: { title: "Compressor de Imagem", desc: "Comprima imagens JPG, PNG, WebP sem perder qualidade. Suporte a processamento em lote." },
    bmi: { title: "Calculadora de IMC", desc: "Calcule seu Índice de Massa Corporal com classificação da OMS. Para adultos e crianças." },
    qrcode: { title: "Gerador de QR Code", desc: "Gere QR codes para URLs, texto, email, telefone, WiFi e vCard. Personalize cores." },
    calc: { title: "Calculadora", desc: "Porcentagem, juros compostos, regra de três, gorjeta, desconto — tudo em um só lugar." },
  },
  tr: {
    pdf: { title: "PDF Araçları", desc: "PDF'i Word'e dönüştürün, PDF sıkıştırın, PDF'leri birleştirin — hepsi ücretsiz, hepsi tarayıcınızda." },
    img: { title: "Görsel Sıkıştırıcı", desc: "JPG, PNG, WebP görsellerini kalite kaybı olmadan sıkıştırın. Toplu işlem desteği." },
    bmi: { title: "VKİ Hesaplayıcı", desc: "Vücut Kitle İndeksinizi DSÖ sınıflandırmasıyla hesaplayın. Yetişkinler ve çocuklar için." },
    qrcode: { title: "QR Kod Oluşturucu", desc: "URL, metin, e-posta, telefon, WiFi ve vCard için QR kodları oluşturun. Renkleri özelleştirin." },
    calc: { title: "Hesap Makinesi", desc: "Yüzde, bileşik faiz, orantı, bahşiş, indirim — hepsi bir arada." },
  },
  th: {
    pdf: { title: "เครื่องมือ PDF", desc: "แปลง PDF เป็น Word บีบอัด PDF รวม PDF — ฟรีทั้งหมด ในเบราว์เซอร์ของคุณ" },
    img: { title: "บีบอัดรูปภาพ", desc: "บีบอัดรูป JPG, PNG, WebP โดยไม่สูญเสียคุณภาพ รองรับการประมวลผลแบบกลุ่ม" },
    bmi: { title: "คำนวณ BMI", desc: "คำนวณดัชนีมวลกายตามเกณฑ์ WHO สำหรับผู้ใหญ่และเด็ก" },
    qrcode: { title: "สร้าง QR Code", desc: "สร้าง QR code สำหรับ URL ข้อความ อีเมล โทรศัพท์ WiFi และ vCard ปรับแต่งสีได้" },
    calc: { title: "เครื่องคิดเลข", desc: "เปอร์เซ็นต์ ดอกเบี้ยทบต้น บัญญัติไตรยางศ์ ทิป ส่วนลด — ทุกอย่างในที่เดียว" },
  },
  vn: {
    pdf: { title: "Công Cụ PDF", desc: "Chuyển PDF sang Word, nén PDF, ghép PDF — tất cả miễn phí, tất cả trong trình duyệt." },
    img: { title: "Nén Ảnh", desc: "Nén ảnh JPG, PNG, WebP không mất chất lượng. Hỗ trợ xử lý hàng loạt." },
    bmi: { title: "Tính BMI", desc: "Tính chỉ số khối cơ thể theo phân loại WHO. Cho người lớn và trẻ em." },
    qrcode: { title: "Tạo QR Code", desc: "Tạo mã QR cho URL, văn bản, email, điện thoại, WiFi và vCard. Tùy chỉnh màu sắc." },
    calc: { title: "Máy Tính", desc: "Phần trăm, lãi kép, tỉ lệ thuận, tiền boa, giảm giá — tất cả trong một." },
  },
  en: {
    pdf: { title: "PDF Tools", desc: "Convert PDF to Word, compress PDF, merge PDFs — all free, all in your browser." },
    img: { title: "Image Compressor", desc: "Compress JPG, PNG, WebP images without quality loss. Batch processing support." },
    bmi: { title: "BMI Calculator", desc: "Calculate your Body Mass Index with WHO classification. For adults and children." },
    qrcode: { title: "QR Code Generator", desc: "Generate QR codes for URLs, text, email, phone, WiFi, and vCard. Customize colors." },
    calc: { title: "Calculator", desc: "Percentage, compound interest, rule of three, tip, discount — all in one." },
  },
};

/** Builds unique <title>/description/hreflang metadata for a tool page in a given language. */
export function buildToolMetadata(tool: ToolKey, lang: Lang): Metadata {
  const copy = TOOL_META[lang]?.[tool] ?? TOOL_META.en[tool];

  return {
    title: `${copy.title} — LucidLibs Tools`,
    description: copy.desc,
    alternates: {
      languages: Object.fromEntries(
        VALID_LANGS.map((code) => [HREFLANG[code], `/${code}/${tool}`])
      ),
    },
  };
}
