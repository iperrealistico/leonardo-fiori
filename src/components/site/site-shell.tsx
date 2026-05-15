import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

type SiteShellProps = {
  activePathname: string;
  children: ReactNode;
};

export function SiteShell({ activePathname, children }: SiteShellProps) {
  return (
    <div className="site-shell">
      <SiteHeader activePathname={activePathname} />
      <div className="site-shell__content">{children}</div>
      <SiteFooter />
    </div>
  );
}
