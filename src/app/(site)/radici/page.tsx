import type { Metadata } from "next";
import { InteractiveGalleryPageView } from "@/components/site/interactive-gallery-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { GalleryPageContent } from "@/types/content";

function getRadiciPage(): GalleryPageContent {
  const page = getPublicPageContent("radici");

  if (page.kind !== "gallery") {
    throw new Error("Expected the radici route to resolve to gallery content.");
  }

  return page;
}

const radiciPage = getRadiciPage();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(radiciPage);
}

export default function RadiciPage() {
  return <InteractiveGalleryPageView page={radiciPage} />;
}
