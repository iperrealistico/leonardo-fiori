import { emulsioneGallery } from "@/content/galleries/emulsione";
import { homeGallery } from "@/content/galleries/home";
import { laWyGallery } from "@/content/galleries/la-wy";
import { radiciGallery } from "@/content/galleries/radici";
import type { GalleryManifest, GalleryRouteKey } from "@/types/content";

export { emulsioneGallery, homeGallery, laWyGallery, radiciGallery };

export const galleryManifestsByRoute = {
  home: homeGallery,
  "la-wy": laWyGallery,
  radici: radiciGallery,
  emulsione: emulsioneGallery,
} as const satisfies Record<GalleryRouteKey, GalleryManifest>;
