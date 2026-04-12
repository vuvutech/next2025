/**
 * Tests for app/api/users/ban/route.ts
 *
 * Focused on the change in this PR:
 *   Replaced auth.api.revokeUserSessions with prisma.session.deleteMany
 *   to revoke sessions when a user is banned.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Top-level mocks (hoisted by vitest before imports) ───────────────────────

const mockUserUpdate = vi.fn();
const mockSessionDeleteMany = vi.fn();
const mockRevokeUserSessions = vi.fn();

vi.mock("@/prisma/dbConnect", () => ({
  prisma: {
    user: {
      update: (...args: unknown[]) => mockUserUpdate(...args),
    },
    session: {
      deleteMany: (...args: unknown[]) => mockSessionDeleteMany(...args),
    },
  },
}));

const mockGetCurrentUser = vi.fn();

vi.mock("@/app/actions/functions", () => ({
  getCurrentUser: (...args: unknown[]) => mockGetCurrentUser(...args),
}));

vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      revokeUserSessions: (...args: unknown[]) => mockRevokeUserSessions(...args),
    },
  },
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
import { PUT } from "../users/ban/route";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeRequest(body: unknown) {
  return {
    json: async () => body,
  } as Parameters<typeof PUT>[0];
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("PUT /api/users/ban", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("authorization", () => {
    it("returns 403 when no user is authenticated", async () => {
      mockGetCurrentUser.mockResolvedValue(null);
      const res = await PUT(makeRequest({ id: "user-1", banned: true }));
      expect((res as unknown as { status: number }).status).toBe(403);
    });

    it("returns 403 when caller has role USER", async () => {
      mockGetCurrentUser.mockResolvedValue({ id: "caller", role: "USER" });
      const res = await PUT(makeRequest({ id: "user-1", banned: true }));
      expect((res as unknown as { status: number }).status).toBe(403);
    });

    it("allows ADMIN to ban a user", async () => {
      mockGetCurrentUser.mockResolvedValue({ id: "admin-1", role: "ADMIN" });
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 1 });

      const res = await PUT(makeRequest({ id: "user-1", banned: true, banReason: "Violation" }));
      expect((res as unknown as { status: number }).status).toBe(200);
    });

    it("allows SUPERADMIN to ban a user", async () => {
      mockGetCurrentUser.mockResolvedValue({ id: "super-1", role: "SUPERADMIN" });
      mockUserUpdate.mockResolvedValue({ id: "user-2", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 2 });

      const res = await PUT(makeRequest({ id: "user-2", banned: true }));
      expect((res as unknown as { status: number }).status).toBe(200);
    });
  });

  describe("input validation", () => {
    beforeEach(() => {
      mockGetCurrentUser.mockResolvedValue({ id: "admin-1", role: "ADMIN" });
    });

    it("returns 400 when `banned` is a string", async () => {
      const res = await PUT(makeRequest({ id: "user-1", banned: "true" }));
      expect((res as unknown as { status: number }).status).toBe(400);
      expect(
        ((res as unknown as { body: { error: string } }).body).error
      ).toContain("boolean");
    });

    it("returns 400 when `banned` is a number", async () => {
      const res = await PUT(makeRequest({ id: "user-1", banned: 1 }));
      expect((res as unknown as { status: number }).status).toBe(400);
    });

    it("returns 400 when `banned` is null", async () => {
      const res = await PUT(makeRequest({ id: "user-1", banned: null }));
      expect((res as unknown as { status: number }).status).toBe(400);
    });

    it("returns 400 when `banned` is undefined", async () => {
      const res = await PUT(makeRequest({ id: "user-1" }));
      expect((res as unknown as { status: number }).status).toBe(400);
    });
  });

  describe("banning a user – session deletion (NEW behavior)", () => {
    beforeEach(() => {
      mockGetCurrentUser.mockResolvedValue({ id: "admin-1", role: "ADMIN" });
    });

    it("calls prisma.session.deleteMany with the banned user's id when banned=true", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 3 });

      await PUT(makeRequest({ id: "user-1", banned: true, banReason: "Spam" }));

      expect(mockSessionDeleteMany).toHaveBeenCalledTimes(1);
      expect(mockSessionDeleteMany).toHaveBeenCalledWith({
        where: { userId: "user-1" },
      });
    });

    it("does NOT call prisma.session.deleteMany when banned=false (unban)", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: false });

      await PUT(makeRequest({ id: "user-1", banned: false }));

      expect(mockSessionDeleteMany).not.toHaveBeenCalled();
    });

    // Regression: old code called auth.api.revokeUserSessions - verify it's removed
    it("does not call auth.api.revokeUserSessions (replaced in this PR)", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 1 });

      await PUT(makeRequest({ id: "user-1", banned: true }));

      expect(mockRevokeUserSessions).not.toHaveBeenCalled();
    });

    it("sets banReason from request body when provided", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 0 });

      await PUT(makeRequest({ id: "user-1", banned: true, banReason: "Abusive content" }));

      expect(mockUserUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ banReason: "Abusive content" }),
        })
      );
    });

    it("uses 'No reason provided' as banReason when none is given", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 0 });

      await PUT(makeRequest({ id: "user-1", banned: true }));

      expect(mockUserUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ banReason: "No reason provided" }),
        })
      );
    });

    it("sets banExpires ~7 days from now when banning", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: true });
      mockSessionDeleteMany.mockResolvedValue({ count: 0 });

      const before = Date.now();
      await PUT(makeRequest({ id: "user-1", banned: true }));
      const after = Date.now();

      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      const updateCall = mockUserUpdate.mock.calls[0][0];
      const banExpires: Date = updateCall.data.banExpires;

      expect(banExpires.getTime()).toBeGreaterThanOrEqual(before + sevenDaysMs - 100);
      expect(banExpires.getTime()).toBeLessThanOrEqual(after + sevenDaysMs + 100);
    });

    it("sets banReason and banExpires to null when unbanning", async () => {
      mockUserUpdate.mockResolvedValue({ id: "user-1", banned: false });

      await PUT(makeRequest({ id: "user-1", banned: false }));

      expect(mockUserUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ banReason: null, banExpires: null }),
        })
      );
    });

    it("returns success:true with the updated user in the response body", async () => {
      const updatedUser = { id: "user-1", banned: true, banReason: "Test ban" };
      mockUserUpdate.mockResolvedValue(updatedUser);
      mockSessionDeleteMany.mockResolvedValue({ count: 1 });

      const res = await PUT(makeRequest({ id: "user-1", banned: true, banReason: "Test ban" }));

      expect((res as unknown as { status: number }).status).toBe(200);
      const body = (res as unknown as { body: { success: boolean; user: unknown } }).body;
      expect(body.success).toBe(true);
      expect(body.user).toEqual(updatedUser);
    });
  });

  describe("error handling", () => {
    beforeEach(() => {
      mockGetCurrentUser.mockResolvedValue({ id: "admin-1", role: "ADMIN" });
    });

    it("returns 500 when prisma.user.update throws", async () => {
      mockUserUpdate.mockRejectedValue(new Error("DB connection error"));

      const res = await PUT(makeRequest({ id: "user-1", banned: true }));

      expect((res as unknown as { status: number }).status).toBe(500);
    });
  });
});