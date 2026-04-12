/**
 * Tests for app/api/user/route.ts
 *
 * Focused on the NEW code path added in this PR:
 *   When no `id` query param is provided and a currentUser session exists,
 *   return the full user record from the database.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Top-level mocks (hoisted by vitest before imports) ───────────────────────

const mockFindUnique = vi.fn();

vi.mock("@/prisma/dbConnect", () => ({
  prisma: {
    user: {
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

const mockGetCurrentUser = vi.fn();

vi.mock("@/app/actions/functions", () => ({
  getCurrentUser: (...args: unknown[]) => mockGetCurrentUser(...args),
}));

vi.mock("next/server", () => ({
  NextRequest: class MockNextRequest {
    url: string;
    constructor(url: string) {
      this.url = url;
    }
  },
  NextResponse: {
    json: (body: unknown, init?: { status?: number }) => ({
      body,
      status: init?.status ?? 200,
    }),
  },
}));

// ── Import route handler after mocks are declared ────────────────────────────
import { GET } from "../user/route";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeRequest(url: string) {
  // Minimal shape matching what the GET handler needs: req.url
  return { url } as Parameters<typeof GET>[0];
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("GET /api/user", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("no id param + authenticated user (NEW code path)", () => {
    it("returns current user data when no id is provided and user is authenticated", async () => {
      const currentUser = { id: "user-1", role: "USER" };
      const dbUser = {
        id: "user-1",
        name: "Alice",
        email: "alice@example.com",
        emailVerified: true,
        image: null,
        twoFactorEnabled: false,
        role: "USER",
        banned: false,
        banReason: null,
        banExpires: null,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-06-01"),
      };

      mockGetCurrentUser.mockResolvedValue(currentUser);
      mockFindUnique.mockResolvedValue(dbUser);

      const res = await GET(makeRequest("http://localhost/api/user"));

      expect((res as unknown as { status: number }).status).toBe(200);
      expect((res as unknown as { body: unknown }).body).toEqual(dbUser);
    });

    it("queries prisma with the current user's id", async () => {
      const currentUser = { id: "user-abc", role: "USER" };
      mockGetCurrentUser.mockResolvedValue(currentUser);
      mockFindUnique.mockResolvedValue({ id: "user-abc" });

      await GET(makeRequest("http://localhost/api/user"));

      expect(mockFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "user-abc" },
        })
      );
    });

    it("selects the expected fields from the database", async () => {
      const currentUser = { id: "user-1", role: "USER" };
      mockGetCurrentUser.mockResolvedValue(currentUser);
      mockFindUnique.mockResolvedValue({ id: "user-1" });

      await GET(makeRequest("http://localhost/api/user"));

      expect(mockFindUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            twoFactorEnabled: true,
            role: true,
            banned: true,
            banReason: true,
            banExpires: true,
            createdAt: true,
            updatedAt: true,
          }),
        })
      );
    });

    it("returns 404 when the user is not found in the database", async () => {
      const currentUser = { id: "user-ghost", role: "USER" };
      mockGetCurrentUser.mockResolvedValue(currentUser);
      mockFindUnique.mockResolvedValue(null);

      const res = await GET(makeRequest("http://localhost/api/user"));

      expect((res as unknown as { status: number }).status).toBe(404);
      expect(
        ((res as unknown as { body: { error: string } }).body).error
      ).toContain("not found");
    });

    it("returns 500 when prisma throws an error", async () => {
      const currentUser = { id: "user-1", role: "USER" };
      mockGetCurrentUser.mockResolvedValue(currentUser);
      mockFindUnique.mockRejectedValue(new Error("DB connection failed"));

      const res = await GET(makeRequest("http://localhost/api/user"));

      expect((res as unknown as { status: number }).status).toBe(500);
    });
  });

  describe("no id param + unauthenticated (pre-existing path)", () => {
    it("returns 400 when no id is provided and no current user exists", async () => {
      mockGetCurrentUser.mockResolvedValue(null);

      const res = await GET(makeRequest("http://localhost/api/user"));

      expect((res as unknown as { status: number }).status).toBe(400);
      expect(
        ((res as unknown as { body: { error: string } }).body).error
      ).toContain("required");
    });
  });

  describe("id param provided", () => {
    it("returns 403 when a non-admin provides an id param", async () => {
      const currentUser = { id: "user-1", role: "USER" };
      mockGetCurrentUser.mockResolvedValue(currentUser);

      const res = await GET(makeRequest("http://localhost/api/user?id=other-user-id"));

      expect((res as unknown as { status: number }).status).toBe(403);
    });

    it("returns user data when an ADMIN provides an id param", async () => {
      const adminUser = { id: "admin-1", role: "ADMIN" };
      const targetDbUser = { id: "target-1", name: "Bob" };
      mockGetCurrentUser.mockResolvedValue(adminUser);
      mockFindUnique.mockResolvedValue(targetDbUser);

      const res = await GET(makeRequest("http://localhost/api/user?id=target-1"));

      expect((res as unknown as { status: number }).status).toBe(200);
      expect((res as unknown as { body: unknown }).body).toEqual(targetDbUser);
    });

    it("returns user data when a SUPERADMIN provides an id param", async () => {
      const superAdmin = { id: "super-1", role: "SUPERADMIN" };
      const targetDbUser = { id: "target-2", name: "Carol" };
      mockGetCurrentUser.mockResolvedValue(superAdmin);
      mockFindUnique.mockResolvedValue(targetDbUser);

      const res = await GET(makeRequest("http://localhost/api/user?id=target-2"));

      expect((res as unknown as { status: number }).status).toBe(200);
    });

    it("returns 404 when admin requests a non-existent user by id", async () => {
      const adminUser = { id: "admin-1", role: "ADMIN" };
      mockGetCurrentUser.mockResolvedValue(adminUser);
      mockFindUnique.mockResolvedValue(null);

      const res = await GET(makeRequest("http://localhost/api/user?id=ghost-id"));

      expect((res as unknown as { status: number }).status).toBe(404);
    });

    it("returns 403 when no current user exists and id is provided", async () => {
      mockGetCurrentUser.mockResolvedValue(null);

      const res = await GET(makeRequest("http://localhost/api/user?id=some-id"));

      expect((res as unknown as { status: number }).status).toBe(403);
    });
  });
});