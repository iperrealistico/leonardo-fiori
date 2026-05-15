import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { CANONICAL_PATHS } from "@/lib/site/routes";

export default function LaWyLayout({ children }: { children: ReactNode }) {
  return (
    <SiteShell activePathname={CANONICAL_PATHS["la-wy"]}>{children}</SiteShell>
  );
}
