import type { GalleryImageAsset } from "@/types/content";

export const GALLERY_IMAGE_SIZES =
  "(max-width: 768px) calc(100vw - 20px), 900px";

const RESPONSIVE_IMAGE_WIDTHS = [480, 768, 1024, 1440, 1920] as const;

export type ResponsiveImageFormat = "avif" | "webp" | "jpg";

function splitPublicPath(publicPath: string) {
  const normalizedPath = publicPath.replace(/^\/+/, "");
  const lastSlashIndex = normalizedPath.lastIndexOf("/");
  const dotIndex = normalizedPath.lastIndexOf(".");

  if (lastSlashIndex === -1 || dotIndex === -1 || dotIndex < lastSlashIndex) {
    throw new Error(`Unsupported public image path "${publicPath}".`);
  }

  return {
    dirname: normalizedPath.slice(0, lastSlashIndex),
    basename: normalizedPath.slice(lastSlashIndex + 1, dotIndex),
  };
}

export function getResponsiveImageWidths(
  image: GalleryImageAsset,
): readonly number[] {
  const widths: number[] = RESPONSIVE_IMAGE_WIDTHS.filter(
    (width) => width < image.width,
  );

  if (widths.length === 0 || widths[widths.length - 1] !== image.width) {
    widths.push(image.width);
  }

  return widths;
}

export function getResponsiveImageVariantPath(
  image: GalleryImageAsset,
  format: ResponsiveImageFormat,
  width: number,
) {
  const { dirname, basename } = splitPublicPath(image.publicPath);
  const relativeDirectory = dirname.replace(/^media\//, "");

  return `/${["media-responsive", relativeDirectory, `${basename}-w${width}.${format}`].join("/")}`;
}

export function buildResponsiveImageSrcSet(
  image: GalleryImageAsset,
  format: ResponsiveImageFormat,
) {
  return getResponsiveImageWidths(image)
    .map(
      (width) =>
        `${getResponsiveImageVariantPath(image, format, width)} ${width}w`,
    )
    .join(", ");
}

export function getResponsiveImageFallbackSrc(
  image: GalleryImageAsset,
  format: ResponsiveImageFormat = "jpg",
) {
  const widths = getResponsiveImageWidths(image);
  const preferredWidth = 1024;
  const fallbackWidth =
    widths.find((width) => width >= preferredWidth) ??
    widths[widths.length - 1] ??
    image.width;

  return getResponsiveImageVariantPath(image, format, fallbackWidth);
}
