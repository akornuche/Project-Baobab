# Project Baobab - MVP

A task-completion platform for Nigerians to accomplish administrative, business, and life tasks.

## What's Built

### ✅ Core Infrastructure
- Next.js 16.2.10 with TypeScript
- PostgreSQL database with Prisma ORM
- Generic calculator component
- Calculator logic modules:
  - CAC Cost Estimator
  - Business Startup Calculator
  - Passport Cost Estimator
  - VAT Calculator
  - JAMB Subject Checker

### ✅ UI Components
- Home page with navigation
- Guides listing page
- Calculators listing page
- Guide detail page
- Calculator pages with interactive forms

### ✅ API Endpoints
- Guide CRUD operations
- Directory listing management
- Health check endpoint

## What's Next

### Database Setup
1. Install PostgreSQL locally
2. Create database: `createdb baobab`
3. Update `.env` with PostgreSQL credentials
4. Run migrations: `npx prisma migrate dev --name init`
5. Run seed: `npx prisma db seed`

### Remaining Features
- Domain and subdomain seeding (Government, Business, Education)
- Guide content management UI
- Directory listing admin dashboard
- Search integration with Meilisearch
- 20 flagship guides content
- Display ads infrastructure
- Premium directory listings workflow

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Visit:** http://localhost:3000

## Project Structure

```
baobab/
├── app/
│   ├── api/              # API routes
│   │   ├── guides/      # Guide CRUD
│   │   └── directories/ # Directory CRUD
│   ├── calculators/     # Calculator pages
│   ├── guides/          # Guide pages
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── components/
│   └── Calculator/      # Calculator component
├── lib/
│   ├── calculators/     # Calculation logic
│   ├── prisma.ts        # Prisma client
│   └── types.ts         # TypeScript types
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
└── .env                 # Environment variables
```

## Next Steps

1. Set up PostgreSQL database
2. Run database migrations
3. Seed initial taxonomy data
4. Implement search with Meilisearch
5. Draft flagship guides content
6. Build directory admin dashboard
7. Implement monetization features