# AI Personal Finance & Smart Shopping Tracker

A full-stack Next.js financial planning and shopping comparison application built for personal budgeting, savings tracking, AI-powered insights, and price-aware shopping decisions.

## Features

- Monthly income tracking
- Expense management with categories
- Savings goals and progress monitoring
- Unexpected expense planner
- Budget health analysis and AI style recommendations
- Smart shopping comparisons with product scoring
- Responsive dashboard with dark/light mode
- Authentication, validation, and protected user data

## Tech stack

- Next.js 14
- TypeScript
- Prisma ORM
- SQLite for local development (easy startup)
- Tailwind CSS
- PostgreSQL-ready schema structure
- Custom cookie-based auth with hashed passwords

## Local setup

1. Install dependencies:
   npm install
2. Create environment file:
   cp .env.example .env
3. Generate and push database schema:
   npx prisma generate
   npx prisma db push
4. Start the app:
   npm run dev

Visit http://localhost:3000

## Default login

This app is designed for a fresh local setup. Create an account from the registration page, then sign in.

## Important notes

- No real purchases are made automatically.
- Product comparisons are local and user-driven.
- Paid services or external marketplace purchases require explicit approval before integration.
