import { normalizedSiteConfig } from "@/lib/content/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">{normalizedSiteConfig.footerText}</div>
    </footer>
  );
}
