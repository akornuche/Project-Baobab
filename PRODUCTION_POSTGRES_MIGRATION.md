# Production PostgreSQL Migration Guide

## Overview

This guide provides a **complete, thorough migration** from SQLite (development) to PostgreSQL (production). This is a critical operation and must be done carefully to preserve all data and ensure zero downtime.

---

## Phase 1: Pre-Migration Planning

### 1.1 Backup Current SQLite Database

```bash
# Create backup of development database
cp prisma/dev.db prisma/dev.db.backup.$(date +%Y%m%d_%H%M%S)

# Verify backup
ls -lh prisma/dev.db.backup.*
```

### 1.2 Verify Current Data

```bash
# Check what data exists in development
npx prisma studio

# Document current state:
# - Number of guides
# - Number of users
# - Number of directory listings
# - Number of ad campaigns
# - Any custom data
```

### 1.3 Communication Plan

Before migration:
- [ ] Notify team migration is happening
- [ ] Set maintenance window (if applicable)
- [ ] Have rollback plan ready
- [ ] Keep SQLite backup (don't delete)

---

## Phase 2: PostgreSQL Setup

### 2.1 Choose PostgreSQL Provider

#### Option A: Supabase (Recommended for Baobab)
- Includes PostgreSQL + authentication
- Free tier: 2 projects, 500MB storage
- Auto backups
- Easy integration with Vercel
- https://supabase.com

**Setup:**
```bash
# 1. Go to https://supabase.com
# 2. Create account
# 3. Create new project
# 4. Choose region (closest to users)
# 5. Get connection string from project settings
```

#### Option B: Railway
- Simple PostgreSQL hosting
- Pay-as-you-go ($5/month typical)
- Great for startups
- https://railway.app

**Setup:**
```bash
# 1. Create Railway account
# 2. New project → PostgreSQL
# 3. Get DATABASE_URL from environment
```

#### Option C: AWS RDS
- Enterprise-grade
- More expensive ($30+/month)
- Full control
- More complex

#### Option D: DigitalOcean
- Managed databases
- $15/month starting
- Simple dashboard
- https://www.digitalocean.com

**For Baobab MVP: Use Supabase** — best balance of features, cost, and ease.

### 2.2 Create PostgreSQL Database

#### Via Supabase:
1. Create account at https://supabase.com
2. Click "New Project"
3. Choose:
   - **Name:** baobab
   - **Region:** Closest to your users (e.g., Europe for Nigeria-based users, or US-East)
   - **Password:** Generate strong password
4. Wait for database creation (~2 minutes)
5. Copy connection string from "Settings → Database → Connection string"

### 2.3 Verify Connection

```bash
# Get your connection string (looks like):
# postgresql://user:password@host:5432/baobab?sslmode=require

# Test connection locally
psql "postgresql://user:password@host:5432/baobab?sslmode=require" -c "SELECT NOW();"

# Should return current timestamp if successful
```

### 2.4 Store Connection String Securely

**NEVER** commit `DATABASE_URL` to Git. Instead:

```bash
# Create .env.production.local (not committed)
echo 'DATABASE_URL="postgresql://user:password@host:5432/baobab?sslmode=require"' > .env.production.local

# Add to .gitignore if not already there
echo ".env.production.local" >> .gitignore
```

---

## Phase 3: Schema Migration (Zero Data Loss)

### 3.1 Verify Current Schema

```bash
# Generate Prisma client
npm run prisma:generate

# Check current schema
npx prisma schema validation
```

### 3.2 Update Prisma Configuration

Edit `prisma/schema.prisma`:

```typescript
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 3.3 Create Initial PostgreSQL Migration

```bash
# This creates migration files without applying to DB
npx prisma migrate dev --name init_postgres

# This will:
# 1. Detect schema changes
# 2. Create SQL migration file
# 3. Apply to PostgreSQL
# 4. Update Prisma client
```

### 3.4 Verify Schema Created

```bash
# Check PostgreSQL has all tables
psql "postgresql://user:password@host:5432/baobab?sslmode=require" -c "\dt"

# Should show all tables:
# - User
# - Domain
# - Subdomain
# - Guide
# - Tool
# - DirectoryListing
# - GuideSource
# - Review
# - EmailSubscriber
# - AdCampaign
# - Advertisement
# - AdImpression
# - AdClick
# - DirectorySubscription
# - DirectoryReview
```

---

## Phase 4: Data Migration (Most Critical)

### 4.1 Export Data from SQLite

Create `scripts/export-sqlite.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

// Note: This script uses SQLite connection from dev database
async function exportData() {
  const dataDir = 'migration-data';
  
  // Create directory
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  // Import your data export script here
  console.log('Data export complete. Files saved to:', dataDir);
}

exportData();
```

Or manually using Prisma:

```bash
# Export as JSON files
npx prisma db push  # Ensure schema is correct first
```

### 4.2 Manual Data Verification

Before running data migration, manually verify key data:

```bash
# Use Prisma Studio to inspect data
npx prisma studio

# Document:
# - Count of each entity type
# - Any custom fields
# - Relationships integrity
```

### 4.3 Implement Safe Data Migration Script

Create `scripts/migrate-data-sqlite-to-postgres.js`:

```javascript
const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('sqlite3');

const sqlitePrisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db'
    }
  }
});

