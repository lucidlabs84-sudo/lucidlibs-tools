// Unified PDF tool messages: pt, tr, th, vn, en, us
export type PdfMessages = typeof pdfPt;

export const pdfPt = {
  siteTitle: "Ferramentas PDF Online — Grátis & Fácil",
  siteDescription: "Converta PDF para Word, comprima e junte arquivos PDF online totalmente grátis.",
  nav: { home: "Início", tools: "Ferramentas" },
  hero: {
    title: "Ferramentas PDF Online",
    subtitle: "Converta, comprima e junte arquivos PDF totalmente grátis. Processamento no navegador, seus arquivos não são enviados a servidores.",
    cta: "Comece Agora",
  },
  tools: {
    pdfToWord: {
      title: "PDF para Word",
      description: "Converta arquivos PDF para o formato Word (.docx) editável, mantendo a formatação do texto.",
      button: "Escolher Arquivo PDF", processing: "Convertendo...", success: "Conversão concluída!",
      dragText: "Arraste e solte o PDF aqui", orText: "ou", browseText: "Procurar arquivo", maxSize: "Máx. 25MB",
    },
    compress: {
      title: "Comprimir PDF",
      description: "Reduza significativamente o tamanho do arquivo PDF mantendo a melhor qualidade possível.",
      button: "Escolher Arquivo PDF", processing: "Comprimindo...", success: "Compressão concluída!",
      dragText: "Arraste e solte o PDF aqui", orText: "ou", browseText: "Procurar arquivo", maxSize: "Máx. 25MB",
      originalSize: "Tamanho original", compressedSize: "Tamanho comprimido", reduction: "Redução",
    },
    merge: {
      title: "Juntar PDF",
      description: "Junte vários arquivos PDF em um único documento. Organize a ordem como quiser.",
      button: "Escolher Arquivos PDF", processing: "Juntando...", success: "PDFs unidos!",
      dragText: "Arraste e solte os PDFs aqui", orText: "ou", browseText: "Procurar arquivos", maxSize: "Máx. 25MB por arquivo",
      fileCount: "{count} arquivos selecionados", moveUp: "Mover para cima", moveDown: "Mover para baixo", remove: "Remover",
    },
  },
  seo: {
    homeTitle: "Ferramentas PDF Online Grátis | Converter, Comprimir, Juntar",
    homeDesc: "Converta PDF para Word, comprima e junte arquivos PDF online totalmente grátis.",
    pdfToWordTitle: "Converter PDF para Word Grátis — PDFTools",
    pdfToWordDesc: "Converta PDF para Word online grátis.",
    compressTitle: "Comprimir PDF Online Grátis — PDFTools",
    compressDesc: "Comprima PDF online grátis.",
    mergeTitle: "Juntar PDF Online Grátis — PDFTools",
    mergeDesc: "Junte vários PDFs em um só online grátis.",
  },
};

