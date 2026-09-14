# NeonDB PostgreSQL Setup Guide for Project Baobab

## Step 1: Create NeonDB Account & Project

### 1a. Sign Up
1. Go to https://console.neon.tech
2. Sign up with GitHub, Google, or email
3. Verify email if needed

### 1b. Create Project
1. Click "New Project"
2. Project name: `project-baobab`
3. Database name: `baobab` (default is `neondb`)
4. Region: Choose closest to you (US-East recommended)
5. Postgres version: Latest (15.x or higher)
6. Click "Create project"

### Expected Result
- Project dashboard loads
- You see a connection string preview

---

## Step 2: Get Connection String

### Via NeonDB Console
1. In your project dashboard, click **"Connect"** button (top right)
2. Choose:
   - **Branch:** main
   - **Role:** postgres (default)
   - **Database:** baobab
   - **Connection type:** Pooled connection recommended
3. Copy the full connection string (looks like):
   ```
   postgresql://neon_user:password@ep-xyz.us-east-1.aws.neon.tech/baobab?sslmode=require
   ```

### For Prisma
The pooled connection works perfectly with Prisma. Use the connection string as-is.

---

## Step 3: Add to Project Environment

### Create `.env.production`
```bash
cd c:\Git\Project-Baobab

# Create the file
echo DATABASE_URL=postgresql://neon_user:password@ep-xyz.us-east-1.aws.neon.tech/baobab?sslmode=require > .env.production
```

### Or Manually Edit
Create file: `c:\Git\Project-Baobab\.env.production`
```
DATABASE_URL=postgresql://neon_user:password@ep-xyz.us-east-1.aws.neon.tech/baobab?sslmode=require
```

---

## Step 4: Set Vercel Environment Variables

### In Vercel Dashboard
1. Go to https://vercel.com/codez-mania-team/project-baobab
2. Settings → Environment Variables
3. Click "Add New"
4. **Key:** `DATABASE_URL`
5. **Value:** (paste your NeonDB connection string)
6. **Environments:** Select "Production"
7. Click "Save"

### Verify
The connection string should appear in Environment Variables list for Production.

---

## Step 5: Test Connection Locally

```bash
cd c:\Git\Project-Baobab

# Test with Prisma
npx prisma db push

# You should see:
# Environment variables loaded from .env.production
# Pushing schema to remote database...
# [Success] Database reset successful
```

If you get SSL errors:
```bash
# NeonDB requires SSL by default. Prisma handles this automatically.
# If issues persist, ensure connection string includes: ?sslmode=require
```

---

## Step 6: Create Database Schema

### Option A: Use Prisma Schema (Recommended)
Prisma will automatically create tables from `prisma/schema.prisma`:

```bash
cd c:\Git\Project-Baobab

# Generate Prisma Client
npx prisma generate

# Push schema to NeonDB
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

### Option B: Manual SQL (Via NeonDB Console)
1. Go to NeonDB console → SQL Editor
2. Paste SQL schema from below
3. Execute

#### Database Schema SQL
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

-- Users Table (Reviewers/Admins)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'reviewer',
  created_at TIMESTAMP DEFAULT NOW()
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
  placement VARCHAR(50),
  ad_type VARCHAR(50),
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

## Step 7: Verify Connection

### Test Query
```bash
# Install psql if needed (PostgreSQL client tools)
# Then run:
psql -c "SELECT 1" postgresql://neon_user:password@ep-xyz.us-east-1.aws.neon.tech/baobab?sslmode=require

# Or via Prisma
npx prisma studio

# Opens Prisma Studio UI to view/manage data
```

---

## Step 8: Deploy to Production

```bash
cd c:\Git\Project-Baobab

# Commit changes
git add .
git commit -m "Configure NeonDB PostgreSQL for production

- Set DATABASE_URL in Vercel environment
- Schema pushed to NeonDB
- Ready for production guides and data"

# Push to GitHub
git push origin master

