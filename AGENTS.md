# Costrad 2025 Platform - Agent Guidelines

## 🛠️ Development Commands
- **Dev server**: `npm run dev` (uses turbopack)
- **Build**: `npm run build` (runs `prisma generate` then `next build`)
- **Start**: `npm run start`
- **Lint**: `npm run lint` (uses Next.js ESLint config)
- **Test**: `npm run test` (vitest)
- **Test watch**: `npm run test:watch`
- **Prisma generate**: `npx prisma generate`
- **Prisma db push**: `npx prisma db push`
- **Prisma seed**: `npx prisma db seed` (runs `ts-node --compiler-options "{\"module\":\"CommonJS\"}" prisma/seed.ts`)

## 🏗️ Architecture & Key Files
- **Framework**: Next.js 15 with App Router (`app/` directory)
- **Database**: MongoDB via Prisma ORM (`prisma/schema.prisma`)
- **Authentication**: Better Auth with custom plugins (`lib/auth.ts`)
- **Entry point**: `app/layout.tsx` (root layout with providers)
- **Auth configuration**: `lib/auth.ts` (betterAuth instance with MongoDB adapter)
- **Database connection**: `prisma/dbConnect.ts`
- **Email service**: Uses Resend with React Email templates (`lib/email/`)

## 📁 Important Directories
- `app/`: Next.js App Router pages, layouts, route handlers
- `components/`: Reusable UI components (Radix UI, shadcn-based)
- `lib/`: Utility functions, auth config, email services, database helpers
- `prisma/`: Database schema, seed scripts, connection setup
- `providers/`: React providers for auth, theme, etc.
- `hooks/`: Custom React hooks
- `actions/`: Server actions (likely in `app/actions/`)

## 🔑 Environment Variables
Required in `.env.local`:
- `DATABASE_URL`: MongoDB connection string
- `BETTER_AUTH_SECRET`: Secret for Better Auth encryption
- `BETTER_AUTH_URL`: Base URL (e.g., `http://localhost:3000`)
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `MICROSOFT_CLIENT_ID`: Microsoft OAuth client ID
- `MICROSOFT_CLIENT_SECRET`: Microsoft OAuth client secret
- `BETTER_AUTH_EMAIL`: From email for notifications
- `RESEND_API_KEY`: For email sending via Resend

## 🧪 Testing Approach
- **Framework**: Vitest
- **Config**: `vitest.config.ts`
- **Test files**: Located alongside source or in `__tests__` directories
- **Mocking**: Prisma client should be mocked in unit tests
- **Database**: Integration tests require MongoDB instance

## ⚠️ Important Notes
- **Prisma MongoDB**: Uses `@map("_id")` and `@db.ObjectId` for MongoDB ObjectId compatibility
- **Auth hooks**: Custom database hooks in `lib/auth.ts` handle banned users and student ID generation
- **Email verification**: Uses React Email components with Resend for templated emails
- **Role system**: Three roles - USER (default), ADMIN, SUPERADMIN
- **Student ID**: Auto-generated unique ID on user creation via `generateStudentId()` function
- **Next.js 15**: Uses App Router exclusively, no pages directory
- **TypeScript**: Strict mode enabled in tsconfig.json
- **Tailwind CSS**: v4 with class-variance-authority for variant management

## 📝 Code Conventions
- **Imports**: Group external libraries first, then internal modules
- **File extensions**: Use explicit `.ts`/`.tsx` for internal imports
- **Components**: Use Radix UI primitives as base components
- **Forms**: React Hook Form + Zod for validation
- **Server actions**: Defined in `app/actions/` or as async functions in server components
- **Error handling**: Auth errors redirect to `/auth/error` by configuration