export const pdfTr = {
  siteTitle: "PDF Araçları Online — Ücretsiz & Kolay",
  siteDescription: "PDF'i Word'e çevirin, PDF sıkıştırın ve birleştirin.",
  nav: { home: "Ana Sayfa", tools: "Araçlar" },
  hero: { title: "PDF Araçları Online", subtitle: "PDF sıkıştırma, birleştirme ve Word'e çevirme araçları.", cta: "Hemen Başla" },
  tools: {
    pdfToWord: {
      title: "PDF'ten Word'e", description: "PDF dosyalarınızı düzenlenebilir Word belgelerine dönüştürün.",
      button: "PDF Dosyası Seç", processing: "Dönüştürülüyor...", success: "Dönüştürme tamamlandı!",
      dragText: "PDF'i buraya sürükleyin", orText: "veya", browseText: "Dosya Seç", maxSize: "Maks. 25MB",
    },
    compress: {
      title: "PDF Sıkıştır", description: "PDF dosya boyutunu kaliteyi koruyarak azaltın.",
      button: "PDF Dosyası Seç", processing: "Sıkıştırılıyor...", success: "Sıkıştırma tamamlandı!",
      dragText: "PDF'i buraya sürükleyin", orText: "veya", browseText: "Dosya Seç", maxSize: "Maks. 25MB",
      originalSize: "Orijinal boyut", compressedSize: "Sıkıştırılmış boyut", reduction: "Azalma",
    },
    merge: {
      title: "PDF Birleştir", description: "Birden fazla PDF dosyasını tek bir belgede birleştirin.",
      button: "PDF Dosyaları Seç", processing: "Birleştiriliyor...", success: "PDF'ler birleştirildi!",
      dragText: "PDF'leri buraya sürükleyin", orText: "veya", browseText: "Dosyaları Seç", maxSize: "Dosya başına maks. 25MB",
      fileCount: "{count} dosya seçildi", moveUp: "Yukarı taşı", moveDown: "Aşağı taşı", remove: "Kaldır",
    },
  },
  seo: {
    homeTitle: "PDF Araçları Online Ücretsiz | Sıkıştır, Birleştir, Word'e Çevir",
    homeDesc: "PDF sıkıştırma, birleştirme ve Word'e çevirme araçları.",
    pdfToWordTitle: "PDF'i Word'e Çevir Ücretsiz — PDFTools",
    pdfToWordDesc: "PDF'i online Word'e çevirin.",
    compressTitle: "PDF Sıkıştır Online Ücretsiz — PDFTools",
    compressDesc: "PDF'i online sıkıştırın.",
    mergeTitle: "PDF Birleştir Online Ücretsiz — PDFTools",
    mergeDesc: "Birden fazla PDF'i online birleştirin.",
  },
};

export const pdfTh = {
  siteTitle: "เครื่องมือ PDF ออนไลน์ — ฟรีและง่าย",
  siteDescription: "แปลง PDF เป็น Word บีบอัดและรวมไฟล์ PDF ออนไลน์ฟรี",
  nav: { home: "หน้าแรก", tools: "เครื่องมือ" },
  hero: { title: "เครื่องมือ PDF ออนไลน์", subtitle: "แปลง บีบอัด และรวมไฟล์ PDF ฟรี 100%", cta: "เริ่มใช้งาน" },
  tools: {
    pdfToWord: {
      title: "PDF เป็น Word", description: "แปลงไฟล์ PDF เป็น Word (.docx) ที่แก้ไขได้",
      button: "เลือกไฟล์ PDF", processing: "กำลังแปลง...", success: "แปลงสำเร็จ!",
      dragText: "ลากและวาง PDF ที่นี่", orText: "หรือ", browseText: "เลือกไฟล์", maxSize: "สูงสุด 25MB",
    },
    compress: {
      title: "บีบอัด PDF", description: "ลดขนาดไฟล์ PDF โดยรักษาคุณภาพ",
      button: "เลือกไฟล์ PDF", processing: "กำลังบีบอัด...", success: "บีบอัดสำเร็จ!",
      dragText: "ลากและวาง PDF ที่นี่", orText: "หรือ", browseText: "เลือกไฟล์", maxSize: "สูงสุด 25MB",
      originalSize: "ขนาดเดิม", compressedSize: "ขนาดหลังบีบอัด", reduction: "ลดลง",
    },
    merge: {
      title: "รวม PDF", description: "รวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียว",
      button: "เลือกไฟล์ PDF", processing: "กำลังรวม...", success: "รวมสำเร็จ!",
      dragText: "ลากและวาง PDF ที่นี่", orText: "หรือ", browseText: "เลือกไฟล์", maxSize: "สูงสุด 25MB ต่อไฟล์",
      fileCount: "{count} ไฟล์ที่เลือก", moveUp: "เลื่อนขึ้น", moveDown: "เลื่อนลง", remove: "ลบ",
    },
  },
  seo: {
    homeTitle: "เครื่องมือ PDF ออนไลน์ฟรี | แปลง บีบอัด รวม",
    homeDesc: "แปลง PDF เป็น Word บีบอัดและรวมไฟล์ PDF ออนไลน์ฟรี",
    pdfToWordTitle: "แปลง PDF เป็น Word ฟรี — PDFTools",
    pdfToWordDesc: "แปลง PDF เป็น Word ออนไลน์ฟรี",
    compressTitle: "บีบอัด PDF ออนไลน์ฟรี — PDFTools",
    compressDesc: "บีบอัด PDF ออนไลน์ฟรี",
    mergeTitle: "รวม PDF ออนไลน์ฟรี — PDFTools",
    mergeDesc: "รวมไฟล์ PDF หลายไฟล์เป็นไฟล์เดียวออนไลน์ฟรี",
  },
};

