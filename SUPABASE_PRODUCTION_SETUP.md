# Supabase Production Database Setup Guide

## Phase 1: Create Supabase Project

Since you're logged into Supabase CLI, create a new project:

### Option A: CLI (if authenticated)
```bash
supabase projects create --name "Project Baobab" --region us-east-1
```

### Option B: Web Console (supabase.com/dashboard)
1. Click "New Project"
2. Name: `Project Baobab`
3. Database Password: (save securely)
4. Region: `us-east-1` (or your preferred region)
5. Click "Create new project"

**Expected output:** Project URL like `https://[PROJECT-ID].supabase.co`

---

## Phase 2: Initialize Local Development (Optional but Recommended)

```bash
cd c:\Git\Project-Baobab
supabase init
```

This creates `.supabase/config.toml` for local development.

---

## Phase 3: Create Database Schema

### Connection String
Get from Supabase Dashboard:
- Settings → Database → Connection string → Session Pooler
- Format: `postgresql://postgres.[project-id]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`

### Create Database Tables

Connect to your Supabase PostgreSQL and run:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Domains Table
CREATE TABLE domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Subdomains Table
CREATE TABLE subdomains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(domain_id, slug)
);

-- Tools Table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  website_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Guides Table (Main Content)
CREATE TABLE guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  subdomain_id UUID NOT NULL REFERENCES subdomains(id) ON DELETE CASCADE,
  tool_id UUID REFERENCES tools(id) ON DELETE SET NULL,
  reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  subtitle VARCHAR(500),
  description TEXT,
  content JSONB,
  
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_verified TIMESTAMP
);

-- Guide Sources
CREATE TABLE guide_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
  title VARCHAR(500),
  url VARCHAR(1000) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (Reviewers/Admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'reviewer', -- 'admin', 'reviewer', 'contributor'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Directory Listings (Premium Directory)
CREATE TABLE directory_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  website VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(20),
  
  verified BOOLEAN DEFAULT FALSE,
  premium BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ads Configuration
CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_name VARCHAR(255) NOT NULL,
  placement VARCHAR(50), -- 'homepage', 'guide', 'sidebar'
  ad_type VARCHAR(50), -- 'banner', 'native', 'text'
  title VARCHAR(255),
  description TEXT,
  image_url VARCHAR(500),
  landing_url VARCHAR(500),
  
  active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ad Analytics
CREATE TABLE ad_impressions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  page_path VARCHAR(500),
  user_ip VARCHAR(50)
);

CREATE TABLE ad_clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ad_id UUID NOT NULL REFERENCES ads(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  page_path VARCHAR(500),
  user_ip VARCHAR(50)
);

-- Subscribers (Email List)
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP,
  is_active BOOLEAN DEFAULT FALSE,
  confirmation_token VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_guides_domain_id ON guides(domain_id);
CREATE INDEX idx_guides_subdomain_id ON guides(subdomain_id);
CREATE INDEX idx_guides_slug ON guides(slug);
CREATE INDEX idx_guides_published ON guides(published, is_deleted);
CREATE INDEX idx_subdomains_domain_id ON subdomains(domain_id);
CREATE INDEX idx_directory_listings_verified ON directory_listings(verified);
CREATE INDEX idx_directory_listings_premium ON directory_listings(premium);
CREATE INDEX idx_subscribers_email ON subscribers(email);
```

---

## Phase 4: Get Connection Credentials

From Supabase Dashboard:

### 1. PostgreSQL Connection String (for Prisma ORM)
- Settings → Database → Connection pooling
- Copy "Session Pooler" connection string
- Format: `postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

### 2. Anon/Public Key (for Meilisearch integration)
- Settings → API
- Copy `anon public` key

### 3. Service Role Key (for Server-side Operations)
- Settings → API
- Copy `service_role` key (keep secret!)

---

## Phase 5: Configure Vercel Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

DIRECT_URL=postgresql://postgres.[PROJECT-ID]:[PASSWORD]@aws-0-[REGION].db.supabase.com:5432/postgres

SUPABASE_URL=https://[PROJECT-ID].supabase.co

SUPABASE_ANON_KEY=[anon-public-key]

SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
```

---

## Phase 6: Run Prisma Migrations

```bash
cd c:\Git\Project-Baobab

# Sync schema with Supabase
npx prisma db push

# Generate Prisma client
npx prisma generate

# Optional: seed database with initial data
npx prisma db seed
```

---

## Phase 7: Seed Initial Data (Optional)

Add seed data for domains/subdomains:

```bash
npm run prisma:seed
```

---

## Phase 8: Enable Row Level Security (RLS)

For production, enable RLS on sensitive tables:

```sql
ALTER TABLE guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE directory_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow public read on published guides
CREATE POLICY "Public guides readable" ON guides
  FOR SELECT USING (published = TRUE AND is_deleted = FALSE);

-- Allow authenticated users to create/edit guides
CREATE POLICY "Authenticated users can manage guides" ON guides
  USING (auth.uid() = reviewer_id);
```

---

## Phase 9: Test Connection

```bash
# Test with a simple Prisma query
npx ts-node -e "import { PrismaClient } from '@prisma/client'; const p = new PrismaClient(); p.domain.findMany().then(d => console.log('Connected!', d.length)).catch(e => console.error(e));"
```

---

## Phase 10: Deploy to Vercel

```bash
cd c:\Git\Project-Baobab
git add -A
git commit -m "Add Supabase production database setup"
git push origin master

# Vercel will auto-deploy with new env vars
```

---

## Troubleshooting

### Connection Timeout
- Ensure IP is whitelisted in Supabase → Settings → Network
- Vercel IPs are auto-allowed

### Auth Errors
- Verify DATABASE_URL format is correct
- Check password doesn't have special characters (URL-encode if needed)

### Schema Mismatch
- Regenerate Prisma client: `npx prisma generate`
- Push schema: `npx prisma db push`

---

## Next Steps

1. ✅ Create Supabase project
2. ✅ Create database schema
3. ✅ Get connection credentials
4. ✅ Set Vercel environment variables
5. ✅ Run migrations
6. ⏳ Test connection
7. ⏳ Deploy to production
8. ⏳ Begin Phase 3a: Draft 30 production guides

