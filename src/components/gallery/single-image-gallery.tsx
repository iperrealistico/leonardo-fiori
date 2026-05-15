import { ResponsiveGalleryImage } from "@/components/gallery/responsive-gallery-image";
import { GALLERY_IMAGE_SIZES } from "@/lib/site/responsive-images";
import type { GalleryManifest } from "@/types/content";

export function SingleImageGallery({
  gallery,
}: {
  gallery: GalleryManifest;
}) {
  const image = gallery.coverImage;

  return (
    <div className="site-gallery-container">
      <figure className="site-gallery-frame">
        <div className="site-gallery-photo-wrapper">
          <ResponsiveGalleryImage
            asset={image}
            eager
            fetchPriority="high"
            sizes={GALLERY_IMAGE_SIZES}
            className="site-gallery-photo"
          />
        </div>
      </figure>
    </div>
  );
}
