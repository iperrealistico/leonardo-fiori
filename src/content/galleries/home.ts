import { createGalleryImageAsset, createGalleryManifest } from "@/lib/content/builders";

const homeImages = [
  createGalleryImageAsset({
    id: "home-01",
    index: 1,
    filename: "img1.jpg",
    publicPath: "/media/home/img1.jpg",
    legacyPath: "home/img/img1.jpg",
    width: 1920,
    height: 1282,
    alt: "Distant figure in red standing among trees and ruined stone walls in a dark forest clearing.",
  }),
] as const;

export const homeGallery = createGalleryManifest({
  routeKey: "home",
  legacyFolder: "home",
  images: homeImages,
});
