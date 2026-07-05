"use client";

import { useState, useRef, useCallback, useEffect, type DragEvent, type ChangeEvent } from "react";
import { detectLang, syncUrlLang, type Lang } from "@/lib/i18n";

const msgs: Record<string, any> = {
  pt: { title: "Comprimir Imagem Online Grátis", subtitle: "Reduza o tamanho de imagens JPG, PNG, WebP sem perder qualidade.", dragTitle: "Arraste e solte imagens aqui", dragSub: "ou clique para selecionar — Suporta JPG, PNG, WebP", maxSize: "Máximo 50MB por imagem", quality: "Qualidade", format: "Formato", formatAuto: "Manter original", compress: "Comprimir Todas", downloadAll: "Baixar Todas (.zip)", original: "Original", compressed: "Comprimido", saved: "Redução", compressing: "Comprimindo...", error: "Erro", clear: "Limpar", noFiles: "Nenhuma imagem ainda." },
  tr: { title: "Online Görsel Sıkıştırma", subtitle: "JPG, PNG, WebP görsellerini kalite kaybı olmadan sıkıştırın.", dragTitle: "Görselleri buraya sürükleyin", dragSub: "veya seçmek için tıklayın — JPG, PNG, WebP", maxSize: "Görsel başına maks. 50MB", quality: "Kalite", format: "Format", formatAuto: "Orijinali koru", compress: "Tümünü Sıkıştır", downloadAll: "Tümünü İndir (.zip)", original: "Orijinal", compressed: "Sıkıştırılmış", saved: "Azalma", compressing: "Sıkıştırılıyor...", error: "Hata", clear: "Temizle", noFiles: "Henüz görsel yok." },
  th: { title: "บีบอัดรูปภาพออนไลน์ฟรี", subtitle: "ลดขนาดรูป JPG, PNG, WebP โดยไม่สูญเสียคุณภาพ", dragTitle: "ลากและวางรูปภาพที่นี่", dragSub: "หรือคลิกเพื่อเลือก — รองรับ JPG, PNG, WebP", maxSize: "สูงสุด 50MB ต่อรูป", quality: "คุณภาพ", format: "รูปแบบ", formatAuto: "คงเดิม", compress: "บีบอัดทั้งหมด", downloadAll: "ดาวน์โหลดทั้งหมด (.zip)", original: "ต้นฉบับ", compressed: "บีบอัดแล้ว", saved: "ลดลง", compressing: "กำลังบีบอัด...", error: "ข้อผิดพลาด", clear: "ล้าง", noFiles: "ยังไม่มีรูปภาพ" },
  vn: { title: "Nén Ảnh Online Miễn Phí", subtitle: "Giảm dung lượng ảnh JPG, PNG, WebP mà không mất chất lượng.", dragTitle: "Kéo thả ảnh vào đây", dragSub: "hoặc click để chọn — Hỗ trợ JPG, PNG, WebP", maxSize: "Tối đa 50MB mỗi ảnh", quality: "Chất lượng", format: "Định dạng", formatAuto: "Giữ nguyên", compress: "Nén tất cả", downloadAll: "Tải tất cả (.zip)", original: "Gốc", compressed: "Đã nén", saved: "Giảm", compressing: "Đang nén...", error: "Lỗi", clear: "Xóa", noFiles: "Chưa có ảnh nào." },
  en: { title: "Free Online Image Compressor", subtitle: "Reduce JPG, PNG, WebP image size without losing quality.", dragTitle: "Drag and drop images here", dragSub: "or click to select — Supports JPG, PNG, WebP", maxSize: "Max 50MB per image", quality: "Quality", format: "Format", formatAuto: "Keep original", compress: "Compress All", downloadAll: "Download All (.zip)", original: "Original", compressed: "Compressed", saved: "Saved", compressing: "Compressing...", error: "Error", clear: "Clear", noFiles: "No images yet." },
};

type OutputFormat = "auto" | "jpeg" | "png" | "webp";
type ImageFile = { id: string; file: File; preview: string; originalSize: number; compressedSize?: number; status: "idle" | "compressing" | "done" | "error"; compressedUrl?: string };

