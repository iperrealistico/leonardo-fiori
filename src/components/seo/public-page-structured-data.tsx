import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildPublicPageJsonLd } from "@/lib/seo/json-ld";
import type { PublicPageContent } from "@/types/content";

export function PublicPageStructuredData({
  page,
}: {
  page: PublicPageContent;
}) {
  const entries = buildPublicPageJsonLd(page);

  return (
    <>
      {entries.map((entry, index) => (
        <JsonLdScript
          key={`${page.routeKey}-jsonld-${index}`}
          id={`${page.routeKey}-jsonld-${index}`}
          value={entry}
        />
      ))}
    </>
  );
}
