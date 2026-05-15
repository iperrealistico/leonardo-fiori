import { getPublicPageContent } from "@/lib/content/site-content";
import { NAVIGATION_ROUTE_ORDER } from "@/lib/site/routes";

const navigationPages = NAVIGATION_ROUTE_ORDER.map((routeKey) =>
  getPublicPageContent(routeKey),
);

function getNavigationItemClass(isActive: boolean, mobile = false) {
  return [
    "site-nav-item",
    mobile ? "site-nav-item--mobile" : null,
    isActive ? "is-active" : null,
  ]
    .filter(Boolean)
    .join(" ");
}

type SiteNavigationProps = {
  activePathname: string;
};

export function SiteNavigation({ activePathname }: SiteNavigationProps) {
  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className="site-navigation">
        {navigationPages.map((page) => {
          const isActive = activePathname === page.pathname;

          return (
            <a
              key={page.routeKey}
              href={page.pathname}
              aria-current={isActive ? "page" : undefined}
              className={getNavigationItemClass(isActive)}
            >
              {page.title.navigationLabel}
            </a>
          );
        })}
      </nav>
      <details className="site-mobile-nav">
        <summary
          id="hamburger"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          className="site-hamburger"
        >
          <span />
          <span />
          <span />
        </summary>
        <nav id="mobile-menu" aria-label="Mobile navigation" className="site-mobile-menu">
          {navigationPages.map((page) => {
            const isActive = activePathname === page.pathname;

            return (
              <a
                key={`${page.routeKey}-mobile`}
                href={page.pathname}
                aria-current={isActive ? "page" : undefined}
                className={getNavigationItemClass(isActive, true)}
              >
                {page.title.navigationLabel}
              </a>
            );
          })}
        </nav>
      </details>
    </>
  );
}
