import { NextResponse, type NextRequest } from "next/server";
import { categories } from "@/data/categories";

const KNOWN = new Set(categories.map((c) => c.id));

/**
 * Unknown category URLs must return a real HTTP 404. With Cache Components the
 * page's static shell streams with a 200 before `notFound()` can run, which
 * search engines treat as a "soft 404" and may index. Checking here, before
 * rendering, sends the site's 404 page with the correct status.
 */
export function proxy(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/")[2];
  if (id && !KNOWN.has(decodeURIComponent(id))) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/collections/:id",
};
