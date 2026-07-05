import { NextRequest, NextResponse } from "next/server";
import { createRequire } from "module";

export const runtime = "nodejs";
export const maxDuration = 30;

const require = createRequire(import.meta.url);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Use internal module directly to bypass pdf-parse's self-test in index.js
    const pdfParse = require("pdf-parse/lib/pdf-parse.js");
    const data = await pdfParse(buffer);

    const text = (data as { text?: string }).text?.trim();
    if (!text) {
      return NextResponse.json({ error: "No readable text found in this PDF" }, { status: 422 });
    }

    const wordContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset="utf-8"><title>${escapeHtml(file.name)}</title>
<style>body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.5;padding:2cm}p{margin:0 0 6pt}</style>
</head><body>
${text.split("\n").map((l: string) => l.trim() ? `<p>${escapeHtml(l)}</p>` : "<br/>").join("\n")}
</body></html>`;

    return new NextResponse(wordContent, {
      headers: {
        "Content-Type": "application/msword",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(file.name.replace(/\.pdf$/i, ""))}.doc"`,
      },
    });
  } catch (err) {
    console.error("PDF to Word error:", err);
    return NextResponse.json({ error: "Conversion failed" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
