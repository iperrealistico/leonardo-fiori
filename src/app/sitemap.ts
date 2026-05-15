import type { MetadataRoute } from "next";
import {
  normalizedPublicPages,
  normalizedSiteConfig,
} from "@/lib/content/site-content";
import { toAbsoluteUrl } from "@/lib/seo/metadata";

const lastModified = new Date("2026-05-15T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return normalizedPublicPages.map((page) => ({
    url: `${normalizedSiteConfig.siteUrl}${page.pathname}`,
    lastModified,
    changeFrequency: page.routeKey === "home" ? "weekly" : "monthly",
    priority: page.routeKey === "home" ? 1 : 0.8,
    ...(page.kind === "gallery"
      ? {
          images: page.gallery.images.map((image) => toAbsoluteUrl(image.publicPath)),
        }
      : {}),
  }));
}
