import { emulsioneGallery } from "@/content/galleries/emulsione";
import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { GalleryPageContent } from "@/types/content";

export const emulsionePage = {
  routeKey: "emulsione",
  legacyFolder: "emulsione",
  pathname: CANONICAL_PATHS.emulsione,
  kind: "gallery",
  title: {
    navigationLabel: "Emulsione",
    displayTitle: "Emulsione",
    metadataTitle: "Emulsione | Leonardo Fiori",
    sourceFile: "emulsione/title.txt",
  },
  seo: {
    title: "Emulsione | Polaroid and Algorithmic Landscape Project",
    description:
      "Emulsione by Leonardo Fiori pairs algorithmic Minecraft landscapes with Polaroid film to explore repetition, variation and material image-making.",
    keywords: [
      "Emulsione",
      "Leonardo Fiori",
      "Polaroid art",
      "algorithmic landscape",
      "Minecraft art",
      "experimental photography",
    ],
  },
  navigationVisible: true,
  description: {
    format: "plain-text",
    sourceFile: "emulsione/text.txt",
    value:
      "Emulsione explores the intersection of algorithmic creation and tangible media. Using a custom modification in the popular game “Minecraft”, Leonardo generated digital landscapes based on unique world seeds, each yielding entirely distinct, yet procedurally created terrains that can be precisely recreated by inputting the same parameters. Screenshots of these worlds are then transferred onto Polaroid film, a medium that, unlike the algorithm, introduces natural variation with each print. Each Polaroid image encapsulates the interplay of intention and the inherent procedural nature of the digital landscapes. By employing an algorithm to capture the screenshots and showcasing the unique materiality of Polaroid film, this project reflects on the intricate relationship between algorithmic generation and artistic expression.",
  },
  gallery: emulsioneGallery,
} satisfies GalleryPageContent;
