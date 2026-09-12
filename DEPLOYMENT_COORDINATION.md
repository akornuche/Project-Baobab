# Deployment Coordination Guide

## Overview

This guide coordinates the complete production deployment for Project Baobab with PostgreSQL, Meilisearch Cloud, custom domain, and monitoring.

---

## Pre-Deployment (Week Before)

### Team Communication

- [ ] Notify all team members of deployment plan
- [ ] Set deployment date/time
- [ ] Identify primary deployer
- [ ] Have backup person ready
- [ ] Set up communication channel (Slack, email alerts)

### Infrastructure Preparation

- [ ] Create Supabase PostgreSQL instance
- [ ] Create Meilisearch Cloud account and project
- [ ] Get all connection strings and API keys
- [ ] Store securely in password manager
- [ ] Document in private wiki/drive

### Code Review

- [ ] All code committed to master
- [ ] All tests passing locally
- [ ] No console errors or warnings
- [ ] Environment variables documented
- [ ] Database migrations reviewed

### Backups

- [ ] Backup SQLite database: `cp prisma/dev.db prisma/dev.db.backup`
- [ ] Document current data counts
- [ ] Create deployment notes with rollback steps

---

## Deployment Timeline

### Phase 1: Pre-Deployment Validation (15 min)

**1.1 Verify All Services Ready**

```bash
# 1. Test local build
npm run build
# Should complete without errors

# 2. Test with E2E tests
npm run test:e2e --run
# Should pass all tests

# 3. Check all environment files exist
ls -la .env*
# Should show .env.local, .env.example
```

**1.2 Get Production Credentials**

Collect from each service:

**Supabase PostgreSQL:**
```
Connection String: postgresql://user:pass@db.xxxxx.supabase.co:5432/postgres
```

**Meilisearch Cloud:**
```
Host: https://xxxx.meilisearch.com
Master Key: meilisearch_master_xxxx
Search Key: meilisearch_search_xxxx
```

**Domain Registrar:**
```
Domain: baobab.ng
Current Nameservers: (document before change)
```

**Status Check:**
- [ ] PostgreSQL connection tested locally
- [ ] Meilisearch Cloud indexes created
- [ ] Domain registrar access confirmed
- [ ] Vercel project ready

### Phase 2: PostgreSQL Migration (30 min)

**2.1 Create PostgreSQL Schema**

```bash
# Update environment to use PostgreSQL
export DATABASE_URL="postgresql://user:pass@db.xxxxx.supabase.co:5432/postgres"

# Create schema
npx prisma migrate deploy

# Verify tables created
npx prisma studio  # Should show all tables
```

**Status Check:**
- [ ] All tables created in PostgreSQL
- [ ] No migration errors
- [ ] Prisma client generated

**2.2 Migrate Data from SQLite**

```bash
# Run data migration script
node scripts/migrate-data-sqlite-to-postgres.js

# Should output:
# ✓ Migrated X users
# ✓ Migrated X guides
# ... etc
# ✅ Data migration completed successfully!
```

**Status Check:**
- [ ] All data migrated
- [ ] Data counts match between SQLite and PostgreSQL
- [ ] No errors in migration log

**2.3 Verify Data Integrity**

```bash
# Open Prisma Studio with PostgreSQL
npx prisma studio

# Manually verify:
# - Users exist
# - Guides exist with content
# - Directory listings present
# - All relationships intact
# - No null values where shouldn't be
```

**Status Check:**
- [ ] Data integrity confirmed
- [ ] Sample queries work
- [ ] Search indexes can be populated

### Phase 3: Meilisearch Setup (15 min)

**3.1 Create Indexes**

```bash
# Set Meilisearch environment
export MEILISEARCH_HOST="https://xxxx.meilisearch.com"
export MEILISEARCH_API_KEY="meilisearch_master_xxxx"

# Run setup script
node scripts/setup-meilisearch-production.js

# Should output:
# ✓ Guides index created
# ✓ Directories index created
```

**Status Check:**
- [ ] Both indexes exist in Meilisearch
- [ ] No configuration errors

