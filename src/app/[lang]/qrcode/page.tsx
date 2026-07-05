"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import QRCodeLib from "qrcode";
import { type Lang } from "@/lib/i18n";

type QrType = "url" | "text" | "email" | "phone" | "wifi" | "vcard";

const messages: Record<string, any> = {
  pt: { title: "Gerador de QR Code Online Grátis", subtitle: "Crie QR codes personalizados para URL, texto, e-mail, telefone, WiFi e cartão de visita.", types: ["URL", "Texto", "E-mail", "Telefone", "WiFi", "vCard"], placeholders: ["https://exemplo.com", "Digite seu texto...", "nome@email.com", "+5511999999999", "WiFi_SSID", "Nome", "Empresa", "Telefone", "E-mail"], wifiPass: "Senha", download: "Baixar PNG", fgColor: "Cor do QR", bgColor: "Fundo", size: "Tamanho", margin: "Margem", empty: "Digite um conteúdo para gerar o QR Code" },
  tr: { title: "Ücretsiz Online QR Kod Oluşturucu", subtitle: "URL, metin, e-posta, telefon, WiFi ve kartvizit için özel QR kodları oluşturun.", types: ["URL", "Metin", "E-posta", "Telefon", "WiFi", "vCard"], placeholders: ["https://ornek.com", "Metninizi girin...", "isim@email.com", "+905555555555", "WiFi_Agi", "Ad", "Firma", "Telefon", "E-posta"], wifiPass: "Şifre", download: "PNG İndir", fgColor: "QR Rengi", bgColor: "Arkaplan", size: "Boyut", margin: "Kenar", empty: "QR kod oluşturmak için içerik girin" },
  th: { title: "เครื่องสร้าง QR Code ออนไลน์ฟรี", subtitle: "สร้าง QR code สำหรับ URL, ข้อความ, อีเมล, โทรศัพท์, WiFi และนามบัตร", types: ["URL", "ข้อความ", "อีเมล", "โทรศัพท์", "WiFi", "vCard"], placeholders: ["https://example.com", "พิมพ์ข้อความ...", "name@email.com", "+660999999999", "WiFi_SSID", "ชื่อ", "บริษัท", "โทรศัพท์", "อีเมล"], wifiPass: "รหัสผ่าน", download: "ดาวน์โหลด PNG", fgColor: "สี QR", bgColor: "พื้นหลัง", size: "ขนาด", margin: "ขอบ", empty: "ป้อนเนื้อหาเพื่อสร้าง QR Code" },
  vn: { title: "Tạo QR Code Online Miễn Phí", subtitle: "Tạo QR code cho URL, văn bản, email, điện thoại, WiFi và danh thiếp.", types: ["URL", "Văn bản", "Email", "Điện thoại", "WiFi", "vCard"], placeholders: ["https://vidu.com", "Nhập văn bản...", "ten@email.com", "+84999999999", "WiFi_SSID", "Tên", "Công ty", "Điện thoại", "Email"], wifiPass: "Mật khẩu", download: "Tải PNG", fgColor: "Màu QR", bgColor: "Nền", size: "Kích thước", margin: "Lề", empty: "Nhập nội dung để tạo QR Code" },
  en: { title: "Free Online QR Code Generator", subtitle: "Create custom QR codes for URL, text, email, phone, WiFi and business cards.", types: ["URL", "Text", "Email", "Phone", "WiFi", "vCard"], placeholders: ["https://example.com", "Enter text...", "name@email.com", "+1234567890", "WiFi_SSID", "Name", "Company", "Phone", "Email"], wifiPass: "Password", download: "Download PNG", fgColor: "QR Color", bgColor: "Background", size: "Size", margin: "Margin", empty: "Enter content to generate QR Code" },
};

const typeKeys: QrType[] = ["url", "text", "email", "phone", "wifi", "vcard"];

const VALID_LANGS: Lang[] = ["pt", "tr", "th", "vn", "en"];

export default function QrPage() {
  const params = useParams();
  const lang: Lang = VALID_LANGS.includes(params.lang as Lang) ? (params.lang as Lang) : "en";
  const [qrType, setQrType] = useState<QrType>("url");
  const [input, setInput] = useState("");
  const [vcard, setVcard] = useState({ name: "", org: "", phone: "", email: "" });
  const [wifiPass, setWifiPass] = useState("");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState(250);
  const [margin, setMargin] = useState(1);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const t = messages[lang] || messages.en;

  const buildContent = () => {
    switch (qrType) {
      case "url": return input.startsWith("http") ? input : `https://${input}`;
      case "email": return `mailto:${input}`;
      case "phone": return `tel:${input}`;
      case "wifi": return `WIFI:T:WPA;S:${input};P:${wifiPass};;`;
      case "vcard": return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcard.name}\nORG:${vcard.org}\nTEL:${vcard.phone}\nEMAIL:${vcard.email}\nEND:VCARD`;
      default: return input;
    }
  };

  const generate = async () => {
    const content = buildContent();
    if (!content) return;
    try { setQrDataUrl(await QRCodeLib.toDataURL(content, { width: size, margin, color: { dark: fgColor, light: bgColor } })); } catch {}
  };

  useEffect(() => { if (qrType !== "vcard") generate(); }, [qrType, input, wifiPass, fgColor, bgColor, size, margin]);

  const download = () => { if (!qrDataUrl) return; const a = document.createElement("a"); a.href = qrDataUrl; a.download = `qrcode-${qrType}.png`; a.click(); };

  return (
    <div className="flex-1">
      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-slate-500">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex flex-wrap gap-2">
              {typeKeys.map((tk, i) => (
                <button key={tk} onClick={() => setQrType(tk)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${qrType === tk ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}>{t.types[i]}</button>
              ))}
            </div>

            {qrType === "vcard" ? (
              <div className="space-y-3">
                {(["name", "org", "phone", "email"] as const).map((k, i) => (
                  <input key={k} type="text" placeholder={t.placeholders[5 + i]} value={vcard[k]} onChange={e => { const nv = { ...vcard, [k]: e.target.value }; setVcard(nv); }} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
                ))}
                <button onClick={generate} className="w-full py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">Gerar QR Code</button>
              </div>
            ) : (
              <input type="text" placeholder={t.placeholders[typeKeys.indexOf(qrType)]} value={input} onChange={e => setInput(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            )}

            {qrType === "wifi" && (
              <input type="text" placeholder={t.wifiPass} value={wifiPass} onChange={e => setWifiPass(e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm" />
            )}

            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs mb-1">{t.fgColor}</label><input type="color" value={fgColor} onChange={e => setFgColor(e.target.value)} className="w-full h-9 rounded cursor-pointer" /></div>
              <div><label className="block text-xs mb-1">{t.bgColor}</label><input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-9 rounded cursor-pointer" /></div>
              <div><label className="block text-xs mb-1">{t.size}: {size}px</label><input type="range" min={150} max={500} value={size} onChange={e => setSize(Number(e.target.value))} className="w-full" /></div>
              <div><label className="block text-xs mb-1">{t.margin}: {margin}</label><input type="range" min={0} max={4} value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full" /></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center justify-center min-h-[350px]">
            {qrDataUrl ? (
              <>
                <img src={qrDataUrl} alt="QR Code" className="max-w-[250px] mb-4" />
                <button onClick={download} className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-semibold text-sm hover:bg-amber-600">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
                  {t.download}
                </button>
              </>
            ) : (
              <p className="text-slate-400 text-sm">{t.empty}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