# Vercel auto-deploys with NeonDB connection
```

---

## Step 9: Seed Initial Data (Optional)

### Create Domains & Subdomains
```bash
npx prisma db seed
```

Or manually via SQL:
```sql
INSERT INTO domains (name, slug, description) VALUES
('Business', 'business', 'Business registration, taxes, compliance'),
('Education', 'education', 'School, university, exams, JAMB'),
('Government', 'government', 'Passport, NIN, visas, licenses');

INSERT INTO subdomains (domain_id, name, slug, description) VALUES
((SELECT id FROM domains WHERE slug='business'), 'CAC Registration', 'cac-registration', 'Corporate Affairs Commission'),
((SELECT id FROM domains WHERE slug='business'), 'Taxation', 'taxation', 'Tax registration and calculations'),
((SELECT id FROM domains WHERE slug='education'), 'JAMB', 'jamb', 'JAMB examination requirements');
```

---

## Troubleshooting

### Connection Refused Error
```
Error: getaddrinfo ENOTFOUND ep-xyz.us-east-1.aws.neon.tech
```
**Solution:** Check connection string is correct (copy from NeonDB console)

### SSL Error
```
Error: self signed certificate
```
**Solution:** Ensure connection string includes `?sslmode=require`

### Database Not Found
```
Error: database "baobab" does not exist
```
**Solution:** 
1. Use `neondb` (default database) OR
2. Create new database in NeonDB console → Databases

### Permission Denied
```
Error: permission denied for schema public
```
**Solution:** Use `postgres` role (default) or ensure user has CREATE permissions

### Timeout
```
Error: Connection timeout
```
**Solution:**
1. Check internet connection
2. Verify NeonDB compute is not suspended (free tier suspends after 7 days of inactivity)
3. Resume compute in NeonDB console if needed

---

## NeonDB Console Features

### Monitor Your Database
1. Go to NeonDB console: https://console.neon.tech
2. **Monitoring tab:**
   - Active connections
   - Query performance
   - Database size
   - CPU usage

### SQL Editor
1. Dashboard → SQL Editor
2. Write and execute SQL queries
3. View results immediately
4. Useful for initial data seeding

### Branch Management (Pro Feature)
- Create development branches
- Test schema changes safely
- Merge to main when ready

---

## Performance Tips

### NeonDB Best Practices
1. **Use Connection Pooling** (included with pooled connection string)
2. **Set Indexes** (schema includes important indexes)
3. **Monitor Queries** (use NeonDB monitoring tab)
4. **Archive Old Data** (guides marked as deleted)

### Prisma Optimization
1. Use `include` carefully (N+1 query prevention)
2. Enable query logging in development:
   ```env
   DATABASE_URL=postgresql://...?schema=prisma&log=query
   ```
3. Use `select` to fetch only needed fields

---

## Free Tier Limits (Sufficient for MVP)

| Feature | Limit |
|---------|-------|
| Storage | 3 GB |
| Active Time | 10 GB compute hours/month |
| Connections | 20 concurrent |
| Branches | 1 (main) |
| Price | FREE ✅ |

---

## Next Steps

1. ✅ Create NeonDB project
2. ✅ Get connection string
3. ✅ Set DATABASE_URL in Vercel
4. ✅ Push schema to NeonDB
5. ⏳ Deploy to production
6. ⏳ Seed initial guides
7. ⏳ Test end-to-end

---

## Support

### NeonDB Documentation
- Getting Started: https://neon.tech/docs/introduction
- JavaScript Guide: https://neon.tech/docs/guides/javascript
- Next.js Guide: https://neon.com/docs/guides/nextjs

### Project Baobab
- See README.md for quick start
- See PROJECT_SUMMARY.md for overview
- See DEPLOYMENT_COMPLETE_CHECKLIST.md for status

---

**Last Updated:** September 13, 2026  
**Status:** NeonDB Ready for Configuration

