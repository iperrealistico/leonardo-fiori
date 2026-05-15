import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { normalizedSiteConfig } from "@/lib/content/site-content";
import { buildRootJsonLd } from "@/lib/seo/json-ld";

const globalStyles = readFileSync(
  join(process.cwd(), "src/app/globals.css"),
  "utf-8",
);

export const metadata: Metadata = {
  metadataBase: new URL(normalizedSiteConfig.siteUrl),
  title: normalizedSiteConfig.defaultMetadataTitle,
  description: normalizedSiteConfig.defaultMetadataDescription,
  keywords: [...normalizedSiteConfig.defaultKeywords],
  applicationName: normalizedSiteConfig.siteName,
  authors: [{ name: normalizedSiteConfig.authorName }],
  creator: normalizedSiteConfig.authorName,
  publisher: normalizedSiteConfig.authorName,
  category: "Arts & Photography",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: normalizedSiteConfig.openGraphLocale,
    siteName: normalizedSiteConfig.siteName,
    title: normalizedSiteConfig.defaultMetadataTitle,
    description: normalizedSiteConfig.defaultMetadataDescription,
    url: "/",
    images: [
      {
        url: normalizedSiteConfig.defaultOpenGraphImage,
        alt: normalizedSiteConfig.defaultOpenGraphImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: normalizedSiteConfig.defaultMetadataTitle,
    description: normalizedSiteConfig.defaultMetadataDescription,
    images: [normalizedSiteConfig.defaultOpenGraphImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={normalizedSiteConfig.languageTag}>
      <head>
        <link
          rel="preload"
          href="/fonts/crimson-text-400-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/crimson-text-600-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style id="site-styles" dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>
        <a href="#main-content" className="site-skip-link">
          Skip to main content
        </a>
        <JsonLdScript id="site-jsonld" value={buildRootJsonLd()} />
        {children}
      </body>
    </html>
  );
}
