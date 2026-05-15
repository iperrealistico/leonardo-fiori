/* eslint-disable @next/next/no-html-link-for-pages */
import { SiteNavigation } from "@/components/site/site-navigation";
import { normalizedSiteConfig } from "@/lib/content/site-content";

export function SiteHeader({ activePathname }: { activePathname: string }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <SiteNavigation activePathname={activePathname} />
        <a href="/" aria-label={`${normalizedSiteConfig.siteName}, home`} className="site-title">
          {normalizedSiteConfig.siteName}
        </a>
      </div>
    </header>
  );
}
