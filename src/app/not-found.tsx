import type { Metadata } from "next";
/* eslint-disable @next/next/no-html-link-for-pages */
import { SiteShell } from "@/components/site/site-shell";

export const metadata: Metadata = {
  title: "Not Found | Leonardo Fiori",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <SiteShell activePathname="/">
      <main id="main-content" tabIndex={-1} className="site-main">
        <article
          className="site-content-wrapper site-content-wrapper--text site-text-content"
          style={{ textAlign: "center" }}
        >
          <p>404</p>
          <h1>This page does not exist.</h1>
          <p>The route could not be matched inside the static public site.</p>
          <p>
            <a href="/">Return to home</a>
          </p>
        </article>
      </main>
    </SiteShell>
  );
}
