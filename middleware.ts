import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const url = new URL("/auth/sign-in", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {

    const { data, error } = await betterFetch<{ role: string }>("/api/userRole/", {
      baseURL: request.nextUrl.origin,
      headers: { cookie: request.headers.get("cookie") || "" },
    });

    if (error || !data || data.role !== "ADMIN" && data.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard", "/dashboard/:path*"],
};