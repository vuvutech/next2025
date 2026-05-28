import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

interface SessionUser {
	id: string;
	role: string;
	name: string | null;
	email: string;
	studentId?: string;
	banned?: boolean;
	banReason?: string;
	[key: string]: unknown;
}

export async function proxy(request: NextRequest) {
	// Prevent client spoofing by sanitizing custom context headers from incoming request
	const requestHeaders = new Headers(request.headers);
	requestHeaders.delete("x-user-id");
	requestHeaders.delete("x-user-role");
	requestHeaders.delete("x-user-name");
	requestHeaders.delete("x-user-email");
	requestHeaders.delete("x-user-studentid");
	requestHeaders.delete("x-user-banned");
	requestHeaders.delete("x-user-banReason");

	const session = await auth.api.getSession({
		headers: request.headers,
	});

	const pathname = request.nextUrl.pathname;

	// Redirect to login if no session is active
	if (!session) {
		const url = new URL("/auth/sign-in", request.url);
		url.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(url);
	}

	// Populate custom context headers with verified session payload
	const userRole = session.user.role || "USER";
	const user = session.user as SessionUser;
	const isBanned = user.banned === true;
	requestHeaders.set("x-user-id", user.id);
	requestHeaders.set("x-user-role", userRole);
	requestHeaders.set("x-user-name", user.name || "");
	requestHeaders.set("x-user-email", user.email || "");
	requestHeaders.set("x-user-studentid", user.studentId || "");
	requestHeaders.set("x-user-banned", String(isBanned));
	requestHeaders.set("x-user-banReason", user.banReason || "");

	// Restrict admin routes to authorized roles only
	if (pathname.startsWith("/admin")) {
		if (isBanned) {
			return NextResponse.redirect(new URL("/auth/banned", request.url));
		}
		if (userRole !== "ADMIN" && userRole !== "SUPERADMIN") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	// Forward the request to the Next.js router with optimized context headers
	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: ["/admin/:path*", "/dashboard", "/dashboard/:path*"],
};