const fmtBytes = (b: number) => b < 1024 ? `${b} B` : b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`;

export default function ImgPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState<OutputFormat>("auto");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = msgs[lang] || msgs.en;

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    syncUrlLang(detected);
  }, []);

  const addImages = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming).filter(f => /^image\/(jpeg|png|webp)$/.test(f.type));
    setImages(prev => [...prev, ...arr.map(f => ({ id: `${f.name}-${Date.now()}-${Math.random()}`, file: f, preview: URL.createObjectURL(f), originalSize: f.size, status: "idle" as const }))]);
  }, []);

  const handleDrop = (e: DragEvent) => { e.preventDefault(); setDragOver(false); addImages(e.dataTransfer.files); };
  const handleDrag = (e: DragEvent, over: boolean) => { e.preventDefault(); setDragOver(over); };

  const compressImage = (img: ImageFile): Promise<ImageFile> => new Promise(resolve => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width; canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const mime = format === "auto" ? img.file.type : `image/${format}`;
      canvas.toBlob(blob => resolve({ ...img, compressedSize: blob?.size || img.originalSize, compressedUrl: blob ? URL.createObjectURL(blob) : img.preview, status: "done" }), mime, quality / 100);
    };
    image.onerror = () => resolve({ ...img, status: "error" });
    image.src = img.preview;
  });

  const compressAll = async () => {
    const todo = images.filter(i => i.status === "idle");
    if (!todo.length) return;
    setImages(prev => prev.map(i => todo.find(t => t.id === i.id) ? { ...i, status: "compressing" } : i));
    const results: ImageFile[] = [];
    for (let i = 0; i < todo.length; i += 3) {
      const batchResults = await Promise.all(todo.slice(i, i + 3).map(compressImage));
      results.push(...batchResults);
      setImages(prev => prev.map(p => { const r = results.find(rr => rr.id === p.id); return r || p; }));
    }
  };

  const downloadAll = async () => {
    const done = images.filter(i => i.status === "done");
    if (!done.length) return;
    if (done.length === 1) {
      const a = document.createElement("a"); a.href = done[0].compressedUrl!; a.download = `compressed-${done[0].file.name}`; a.click(); return;
    }
    const zip = new (await import("jszip")).default();
    done.forEach(i => zip.file(i.file.name, i.compressedUrl!.split(",")[1], { base64: true }));
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "compressed-images.zip"; a.click();
  };

  const removeImage = (id: string) => setImages(prev => prev.filter(i => i.id !== id));
  const clearAll = () => { images.forEach(i => { URL.revokeObjectURL(i.preview); if (i.compressedUrl) URL.revokeObjectURL(i.compressedUrl); }); setImages([]); };

  return (
    <div className="flex-1"><main className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-slate-500">{t.subtitle}</p>
      </div>

      <div className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${dragOver ? "border-amber-400 bg-amber-50" : "border-slate-200 hover:border-amber-300"}`}
        onDrop={handleDrop} onDragOver={e => handleDrag(e, true)} onDragLeave={e => handleDrag(e, false)} onClick={() => fileInputRef.current?.click()}>
        <svg className="w-12 h-12 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        <p className="font-medium text-gray-900 mb-1">{t.dragTitle}</p>
        <p className="text-sm text-slate-500">{t.dragSub}</p>
        <p className="text-xs text-slate-400 mt-2">{t.maxSize}</p>
      </div>
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e => addImages(e.target.files)} className="hidden" />

      {images.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center gap-2"><label className="text-sm font-medium">{t.quality}: {quality}%</label><input type="range" min={10} max={100} value={quality} onChange={e => setQuality(Number(e.target.value))} className="w-28" /></div>
            <div className="flex items-center gap-2"><label className="text-sm">{t.format}:</label>
              <select value={format} onChange={e => setFormat(e.target.value as OutputFormat)} className="text-sm border border-slate-200 rounded px-2 py-1">
                <option value="auto">{t.formatAuto}</option><option value="jpeg">JPG</option><option value="png">PNG</option><option value="webp">WebP</option></select></div>
            <button onClick={compressAll} disabled={!images.some(i => i.status === "idle")} className="ml-auto px-5 py-2 bg-amber-500 text-white rounded-xl font-semibold disabled:opacity-50 text-sm hover:bg-amber-600">{t.compress}</button>
            {images.some(i => i.status === "done") && <button onClick={downloadAll} className="px-5 py-2 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700">{t.downloadAll}</button>}
            <button onClick={clearAll} className="text-xs text-red-500 hover:underline">{t.clear}</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map(img => (
              <div key={img.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <img src={img.compressedUrl || img.preview} alt={img.file.name} className="w-full h-32 object-cover" />
                <div className="p-2 text-xs space-y-1">
                  <p className="truncate font-medium">{img.file.name}</p>
                  <p className="text-slate-500">{t.original}: {fmtBytes(img.originalSize)}</p>
                  {img.status === "done" && img.compressedSize && <p className="text-green-600">{t.compressed}: {fmtBytes(img.compressedSize)} ({t.saved} {Math.round((1 - img.compressedSize / img.originalSize) * 100)}%)</p>}
                  {img.status === "compressing" && <p className="text-amber-500 animate-pulse">{t.compromising || t.compressing}</p>}
                  {img.status === "error" && <p className="text-red-500">{t.error}</p>}
                </div>
                <button onClick={() => removeImage(img.id)} className="w-full py-1.5 text-xs text-red-400 hover:bg-red-50 border-t border-slate-200">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {images.length === 0 && <p className="text-center text-sm text-slate-400 mt-6">{t.noFiles}</p>}
    </main></div>
  );
}