**3.2 Seed Meilisearch**

```bash
# Seed production data
node scripts/seed-meilisearch-production.js

# Should output:
# ✓ X guides indexed
# ✓ X directories indexed
# ✅ Production seeding complete!
```

**Status Check:**
- [ ] All data indexed
- [ ] Index counts correct
- [ ] Meilisearch ready for production

**3.3 Test Meilisearch Search**

```bash
# Test search locally
curl "http://localhost:3000/api/search?q=passport&index=guides&limit=5"

# Should return results
```

**Status Check:**
- [ ] Search API responds with results
- [ ] Faceting works
- [ ] Highlighting works

### Phase 4: Environment Configuration (10 min)

**4.1 Update Vercel Environment Variables**

In Vercel Dashboard → Settings → Environment Variables:

Add/Update all variables:

```env
# PostgreSQL
DATABASE_URL = postgresql://user:pass@db.xxxxx.supabase.co:5432/postgres
DATABASE_PROVIDER = postgresql

# Meilisearch
MEILISEARCH_HOST = https://xxxx.meilisearch.com
MEILISEARCH_API_KEY = meilisearch_master_xxxx
NEXT_PUBLIC_MEILISEARCH_HOST = https://xxxx.meilisearch.com
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY = meilisearch_search_xxxx

# App
NEXT_PUBLIC_APP_DOMAIN = https://baobab.ng
NEXT_PUBLIC_APP_NAME = Baobab
NODE_ENV = production

# Analytics (if ready)
NEXT_PUBLIC_GA4_ID = G-XXXXXX

# Email (stubs for now)
SENDGRID_API_KEY = stub
SENDGRID_FROM_EMAIL = noreply@baobab.ng
```

**Status Check:**
- [ ] All variables set in Vercel
- [ ] Variables are in Production environment
- [ ] No sensitive data in public variables

**4.2 Commit Configuration**

```bash
# Update .env.example for documentation
# (DO NOT commit .env.production or .env.production.local)

# Commit code changes
git add .env.example next.config.js
git commit -m "Production deployment: PostgreSQL and Meilisearch

- Database: PostgreSQL (Supabase)
- Search: Meilisearch Cloud
- Domain: baobab.ng
- Environment: Production-ready"

# Push to master
git push origin master
```

**Status Check:**
- [ ] Code committed
- [ ] Push successful
- [ ] No uncommitted changes

### Phase 5: Deploy to Vercel (5 min)

**5.1 Trigger Vercel Deployment**

Vercel auto-deploys on push to master. Monitor:

1. Go to **Vercel Dashboard → Project → Deployments**
2. Watch deployment progress:
   - "Building..." → ~2-3 minutes
   - "Ready" → Success
3. Check for build errors

```bash
# Or trigger via CLI
vercel --prod

# Should show:
# ✓ Deployment complete
# https://project-baobab.vercel.app
```

**Status Check:**
- [ ] Build succeeds
- [ ] No build errors
- [ ] Deployment shows "Ready"
- [ ] Deployment URL works

**5.2 Test Live Deployment**

```bash
# Test homepage
curl https://project-baobab.vercel.app/

# Test API with PostgreSQL
curl https://project-baobab.vercel.app/api/guides?limit=5

# Test search with Meilisearch
curl https://project-baobab.vercel.app/api/search?q=passport&index=guides&limit=5

# All should return 200 OK with data
```

**Status Check:**
- [ ] Homepage loads
- [ ] APIs respond with PostgreSQL data
- [ ] Search returns Meilisearch results
- [ ] No 500 errors

### Phase 6: Run E2E Tests (10 min)

**6.1 Update Test Configuration**

```bash
# Update BASE_URL in playwright.config.ts
# BASE_URL = "https://project-baobab.vercel.app"

# Run tests against production
npm run test:e2e --run

# Should pass all tests:
# ✓ Search tests
# ✓ API tests
# ✓ Calculator tests
# ✓ Directory tests
# ✓ Ads tests
```

