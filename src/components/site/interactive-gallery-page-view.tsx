import { MultiImageGallery } from "@/components/gallery/multi-image-gallery";
import { GalleryPageFrame } from "@/components/site/gallery-page-frame";
import type { GalleryPageContent } from "@/types/content";

export function InteractiveGalleryPageView({
  page,
}: {
  page: GalleryPageContent;
}) {
  return (
    <GalleryPageFrame
      page={page}
      gallery={<MultiImageGallery gallery={page.gallery} />}
    />
  );
}
