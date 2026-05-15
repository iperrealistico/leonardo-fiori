import { aboutPage } from "@/content/projects/about";
import { emulsionePage } from "@/content/projects/emulsione";
import { homePage } from "@/content/projects/home";
import { laWyPage } from "@/content/projects/la-wy";
import { radiciPage } from "@/content/projects/radici";
import type { PublicRouteKey } from "@/lib/site/routes";
import type { PublicPageContent } from "@/types/content";

export { aboutPage, emulsionePage, homePage, laWyPage, radiciPage };

export const publicPagesByRoute = {
  home: homePage,
  "la-wy": laWyPage,
  radici: radiciPage,
  emulsione: emulsionePage,
  about: aboutPage,
} as const satisfies Record<PublicRouteKey, PublicPageContent>;
