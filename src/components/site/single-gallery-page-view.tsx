import { SingleImageGallery } from "@/components/gallery/single-image-gallery";
import { GalleryPageFrame } from "@/components/site/gallery-page-frame";
import type { GalleryPageContent } from "@/types/content";

export function SingleGalleryPageView({
  page,
}: {
  page: GalleryPageContent;
}) {
  return (
    <GalleryPageFrame
      page={page}
      gallery={<SingleImageGallery gallery={page.gallery} />}
    />
  );
}
