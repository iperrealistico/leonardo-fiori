import type { PublicRouteKey } from "@/lib/site/routes";

export type ContentFormat = "plain-text" | "markdown";
export type ImageOrientation = "landscape" | "portrait" | "square";
export type GalleryRouteKey = Exclude<PublicRouteKey, "about">;

export type TitleAuthority = {
  navigationLabel: string;
  displayTitle: string;
  metadataTitle: string;
  sourceFile: string;
};

export type SeoPageMetadata = {
  title: string;
  description: string;
  keywords: readonly string[];
};

export type TextBlock = {
  format: ContentFormat;
  sourceFile: string;
  value: string;
};

export type GalleryImageAsset = {
  id: string;
  index: number;
  filename: string;
  publicPath: string;
  legacyPath: string;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: ImageOrientation;
  alt: string;
};

export type GalleryManifest = {
  routeKey: GalleryRouteKey;
  legacyFolder: string;
  publicAssetFolder: string;
  sourcePattern: "ordered-manifest";
  totalImages: number;
  coverImage: GalleryImageAsset;
  images: readonly GalleryImageAsset[];
};

export type BasePageContent = {
  routeKey: PublicRouteKey;
  legacyFolder: string;
  pathname: string;
  kind: "gallery" | "text";
  title: TitleAuthority;
  seo: SeoPageMetadata;
  navigationVisible: boolean;
};

export type GalleryPageContent = BasePageContent & {
  kind: "gallery";
  description: TextBlock | null;
  gallery: GalleryManifest;
};

type AboutSectionBase = {
  id: string;
  heading: string;
};

export type AboutParagraphSection = AboutSectionBase & {
  kind: "paragraph";
  paragraphs: readonly string[];
};

export type AboutLinkListItem = {
  label: string;
  href: string;
};

export type AboutLinkListSection = AboutSectionBase & {
  kind: "link-list";
  items: readonly AboutLinkListItem[];
};

export type AboutSection = AboutParagraphSection | AboutLinkListSection;

export type TextPageContent = BasePageContent & {
  kind: "text";
  sourceFile: string;
  sections: readonly AboutSection[];
};

export type PublicPageContent = GalleryPageContent | TextPageContent;

export type DormantLegacyEntry = {
  legacyFolder: string;
  title: string;
  href: string;
  reason: string;
};

export type SiteConfig = {
  siteName: string;
  authorName: string;
  locale: string;
  openGraphLocale: string;
  languageTag: string;
  countryName: string;
  siteUrl: string;
  footerText: string;
  routeOrder: readonly PublicRouteKey[];
  publicMediaBasePath: string;
  legacyProjectsFile: string;
  titleSource: string;
  defaultMetadataTitle: string;
  defaultMetadataDescription: string;
  defaultOpenGraphImage: string;
  defaultOpenGraphImageAlt: string;
  defaultKeywords: readonly string[];
  personSummary: string;
  personJobTitle: string;
  socialProfiles: readonly string[];
  dormantLegacyEntries: readonly DormantLegacyEntry[];
};
