import { CANONICAL_PATHS } from "@/lib/site/routes";
import type { TextPageContent } from "@/types/content";

export const aboutPage = {
  routeKey: "about",
  legacyFolder: "about",
  pathname: CANONICAL_PATHS.about,
  kind: "text",
  title: {
    navigationLabel: "About",
    displayTitle: "About",
    metadataTitle: "About | Leonardo Fiori",
    sourceFile: "about/title.txt",
  },
  seo: {
    title: "About Leonardo Fiori | Artist, Photographer & Director",
    description:
      "Read about Leonardo Fiori, an artist, photographer and director based in Italy, and find contact links, publications, exhibitions and awards.",
    keywords: [
      "About Leonardo Fiori",
      "artist biography",
      "photographer biography",
      "director biography",
      "Italy",
      "publications exhibitions awards",
    ],
  },
  navigationVisible: true,
  sourceFile: "about/text.txt",
  sections: [
    {
      id: "biography",
      heading: "Biography",
      kind: "paragraph",
      paragraphs: [
        "Leonardo Fiori is an artist, photographer and director. He graduated in fine arts in Florence. Leonardo now produces and directs music videos and fashion films.",
      ],
    },
    {
      id: "contacts",
      heading: "Contacts",
      kind: "link-list",
      items: [
        {
          label: "Message me on Telegram",
          href: "https://t.me/fiorileonardo",
        },
        {
          label: "Follow me on Instagram",
          href: "https://www.instagram.com/leon.tales",
        },
      ],
    },
    {
      id: "selected-publications-exhibitions-and-contests",
      heading: "Selected publications, exhibitions and contests",
      kind: "link-list",
      items: [
        {
          label:
            "Artwort – Le Radici di Leonardo Fiori nelle sue immagini illuminate dalla nostalgia",
          href: "https://www.artwort.com/2021/07/22/fotografia/radici-leonardo-fiori-nostalgia/",
        },
        {
          label: "Aint-Bad – An Independent Publisher of Contemporary Art",
          href: "https://www.aint-bad.com/article/2021/08/18/leonardo-fiori/",
        },
        {
          label: "Artdoc – Leonardo Fiori, Radici",
          href: "https://www.artdoc.photo/submissions/radici",
        },
        {
          label: "FLOAT Magazine – Leonardo Fiori",
          href: "https://www.floatmagazine.us/portfolios/leonardo-fiori",
        },
        {
          label:
            "ND Awards 2022 – Honorable Mention – Photo Essay – Radici",
          href: "https://ndawards.net/winners-gallery/nd-awards-2022/professional/photo-essay-story/hm/16787/",
        },
        {
          label:
            "ph21gallery – Group exhibition – Shape @ Barcellona – 2022 – Radici",
          href: "https://www.ph21gallery.com/shape-barcelona-22-october",
        },
        {
          label:
            "ph21gallery – Group exhibition – Time @ Budapest – 2022 – Radici",
          href: "https://www.ph21gallery.com/time-22",
        },
        {
          label:
            "LoosenArt – Progress. On Contemporary and Future Society – Rome – 2022 – Radici",
          href: "https://www.loosenart.com/pages/news-progress-on-contemporary-and-future-society",
        },
      ],
    },
  ],
} satisfies TextPageContent;
