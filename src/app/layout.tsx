import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-89197XEV14"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-89197XEV14');`}
        </Script>
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
