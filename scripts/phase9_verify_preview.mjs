import { writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";
const reportPath =
  process.argv[3] ??
  path.join(
    process.cwd(),
    "output/playwright/phase9-local-qa/preview-verification.json",
  );

const routes = [
  {
    key: "home",
    path: "/",
    expectedTitle: "Leonardo Fiori | Artist, Photographer & Director",
    expectedCanonical: "https://leonardofiori.it",
    requiredSnippets: [
      'lang="en"',
      "Distant figure in red standing among trees and ruined stone walls in a dark forest clearing.",
      "Leonardo Fiori | Artist, Photographer & Director",
    ],
  },
  {
    key: "radici",
    path: "/radici",
    expectedTitle: "Radici | Photography Project by Leonardo Fiori",
    expectedCanonical: "https://leonardofiori.it/radici",
    requiredSnippets: [
      "Radici (Roots) is a photographic project produced by Leonardo between 2020 and 2021 in the Garfagnana valley",
      "Figure seen from behind facing ruined stone buildings in a leaf-covered clearing.",
      '"@type":"CollectionPage"',
    ],
  },
  {
    key: "emulsione",
    path: "/emulsione",
    expectedTitle: "Emulsione | Polaroid and Algorithmic Landscape Project",
    expectedCanonical: "https://leonardofiori.it/emulsione",
    requiredSnippets: [
      "Emulsione explores the intersection of algorithmic creation and tangible media.",
      "polaroid",
      '"@type":"CollectionPage"',
    ],
  },
  {
    key: "about",
    path: "/about",
    expectedTitle: "About Leonardo Fiori | Artist, Photographer & Director",
    expectedCanonical: "https://leonardofiori.it/about",
    requiredSnippets: [
      "Biography",
      "Contacts",
      "Selected publications, exhibitions and contests",
      '"@type":"ProfilePage"',
    ],
  },
];

const redirectChecks = [
  { from: "/?project=home", expectedLocation: "/" },
  { from: "/?project=radici", expectedLocation: "/radici" },
  { from: "/?project=emulsione", expectedLocation: "/emulsione" },
  { from: "/?project=about", expectedLocation: "/about" },
];

function normalizeCanonical(value) {
  if (!value) {
    return null;
  }

  return value.replace(/\/$/, "");
}

function decodeHtmlEntities(value) {
  return value
    ?.replace(/&amp;/g, "&")
    ?.replace(/&quot;/g, '"')
    ?.replace(/&#39;/g, "'")
    ?.replace(/&lt;/g, "<")
    ?.replace(/&gt;/g, ">");
}

function extractMatch(source, pattern) {
  const match = source.match(pattern);
  return match?.[1] ?? null;
}

async function fetchText(url, init) {
  const response = await fetch(url, init);
  const body = await response.text();
  return { response, body };
}

const routeResults = [];

for (const route of routes) {
  const { response, body } = await fetchText(`${baseUrl}${route.path}`);
  const lowerBody = body.toLowerCase();
  const title = decodeHtmlEntities(extractMatch(body, /<title>([^<]+)<\/title>/i));
  const canonical = extractMatch(
    body,
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i,
  );
  const headingMatches = [
    ...body.matchAll(/<h([1-3])[^>]*>(.*?)<\/h\1>/gis),
  ].map((match) => ({
    level: Number(match[1]),
    text: match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(),
  }));
  const jsonLdCount = [...body.matchAll(/application\/ld\+json/gi)].length;
  const scriptCount = [...body.matchAll(/<script\b/gi)].length;

  routeResults.push({
    key: route.key,
    path: route.path,
    status: response.status,
    title,
    canonical,
    canonicalMatches:
      normalizeCanonical(canonical) === normalizeCanonical(route.expectedCanonical),
    titleMatches: title === route.expectedTitle,
    requiredSnippetsPresent: route.requiredSnippets.every((snippet) =>
      lowerBody.includes(snippet.toLowerCase()),
    ),
    hasMain: /<main\b/i.test(body),
    headings: headingMatches,
    jsonLdCount,
    scriptCount,
  });
}

const artifactPaths = [
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
];

const artifactResults = [];

for (const artifactPath of artifactPaths) {
  const response = await fetch(`${baseUrl}${artifactPath}`, {
    redirect: "manual",
  });

  artifactResults.push({
    path: artifactPath,
    status: response.status,
    contentType: response.headers.get("content-type"),
  });
}

const robots = await fetchText(`${baseUrl}/robots.txt`);
const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
const manifest = await fetchText(`${baseUrl}/manifest.webmanifest`);
const homeHtml = await fetchText(`${baseUrl}/`);

const redirectResults = [];

for (const redirectCheck of redirectChecks) {
  const response = await fetch(`${baseUrl}${redirectCheck.from}`, {
    redirect: "manual",
  });
  const location = response.headers.get("location");

  redirectResults.push({
    from: redirectCheck.from,
    status: response.status,
    location,
    expectedLocation: redirectCheck.expectedLocation,
    matches: location === redirectCheck.expectedLocation,
  });
}

const report = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  routeResults,
  artifactResults,
  redirectResults,
  hostNormalization: {
    status: "manual-curl-required",
    location: null,
  },
  robots: {
    status: robots.response.status,
    hasSitemap: robots.body.includes("Sitemap: https://leonardofiori.it/sitemap.xml"),
    hasHost: robots.body.includes("Host: leonardofiori.it"),
  },
  sitemap: {
    status: sitemap.response.status,
    hasHome:
      sitemap.body.includes("https://leonardofiori.it</loc>") ||
      sitemap.body.includes("https://leonardofiori.it/</loc>"),
    hasRadici: sitemap.body.includes("https://leonardofiori.it/radici</loc>"),
    hasEmulsione: sitemap.body.includes("https://leonardofiori.it/emulsione</loc>"),
    hasAbout: sitemap.body.includes("https://leonardofiori.it/about</loc>"),
    imageEntries: [...sitemap.body.matchAll(/<image:image>/g)].length,
  },
  manifest: {
    status: manifest.response.status,
    parsed: JSON.parse(manifest.body),
  },
  reducedMotionRulePresent: homeHtml.body.includes(
    "@media (prefers-reduced-motion: reduce)",
  ),
};

await writeFile(reportPath, JSON.stringify(report, null, 2));
console.log(reportPath);
