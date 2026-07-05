"use client";

import { useState, useEffect } from "react";
import FileDropzone from "@/components/tools/FileDropzone";
import { getPdfMessages, getCommonMessages } from "@/lib/tool-messages/pdf-messages";
import { detectLang, syncUrlLang, type Lang } from "@/lib/i18n";

type Tool = "pdf-to-word" | "compress" | "merge" | null;

function ToolLabel(t: Tool, lang: Lang) {
  const msgs = getPdfMessages(lang);
  if (!t) return "";
  return msgs.tools[t === "pdf-to-word" ? "pdfToWord" : t === "compress" ? "compress" : "merge"].title;
}

export default function PdfToolsPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeTool, setActiveTool] = useState<Tool>(null);

  useEffect(() => {
    const detected = detectLang();
    setLang(detected);
    syncUrlLang(detected);
  }, []);

  const msgs = getPdfMessages(lang);
  const cm = getCommonMessages(lang);

  const renderTool = () => {
    switch (activeTool) {
      case "pdf-to-word":
        return <FileDropzone tool="pdf-to-word" onBack={() => setActiveTool(null)} messages={msgs.tools.pdfToWord} commonMessages={cm} endpoint="/pdf/api/pdf-to-word" accept=".pdf" multiple={false} />;
      case "compress":
        return <FileDropzone tool="compress" onBack={() => setActiveTool(null)} messages={msgs.tools.compress} commonMessages={cm} endpoint="/pdf/api/compress-pdf" accept=".pdf" multiple={false} />;
      case "merge":
        return <FileDropzone tool="merge" onBack={() => setActiveTool(null)} messages={msgs.tools.merge} commonMessages={cm} endpoint="/pdf/api/merge-pdf" accept=".pdf" multiple={true} />;
      default: return null;
    }
  };

  return (
    <div className="flex-1">
      <main className="max-w-5xl mx-auto px-4 py-10">
        {activeTool ? (
          <section className="max-w-3xl mx-auto">{renderTool()}</section>
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{msgs.hero.title}</h1>
              <p className="text-slate-500 max-w-2xl mx-auto">{msgs.hero.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ToolCard icon={<IconPdfToWord />} title={msgs.tools.pdfToWord.title} description={msgs.tools.pdfToWord.description} onClick={() => setActiveTool("pdf-to-word")} />
              <ToolCard icon={<IconCompress />} title={msgs.tools.compress.title} description={msgs.tools.compress.description} onClick={() => setActiveTool("compress")} />
              <ToolCard icon={<IconMerge />} title={msgs.tools.merge.title} description={msgs.tools.merge.description} onClick={() => setActiveTool("merge")} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function ToolCard({ icon, title, description, onClick }: { icon: React.ReactNode; title: string; description: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white border border-slate-200 rounded-2xl p-6 text-left hover:border-amber-300 hover:shadow-lg transition-all group">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </button>
  );
}

function IconPdfToWord() {
  return <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><rect x="6" y="4" width="36" height="40" rx="3" fill="#EF4444" /><text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PDF</text><path d="M30 16l-6 0l0 16" stroke="#3B82F6" strokeWidth="2" fill="none" /><text x="30" y="18" fill="#3B82F6" fontSize="10" fontWeight="bold">W</text></svg>;
}
function IconCompress() {
  return <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><rect x="6" y="4" width="36" height="40" rx="3" fill="#EF4444" /><text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PDF</text><path d="M30 22l-6 0m0 0l0-10m0 10l4-4m-4 4l-4-4" stroke="#16A34A" strokeWidth="2" fill="none" /></svg>;
}
function IconMerge() {
  return <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12"><rect x="4" y="4" width="36" height="40" rx="3" fill="#EF4444" opacity="0.7" /><text x="22" y="30" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">1</text><rect x="10" y="8" width="36" height="40" rx="3" fill="#EF4444" /><text x="28" y="34" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">+</text></svg>;
}
