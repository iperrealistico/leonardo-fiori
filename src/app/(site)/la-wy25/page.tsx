import type { Metadata } from "next";
import { InteractiveGalleryPageView } from "@/components/site/interactive-gallery-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { GalleryPageContent } from "@/types/content";

function getLaWy25Page(): GalleryPageContent {
  const page = getPublicPageContent("la-wy25");

  if (page.kind !== "gallery") {
    throw new Error("Expected the la-wy25 route to resolve to gallery content.");
  }

  return page;
}

const laWy25Page = getLaWy25Page();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(laWy25Page);
}

export default function LaWy25Page() {
  return <InteractiveGalleryPageView page={laWy25Page} />;
}
