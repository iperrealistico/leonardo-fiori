import type { Metadata } from "next";
import { SingleGalleryPageView } from "@/components/site/single-gallery-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { GalleryPageContent } from "@/types/content";

function getHomePage(): GalleryPageContent {
  const page = getPublicPageContent("home");

  if (page.kind !== "gallery") {
    throw new Error("Expected the home route to resolve to gallery content.");
  }

  return page;
}

const homePage = getHomePage();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(homePage);
}

export default function HomePage() {
  return <SingleGalleryPageView page={homePage} />;
}
