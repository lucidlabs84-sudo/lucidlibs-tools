import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache static assets aggressively
  headers: async () => [
    {
      source: "/_next/static/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/icons/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400" },
      ],
    },
  ],

  compress: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
