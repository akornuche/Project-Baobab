# Project Baobab - Database Setup Guide

## Overview

Project Baobab uses **Prisma ORM** with a PostgreSQL database for production and SQLite for local development.

### Current Status
- Schema: ✅ Complete (`prisma/schema.prisma`)
- Seed script: ✅ Complete (`prisma/seed.ts`)
- Migrations: 📋 Ready to generate

---

## Development Setup (SQLite)

For local development, use SQLite for simplicity. The schema is already configured.

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

### 3. Run Migrations

```bash
npm run prisma:migrate
```

This will:
- Create/update the SQLite database (`prisma/dev.db`)
- Apply all schema changes

### 4. Seed Initial Data

```bash
npm run prisma:seed
```

This will populate:
- 3 Domains: Government, Business, Education
- 12 Subdomains (4 per domain)
- 3 sample Users (Admin, Editor, Reviewer)
- 1 sample Guide (CAC Business Name registration)
- 1 sample Tool (CAC Cost Estimator)
- 2 Directory Listings (sample agents)
- 4 Official Sources

### 5. View Data with Prisma Studio

```bash
npm run prisma:studio
```

Opens http://localhost:5555 for visual database inspection.

---

## Production Setup (PostgreSQL)

For production deployment, use PostgreSQL for reliability and scalability.

### 1. Prerequisites

Install PostgreSQL 14+:
- **Windows**: https://www.postgresql.org/download/windows/
- **macOS**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE baobab;

# Create dedicated app user (optional but recommended)
CREATE USER baobab_app WITH ENCRYPTED PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE baobab TO baobab_app;
```

### 3. Configure Environment

Edit `.env.production` or your hosting platform's environment variables:

```env
DATABASE_URL="postgresql://baobab_app:secure_password_here@localhost:5432/baobab?schema=public"
NODE_ENV="production"
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Migrations

```bash
npm run prisma:migrate
```

Or use the deploy command (no interactive prompts):

```bash
npx prisma migrate deploy
```

### 6. Seed Production Data

```bash
npm run prisma:seed
```

Or run specific portions:

```bash
# Via Node
npx ts-node prisma/seed.ts
```

---

## Schema Overview

### Core Entities

**User** — Editorial team members
- Roles: USER, ADMIN, EDITOR, REVIEWER
- Tracks created guides and reviews

**Domain** — Content categories (Government, Business, Education)
- Each domain has multiple subdomains
- Ordered for navigation

**Subdomain** — Subcategories within domains
- Business Registration (under Government)
- Starting a Business (under Business)

**Guide** — Main content object
- Required fields: slug, title, domainId, subdomainId
- Optional: tool reference, reviewer
- Timestamps: created, updated, published, lastVerified
- Soft delete support via `isDeleted` flag

**Tool** — Calculators/checklists attached to guides
- Stores input/output schema and logic reference
- One-to-one relationship with Guide

**DirectoryListing** — Business directory entries
- Categories: accountants, agents, tutors
- Premium tier support
- Soft delete support

**GuideSource** — Official source citations
- Tracks verification status
- Links to guides

**Review** — Editorial review workflow
- Status: DRAFT, SUBMITTED, APPROVED
- Reviewer tracking

**EmailSubscriber** — Newsletter subscribers
- Confirmation token for double opt-in
- Tracks subscription status

---

## Common Tasks

### Add a New Guide

```typescript
// Via API or directly with Prisma
const guide = await prisma.guide.create({
  data: {
    slug: 'passport-application',
    title: 'How to Apply for a Nigerian Passport',
    domainId: 'gov-domain-id',
    subdomainId: 'identity-subdomain-id',
    content: JSON.stringify({ /* guide content */ }),
    published: false, // Draft until reviewed
  }
});
```

### Update a Guide's Verification Date

```typescript
const updated = await prisma.guide.update({
  where: { id: guideId },
  data: {
    lastVerified: new Date(),
    updatedAt: new Date(),
  }
});
```

### Query Guides by Domain

```typescript
const guides = await prisma.guide.findMany({
  where: { 
    domainId: domainId,
    published: true,
    isDeleted: false 
  },
  include: {
    domain: true,
    subdomain: true,
    tool: true,
  }
});
```

### Soft Delete a Guide

```typescript
const deleted = await prisma.guide.update({
  where: { id: guideId },
  data: { isDeleted: true }
});
```

---

## Backup & Restore

### PostgreSQL Backup

```bash
# Backup
pg_dump -U baobab_app baobab > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
psql -U baobab_app baobab < backup_file.sql
```

### SQLite Backup

```bash
# Simple copy
cp prisma/dev.db prisma/dev.db.backup
```

---

## Troubleshooting

### Migration Conflicts

If you have conflicting migrations:

```bash
# Reset local database (dev only)
npx prisma migrate reset

# This will:
# 1. Drop the database
# 2. Recreate schema
# 3. Re-run all migrations
# 4. Re-seed data
```

### Connection Issues

**PostgreSQL not starting:**
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

**Wrong credentials:**
Check `.env` and verify user/password in PostgreSQL.

### Prisma Client Out of Sync

```bash
npm run prisma:generate
```

---

## Next Phase (Phase 1b)

Once database is set up:
1. Integrate Meilisearch for search
2. Create search API endpoints
3. Connect guides to search index

See Phase 1b documentation for details.
