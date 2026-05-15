import { normalizedSiteConfig } from "@/lib/content/site-content";
import { toAbsoluteUrl } from "@/lib/seo/metadata";
import type { PublicPageContent } from "@/types/content";

type JsonLdRecord = Record<string, unknown>;

const PERSON_ID = `${normalizedSiteConfig.siteUrl}/about#person`;
const WEBSITE_ID = `${normalizedSiteConfig.siteUrl}/#website`;

function buildImageObject(image: {
  alt: string;
  height?: number;
  publicPath?: string;
  url?: string;
  width?: number;
}) {
  const imageUrl = image.publicPath ?? image.url;

  if (!imageUrl) {
    return null;
  }

  return {
    "@type": "ImageObject",
    url: toAbsoluteUrl(imageUrl),
    caption: image.alt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
  };
}

export function buildRootJsonLd(): readonly JsonLdRecord[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: normalizedSiteConfig.siteUrl,
      name: normalizedSiteConfig.siteName,
      description: normalizedSiteConfig.defaultMetadataDescription,
      inLanguage: normalizedSiteConfig.languageTag,
      author: {
        "@id": PERSON_ID,
      },
      creator: {
        "@id": PERSON_ID,
      },
      publisher: {
        "@id": PERSON_ID,
      },
      keywords: normalizedSiteConfig.defaultKeywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": PERSON_ID,
      name: normalizedSiteConfig.authorName,
      url: `${normalizedSiteConfig.siteUrl}/about`,
      description: normalizedSiteConfig.personSummary,
      jobTitle: normalizedSiteConfig.personJobTitle,
      homeLocation: {
        "@type": "Country",
        name: normalizedSiteConfig.countryName,
      },
      sameAs: normalizedSiteConfig.socialProfiles,
      knowsAbout: normalizedSiteConfig.defaultKeywords,
    },
  ];
}

function buildBreadcrumbJsonLd(page: PublicPageContent): JsonLdRecord | null {
  if (page.routeKey === "home") {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${toAbsoluteUrl(page.pathname)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: normalizedSiteConfig.siteName,
        item: normalizedSiteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title.displayTitle,
        item: toAbsoluteUrl(page.pathname),
      },
    ],
  };
}

function buildHomePageJsonLd(page: PublicPageContent): JsonLdRecord {
  if (page.kind !== "gallery") {
    throw new Error("Expected home page content to be gallery-based.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${normalizedSiteConfig.siteUrl}/#webpage`,
    url: normalizedSiteConfig.siteUrl,
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: normalizedSiteConfig.languageTag,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: {
      "@id": PERSON_ID,
    },
    primaryImageOfPage: buildImageObject(page.gallery.coverImage),
  };
}

function buildGalleryPageJsonLd(page: PublicPageContent): JsonLdRecord {
  if (page.kind !== "gallery") {
    throw new Error("Expected gallery page content.");
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${toAbsoluteUrl(page.pathname)}#webpage`,
    url: toAbsoluteUrl(page.pathname),
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: normalizedSiteConfig.languageTag,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    creator: {
      "@id": PERSON_ID,
    },
    breadcrumb: {
      "@id": `${toAbsoluteUrl(page.pathname)}#breadcrumb`,
    },
    primaryImageOfPage: buildImageObject(page.gallery.coverImage),
  };
}

function buildAboutPageJsonLd(page: PublicPageContent): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${toAbsoluteUrl(page.pathname)}#webpage`,
    url: toAbsoluteUrl(page.pathname),
    name: page.seo.title,
    description: page.seo.description,
    inLanguage: normalizedSiteConfig.languageTag,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    breadcrumb: {
      "@id": `${toAbsoluteUrl(page.pathname)}#breadcrumb`,
    },
    mainEntity: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: normalizedSiteConfig.authorName,
      description: normalizedSiteConfig.personSummary,
      sameAs: normalizedSiteConfig.socialProfiles,
    },
  };
}

export function buildPublicPageJsonLd(
  page: PublicPageContent,
): readonly JsonLdRecord[] {
  const entries: JsonLdRecord[] = [];

  if (page.routeKey === "home") {
    entries.push(buildHomePageJsonLd(page));
    return entries;
  }

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(page);

  if (breadcrumbJsonLd) {
    entries.push(breadcrumbJsonLd);
  }

  if (page.routeKey === "about") {
    entries.push(buildAboutPageJsonLd(page));
    return entries;
  }

  entries.push(buildGalleryPageJsonLd(page));
  return entries;
}
