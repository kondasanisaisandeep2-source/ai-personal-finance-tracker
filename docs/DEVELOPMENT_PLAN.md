# Development Plan

## 1. Requirements analysis

The app needs to support personal finance tracking, savings planning, budget analysis, and smart shopping recommendations in a single secure system. The solution should work for a single user account while remaining extensible for multi-user growth.

## 2. Proposed architecture

### Frontend
- Next.js App Router with TypeScript
- Responsive dashboard layout
- Tailwind CSS for clean, modern UI
- Recharts for data visualizations
- Client-side forms for adding financial and shopping records

### Backend
- Next.js route handlers for authentication and app APIs
- Prisma ORM for database access
- SQLite for local development and migration-friendly DB setup
- Credentials-based authentication via NextAuth

### Data layer
- User model for identity and privacy
- IncomeSource model for monthly income entries
- Expense model with categorized records
- SavingsGoal model for target tracking
- UnexpectedExpense model for irregular costs
- Product comparison data model for shopping analysis

## 3. Database design

### User
- id
- name
- email
- passwordHash
- createdAt

### IncomeSource
- id
- userId
- sourceName
- amount
- month
- year
- createdAt

### Expense
- id
- userId
- category
- amount
- description
- date
- createdAt

### SavingsGoal
- id
- userId
- name
- monthlyTarget
- currentSaved
- createdAt

### UnexpectedExpense
- id
- userId
- amount
- reason
- date
- createdAt

## 4. Core feature implementation order

### Phase 1: Foundation
- Initialize Next.js project
- Set up TypeScript, Tailwind, Prisma, and auth config
- Create database schema and seed data
- Build secure sign-up and sign-in screens

### Phase 2: Finance system
- Create income entry flow
- Create expense CRUD flow
- Add savings goal tracking
- Add unexpected expense planning logic
- Build summary calculations and dashboard cards

### Phase 3: Intelligence layer
- Implement financial analysis rules
- Detect overspending patterns and under-saving trends
- Suggest realistic budgets and higher savings targets
- Provide a chat-like financial assistant flow

### Phase 4: Smart shopping assistant
- Create product catalog and comparison logic
- Rank products by value-for-money and reliability
- Show affordability comparisons and price alerts support
- Allow user-selected purchase decisions only

### Phase 5: Dashboard and polish
- Add charts, progress bars, reports, and responsive design
- Add dark/light mode support
- Improve validation, UX, and error handling

## 5. AI assistant behavior

The initial app uses deterministic financial heuristics rather than a paid external AI service. This keeps the system working without requiring an API key while still delivering useful insights such as:

- High-spend categories
- Budget overruns
- Savings improvement suggestions
- Monthly recommendations
- Smart product value ranking

A future version can plug in an external LLM by adding an environment variable and provider-specific integration.

## 6. Security and privacy

- Password hashing with bcrypt
- Session-based authentication
- Data scoped by authenticated user ID
- No production data usage without explicit user permission
- Secure validation with Zod

## 7. Testing strategy

- Unit tests for financial calculations
- Route-level validation checks
- UI smoke tests for authentication and dashboard actions

## 8. Deployment note

This version is designed for a local/demo deployment with SQLite. For production, switch to PostgreSQL or MySQL and configure a managed database and hosting provider.

## 9. Important decisions

- No paid services or real purchases are required for the initial release.
- Product search works from a local comparison dataset unless the user explicitly wants a paid external shopping API integration later.
