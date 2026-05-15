import type { Metadata } from "next";
import { TextPageView } from "@/components/site/text-page-view";
import { getPublicPageContent } from "@/lib/content/site-content";
import { buildPublicPageMetadata } from "@/lib/seo/metadata";
import type { TextPageContent } from "@/types/content";

function getAboutPage(): TextPageContent {
  const page = getPublicPageContent("about");

  if (page.kind !== "text") {
    throw new Error("Expected the about route to resolve to text content.");
  }

  return page;
}

const aboutPage = getAboutPage();

export function generateMetadata(): Metadata {
  return buildPublicPageMetadata(aboutPage);
}

export default function AboutPage() {
  return <TextPageView page={aboutPage} />;
}
