import type { ReactNode } from "react";
import { PublicPageStructuredData } from "@/components/seo/public-page-structured-data";
import type { GalleryPageContent } from "@/types/content";

export function GalleryPageFrame({
  page,
  gallery,
}: {
  page: GalleryPageContent;
  gallery: ReactNode;
}) {
  return (
    <>
      <PublicPageStructuredData page={page} />
      <main id="main-content" tabIndex={-1} className="site-main">
        <article className="site-content-wrapper">
          <h1 className="sr-only">{page.title.displayTitle}</h1>
          {gallery}
          {page.description ? (
            <div className="site-text-content">
              <p>{page.description.value}</p>
            </div>
          ) : null}
        </article>
      </main>
    </>
  );
}
