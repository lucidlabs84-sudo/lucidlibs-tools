"use client";

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from "react";

interface FileDropzoneProps {
  tool: string;
  onBack: () => void;
  messages: {
    title: string; description: string; button: string; convertLabel?: string; processing: string;
    success: string; dragText: string; orText: string; browseText: string;
    maxSize: string; originalSize?: string; compressedSize?: string;
    reduction?: string; fileCount?: string; moveUp?: string; moveDown?: string; remove?: string;
  };
  commonMessages: { download: string; tryAgain: string; error: string; back: string };
  endpoint: string; accept: string; multiple: boolean;
}

export default function FileDropzone({ tool, onBack, messages, commonMessages, endpoint, accept, multiple }: FileDropzoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ blob: Blob; filename: string; stats?: { original: number; compressed: number } } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming).filter((f) => f.type === "application/pdf" || f.name.endsWith(".pdf"));
    if (arr.length === 0) return;
    setFiles(multiple ? (prev) => [...prev, ...arr] : [arr[0]]);
    setError(null); setResult(null);
  }, [multiple]);

  const handleDrop = (e: DragEvent) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = (e: DragEvent) => { e.preventDefault(); setDragOver(false); };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { handleFiles(e.target.files); };

  const handleSubmit = async () => {
    if (files.length === 0) return;
    setProcessing(true); setProgress(10); setError(null);
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      const ti = setInterval(() => setProgress((p) => Math.min(p + 15, 85)), 400);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      clearInterval(ti);
      if (!res.ok) { const text = await res.text(); throw new Error(text || "Server error"); }
      setProgress(100);
      const disposition = res.headers.get("content-disposition") || "";
      const fnMatch = disposition.match(/filename="?(.+?)"?$/);
      const filename = fnMatch ? fnMatch[1] : `resultado-${Date.now()}.${tool === "pdf-to-word" ? "docx" : "pdf"}`;
      const blob = await res.blob();
      const originalSize = res.headers.get("x-original-size");
      const compressedSize = res.headers.get("x-compressed-size");
      const stats = originalSize && compressedSize ? { original: Number(originalSize), compressed: Number(compressedSize) } : undefined;
      setResult({ blob, filename, stats });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : commonMessages.error);
    } finally { setProcessing(false); }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a"); a.href = url; a.download = result.filename; a.click();
    URL.revokeObjectURL(url);
  };

  const moveFile = (index: number, d: -1 | 1) => {
    setFiles((prev) => { const t = index + d; if (t < 0 || t >= prev.length) return prev; const n = [...prev]; [n[index], n[t]] = [n[t], n[index]]; return n; });
  };
  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));
  const formatBytes = (bytes: number) => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-slate-500 hover:text-amber-600 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        {commonMessages.back}
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{messages.title}</h1>
      <p className="text-sm text-slate-500 mb-6">{messages.description}</p>

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center">
          <div className="text-green-600 text-lg font-semibold mb-1">{messages.success}</div>
          {result.stats && (
            <div className="text-sm text-slate-500 space-y-1 mt-2">
              <p>{messages.originalSize}: {formatBytes(result.stats.original)}</p>
              <p>{messages.compressedSize}: {formatBytes(result.stats.compressed)}</p>
              <p className="text-green-600 font-medium">{messages.reduction}: {Math.round((1 - result.stats.compressed / result.stats.original) * 100)}%</p>
            </div>
          )}
          <button onClick={handleDownload} className="mt-4 inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" /></svg>
            {commonMessages.download}
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-red-600 text-sm">{error}</p>
          <button onClick={() => { setError(null); setResult(null); }} className="mt-2 text-sm text-red-500 underline">{commonMessages.tryAgain}</button>
        </div>
      )}

      {!result && (
        <>
          {/* Dropzone — changes appearance when files are selected */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              files.length > 0
                ? "border-amber-400 bg-amber-50/50"
                : dragOver
                  ? "border-amber-400 bg-amber-50"
                  : "border-slate-200 bg-white hover:border-amber-300"
            }`}
            onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
            onClick={() => { if (files.length === 0 || multiple) fileInputRef.current?.click(); }}
          >
            {files.length === 0 ? (
              <>
                <svg className="w-12 h-12 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-slate-400 mb-1">{messages.dragText}</p>
                <p className="text-xs text-slate-400 mb-3">{messages.orText}</p>
                <span className="inline-block bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors">
                  {messages.browseText}
                </span>
                <p className="text-xs text-slate-400 mt-3">{messages.maxSize}</p>
              </>
            ) : multiple ? (
              /* Multiple files: show count + add more */
              <div className="text-center" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold" style={{ color: "oklch(0.3 0.005 260)" }}>
                    {messages.fileCount?.replace("{count}", String(files.length)) || `${files.length} files selected`}
                  </span>
                </div>
                <span className="inline-block bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-medium hover:border-amber-300 transition-colors">
                  + Add more files
                </span>
              </div>
            ) : (
              /* Single file: show filename + change option */
              <div className="text-center" onClick={(e) => e.stopPropagation()}>
                <svg className="w-10 h-10 mx-auto mb-2" viewBox="0 0 48 48" fill="none">
                  <rect x="6" y="4" width="36" height="40" rx="3" fill="#EF4444" />
                  <text x="24" y="30" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">PDF</text>
                </svg>
                <p className="text-sm font-semibold mb-1 break-all px-2" style={{ color: "oklch(0.2 0.005 260)" }}>
                  {files[0].name}
                </p>
                <p className="text-xs mb-3" style={{ color: "oklch(0.5 0.005 260)" }}>
                  {formatBytes(files[0].size)}
                </p>
                <span className="inline-block bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-amber-300 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}>
                  Change file
                </span>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept={accept} multiple={multiple} onChange={handleInputChange} className="hidden" />

          {/* Multiple files: show sortable list */}
          {multiple && files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((f, i) => (
                <div key={`${f.name}-${i}`} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-slate-200">
                  <span className="text-xs text-slate-400 w-6">{i + 1}</span>
                  <span className="text-sm flex-1 truncate">{f.name}</span>
                  <span className="text-xs text-slate-400">{formatBytes(f.size)}</span>
                  <button onClick={() => moveFile(i, -1)} disabled={i === 0} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30" title={messages.moveUp}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </button>
                  <button onClick={() => moveFile(i, 1)} disabled={i === files.length - 1} className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30" title={messages.moveDown}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button onClick={() => removeFile(i)} className="p-1 text-red-400 hover:text-red-600" title={messages.remove}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!result && files.length > 0 && !processing && (
        <button onClick={handleSubmit} className="mt-4 w-full bg-amber-500 text-white py-3.5 rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-md active:scale-[0.98] flex items-center justify-center gap-2">
          {multiple ? (
            <>{messages.title}</>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {messages.convertLabel || messages.button}
            </>
          )}
        </button>
      )}

      {processing && (
        <div className="mt-6 text-center">
          <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">{messages.processing}</p>
          <div className="mt-3 max-w-xs mx-auto h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
