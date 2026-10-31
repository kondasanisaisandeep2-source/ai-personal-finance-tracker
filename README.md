# AI Personal Finance & Smart Shopping Tracker

A modern, secure, full-stack personal finance and shopping optimization application built with Next.js, Prisma, and Tailwind CSS.

## Features

- Monthly income tracking with multiple sources
- Expense capture with categories and filters
- Savings goals and accumulated savings
- Unexpected expense planning and next-month adjustments
- AI financial assistant for recommendations
- Smart shopping comparison engine with best value recommendations
- Dashboard with charts and insights
- Authentication and privacy protections

## Tech stack

- Next.js 14
- TypeScript
- Prisma ORM with SQLite (ready for PostgreSQL in production)
- NextAuth Credentials authentication
- Tailwind CSS
- Recharts
- Vitest

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
3. Generate Prisma client and initialize the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. Seed sample product data:
   ```bash
   npm run db:seed
   ```
5. Start the app:
   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Default login

The app supports registration and login through the authentication flow. After creating an account, sign in with your credentials.

## Notes

- The AI assistant uses local analytical rules and financial heuristics.
- Optional premium AI services can be integrated later with a provider API key, but the base app works without paid services.
- Product search uses a built-in comparison catalog and can be connected to a live pricing API later.
