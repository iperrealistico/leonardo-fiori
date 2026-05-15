import { PUBLIC_ROUTE_ORDER, SITE_NAME, SITE_URL } from "@/lib/site/routes";
import type { SiteConfig } from "@/types/content";

export const siteConfig = {
  siteName: SITE_NAME,
  authorName: "Leonardo Fiori",
  locale: "en",
  openGraphLocale: "en_US",
  languageTag: "en",
  countryName: "Italy",
  siteUrl: SITE_URL,
  footerText: "\u00a9 2025 Leonardo Fiori. All rights reserved.",
  routeOrder: PUBLIC_ROUTE_ORDER,
  publicMediaBasePath: "/media",
  legacyProjectsFile: "projects.txt",
  titleSource: "index.html <title> and --site-title",
  defaultMetadataTitle: "Leonardo Fiori | Artist, Photographer & Director",
  defaultMetadataDescription:
    "Portfolio of Leonardo Fiori, an artist, photographer and director whose work spans photography, moving image and experimental visual projects.",
  defaultOpenGraphImage: "/media/home/img1.jpg",
  defaultOpenGraphImageAlt:
    "Homepage portfolio image from Leonardo Fiori's website.",
  defaultKeywords: [
    "Leonardo Fiori",
    "artist",
    "photographer",
    "director",
    "portfolio",
    "Italy",
    "fine arts",
    "music videos",
    "fashion films",
  ],
  personSummary:
    "Leonardo Fiori is an artist, photographer and director based in Italy. He works across photography, music videos and fashion films.",
  personJobTitle: "Artist, photographer and director",
  socialProfiles: [
    "https://www.instagram.com/leon.tales",
    "https://t.me/fiorileonardo",
  ],
  dormantLegacyEntries: [
    {
      legacyFolder: "video",
      title: "Video works",
      href: "https://www.lyzardfilm.com",
      reason:
        "Present in the legacy repository, but intentionally absent from projects.txt and the public IA baseline.",
    },
  ],
} satisfies SiteConfig;
