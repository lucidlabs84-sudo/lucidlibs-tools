import Link from "next/link";

const tools = [
  {
    href: "/pdf",
    title: "PDF Tools",
    description:
      "Convert PDF to Word, compress PDF, merge PDFs — all free, all in your browser.",
    color: "bg-red-500",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="6" y="4" width="36" height="40" rx="3" fill="#EF4444" />
        <text
          x="24"
          y="30"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          PDF
        </text>
      </svg>
    ),
  },
  {
    href: "/img",
    title: "Image Compressor",
    description:
      "Compress JPG, PNG, WebP images without quality loss. Batch processing support.",
    color: "bg-green-500",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#22C55E" />
        <circle cx="18" cy="17" r="4" fill="white" opacity="0.9" />
        <path
          d="M8 36l10-12 8 8 6-6 12 10"
          stroke="white"
          strokeWidth="2"
          fill="none"
          opacity="0.9"
        />
      </svg>
    ),
  },
  {
    href: "/bmi",
    title: "BMI Calculator",
    description:
      "Calculate your Body Mass Index with WHO classification. For adults and children.",
    color: "bg-blue-500",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#3B82F6" />
        <path
          d="M24 12v24M16 20h16M16 28h16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "/qrcode",
    title: "QR Code Generator",
    description:
      "Generate QR codes for URLs, text, email, phone, WiFi, and vCard. Customize colors.",
    color: "bg-purple-500",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#A855F7" />
        <rect x="12" y="12" width="8" height="8" rx="1" fill="white" />
        <rect x="28" y="12" width="8" height="8" rx="1" fill="white" />
        <rect x="12" y="28" width="8" height="8" rx="1" fill="white" />
        <rect x="28" y="28" width="4" height="4" rx="1" fill="white" />
        <rect x="36" y="28" width="4" height="4" rx="1" fill="white" />
        <rect x="28" y="36" width="4" height="4" rx="1" fill="white" />
        <rect x="36" y="36" width="4" height="4" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    href: "/calc",
    title: "Calculator",
    description:
      "Percentage, compound interest, rule of three, tip calculator, discount — all in one.",
    color: "bg-amber-500",
    icon: (
      <svg
        className="w-12 h-12"
        viewBox="0 0 48 48"
        fill="none"
      >
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#F59E0B" />
        <rect x="12" y="12" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="12" width="10" height="6" rx="1" fill="white" />
        <rect x="12" y="22" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="22" width="10" height="6" rx="1" fill="white" />
        <rect x="12" y="32" width="10" height="6" rx="1" fill="white" />
        <rect x="26" y="32" width="10" height="6" rx="1" fill="white" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Free Online Tools
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Simple, free, and private. All tools run in your browser — no file
          uploads to servers, no sign-up required.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-300 hover:shadow-lg transition-all"
          >
            <div className="mb-4">{tool.icon}</div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-sm text-slate-400">
        <p>
          Powered by{" "}
          <a
            href="https://lucidlibs.dev"
            className="text-amber-600 hover:underline"
          >
            LucidLibs
          </a>{" "}
          — Free tools, no strings attached.
        </p>
      </footer>
    </main>
  );
}
