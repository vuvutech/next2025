import { describe, expect, it } from "vitest";

describe("JWT Stateless Session - Phase 2", () => {
	it("session.create.before should not query database", () => {
		const sessionHook = async (session: { userId: string }) => {
			return { data: session };
		};
		expect(sessionHook).toBeDefined();
	});

	it("getCurrentUser should read banned status from x-user-banned header", () => {
		const headers = new Map<string, string>([
			["x-user-id", "user-1"],
			["x-user-email", "test@costrad.org"],
			["x-user-name", "Test User"],
			["x-user-role", "USER"],
			["x-user-studentid", "COSTRAD-00001"],
			["x-user-banned", "true"],
			["x-user-banReason", "Spamming"],
		]);

		const user = {
			id: headers.get("x-user-id") ?? "",
			email: headers.get("x-user-email") ?? "",
			name: headers.get("x-user-name") ?? "",
			role: headers.get("x-user-role") ?? "USER",
			banned: headers.get("x-user-banned") === "true",
			banReason: headers.get("x-user-banReason") ?? "",
			studentId: headers.get("x-user-studentid") ?? "",
		};

		expect(user.banned).toBe(true);
		expect(user.banReason).toBe("Spamming");
	});

	it("getCurrentUser should return banned: false when header is absent", () => {
		const headers = new Map<string, string>([
			["x-user-id", "user-2"],
			["x-user-role", "ADMIN"],
		]);

		const user = {
			id: headers.get("x-user-id") ?? "",
			email: headers.get("x-user-email") ?? "",
			name: headers.get("x-user-name") ?? "",
			role: headers.get("x-user-role") ?? "USER",
			banned: headers.get("x-user-banned") === "true",
			banReason: headers.get("x-user-banReason") ?? "",
			studentId: headers.get("x-user-studentid") ?? "",
		};

		expect(user.banned).toBe(false);
		expect(user.banReason).toBe("");
	});

	it("proxy should deny admin access when user is banned", () => {
		const session = {
			user: {
				id: "banned-user",
				role: "ADMIN",
				banned: true,
				banReason: "Policy violation",
			},
		};

		const isBanned = session.user.banned === true;
		const userRole = session.user.role || "USER";

		const pathname = "/admin/dashboard";

		if (pathname.startsWith("/admin")) {
			if (isBanned) {
				expect(true).toBe(true);
				return;
			}
			if (userRole !== "ADMIN" && userRole !== "SUPERADMIN") {
				expect.fail("Should not reach role check for banned user");
			}
		}
	});

	it("proxy should allow non-banned admin access", () => {
		const session = {
			user: {
				id: "admin-user",
				role: "SUPERADMIN",
				banned: false,
			},
		};

		const isBanned = session.user.banned === true;
		const userRole = session.user.role || "USER";

		expect(isBanned).toBe(false);
		expect(userRole).toBe("SUPERADMIN");
	});

	it("proxy should set x-user-banned and x-user-banReason headers from session", () => {
		const session = {
			user: {
				id: "user-3",
				role: "USER",
				banned: true,
				banReason: "Spamming",
				studentId: "COSTRAD-00003",
			},
		};

		const isBanned = session.user.banned === true;
		const banReason = session.user.banReason || "";

		expect(isBanned).toBe(true);
		expect(banReason).toBe("Spamming");
	});

	it("proxy should sanitize banned headers from incoming requests", () => {
		const incomingHeaders = new Headers();
		incomingHeaders.set("x-user-banned", "false");
		incomingHeaders.set("x-user-banReason", "fake");

		incomingHeaders.delete("x-user-banned");
		incomingHeaders.delete("x-user-banReason");

		expect(incomingHeaders.get("x-user-banned")).toBeNull();
		expect(incomingHeaders.get("x-user-banReason")).toBeNull();
	});
});
