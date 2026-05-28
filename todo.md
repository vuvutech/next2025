# JWT Stateless Session Implementation Plan

## Goal
Achieve zero database queries for admin route authentication by implementing fully stateless JWT sessions, completing Phase 2 of the admin security efficiency optimization plan.

## Current Status
- ✅ Phase 1 Complete: Eliminated HTTP loopback in proxy.ts
- ✅ Phase 3 Complete: Implemented middleware context passing via headers
- 🔶 Phase 2 Partial: JWT configuration added but database hooks still cause queries

## Implementation Steps

### 1. Environment Variables Setup
Add required JWT secret keys to .env:
```
# JWT Signing Keys (generate using: openssl rand -base64 32)
BETTER_AUTH_SATELLITE_JWT_PUBLIC_KEY=your_public_key_here
BETTER_AUTH_SATELLITE_JWT_PRIVATE_KEY=your_private_key_here
```

### 2. Optimize Database Hooks
Modify `/lib/auth.ts` to eliminate unnecessary database queries:

**Current session hook (problematic):**
```typescript
session: {
  create: {
    before: async (session) => {
      const bannedUser = await prisma.user.findUnique({
        where: { id: session.userId },
        select: { banned: true },
      });

      if (bannedUser?.banned) {
        return false;
      }

      return { data: session };
    },
  },
},
```

**Optimized approach (stateless):**
```typescript
session: {
  create: {
    // Remove database query - rely on JWT payload and client-side validation
    // Ban status checked via middleware/header approach instead
  },
},
```

### 3. Update JWT Configuration
Enhance JWT settings in `/lib/auth.ts` for complete stateless operation:

```typescript
jwt: {
  enabled: true,
  // Signing keys for token verification
  // Optional: specify algorithm, expiresIn, etc.
  extendFields: {
    user: {
      role: {
        type: "string",
        // Will be populated from user.role during session creation
      },
      studentId: {
        type: "string",
        // Will be populated from user.studentId during session creation
      },
      banned: {
        type: "boolean",
        // Include ban status in JWT for stateless checking
        defaultValue: false,
      },
      banReason: {
        type: "string",
        defaultValue: "",
      },
    },
  },
},
```

### 4. Modify Session Creation to Populate JWT
Update the user creation hook to ensure JWT gets populated with extended fields:

```typescript
user: {
  create: {
    before: async (user) => {
      const studentId = await generateStudentId();
      return {
        data: {
          ...user,
          studentId,
          role: "USER",
          banned: false, // Default value
          banReason: "", // Default value
        },
      };
    },
  },
},
```

### 5. Update Middleware to Use JWT Data
Modify `/proxy.ts` to leverage JWT data when available:

```typescript
export async function proxy(request: NextRequest) {
  // Prevent client spoofing by sanitizing custom context headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("x-user-id");
  requestHeaders.delete("x-user-role");
  requestHeaders.delete("x-user-name");
  requestHeaders.delete("x-user-email");
  requestHeaders.delete("x-user-studentid");
  requestHeaders.delete("x-user-banned");
  requestHeaders.delete("x-user-banReason");

  // Get session directly (will be JWT-validated if stateless)
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
  // These come from JWT token if stateless sessions are working
  const userRole = session.user.role || "USER";
  const isBanned = session.user.banned === true;
  
  requestHeaders.set("x-user-id", session.user.id);
  requestHeaders.set("x-user-role", userRole);
  requestHeaders.set("x-user-name", session.user.name || "");
  requestHeaders.set("x-user-email", session.user.email || "");
  requestHeaders.set("x-user-studentid", (session.user as any).studentId || "");
  requestHeaders.set("x-user-banned", String(isBanned));
  requestHeaders.set("x-user-banReason", session.user.banReason || "");

  // Restrict admin routes to authorized roles only
  if (pathname.startsWith("/admin")) {
    if (userRole !== "ADMIN" && userRole !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
    // Additionally check ban status
    if (isBanned) {
      return NextResponse.redirect(new URL("/auth/banned", request.url));
    }
  }

  // Forward the request to the Next.js router with optimized context headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
```

### 6. Update GetCurrentUser Function
Enhance `/app/actions/functions.ts` to prioritize header data:

```typescript
export async function getCurrentUser(req?: NextRequest) {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  // If we have header data (from middleware), use it directly
  if (userId) {
    return {
      id: userId,
      email: headersList.get("x-user-email") || "",
      name: headersList.get("x-user-name") || "",
      role: headersList.get("x-user-role") || "USER",
      banned: headersList.get("x-user-banned") === "true",
      banReason: headersList.get("x-user-banReason") || "",
      studentId: headersList.get("x-user-studentid") || "",
    };
  }

  // Fallback to database query only if headers not available
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user?.id) return null;

  // Only query database if we absolutely need to
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      banned: true,
      banReason: true,
      studentId: true,
    },
  });

  // If user is banned, deny access
  if (user?.banned) return null;

  return user;
}
```

### 7. Create Ban Status Page
Add `/app/auth/banned/page.tsx` to handle banned user redirections:

```typescript
export default function BannedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Account Suspended
        </h1>
        <p className="text-red-500 mb-6">
          Your account has been suspended. Please contact support for assistance.
        </p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          Return to Homepage
        </a>
      </div>
    </div>
  );
}
```

### 8. Testing & Verification

#### Automated Tests
1. Run TypeScript compiler: `npx tsc --noEmit`
2. Run existing test suite: `npm run test`
3. Create specific tests for JWT functionality

#### Manual Verification
1. Check response headers for Set-Cookie to verify JWT usage
2. Monitor network tab in DevTools:
   - Confirm no `/api/userRole/` calls are made
   - Verify admin routes load without delay
3. Database monitoring:
   - Use Prisma query logging to confirm zero queries for authenticated requests
   - Test with both new and existing sessions
4. Security validation:
   - Test admin access with proper roles
   - Test rejection of non-admin users
   - Test banned user redirection
   - Test token tampering resistance

## Expected Results
After implementation:
- **HTTP Requests**: 0 loopback requests (eliminated in Phase 1)
- **Database Queries**: 0 queries per authenticated request (achieved with this plan)
- **Authentication**: Stateless JWT validation with role/ban status from token
- **Security**: Maintained through cryptographic JWT verification
- **Performance**: Significant TTFB improvement, especially under load

## Risk Mitigation
1. **Token Size**: Monitor JWT size increase from added fields (role, studentId, banned, banReason)
2. **Revocation**: Stateless tokens can't be revoked without token rotation or denylist (consider short expiration + refresh tokens)
3. **Implementation Complexity**: Added middleware logic for header handling
4. **Backward Compatibility**: Existing sessions will continue to work until expiration

## Rollback Plan
If issues arise:
1. Revert auth.ts database hooks to previous version
2. Remove JWT extended fields
3. Restore proxy.ts to previous header-only implementation
4. Existing session functionality remains intact via database fallback