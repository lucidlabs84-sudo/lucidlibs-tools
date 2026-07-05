"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { detectLang, syncUrlLang, type Lang } from "@/lib/i18n";

const tools = [
  {
    href: "/pdf",
    key: "pdf",
    color: "bg-red-500",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="6" y="4" width="36" height="40" rx="3" fill="#EF4444" />
        <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PDF</text>
      </svg>
    ),
  },
  {
    href: "/img",
    key: "img",
    color: "bg-green-500",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#22C55E" />
        <circle cx="18" cy="17" r="4" fill="white" opacity="0.9" />
        <path d="M8 36l10-12 8 8 6-6 12 10" stroke="white" strokeWidth="2" fill="none" opacity="0.9" />
      </svg>
    ),
  },
  {
    href: "/bmi",
    key: "bmi",
    color: "bg-blue-500",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#3B82F6" />
        <path d="M24 12v24M16 20h16M16 28h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/qrcode",
    key: "qrcode",
    color: "bg-purple-500",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#A855F7" />
        <rect x="12" y="12" width="8" height="8" rx="1" fill="white" />
        <rect x="28" y="12" width="8" height="8" rx="1" fill="white" />
        <rect x="12" y="28" width="8" height="8" rx="1" fill="white" />
        <rect x="28" y="28" width="4" height="4" rx="1" fill="white" />
        <rect x="36" y="28" width="4" height="4" rx="1" fill="white" />
        <rect x="28" y="36" width="4" height="4" rx="1" fill="white" />
        <rect x="36" y="36" width="4" height="4" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    href: "/calc",
    key: "calc",
    color: "bg-amber-500",
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#F59E0B" />
        <rect x="12" y="12" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="12" width="10" height="6" rx="1" fill="white" />
        <rect x="12" y="22" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="22" width="10" height="6" rx="1" fill="white" />
        <rect x="12" y="32" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="32" width="10" height="6" rx="1" fill="white" />
      </svg>
    ),
  },
];

type HomeMsgs = Record<Lang, {
  heroTitle: string;
  heroSub: string;
  footer1: string;
  footer2: string;
  tools: Record<string, { title: string; desc: string }>;
}>;

