import { aboutPage } from "@/content/projects/about";
import { emulsionePage } from "@/content/projects/emulsione";
import { homePage } from "@/content/projects/home";
import { laWy25Page } from "@/content/projects/la-wy25";
import { radiciPage } from "@/content/projects/radici";
import type { PublicRouteKey } from "@/lib/site/routes";
import type { PublicPageContent } from "@/types/content";

export { aboutPage, emulsionePage, homePage, laWy25Page, radiciPage };

export const publicPagesByRoute = {
  home: homePage,
  "la-wy25": laWy25Page,
  radici: radiciPage,
  emulsione: emulsionePage,
  about: aboutPage,
} as const satisfies Record<PublicRouteKey, PublicPageContent>;
