import type { MetadataRoute } from "next";
import { normalizedSiteConfig } from "@/lib/content/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
    ],
    sitemap: `${normalizedSiteConfig.siteUrl}/sitemap.xml`,
    host: new URL(normalizedSiteConfig.siteUrl).hostname,
  };
}
