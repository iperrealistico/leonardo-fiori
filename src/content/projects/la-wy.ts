import { laWyGallery } from "@/content/galleries/la-wy";
import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { GalleryPageContent } from "@/types/content";

export const laWyPage = {
  routeKey: "la-wy",
  legacyFolder: "la-wy",
  pathname: CANONICAL_PATHS["la-wy"],
  kind: "gallery",
  title: {
    navigationLabel: "LA-WY",
    displayTitle: "LA-WY",
    metadataTitle: "LA-WY | Leonardo Fiori",
    sourceFile: "la-wy/title.txt",
  },
  seo: {
    title: "LA-WY | Photodump from Los Angeles to Wyoming",
    description:
      "LA-WY is a loose photodump from a road trip between Los Angeles and Wyoming, drifting from Venice through the desert Southwest to Jackson and the Tetons.",
    keywords: [
      "LA-WY",
      "Leonardo Fiori",
      "photodump",
      "road trip photography",
      "Los Angeles to Wyoming",
      "Joshua Tree",
      "Sedona",
      "Monument Valley",
      "Arches",
      "Jackson Wyoming",
    ],
  },
  navigationVisible: true,
  description: {
    format: "plain-text",
    sourceFile: "la-wy/text.txt",
    value:
      "A loose photodump from a trip between Los Angeles and Wyoming, drifting from Venice through the desert Southwest to Jackson and the Tetons.",
  },
  gallery: laWyGallery,
} satisfies GalleryPageContent;
