import type {
  GalleryImageAsset,
  GalleryManifest,
  GalleryRouteKey,
} from "@/types/content";

type GalleryImageInput = Omit<
  GalleryImageAsset,
  "aspectRatio" | "orientation"
>;

type GalleryManifestInput = {
  routeKey: GalleryRouteKey;
  legacyFolder: string;
  images: readonly GalleryImageAsset[];
};

function getImageOrientation(
  width: number,
  height: number,
): GalleryImageAsset["orientation"] {
  if (width === height) {
    return "square";
  }

  return width > height ? "landscape" : "portrait";
}

function getAspectRatio(width: number, height: number) {
  return Number((width / height).toFixed(6));
}

export function createGalleryImageAsset(
  input: GalleryImageInput,
): GalleryImageAsset {
  return {
    ...input,
    aspectRatio: getAspectRatio(input.width, input.height),
    orientation: getImageOrientation(input.width, input.height),
  };
}

export function createGalleryManifest(
  input: GalleryManifestInput,
): GalleryManifest {
  const coverImage = input.images[0];

  if (!coverImage) {
    throw new Error(`Gallery "${input.routeKey}" must contain at least one image.`);
  }

  return {
    routeKey: input.routeKey,
    legacyFolder: input.legacyFolder,
    publicAssetFolder: `/media/${input.legacyFolder}`,
    sourcePattern: "ordered-manifest",
    totalImages: input.images.length,
    coverImage,
    images: input.images,
  };
}
