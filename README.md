# Costrad 2025 Platform

A comprehensive educational and management platform built with modern web technologies. This system handles user management, institutional profiles, event editions, and registrations.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Email:** [Resend](https://resend.com/) + [React Email](https://react.email/)

## ✨ Key Features

- **Robust Authentication**: Secure user authentication with support for roles (User, Admin, Superadmin) and Two-Factor Authentication (2FA).
- **User Profiles**: Detailed profile management including demographics, professional details, and social links.
- **Institute Management**: Manage institutes, editions (courses/events), and handle registrations.
- **Organization Support**: capabilities for managing organizations and team members.
- **Communication**: Integrated newsletter subscription and announcements system.
- **Modern UI/UX**: Responsive design with smooth animations and accessible components.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20 or later recommended)
- MongoDB database (local or cloud)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd costrad-2025
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and configure the following variables (example):
    ```env
    DATABASE_URL="mongodb+srv://..."
    BETTER_AUTH_SECRET="your-secret"
    BETTER_AUTH_URL="http://localhost:3000"
    # Add other provider keys (Google, GitHub, Resend, etc.)
    ```

4.  **Database Setup:**
    Generate the Prisma client and sync the schema with your MongoDB database.
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components.
- `lib/`: Utility functions and library configurations (Auth, Prisma).
- `prisma/`: Database schema and seed scripts.
- `public/`: Static assets.

## 📜 License

[MIT](LICENSE)
