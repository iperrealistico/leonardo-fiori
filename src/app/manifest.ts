import type { MetadataRoute } from "next";
import { normalizedSiteConfig } from "@/lib/content/site-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: normalizedSiteConfig.siteName,
    short_name: normalizedSiteConfig.siteName,
    description: normalizedSiteConfig.defaultMetadataDescription,
    lang: normalizedSiteConfig.languageTag,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    categories: ["photography", "art", "portfolio"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
