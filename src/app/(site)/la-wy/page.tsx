import type { Metadata } from "next";
import { InteractiveGalleryPageView } from "@/components/site/interactive-gallery-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { GalleryPageContent } from "@/types/content";

function getLaWyPage(): GalleryPageContent {
  const page = getPublicPageContent("la-wy");

  if (page.kind !== "gallery") {
    throw new Error("Expected the la-wy route to resolve to gallery content.");
  }

  return page;
}

const laWyPage = getLaWyPage();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(laWyPage);
}

export default function LaWyPage() {
  return <InteractiveGalleryPageView page={laWyPage} />;
}
