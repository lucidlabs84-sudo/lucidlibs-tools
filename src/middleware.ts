import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["pt", "tr", "th", "vn", "en"];
const LANG_COOKIE = "tl_lang";

function detectLang(request: NextRequest): string {
  // 1. Check cookie
  const cookie = request.cookies.get(LANG_COOKIE)?.value;
  if (cookie && VALID_LANGS.includes(cookie)) return cookie;

  // 2. Check Accept-Language header
  const al = request.headers.get("accept-language") || "";
  const first = al.split(",")[0]?.trim().toLowerCase() || "";
  if (first.startsWith("pt")) return "pt";
  if (first.startsWith("tr")) return "tr";
  if (first.startsWith("th")) return "th";
  if (first.startsWith("vi")) return "vn";

  // 3. Default
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Don't redirect API routes, static files, _next, or well-known crawler files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/pdf/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(ico|png|svg|jpg|jpeg|webp|js|css|json|txt|xml)$/)
  ) {
    return NextResponse.next();
  }

  // Already on a language-prefixed path
  const langMatch = pathname.match(/^\/(pt|tr|th|vn|en)(\/|$)/);
  if (langMatch) {
    const lang = langMatch[1];
    const response = NextResponse.next();
    response.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  // Root or non-prefixed path: redirect to language-prefixed version
  const lang = detectLang(request);
  const rest = pathname === "/" ? "" : pathname;
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${lang}${rest}`;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set(LANG_COOKIE, lang, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|pdf/api|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)"],
};
