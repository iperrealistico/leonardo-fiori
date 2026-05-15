import { PublicPageStructuredData } from "@/components/seo/public-page-structured-data";
import type {
  AboutLinkListSection,
  AboutParagraphSection,
  TextPageContent,
} from "@/types/content";

function AboutParagraphBlock({
  section,
}: {
  section: AboutParagraphSection;
}) {
  return (
    <section>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph, index) => (
        <p key={`${section.id}-${index}`}>{paragraph}</p>
      ))}
    </section>
  );
}

function AboutLinkListBlock({
  section,
}: {
  section: AboutLinkListSection;
}) {
  return (
    <section>
      <h2>{section.heading}</h2>
      <ul>
        {section.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TextPageView({ page }: { page: TextPageContent }) {
  return (
    <>
      <PublicPageStructuredData page={page} />
      <main id="main-content" tabIndex={-1} className="site-main">
        <article className="site-content-wrapper site-content-wrapper--text site-text-content">
          <h1 className="sr-only">{page.title.displayTitle}</h1>
          {page.sections.map((section) =>
            section.kind === "paragraph" ? (
              <AboutParagraphBlock key={section.id} section={section} />
            ) : (
              <AboutLinkListBlock key={section.id} section={section} />
            ),
          )}
        </article>
      </main>
    </>
  );
}
