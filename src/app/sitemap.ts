import type { MetadataRoute } from "next";
import { VALID_LANGS } from "@/lib/i18n";
import { TOOL_KEYS } from "@/lib/tool-meta";

const BASE_URL = "https://tools.lucidlibs.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of VALID_LANGS) {
    entries.push({ url: `${BASE_URL}/${lang}`, changeFrequency: "weekly", priority: 1 });
    for (const tool of TOOL_KEYS) {
      entries.push({ url: `${BASE_URL}/${lang}/${tool}`, changeFrequency: "weekly", priority: 0.8 });
    }
  }

  return entries;
}
