import { radiciGallery } from "@/content/galleries/radici";
import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { GalleryPageContent } from "@/types/content";

export const radiciPage = {
  routeKey: "radici",
  legacyFolder: "radici",
  pathname: CANONICAL_PATHS.radici,
  kind: "gallery",
  title: {
    navigationLabel: "Radici",
    displayTitle: "Radici",
    metadataTitle: "Radici | Leonardo Fiori",
    sourceFile: "radici/title.txt",
  },
  seo: {
    title: "Radici | Photography Project by Leonardo Fiori",
    description:
      "Radici is a photography project by Leonardo Fiori set in the Garfagnana valley, tracing memory, abandoned places and quiet observation through landscape and ruins.",
    keywords: [
      "Radici",
      "Leonardo Fiori",
      "photography project",
      "Garfagnana valley",
      "abandoned places",
      "landscape photography",
    ],
  },
  navigationVisible: true,
  description: {
    format: "plain-text",
    sourceFile: "radici/text.txt",
    value:
      "Radici (Roots) is a photographic project produced by Leonardo between 2020 and 2021 in the Garfagnana valley, his homeland. Rather than focusing on documenting abandoned places, this project reflects a personal journey of contemplation. Leonardo approached these sites once homes, huts, or metati as remnants of a past that now feels mysterious and at times incomprehensible. Left to the elements, these structures have become silent altars to another time, offering viewers a quiet space to reflect and silently observe what remains.",
  },
  gallery: radiciGallery,
} satisfies GalleryPageContent;