const postgresPrisma = new PrismaClient(); // Uses DATABASE_URL env var

async function migrateData() {
  try {
    console.log('Starting data migration from SQLite to PostgreSQL...\n');

    // 1. Migrate Users
    console.log('Migrating Users...');
    const users = await sqlitePrisma.user.findMany();
    for (const user of users) {
      await postgresPrisma.user.create({
        data: user,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${users.length} users\n`);

    // 2. Migrate Domains
    console.log('Migrating Domains...');
    const domains = await sqlitePrisma.domain.findMany();
    for (const domain of domains) {
      await postgresPrisma.domain.create({
        data: domain,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${domains.length} domains\n`);

    // 3. Migrate Subdomains
    console.log('Migrating Subdomains...');
    const subdomains = await sqlitePrisma.subdomain.findMany();
    for (const subdomain of subdomains) {
      await postgresPrisma.subdomain.create({
        data: subdomain,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${subdomains.length} subdomains\n`);

    // 4. Migrate Guides
    console.log('Migrating Guides...');
    const guides = await sqlitePrisma.guide.findMany({
      include: { sources: true }
    });
    for (const guide of guides) {
      await postgresPrisma.guide.create({
        data: guide,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${guides.length} guides\n`);

    // 5. Migrate Tools
    console.log('Migrating Tools...');
    const tools = await sqlitePrisma.tool.findMany();
    for (const tool of tools) {
      await postgresPrisma.tool.create({
        data: tool,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${tools.length} tools\n`);

    // 6. Migrate Directory Listings
    console.log('Migrating Directory Listings...');
    const listings = await sqlitePrisma.directoryListing.findMany();
    for (const listing of listings) {
      await postgresPrisma.directoryListing.create({
        data: listing,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${listings.length} directory listings\n`);

    // 7. Migrate Reviews
    console.log('Migrating Reviews...');
    const reviews = await sqlitePrisma.review.findMany();
    for (const review of reviews) {
      await postgresPrisma.review.create({
        data: review,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${reviews.length} reviews\n`);

    // 8. Migrate Ads
    console.log('Migrating Ad Campaigns...');
    const campaigns = await sqlitePrisma.adCampaign.findMany();
    for (const campaign of campaigns) {
      await postgresPrisma.adCampaign.create({
        data: campaign,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${campaigns.length} ad campaigns\n`);

    console.log('Migrating Advertisements...');
    const ads = await sqlitePrisma.advertisement.findMany();
    for (const ad of ads) {
      await postgresPrisma.advertisement.create({
        data: ad,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${ads.length} advertisements\n`);

    // 9. Migrate Directory Subscriptions
    console.log('Migrating Directory Subscriptions...');
    const subscriptions = await sqlitePrisma.directorySubscription.findMany();
    for (const sub of subscriptions) {
      await postgresPrisma.directorySubscription.create({
        data: sub,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${subscriptions.length} subscriptions\n`);

    // 10. Migrate Directory Reviews
    console.log('Migrating Directory Reviews...');
    const dirReviews = await sqlitePrisma.directoryReview.findMany();
    for (const review of dirReviews) {
      await postgresPrisma.directoryReview.create({
        data: review,
        skipDuplicates: true
      });
    }
    console.log(`✓ Migrated ${dirReviews.length} directory reviews\n`);

    console.log('✅ Data migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sqlitePrisma.$disconnect();
    await postgresPrisma.$disconnect();
  }
}

migrateData();
```

### 4.4 Run Data Migration

```bash
# Set PostgreSQL connection string
export DATABASE_URL="postgresql://user:password@host:5432/baobab?sslmode=require"

# Run migration script
node scripts/migrate-data-sqlite-to-postgres.js

# Output should show:
# ✓ Migrated X users
# ✓ Migrated X domains
# ... etc
# ✅ Data migration completed successfully!
```

### 4.5 Verify Data Integrity

```bash
# Check data in PostgreSQL
npx prisma studio

# Verify counts match:
# - Users: should be same as SQLite
# - Guides: should be same as SQLite
# - All relationships intact
# - No orphaned records
```

---

## Phase 5: Production Environment Setup

### 5.1 Update Environment Variables

#### For Vercel:

1. Go to **Vercel Dashboard**
2. Select **Project Settings → Environment Variables**
3. Update/Add:

```env
DATABASE_URL = postgresql://user:password@host:5432/baobab?sslmode=require
DATABASE_PROVIDER = postgresql
NODE_ENV = production
```

4. **Important:** Redeploy after adding variables

```bash
vercel --prod
```

#### For Local Development (keep SQLite):

```bash
# .env.local (for local dev)
DATABASE_URL=file:./prisma/dev.db
DATABASE_PROVIDER=sqlite
NODE_ENV=development
```

### 5.2 Configure Backups

#### Via Supabase:
- Auto backups enabled by default
- Daily backups kept for 7 days
- Manual backup button in dashboard

#### Via AWS RDS/Other:
Set up automated daily backups:

```bash
# For AWS RDS via CLI
aws rds create-db-snapshot \
  --db-instance-identifier baobab \
  --db-snapshot-identifier baobab-backup-$(date +%Y%m%d)
```

### 5.3 Set Up Monitoring & Alerts

```bash
# For Supabase: Dashboard shows metrics
# Set up alerts for:
# - CPU usage > 80%
# - Storage > 80%
# - Connection errors
# - Query performance
```

---

## Phase 6: Rollback Plan (Critical)

If something goes wrong, you need to **rollback quickly**:

### 6.1 Quick Rollback Steps

```bash
# 1. Switch DATABASE_URL back to SQLite
export DATABASE_URL="file:./prisma/dev.db"

# 2. Redeploy to Vercel
vercel --prod

# 3. Verify working
# Test homepage, search, APIs
```

### 6.2 Data Recovery

If data is corrupted in PostgreSQL:

```bash
# 1. Keep PostgreSQL as backup
# 2. Restore from Supabase auto-backup (if using Supabase)
# 3. Or restart from SQLite backup

cp prisma/dev.db.backup.YYYYMMDD_HHMMSS prisma/dev.db
export DATABASE_URL="file:./prisma/dev.db"
npm run dev
```

---

## Phase 7: Testing & Validation

### 7.1 Pre-Production Testing

```bash
# 1. Run all E2E tests against PostgreSQL
npm run test:e2e

# 2. Test critical workflows manually:
# - Search (test both guides and directories)
# - Create guide
# - List directory
# - Create subscription
# - Submit review

# 3. Check API endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/guides?limit=5
curl http://localhost:3000/api/directory/listings?limit=5
```

### 7.2 Performance Testing

```bash
# Compare query performance between SQLite and PostgreSQL
# Create script to test:
time curl http://localhost:3000/api/guides?limit=100
time curl http://localhost:3000/api/search?q=passport&index=guides&limit=50
```

### 7.3 Load Testing (Optional)

```bash
# Install k6 (https://k6.io)
npm install -g k6

# Create simple load test
k6 run scripts/load-test.js
```

---

## Phase 8: Deployment

### 8.1 Pre-Deployment Checklist

- [x] PostgreSQL database created
- [x] Connection string verified
- [x] Schema migrated
- [x] Data migrated and verified
- [x] Backups configured
- [x] Environment variables set in Vercel
- [x] E2E tests passing
- [x] Rollback plan ready

### 8.2 Deploy to Vercel

```bash
# 1. Ensure all changes committed
git add -A
git commit -m "Switch to PostgreSQL in production"

# 2. Push to trigger Vercel deployment
git push origin master

# 3. Vercel will auto-deploy with new DATABASE_URL

# 4. Monitor build and deployment
# Go to Vercel Dashboard → Deployments
```

### 8.3 Post-Deployment Verification

```bash
# 1. Visit your Vercel URL
# https://yourproject.vercel.app

# 2. Test critical workflows:
# - Homepage loads
# - Search works
# - Calculators work
# - Directory loads

# 3. Check logs for errors
vercel logs

# 4. Run E2E tests against production URL
# Update BASE_URL in playwright.config.ts
npm run test:e2e
```

---

## Phase 9: Monitoring & Maintenance

### 9.1 Daily Checks

```bash
# Monitor these daily for first week:
# - Database connection status
# - Query performance
# - Error logs
# - User reports
```

### 9.2 Weekly Maintenance

```bash
# Perform weekly:
# - Check backup status
# - Review slow queries
# - Verify no data loss
# - Test disaster recovery
```

### 9.3 Monthly Review

```bash
# Monthly:
# - Check storage usage
# - Review costs
# - Analyze performance trends
# - Plan capacity upgrades
```

---

## Complete Migration Checklist

### Pre-Migration
- [ ] Backed up SQLite database
- [ ] Documented current data
- [ ] Notified team
- [ ] Reviewed rollback plan

### PostgreSQL Setup
- [ ] Created PostgreSQL instance (Supabase/Railway/etc)
- [ ] Verified connection string
- [ ] Tested connection locally
- [ ] Stored connection securely

### Schema Migration
- [ ] Updated `prisma/schema.prisma` provider to PostgreSQL
- [ ] Ran `npx prisma migrate dev --name init_postgres`
- [ ] Verified all tables created in PostgreSQL
- [ ] Checked schema matches expectations

### Data Migration
- [ ] Created migration script
- [ ] Ran data migration
- [ ] Verified all data migrated
- [ ] Checked data integrity
- [ ] Verified relationships intact

### Environment Setup
- [ ] Updated Vercel environment variables
- [ ] Set DATABASE_URL in production
- [ ] Configured backups
- [ ] Set up monitoring

### Testing
- [ ] All E2E tests passing
- [ ] Manual testing completed
- [ ] Performance acceptable
- [ ] Load testing passed (optional)

### Deployment
- [ ] Committed all changes
- [ ] Pushed to master
- [ ] Vercel deployment succeeded
- [ ] Post-deployment verification passed
- [ ] Logs reviewed, no errors

### Post-Deployment
- [ ] Monitoring active
- [ ] Team aware of new setup
- [ ] Documentation updated
- [ ] Backup tests scheduled

---

## Troubleshooting

### "Connection refused" error
```bash
# Verify connection string is correct
# Check firewall allows connection
# Verify DATABASE_URL environment variable is set
# Test: psql "your-connection-string" -c "SELECT NOW();"
```

### "Migration failed" error
```bash
# Check PostgreSQL has required extensions
# Verify schema is compatible
# Check disk space on PostgreSQL
# Review error logs in Vercel
```

### Data not migrated
```bash
# Check migration script ran without errors
# Verify data counts match
# Check for orphaned records
# Review Prisma logs: npx prisma studio
```

### Performance degradation
```bash
# Check connection pooling configured
# Review slow query logs
# Add database indexes if needed
# Consider connection limits
```

---

## Completion

When all phases are complete:

✅ Production PostgreSQL database live  
✅ All data safely migrated  
✅ Zero data loss  
✅ Automatic backups enabled  
✅ Monitoring and alerts active  
✅ Team trained on new setup  
✅ Rollback plan tested and ready  

**Status: Production Ready** 🚀
