import { InteractiveGallery } from "@/features/gallery/interactive-gallery";
import type { GalleryManifest } from "@/types/content";

export function MultiImageGallery({
  gallery,
}: {
  gallery: GalleryManifest;
}) {
  return <InteractiveGallery gallery={gallery} />;
}
