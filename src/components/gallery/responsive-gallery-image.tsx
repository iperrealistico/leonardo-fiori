import type { ImgHTMLAttributes } from "react";
import {
  buildResponsiveImageSrcSet,
  GALLERY_IMAGE_SIZES,
  getResponsiveImageFallbackSrc,
} from "@/lib/site/responsive-images";
import type { GalleryImageAsset } from "@/types/content";

type ResponsiveGalleryImageProps = {
  asset: GalleryImageAsset;
  className: string;
  eager?: boolean;
  fetchPriority?: ImgHTMLAttributes<HTMLImageElement>["fetchPriority"];
  sizes?: string;
};

export function ResponsiveGalleryImage({
  asset,
  className,
  eager = false,
  fetchPriority,
  sizes = GALLERY_IMAGE_SIZES,
}: ResponsiveGalleryImageProps) {
  return (
    <picture className="site-gallery-picture">
      <source
        type="image/avif"
        srcSet={buildResponsiveImageSrcSet(asset, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={buildResponsiveImageSrcSet(asset, "webp")}
        sizes={sizes}
      />
      <img
        src={getResponsiveImageFallbackSrc(asset)}
        srcSet={buildResponsiveImageSrcSet(asset, "jpg")}
        sizes={sizes}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
