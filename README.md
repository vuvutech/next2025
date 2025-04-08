# Fullstack Todo App

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io)
[![Clerk](https://img.shields.io/badge/Clerk-000000?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com)

A modern, full-stack Todo application built with Next.js 15, TypeScript, and Prisma. This application provides a seamless user experience with real-time updates and robust authentication.

## 🚀 Features

- 📝 Create, read, update, and delete todos
- 🔄 Real-time updates using Server Actions
- 🔐 Secure authentication with Clerk
- 🎨 Dark/Light theme support
- 📱 Responsive design
- 🔒 Type-safe with TypeScript

## 🛠️ Technologies Used

### Frontend
- **Next.js 15** - React framework with Server Components
- **TypeScript** - For type safety and better development experience
- **Tailwind CSS** - For styling and responsive design
- **Shadcn UI** - Beautiful, accessible, and customizable components
- **React Hook Form** - For form handling and validation
- **Zod** - For schema validation

### Backend
- **Prisma** - ORM for database operations
- **SQLite** - Database (configured via Prisma)
- **Next.js Server Actions** - For server-side operations

### Authentication
- **Clerk** - For secure user authentication and authorization

## 📦 Prerequisites

- Node.js (v18 or higher)
- pnpm (Node package manager)
- SQLite (configured via Prisma)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/amen-ramadan/fullstack-todo-nextJs.git
```

2. Install dependencies:
```bash
cd fullstack-todo-nextjs
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file with the following content:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Generate Prisma Client:
```bash
npx prisma generate
```

5. Start the development server:
```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Project Structure

```
fullstack-todo-nextjs/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── actions/            # Server actions for database operations
├── interface/          # TypeScript interfaces
├── lib/                # Utility functions
├── prisma/             # Prisma schema and migrations
├── providers/          # Context providers
├── public/             # Static assets
└── schema/             # Zod schemas for form validation
```

## 🎨 Styling

The application uses Tailwind CSS for styling, with Shadcn UI components providing a consistent and modern look. The theme is managed using Next.js Theme Provider.

## 🚀 Deployment

Make sure to set up the following environment variables in your Vercel dashboard:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

