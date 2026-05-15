import { laWy25Gallery } from "@/content/galleries/la-wy25";
import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { GalleryPageContent } from "@/types/content";

export const laWy25Page = {
  routeKey: "la-wy25",
  legacyFolder: "la-wy25",
  pathname: CANONICAL_PATHS["la-wy25"],
  kind: "gallery",
  title: {
    navigationLabel: "LA-WY25",
    displayTitle: "LA-WY25",
    metadataTitle: "LA-WY25 | Leonardo Fiori",
    sourceFile: "la-wy25/title.txt",
  },
  seo: {
    title: "LA-WY25 | Road Trip Photography from Los Angeles to Wyoming",
    description:
      "LA-WY25 is a road trip photography series by Leonardo Fiori, sequenced as an itinerary from Los Angeles through Joshua Tree, Flagstaff, Sedona, the Grand Canyon, Monument Valley and Arches, ending in Wyoming.",
    keywords: [
      "LA-WY25",
      "Leonardo Fiori",
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
    sourceFile: "la-wy25/text.txt",
    value:
      "LA-WY25 follows a road trip from Los Angeles to Wyoming through the desert Southwest. Ordered as an itinerary rather than by camera or shoot date, the sequence moves from Venice Beach and Joshua Tree through Flagstaff, Sedona, the Grand Canyon, Monument Valley and Arches before ending in Jackson and the Teton landscapes.",
  },
  gallery: laWy25Gallery,
} satisfies GalleryPageContent;
