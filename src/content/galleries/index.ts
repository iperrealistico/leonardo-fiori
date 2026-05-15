import { emulsioneGallery } from "@/content/galleries/emulsione";
import { homeGallery } from "@/content/galleries/home";
import { radiciGallery } from "@/content/galleries/radici";
import type { GalleryManifest, GalleryRouteKey } from "@/types/content";

export { emulsioneGallery, homeGallery, radiciGallery };

export const galleryManifestsByRoute = {
  home: homeGallery,
  radici: radiciGallery,
  emulsione: emulsioneGallery,
} as const satisfies Record<GalleryRouteKey, GalleryManifest>;
