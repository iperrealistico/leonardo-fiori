import { emulsioneGallery } from "@/content/galleries/emulsione";
import { homeGallery } from "@/content/galleries/home";
import { laWy25Gallery } from "@/content/galleries/la-wy25";
import { radiciGallery } from "@/content/galleries/radici";
import type { GalleryManifest, GalleryRouteKey } from "@/types/content";

export { emulsioneGallery, homeGallery, laWy25Gallery, radiciGallery };

export const galleryManifestsByRoute = {
  home: homeGallery,
  "la-wy25": laWy25Gallery,
  radici: radiciGallery,
  emulsione: emulsioneGallery,
} as const satisfies Record<GalleryRouteKey, GalleryManifest>;
