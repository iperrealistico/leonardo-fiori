import type { Metadata } from "next";
import { normalizedSiteConfig } from "@/lib/content/site-content";
import type { PublicPageContent } from "@/types/content";

type MetadataImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export function toAbsoluteUrl(pathname: string) {
  return new URL(pathname, normalizedSiteConfig.siteUrl).toString();
}

function getPageImage(page: PublicPageContent): MetadataImage {
  if (page.kind === "gallery") {
    return {
      url: page.gallery.coverImage.publicPath,
      alt: page.gallery.coverImage.alt,
      width: page.gallery.coverImage.width,
      height: page.gallery.coverImage.height,
    };
  }

  return {
    url: normalizedSiteConfig.defaultOpenGraphImage,
    alt: normalizedSiteConfig.defaultOpenGraphImageAlt,
  };
}

export function buildPublicPageMetadata(page: PublicPageContent): Metadata {
  const description = page.seo.description;
  const image = getPageImage(page);
  const isAboutPage = page.routeKey === "about";

  return {
    title: page.seo.title,
    description,
    keywords: [...page.seo.keywords],
    alternates: {
      canonical: page.pathname,
    },
    openGraph: {
      type: isAboutPage ? "profile" : "website",
      locale: normalizedSiteConfig.openGraphLocale,
      siteName: normalizedSiteConfig.siteName,
      title: page.seo.title,
      description,
      url: page.pathname,
      images: [image],
      ...(isAboutPage
        ? {
            firstName: "Leonardo",
            lastName: "Fiori",
            username: "leon.tales",
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description,
      images: [image],
    },
  };
}
