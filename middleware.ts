import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/dashboard", "/admin"];
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
  const path = request.nextUrl.pathname;

  // Handle CORS for API routes
  if (path.startsWith('/api')) {
    if (request.method === 'OPTIONS') {
      // Handle preflight request
      const response = new NextResponse(null, { status: 200 });
      response.headers.set('Access-Control-Allow-Origin', 'https://www.costrad.org');
      response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return response;
    } else {
      // Add CORS header to regular API responses
      const response = NextResponse.next();
      response.headers.set('Access-Control-Allow-Origin', 'https://www.costrad.org');
      return response;
    }
  }

  // Existing route protection logic
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  // const isPublicButProtected = publicButProtected.includes(path);

  const cookies = getSessionCookie(request);

  if (isProtectedRoute && !cookies) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/auth/sign-in?callbackUrl=${callbackUrl}`, request.url));
  }

  return NextResponse.next();
}