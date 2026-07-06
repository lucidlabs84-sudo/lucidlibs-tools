"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { VALID_LANGS, LANG_FLAGS, LANG_NAMES, type Lang } from "@/lib/i18n";

export default function SiteHeader({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rest = pathname.replace(/^\/(pt|tr|th|vn|en)(?=\/|$)/, "");
  const hrefFor = (l: Lang) => `/${l}${rest}`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="font-semibold text-gray-900 hover:text-amber-600 transition-colors">
          LucidLibs <span className="text-slate-400 font-normal">Tools</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-xs text-slate-500 hover:text-slate-700 transition-colors flex items-center gap-1"
          >
            {LANG_FLAGS[lang]} {LANG_NAMES[lang]} ▾
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                {VALID_LANGS.map((l) => (
                  <Link
                    key={l}
                    href={hrefFor(l)}
                    onClick={() => setOpen(false)}
                    className={`block w-full text-left px-4 py-1.5 text-xs hover:bg-slate-50 ${l === lang ? "font-semibold text-amber-600" : "text-slate-600"}`}
                  >
                    {LANG_FLAGS[l]} {LANG_NAMES[l]}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
