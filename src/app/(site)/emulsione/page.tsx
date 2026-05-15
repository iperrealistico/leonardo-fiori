import type { Metadata } from "next";
import { InteractiveGalleryPageView } from "@/components/site/interactive-gallery-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { GalleryPageContent } from "@/types/content";

function getEmulsionePage(): GalleryPageContent {
  const page = getPublicPageContent("emulsione");

  if (page.kind !== "gallery") {
    throw new Error("Expected the emulsione route to resolve to gallery content.");
  }

  return page;
}

const emulsionePage = getEmulsionePage();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(emulsionePage);
}

export default function EmulsionePage() {
  return <InteractiveGalleryPageView page={emulsionePage} />;
}