export const pdfVn = {
  siteTitle: "Công Cụ PDF Trực Tuyến — Miễn Phí & Dễ Dùng",
  siteDescription: "Chuyển đổi PDF sang Word, nén và gộp file PDF trực tuyến hoàn toàn miễn phí.",
  nav: { home: "Trang Chủ", tools: "Công Cụ" },
  hero: { title: "Công Cụ PDF Trực Tuyến", subtitle: "Chuyển đổi, nén và gộp file PDF hoàn toàn miễn phí.", cta: "Bắt Đầu Ngay" },
  tools: {
    pdfToWord: {
      title: "PDF sang Word", description: "Chuyển đổi file PDF sang Word (.docx) có thể chỉnh sửa.",
      button: "Chọn File PDF", processing: "Đang chuyển đổi...", success: "Chuyển đổi thành công!",
      dragText: "Kéo thả file PDF vào đây", orText: "hoặc", browseText: "Duyệt file", maxSize: "Tối đa 25MB",
    },
    compress: {
      title: "Nén PDF", description: "Giảm kích thước file PDF mà vẫn giữ chất lượng.",
      button: "Chọn File PDF", processing: "Đang nén...", success: "Nén thành công!",
      dragText: "Kéo thả file PDF vào đây", orText: "hoặc", browseText: "Duyệt file", maxSize: "Tối đa 25MB",
      originalSize: "Kích thước gốc", compressedSize: "Kích thước sau nén", reduction: "Giảm",
    },
    merge: {
      title: "Gộp PDF", description: "Gộp nhiều file PDF thành một file duy nhất.",
      button: "Chọn File PDF", processing: "Đang gộp...", success: "Gộp thành công!",
      dragText: "Kéo thả file PDF vào đây", orText: "hoặc", browseText: "Duyệt file", maxSize: "Tối đa 25MB mỗi file",
      fileCount: "{count} file đã chọn", moveUp: "Di chuyển lên", moveDown: "Di chuyển xuống", remove: "Xóa",
    },
  },
  seo: {
    homeTitle: "Công Cụ PDF Trực Tuyến Miễn Phí | Chuyển Đổi, Nén, Gộp",
    homeDesc: "Chuyển đổi PDF sang Word, nén và gộp file PDF trực tuyến miễn phí.",
    pdfToWordTitle: "Chuyển Đổi PDF Sang Word Miễn Phí — PDFTools",
    pdfToWordDesc: "Chuyển đổi file PDF sang Word online miễn phí.",
    compressTitle: "Nén PDF Trực Tuyến Miễn Phí — PDFTools",
    compressDesc: "Nén file PDF online miễn phí.",
    mergeTitle: "Gộp PDF Trực Tuyến Miễn Phí — PDFTools",
    mergeDesc: "Gộp nhiều file PDF thành một online miễn phí.",
  },
};

const common = {
  download: "Baixar", tryAgain: "Tentar Novamente", error: "Ocorreu um erro.", back: "Voltar",
};

const commonDict: Record<string, typeof common> = {
  pt: { download: "Baixar", tryAgain: "Tentar Novamente", error: "Ocorreu um erro.", back: "Voltar" },
  tr: { download: "İndir", tryAgain: "Tekrar Dene", error: "Bir hata oluştu.", back: "Geri" },
  th: { download: "ดาวน์โหลด", tryAgain: "ลองอีกครั้ง", error: "เกิดข้อผิดพลาด", back: "กลับ" },
  vn: { download: "Tải Xuống", tryAgain: "Thử Lại", error: "Có lỗi xảy ra", back: "Quay Lại" },
  en: { download: "Download", tryAgain: "Try Again", error: "An error occurred.", back: "Back" },
};

const pdfDict: Record<string, typeof pdfPt> = { pt: pdfPt, tr: pdfTr, th: pdfTh, vn: pdfVn, en: pdfPt };

export function getPdfMessages(lang: string) {
  return pdfDict[lang] ?? pdfDict.pt;
}

export function getCommonMessages(lang: string) {
  return commonDict[lang] ?? commonDict.pt;
}