const homeMsgs: HomeMsgs = {
  pt: {
    heroTitle: "Ferramentas Online Grátis",
    heroSub: "Simples, gratuito e privado. Todas as ferramentas rodam no seu navegador — sem upload para servidores, sem cadastro.",
    footer1: "Desenvolvido por",
    footer2: "— Ferramentas gratuitas, sem amarras.",
    tools: {
      pdf: { title: "Ferramentas PDF", desc: "Converter PDF para Word, comprimir PDF, juntar PDFs — tudo grátis, tudo no seu navegador." },
      img: { title: "Compressor de Imagem", desc: "Comprima imagens JPG, PNG, WebP sem perder qualidade. Suporte a processamento em lote." },
      bmi: { title: "Calculadora de IMC", desc: "Calcule seu Índice de Massa Corporal com classificação da OMS. Para adultos e crianças." },
      qrcode: { title: "Gerador de QR Code", desc: "Gere QR codes para URLs, texto, email, telefone, WiFi e vCard. Personalize cores." },
      calc: { title: "Calculadora", desc: "Porcentagem, juros compostos, regra de três, gorjeta, desconto — tudo em um só lugar." },
    },
  },
  tr: {
    heroTitle: "Ücretsiz Çevrimiçi Araçlar",
    heroSub: "Basit, ücretsiz ve gizli. Tüm araçlar tarayıcınızda çalışır — sunucuya yükleme yok, kayıt gerekmez.",
    footer1: "Tarafından geliştirildi",
    footer2: "— Ücretsiz araçlar, hiçbir koşul yok.",
    tools: {
      pdf: { title: "PDF Araçları", desc: "PDF'i Word'e dönüştürün, PDF sıkıştırın, PDF'leri birleştirin — hepsi ücretsiz, hepsi tarayıcınızda." },
      img: { title: "Görsel Sıkıştırıcı", desc: "JPG, PNG, WebP görsellerini kalite kaybı olmadan sıkıştırın. Toplu işlem desteği." },
      bmi: { title: "VKİ Hesaplayıcı", desc: "Vücut Kitle İndeksinizi DSÖ sınıflandırmasıyla hesaplayın. Yetişkinler ve çocuklar için." },
      qrcode: { title: "QR Kod Oluşturucu", desc: "URL, metin, e-posta, telefon, WiFi ve vCard için QR kodları oluşturun. Renkleri özelleştirin." },
      calc: { title: "Hesap Makinesi", desc: "Yüzde, bileşik faiz, orantı, bahşiş, indirim — hepsi bir arada." },
    },
  },
  th: {
    heroTitle: "เครื่องมือออนไลน์ฟรี",
    heroSub: "เรียบง่าย ฟรี และเป็นส่วนตัว ทุกเครื่องมือทำงานในเบราว์เซอร์ของคุณ — ไม่มีการอัปโหลดไปยังเซิร์ฟเวอร์ ไม่ต้องสมัคร",
    footer1: "พัฒนาโดย",
    footer2: "— เครื่องมือฟรี ไม่มีเงื่อนไข",
    tools: {
      pdf: { title: "เครื่องมือ PDF", desc: "แปลง PDF เป็น Word บีบอัด PDF รวม PDF — ฟรีทั้งหมด ในเบราว์เซอร์ของคุณ" },
      img: { title: "บีบอัดรูปภาพ", desc: "บีบอัดรูป JPG, PNG, WebP โดยไม่สูญเสียคุณภาพ รองรับการประมวลผลแบบกลุ่ม" },
      bmi: { title: "คำนวณ BMI", desc: "คำนวณดัชนีมวลกายตามเกณฑ์ WHO สำหรับผู้ใหญ่และเด็ก" },
      qrcode: { title: "สร้าง QR Code", desc: "สร้าง QR code สำหรับ URL ข้อความ อีเมล โทรศัพท์ WiFi และ vCard ปรับแต่งสีได้" },
      calc: { title: "เครื่องคิดเลข", desc: "เปอร์เซ็นต์ ดอกเบี้ยทบต้น บัญญัติไตรยางศ์ ทิป ส่วนลด — ทุกอย่างในที่เดียว" },
    },
  },
  vn: {
    heroTitle: "Công Cụ Online Miễn Phí",
    heroSub: "Đơn giản, miễn phí và riêng tư. Tất cả công cụ chạy trong trình duyệt — không tải lên máy chủ, không cần đăng ký.",
    footer1: "Phát triển bởi",
    footer2: "— Công cụ miễn phí, không ràng buộc.",
    tools: {
      pdf: { title: "Công Cụ PDF", desc: "Chuyển PDF sang Word, nén PDF, ghép PDF — tất cả miễn phí, tất cả trong trình duyệt." },
      img: { title: "Nén Ảnh", desc: "Nén ảnh JPG, PNG, WebP không mất chất lượng. Hỗ trợ xử lý hàng loạt." },
      bmi: { title: "Tính BMI", desc: "Tính chỉ số khối cơ thể theo phân loại WHO. Cho người lớn và trẻ em." },
      qrcode: { title: "Tạo QR Code", desc: "Tạo mã QR cho URL, văn bản, email, điện thoại, WiFi và vCard. Tùy chỉnh màu sắc." },
      calc: { title: "Máy Tính", desc: "Phần trăm, lãi kép, tỉ lệ thuận, tiền boa, giảm giá — tất cả trong một." },
    },
  },
  en: {
    heroTitle: "Free Online Tools",
    heroSub: "Simple, free, and private. All tools run in your browser — no file uploads to servers, no sign-up required.",
    footer1: "Powered by",
    footer2: "— Free tools, no strings attached.",
    tools: {
      pdf: { title: "PDF Tools", desc: "Convert PDF to Word, compress PDF, merge PDFs — all free, all in your browser." },
      img: { title: "Image Compressor", desc: "Compress JPG, PNG, WebP images without quality loss. Batch processing support." },
      bmi: { title: "BMI Calculator", desc: "Calculate your Body Mass Index with WHO classification. For adults and children." },
      qrcode: { title: "QR Code Generator", desc: "Generate QR codes for URLs, text, email, phone, WiFi, and vCard. Customize colors." },
      calc: { title: "Calculator", desc: "Percentage, compound interest, rule of three, tip, discount — all in one." },
    },
  },
};

const flags: Record<Lang, string> = { pt: "🇧🇷", tr: "🇹🇷", th: "🇹🇭", vn: "🇻🇳", en: "🇺🇸" };
const langNames: Record<Lang, string> = { pt: "Português", tr: "Türkçe", th: "ไทย", vn: "Tiếng Việt", en: "English" };

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [showLangPicker, setShowLangPicker] = useState(false);

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    syncUrlLang(detected);
  }, []);

  const m = homeMsgs[lang] || homeMsgs.en;

  const switchLang = (l: Lang) => {
    setLang(l);
    syncUrlLang(l);
    setShowLangPicker(false);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{m.heroTitle}</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">{m.heroSub}</p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const tm = m.tools[tool.key];
          return (
            <Link
              key={tool.href}
              href={`${tool.href}?lang=${lang}`}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-300 hover:shadow-lg transition-all"
            >
              <div className="mb-4">{tool.icon}</div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                {tm.title}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">{tm.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Footer with minimal language switcher */}
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
        <p>
          {m.footer1}{" "}
          <a href="https://lucidlibs.dev" className="text-amber-600 hover:underline">LucidLibs</a>{" "}
          {m.footer2}
        </p>
        <div className="relative inline-block mt-3">
          <button
            onClick={() => setShowLangPicker(!showLangPicker)}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            {flags[lang]} {langNames[lang]} ▾
          </button>
          {showLangPicker && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
              {(Object.keys(flags) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => switchLang(l)}
                  className={`block w-full text-left px-4 py-1.5 text-xs hover:bg-slate-50 ${l === lang ? "font-semibold text-amber-600" : "text-slate-600"}`}
                >
                  {flags[l]} {langNames[l]}
                </button>
              ))}
            </div>
          )}
        </div>
      </footer>
    </main>
  );
}
