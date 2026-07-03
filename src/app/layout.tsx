import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Online Tools — LucidLibs",
  description:
    "Free online tools: PDF converter, image compressor, BMI calculator, QR code generator, and more. No sign-up, no ads.",
  openGraph: {
    title: "Free Online Tools — LucidLibs",
    description:
      "Free online tools: PDF, image, calculator, QR code. Fast, private, no sign-up.",
    url: "https://tools.lucidlibs.dev",
    siteName: "LucidLibs Tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-slate-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