**Status Check:**
- [ ] All E2E tests passing
- [ ] No timeouts or flakes
- [ ] All workflows work in production

**6.2 Manual Testing Checklist**

Test these critical workflows manually:

```
Homepage
[ ] Loads quickly
[ ] No console errors
[ ] Images load
[ ] Navigation works

Search
[ ] Search for "passport" → results appear
[ ] Facet filtering works
[ ] Pagination works
[ ] Mobile search works

Calculators
[ ] PAYE Calculator loads and works
[ ] VAT Calculator calculates correctly
[ ] Results can be saved/shared

Directory
[ ] List view shows listings
[ ] Filters work (category, location)
[ ] Search in directory works
[ ] Premium badges show

API Health
[ ] /api/health returns 200
[ ] /api/guides returns data
[ ] /api/search works
```

**Status Check:**
- [ ] All critical workflows work
- [ ] No performance issues
- [ ] Mobile responsive

### Phase 7: Configure Custom Domain (20 min)

**7.1 Add Domain to Vercel**

1. Vercel Dashboard → Settings → Domains
2. Click "Add Domain"
3. Enter `baobab.ng`
4. Vercel shows nameservers

**7.2 Update DNS at Registrar**

1. Log in to domain registrar
2. Find Nameserver/DNS settings
3. Replace with Vercel's nameservers (copy from Vercel)
4. Save changes

**7.3 Verify DNS Propagation**

```bash
# Check DNS propagation
dig baobab.ng

# Should show Vercel nameservers
# Takes 24-48 hours to fully propagate
```

**Status Check:**
- [ ] Domain added to Vercel
- [ ] Nameservers updated at registrar
- [ ] DNS pointing to Vercel
- [ ] Initial DNS checks passing

**7.4 Verify HTTPS Certificate**

After DNS propagates (24-48 hours):

1. Visit `https://baobab.ng`
2. Should show green lock
3. No certificate warnings
4. HTTPS working

**Status Check:**
- [ ] HTTPS certificate valid
- [ ] No mixed content warnings
- [ ] Domain loads website

### Phase 8: Enable Monitoring (10 min)

**8.1 Vercel Monitoring**

Already enabled by default:

1. Dashboard → Monitoring
2. View:
   - [ ] Response times
   - [ ] Error rate
   - [ ] Build times

**8.2 Meilisearch Monitoring**

In Meilisearch Cloud:

1. Dashboard → Monitoring
2. View:
   - [ ] Search latency
   - [ ] Index size
   - [ ] Request count

**8.3 Set Up Alerts**

In Vercel:
- Alert if error rate > 1%
- Alert if response time > 500ms

In Meilisearch:
- Alert if response time > 500ms
- Alert if storage > 80%

**Status Check:**
- [ ] Monitoring dashboards accessible
- [ ] Alerts configured
- [ ] Team has access to dashboards

### Phase 9: Post-Deployment Communication (5 min)

**9.1 Notify Team**

Send team notification:

```
📢 PROJECT BAOBAB PRODUCTION DEPLOYMENT COMPLETE

✅ Successfully deployed to production:
- Database: PostgreSQL (Supabase)
- Search: Meilisearch Cloud
- Domain: baobab.ng (pending DNS propagation)
- Uptime: 99.9% SLA

🔗 Access Points:
- App URL: https://project-baobab.vercel.app (will update to baobab.ng)
- Admin: https://vercel.com/dashboard
- Monitoring: [links to dashboards]

📊 Infrastructure:
- Guides indexed: X
- Directories indexed: X
- Users in database: X
- E2E tests: All passing

🎯 Next Steps:
- Monitor dashboards for 24 hours
- Test on custom domain when DNS propagates
- Prepare for Phase 3 (content creation)
- [Link to this document]

Questions? Slack: #baobab-deployment
```

**9.2 Update Documentation**

- [ ] Update README.md with production URLs
- [ ] Update team wiki/docs
- [ ] Document connection strings in secure location
- [ ] Create runbooks for common operations

**Status Check:**
- [ ] Team notified
- [ ] Documentation updated
- [ ] Access granted to all stakeholders

