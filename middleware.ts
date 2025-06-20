// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "./lib/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  const { data: userSession } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: { cookie: request.headers.get("cookie") || "" },
      params: { disableCookieCache: "true" }
    }
  );
  if (!userSession?.user?.role || userSession.user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Authorized — proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // only run on admin routes
};
