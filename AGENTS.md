# Costrad 2026 Platform - Agent Guidelines

## 🛠️ Development Commands

- **Dev server**: `bun run dev` (uses Next.js v16 Next Dev server)
- **Build**: `mise run build` or `bun run build` (runs `prisma generate` then `next build`)
- **Start**: `bun run start`
- **Lint/Check**: `bun run check` (uses Biome lint/format check)
- **Fix Lint**: `bun run lint:fix` (uses Biome write)
- **Test**: `bun test` or `mise run test`
- **Single Test**: `bun test <filename>.test.ts`
- **Prisma generate**: `bunx prisma generate`
- **Prisma db push**: `bunx prisma db push`

## 🏗️ Architecture & Key Files

- **Framework**: Next.js 16+ with App Router (`app/` directory)
- **Routing & Interception**:
  - **No `middleware.ts`**: Global middleware is deprecated.
  - **Use `proxy.ts`**: All global request interception, routing rewrites, and gateway proxies must reside exclusively in `src/proxy.ts` (or your project's root proxy layer).
  - **Async Component Parameters**: `params` and `searchParams` in pages, layouts, and metadata functions are promises. **Always explicitly await them** before accessing properties (e.g., `const { id } = await params;`).
- **Database**: MongoDB Atlas via Prisma ORM (`prisma/schema.prisma`)
- **Authentication**: Better Auth with custom plugins (`lib/auth.ts`) configured with a MongoDB adapter.
- **Entry point**: `app/layout.tsx` (root layout with providers)
- **Email service**: Uses Resend with React Email templates (`lib/email/`)

## 📁 Important Directories

- `app/`: Next.js App Router pages, layouts, and route handlers.
- `components/`: Reusable UI components (Radix UI + shadcn-based primitives).
- `lib/`: Utility functions, auth config, email services, and database helpers.
- `prisma/`: Database schema, seed scripts, and connection setup.
- `providers/`: React context providers for auth, theme, etc.
- `actions/`: Server actions.

## 🔑 Environment Variables

Required in `.env.local`:

- `DATABASE_URL`: MongoDB Atlas connection string
- `BETTER_AUTH_SECRET`: Secret for Better Auth encryption
- `BETTER_AUTH_URL`: Base URL (e.g., `http://localhost:3000`)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `MICROSOFT_CLIENT_ID`: Microsoft OAuth client ID
- `MICROSOFT_CLIENT_SECRET`: Microsoft OAuth client secret
- `BETTER_AUTH_EMAIL`: From email address for notifications
- `RESEND_API_KEY`: For email sending via Resend

## 🧪 Testing Approach

- **Framework**: Bun Native Test (`bun test`) or Vitest fallback as fallback runner.
- **Mocking**: Prisma client must be strictly mocked in unit tests.
- **Database**: Integration tests require a MongoDB database instance.

## ⚠️ Important Notes

- **Prisma MongoDB**: Uses `@map("_id")` and `@db.ObjectId` for MongoDB ObjectId mapping.
- **Runtime Optimization**: Prefer native Bun APIs (`Bun.file()`, `Bun.write()`) over Node's `fs` modules where applicable.
- **Auth hooks**: Custom database hooks in `lib/auth.ts` handle banned users and unique student ID generation.
- **Role system**: Three explicit roles: `USER` (default), `ADMIN`, and `SUPERADMIN`.
- **Student ID**: Auto-generated unique ID on user creation via the `generateStudentId()` function.
- **TypeScript**: Strict mode enforced (`"strict": true`). Use the `satisfies` operator for complex configurations to retain literal type inferences.
- **Tailwind CSS**: v4+ configured with class-variance-authority for component variant management.

## 📝 Code Conventions

- **Imports**: Group external libraries first, then internal modules. Use explicit file extensions (`.js` / `.ts`) for internal modules if required by the target ES Module config.
- **NeverNesters**: Avoid deeply nested structures; always exit early using guard clauses.
- **Forms**: React Hook Form + Zod for runtime schema validation.
- **Server Actions**: Defined inside `app/actions/` or as explicitly marked async functions (`'use server'`).
- **Error Handling**: Auth errors redirect to `/auth/error`. Log errors explicitly using a `[ERROR]` prefix with full context.
