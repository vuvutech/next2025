import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;
// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard","/admin"];
const publicRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/emailVerification",
  "/auth/verify-email",
  "/auth/logout",
];
const publicButProtected = ["/auth/emailVerification"];

export async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isPublicButProtected = publicButProtected.includes(path);

  const cookies = getSessionCookie(request);

if (isProtectedRoute && !cookies) {
  const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
  return NextResponse.redirect(new URL(`/auth/sign-in?callbackUrl=${callbackUrl}`, request.url));
}

  
  // if (isPublicButProtected && !cookies) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith('/sign-in')) {
  //   return NextResponse.rewrite(new URL('/auth/sign-in', request.url))
  // }
  

  // const { data: session } = await betterFetch<Session>(
  //   "/api/auth/get-session",
  //   {
  //     baseURL: request.nextUrl.origin,
  //     headers: {
  //       cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
  //     },
  //   }
  // );
  // if (session && session.user) {
  //   console.log("SESSION DATA: ", session.user.emailVerified);
  // } else {
  //   console.log("No session data available.");
  // }
  return NextResponse.next();
}
