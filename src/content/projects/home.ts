import { homeGallery } from "@/content/galleries/home";
import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { GalleryPageContent } from "@/types/content";

export const homePage = {
  routeKey: "home",
  legacyFolder: "home",
  pathname: CANONICAL_PATHS.home,
  kind: "gallery",
  title: {
    navigationLabel: "Home",
    displayTitle: "Home",
    metadataTitle: "Leonardo Fiori",
    sourceFile: "home/title.txt",
  },
  seo: {
    title: "Leonardo Fiori | Artist, Photographer & Director",
    description:
      "Portfolio of Leonardo Fiori, an artist, photographer and director whose work spans photography, moving image and experimental visual projects.",
    keywords: [
      "Leonardo Fiori",
      "artist portfolio",
      "photographer portfolio",
      "director portfolio",
      "Italy",
      "visual artist",
    ],
  },
  navigationVisible: false,
  description: null,
  gallery: homeGallery,
} satisfies GalleryPageContent;
