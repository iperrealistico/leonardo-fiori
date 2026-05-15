import { galleryManifestsByRoute } from "@/content/galleries";
import { publicPagesByRoute } from "@/content/projects";
import { siteConfig } from "@/content/site-config";
import { CANONICAL_PATHS, PUBLIC_ROUTE_ORDER, type PublicRouteKey } from "@/lib/site/routes";
import type {
  GalleryManifest,
  GalleryRouteKey,
  PublicPageContent,
  SiteConfig,
} from "@/types/content";

function assertContentModelIntegrity() {
  for (const routeKey of PUBLIC_ROUTE_ORDER) {
    const page = publicPagesByRoute[routeKey];

    if (!page) {
      throw new Error(`Missing content entry for route "${routeKey}".`);
    }

    if (page.pathname !== CANONICAL_PATHS[routeKey]) {
      throw new Error(
        `Path mismatch for route "${routeKey}": expected "${CANONICAL_PATHS[routeKey]}", received "${page.pathname}".`,
      );
    }

    if (page.kind === "gallery" && page.gallery.totalImages === 0) {
      throw new Error(`Gallery route "${routeKey}" must expose at least one image.`);
    }
  }
}

assertContentModelIntegrity();

export const normalizedSiteConfig: SiteConfig = siteConfig;

export const normalizedPublicPages = PUBLIC_ROUTE_ORDER.map(
  (routeKey) => publicPagesByRoute[routeKey],
) as readonly PublicPageContent[];

export function getPublicPageContent(routeKey: PublicRouteKey): PublicPageContent {
  return publicPagesByRoute[routeKey];
}

export function getGalleryManifest(routeKey: GalleryRouteKey): GalleryManifest {
  return galleryManifestsByRoute[routeKey];
}
