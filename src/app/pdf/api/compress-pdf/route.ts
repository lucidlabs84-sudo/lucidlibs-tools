import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("files") as File | null;
    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const originalSize = file.size;
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    const compressed = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false });
    const fileName = file.name.replace(/\.pdf$/i, "") + "-compressed.pdf";

    return new NextResponse(Buffer.from(compressed), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "X-Original-Size": String(originalSize),
        "X-Compressed-Size": String(compressed.byteLength),
      },
    });
  } catch (err) {
    console.error("Compress PDF error:", err);
    return NextResponse.json({ error: "Compression failed" }, { status: 500 });
  }
}
