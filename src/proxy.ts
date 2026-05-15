import { NextResponse, type NextRequest } from "next/server";
import {
  LEGACY_PROJECT_QUERY_PARAM,
  LEGACY_PROJECT_REDIRECTS,
} from "@/lib/site/routes";

function getCanonicalPathname(project: string | null) {
  if (!project) {
    return null;
  }

  if (project in LEGACY_PROJECT_REDIRECTS) {
    return LEGACY_PROJECT_REDIRECTS[
      project as keyof typeof LEGACY_PROJECT_REDIRECTS
    ];
  }

  return null;
}

export function proxy(request: NextRequest) {
  const canonicalPathname = getCanonicalPathname(
    request.nextUrl.searchParams.get(LEGACY_PROJECT_QUERY_PARAM),
  );

  if (!canonicalPathname) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = canonicalPathname;
  redirectUrl.search = "";

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)",
  ],
};
