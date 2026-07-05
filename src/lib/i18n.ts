export type Lang = "pt" | "tr" | "th" | "vn" | "en";

const VALID_LANGS: Lang[] = ["pt", "tr", "th", "vn", "en"];

const LANG_COOKIE = "tl_lang";

/** Get language from cookie (server-safe, returns null on server) */
function getLangCookie(): Lang | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=([^;]*)`));
  if (!match) return null;
  const val = match[1] as Lang;
  return VALID_LANGS.includes(val) ? val : null;
}

/** Set language cookie (path=/, expires in 1 year) */
export function setLangCookie(lang: Lang) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

/**
 * Detect best language for current user.
 * Priority: URL ?lang= > cookie > navigator.language > default "en"
 */
export function detectLang(): Lang {
  if (typeof window === "undefined") return "en";

  // 1. URL query param (explicit override)
  const param = new URLSearchParams(window.location.search).get("lang");
  if (param && VALID_LANGS.includes(param as Lang)) {
    const l = param as Lang;
    setLangCookie(l); // persist override
    return l;
  }

  // 2. Cookie (previous visit)
  const cookie = getLangCookie();
  if (cookie) return cookie;

  // 3. Browser language
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith("pt")) return "pt";
  if (nav.startsWith("tr")) return "tr";
  if (nav.startsWith("th")) return "th";
  if (nav.startsWith("vi")) return "vn";

  // 4. Default: English
  return "en";
}

/** Sync URL ?lang= param with cookie (call after setLangCookie) */
export function syncUrlLang(lang: Lang) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url.toString());
}

/** Full website name per language */
export function siteName(lang: Lang): string {
  const names: Record<Lang, string> = {
    pt: "Ferramentas Online Grátis — LucidLibs",
    tr: "Ücretsiz Çevrimiçi Araçlar — LucidLibs",
    th: "เครื่องมือออนไลน์ฟรี — LucidLibs",
    vn: "Công Cụ Online Miễn Phí — LucidLibs",
    en: "Free Online Tools — LucidLibs",
  };
  return names[lang] || names.en;
}
