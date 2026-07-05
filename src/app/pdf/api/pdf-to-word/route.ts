import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);

    // Use legacy build for Node.js compatibility
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.min.mjs");

    const doc = await pdfjs.getDocument({
      data: typedArray,
      disableWorker: true,
      useWorkerFetch: false,
      useSystemFonts: true,
    } as Record<string, unknown>).promise;

    const lines: string[] = [];
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item: unknown) => {
          const it = item as Record<string, unknown>;
          return typeof it.str === "string" ? it.str : "";
        })
        .join(" ");
      if (pageText.trim()) lines.push(pageText.trim());
    }

    const extractedText = lines.join("\n\n");
    if (!extractedText) {
      return NextResponse.json({ error: "No readable text found in this PDF" }, { status: 422 });
    }

    const wordContent = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset="utf-8"><title>${escapeHtml(file.name)}</title>
<style>body{font-family:'Times New Roman',serif;font-size:12pt;line-height:1.5;padding:2cm}p{margin:0 0 6pt}</style>
</head><body>
${extractedText.split("\n").map(l => l.trim() ? `<p>${escapeHtml(l)}</p>` : "<br/>").join("\n")}
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
