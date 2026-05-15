export const SITE_NAME = "Leonardo Fiori" as const;
export const SITE_URL = "https://www.leonardofiori.it" as const;

export const PUBLIC_ROUTE_ORDER = [
  "home",
  "radici",
  "emulsione",
  "about",
] as const;

export type PublicRouteKey = (typeof PUBLIC_ROUTE_ORDER)[number];
export const NAVIGATION_ROUTE_ORDER = ["radici", "emulsione", "about"] as const;
export type NavigationRouteKey = (typeof NAVIGATION_ROUTE_ORDER)[number];
export const LEGACY_PROJECT_QUERY_PARAM = "project" as const;

export const CANONICAL_PATHS: Record<PublicRouteKey, string> = {
  home: "/",
  radici: "/radici",
  emulsione: "/emulsione",
  about: "/about",
};

export const LEGACY_PROJECT_REDIRECTS: Record<PublicRouteKey, string> = {
  home: "/",
  radici: "/radici",
  emulsione: "/emulsione",
  about: "/about",
};

export const RESERVED_ROUTE_GROUPS = ["(site)", "(admin)"] as const;
