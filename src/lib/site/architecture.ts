export const CONTENT_BOUNDARIES = {
  projectData: "src/content/projects",
  galleryManifests: "src/content/galleries",
  publicMediaRoot: "public/media",
  contentLoaders: "src/lib/content",
  seoUtilities: "src/lib/seo",
} as const;

export const COMPONENT_BOUNDARIES = {
  publicShell: "src/components/site",
  galleryUi: "src/components/gallery",
  navigationFeature: "src/features/navigation",
  galleryFeature: "src/features/gallery",
} as const;

export const CLIENT_RUNTIME_BOUNDARIES = {
  defaultRenderingMode: "server-components-by-default",
  allowedClientIslands: ["gallery", "mobile-menu"] as const,
  forbiddenClientPatterns: [
    "client-side route content loading",
    "runtime folder probing",
    "hydrated shell for static pages",
  ] as const,
} as const;

export const FUTURE_ADMIN_BOUNDARIES = {
  reservedRouteGroup: "(admin)",
  editableProjectData: "src/content/projects",
  editableGalleryManifests: "src/content/galleries",
  editableAssets: "public/media",
} as const;