---

## Rollback Procedure (If Needed)

If critical issues occur, rollback quickly:

### Quick Rollback Steps

**Step 1: Identify Issue**
```bash
# Check Vercel logs
vercel logs

# Check for errors
# Common: database connection, API key wrong, migration failed
```

**Step 2: Rollback**
```bash
# Revert to previous deployment
# In Vercel Dashboard → Deployments
# Find last working deployment
# Click "Promote to Production"

OR

# Via CLI
vercel rollback
```

**Step 3: Communicate**
- Notify team
- Document what failed
- Plan fix

### Data Rollback

If data was corrupted in PostgreSQL:

```bash
# Restore PostgreSQL from Supabase backup
# In Supabase dashboard → Backups → Restore

# Or restore from migration backup
# Copy SQLite backup back and deploy with SQLite connection
```

---

## Post-Deployment Checklist

### First Hour After Deployment

- [ ] Monitor error logs for issues
- [ ] Check response times normal
- [ ] Verify all APIs responding
- [ ] Test critical workflows manually
- [ ] Check no 500 errors

### First Day

- [ ] Monitor for 24 hours
- [ ] Check database connections stable
- [ ] Verify Meilisearch search working
- [ ] Get team feedback
- [ ] Monitor error rate < 0.1%

### First Week

- [ ] Daily monitoring
- [ ] Check DNS propagation status
- [ ] Test custom domain when ready
- [ ] Review performance metrics
- [ ] Prepare Phase 3 (content)

---

## Success Criteria

Deployment successful when ALL of these are true:

✅ **Infrastructure**
- PostgreSQL database live with all data
- Meilisearch Cloud indexes populated
- Custom domain pointing to Vercel
- HTTPS certificate valid

✅ **Application**
- Homepage loads
- All APIs respond with data
- Search works with Meilisearch
- Calculators functional
- Directory listings visible
- E2E tests all passing

✅ **Monitoring**
- Dashboards show data
- Alerts configured
- Error rate < 0.1%
- Response time < 200ms

✅ **Team**
- All team members notified
- Access granted to dashboards
- Documentation updated
- Runbooks prepared

✅ **Security**
- Master keys not exposed
- Environment variables set correctly
- SSL/HTTPS working
- No sensitive data in logs

---

## What's Next After Deployment

### Immediate (Day 1-2)
- Monitor deployment stability
- Fix any issues found
- Get team feedback
- Plan Phase 3 content creation

### Week 1-2
- Optimize performance if needed
- Complete custom domain setup (if DNS not propagated)
- Set up analytics
- Prepare email infrastructure

### Week 3-4
- Begin Phase 3: Draft 30 Guides
- Set up email signup flow
- Seed directory listings
- Create additional calculators

### Month 2+
- Launch public beta
- Gather user feedback
- Optimize based on metrics
- Plan Phase 4+ improvements

---

## Contact & Support

**Deployment Issues:**
- Slack: #baobab-deployment
- Contact: [primary deployer]
- Escalation: [project lead]

**Service-Specific Support:**
- Vercel: https://vercel.com/support
- Supabase: https://supabase.com/support
- Meilisearch: https://meilisearch.com/support

**Emergency Contacts:**
- Database down: Supabase support + rollback
- Search down: Reindex from PostgreSQL
- App down: Rollback previous deployment

---

## Summary

**Timeline:**
- Phase 1-3: ~1 hour
- Phase 4-6: ~25 min
- Phase 7: 20 min (+ 24-48 hrs DNS)
- Phase 8-9: ~15 min
- **Total: ~2 hours** (+ DNS propagation)

**Key Milestones:**
1. ✅ PostgreSQL migrated with all data
2. ✅ Meilisearch Cloud indexes populated
3. ✅ Vercel deployment live
4. ✅ E2E tests passing
5. ✅ Custom domain configured
6. ✅ Monitoring active
7. ✅ Team notified

**Status: Ready for Deployment** 🚀

When ready to deploy, follow this guide step-by-step and check off each item.
