# Launch Day Runbook

## Project Baobab - Production Deployment

**Date:** [Insert deployment date]  
**Start Time:** [Insert time]  
**Primary Deployer:** [Name]  
**Backup Deployer:** [Name]  
**Communication Channel:** [Slack channel]

---

## Pre-Launch (Day Before)

### Checklist
- [ ] All team members notified of deployment time
- [ ] Backup person available and briefed
- [ ] Communication channel active
- [ ] Supabase PostgreSQL project created
- [ ] Meilisearch Cloud project created
- [ ] Connection strings and API keys secured
- [ ] Run validation script: `npm run validate:pre-deploy`
- [ ] All tests passing
- [ ] No uncommitted changes in git
- [ ] Documentation reviewed

### Validation Script
```bash
npm run validate:pre-deploy

# Should output: ✅ PRE-DEPLOYMENT VALIDATION PASSED
```

If validation fails, fix issues before proceeding.

---

## Launch Day Timeline

### 08:00 - Pre-Deployment Meeting (10 min)

**Participants:** Primary deployer, backup, tech lead

**Agenda:**
1. Review deployment plan
2. Confirm all credentials ready
3. Assign communication roles
4. Set success criteria
5. Review rollback procedures

**Decision:** Proceed or postpone?

### 08:15 - Credentials Confirmation (5 min)

**Primary deployer validates:**
- [ ] Supabase connection string ready
- [ ] Meilisearch Cloud API keys ready
- [ ] Custom domain registrar access ready
- [ ] Vercel project access ready
- [ ] All sensitive data in secure location

**Action:** Store securely and begin

### 08:20 - PHASE 1: Pre-Deployment Validation (15 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 1

```bash
# 1. Build check
npm run build
# Wait for completion, should show: ✓ Build complete

# 2. Test check
npm run test:e2e --run
# Should show: 54 passed

# 3. Status check
git status
# Should show: nothing to commit, working tree clean
```

**Status Update:** Slack #baobab-deployment
```
📢 Phase 1: Pre-Deployment Validation ✓ COMPLETE
- Build: ✓ Success
- Tests: ✓ 54/54 Passing
- Git: ✓ Clean
Moving to Phase 2...
```

**Blocker?** → STOP and troubleshoot. Do NOT proceed.

---

### 08:35 - PHASE 2: PostgreSQL Migration (30 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 2

```bash
# 1. Set environment variable (Windows PowerShell)
$env:DATABASE_URL = "postgresql://user:pass@db.xxxxx.supabase.co:5432/postgres"

# 2. Create schema
npx prisma migrate deploy

# Expected output:
# Applying migration xxxxxx
# All migrations applied successfully

# 3. Verify schema
npx prisma studio
# Open browser, verify all tables exist:
# - User
# - Domain
# - Guide
# - DirectoryListing
# - AdCampaign
# - etc.
```

**Data Migration:**
```bash
# Copy SQLite data to PostgreSQL
node scripts/migrate-data-sqlite-to-postgres.js

# Expected output:
# ✓ Migrated X users
# ✓ Migrated X guides
# ✓ Migrated X listings
# ✅ Data migration completed successfully!
```

**Verification:**
```bash
# Check data in Prisma Studio
# - User count correct?
# - Guides have content?
# - All relationships intact?
```

**Status Update:** Slack
```
📢 Phase 2: PostgreSQL Migration ✓ COMPLETE
- Schema created
- Data migrated
- Verification: ✓ Passed
Moving to Phase 3...
```

**Blocker?** → Use rollback procedure, try again or escalate.

---

### 09:05 - PHASE 3: Meilisearch Setup (15 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 3

```bash
# 1. Set Meilisearch environment
$env:MEILISEARCH_HOST = "https://xxxx.meilisearch.com"
$env:MEILISEARCH_API_KEY = "meilisearch_master_xxxx"

# 2. Create indexes
node scripts/setup-meilisearch-production.js

# Expected output:
# ✓ Guides index created
# ✓ Directories index created

# 3. Seed data
node scripts/seed-meilisearch-production.js

# Expected output:
# ✓ X guides indexed
# ✓ X directories indexed
# ✅ Production seeding complete!

# 4. Test search
curl "http://localhost:3000/api/search?q=passport&index=guides&limit=5"
# Should return results
```

**Status Update:** Slack
```
📢 Phase 3: Meilisearch Setup ✓ COMPLETE
- Indexes created
- Data seeded (X guides, X directories)
- Search API verified
Moving to Phase 4...
```

**Blocker?** → Troubleshoot or rollback.

---

### 09:20 - PHASE 4: Environment Configuration (10 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 4

In **Vercel Dashboard → Settings → Environment Variables**, add:

```
DATABASE_URL = postgresql://user:pass@...
MEILISEARCH_HOST = https://xxxx.meilisearch.com
MEILISEARCH_API_KEY = meilisearch_master_xxxx
NEXT_PUBLIC_MEILISEARCH_HOST = https://xxxx.meilisearch.com
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY = meilisearch_search_xxxx
NEXT_PUBLIC_APP_DOMAIN = https://baobab.ng
NEXT_PUBLIC_APP_NAME = Baobab
NODE_ENV = production
```

**Verify:** Each set to Production environment

```bash
# Commit environment setup
git add .env.example
git commit -m "Production deployment: PostgreSQL and Meilisearch ready"
git push origin master
```

**Status Update:** Slack
```
📢 Phase 4: Environment Configuration ✓ COMPLETE
- Vercel env vars set
- Code committed and pushed
Moving to Phase 5...
```

---

### 09:30 - PHASE 5: Vercel Deployment (5 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 5

Vercel auto-deploys on push. Monitor:

1. Go to **Vercel Dashboard → Deployments**
2. Watch for deployment starting
3. Status: "Building..." → (2-3 minutes) → "Ready"

```bash
# Monitor from CLI (optional)
vercel list-deployments

# Or trigger manually
vercel --prod
```

**Expected Output:**
```
✓ Build complete
✓ Deployment ready
https://project-baobab.vercel.app
```

**Test Deployment:**
```bash
# Test homepage
curl https://project-baobab.vercel.app/ -s | head -20

# Test API
curl https://project-baobab.vercel.app/api/health

# Both should return 200 OK
```

**Status Update:** Slack
```
📢 Phase 5: Vercel Deployment ✓ COMPLETE
- Build: ✓ Success
- Status: ✓ Ready
- URL: https://project-baobab.vercel.app
Moving to Phase 6...
```

---

### 09:35 - PHASE 6: E2E Testing (10 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 6

Update `playwright.config.ts`:
```typescript
export default defineConfig({
  use: {
    baseURL: 'https://project-baobab.vercel.app', // Production URL
  },
});
```

Run tests:
```bash
npm run test:e2e --run

# Expected output:
# ✓ search.spec.ts (6 tests)
# ✓ calculators.spec.ts (8 tests)
# ✓ api.spec.ts (13 tests)
# ✓ directory.spec.ts (13 tests)
# ✓ ads.spec.ts (14 tests)
# 54 passed
```

**Manual Testing:**
- [ ] Visit https://project-baobab.vercel.app
- [ ] Homepage loads
- [ ] Search works
- [ ] Calculator works
- [ ] No errors in console
- [ ] Mobile responsive

**Status Update:** Slack
```
📢 Phase 6: E2E Testing ✓ COMPLETE
- E2E tests: ✓ 54/54 Passing
- Manual tests: ✓ Passed
- App: ✓ Operational
Moving to Phase 7...
```

---

### 09:45 - PHASE 7: Custom Domain (20 min)

**Reference:** CUSTOM_DOMAIN_SETUP.md

**7.1 Add Domain to Vercel**
1. Vercel Dashboard → Settings → Domains
2. Click "Add Domain"
3. Enter: baobab.ng
4. Copy nameservers

**7.2 Update DNS at Registrar**
1. Log into domain registrar
2. Find DNS/Nameserver settings
3. Replace with Vercel's nameservers
4. Save

**7.3 Verify DNS**
```bash
# Check DNS propagation
dig baobab.ng

# Should show Vercel nameservers
# Timeline: 24-48 hours to fully propagate
# Status: May not be complete on Day 1
```

**Note:** DNS propagation takes 24-48 hours. It's okay if not immediately visible.

**Status Update:** Slack
```
📢 Phase 7: Custom Domain ✓ INITIATED
- Domain added to Vercel
- Nameservers updated at registrar
- Status: Pending DNS propagation (24-48 hours)
- Fallback: Use https://project-baobab.vercel.app
Moving to Phase 8...
```

---

### 10:05 - PHASE 8: Monitoring Setup (10 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 8

**Vercel Monitoring:**
1. Dashboard → Monitoring
2. Note: Response times, error rate
3. Set baseline: Response time ~200ms, Error rate < 0.1%

**Meilisearch Monitoring:**
1. Meilisearch Cloud → Dashboard
2. Note: Search latency, index size
3. Set baseline: Latency ~100ms

**Set Alerts:**
- [ ] Vercel: Alert if error rate > 1%
- [ ] Vercel: Alert if response time > 500ms
- [ ] Meilisearch: Alert if latency > 500ms

**Verify Dashboards Accessible:**
- [ ] Vercel: https://vercel.com/dashboard
- [ ] Meilisearch: https://meilisearch.com/dashboard
- [ ] All team members can access

**Status Update:** Slack
```
📢 Phase 8: Monitoring Setup ✓ COMPLETE
- Vercel dashboards: ✓ Verified
- Meilisearch dashboards: ✓ Verified
- Alerts: ✓ Configured
- Team access: ✓ Granted
Moving to Phase 9...
```

---

### 10:15 - PHASE 9: Team Communication (5 min)

**Reference:** DEPLOYMENT_COORDINATION.md → Phase 9

**Send Team Announcement:**

```
📢 PROJECT BAOBAB PRODUCTION DEPLOYMENT COMPLETE ✅

Deployment Date: [Date]
Time to Deploy: ~2 hours
Status: ✅ LIVE

🔗 Access Points:
- App (Vercel URL): https://project-baobab.vercel.app
- App (Custom domain): https://baobab.ng (DNS propagating)
- Admin Dashboard: https://vercel.com/dashboard
- Monitoring: [Dashboard links]

📊 Deployment Summary:
- Database: PostgreSQL (Supabase) ✓
- Search: Meilisearch Cloud ✓
- Guides indexed: X
- Directories indexed: X
- E2E Tests: 54/54 passing ✓
- Uptime: 99.9% SLA ✓

🎯 Next Steps:
1. Monitor dashboards for 24 hours
2. Report any issues to #baobab-deployment
3. Test custom domain when DNS propagates
4. Prepare Phase 3 content creation

📚 Documentation:
- Deployment Summary: PRODUCTION_DEPLOYMENT_SUMMARY.md
- Quick Reference: DEPLOYMENT_CHECKLIST.md
- Troubleshooting: Individual guides

Questions? See #baobab-deployment or contact [Primary Deployer]

🚀 We're live! Let's build! 🎉
```

**Status Update:** Slack
```
🎉 DEPLOYMENT COMPLETE 🎉
All phases completed successfully!
Monitoring team for next 24 hours...
```

---

## Post-Launch Monitoring

### Hour 1-4 (Continuous Monitoring)

**Every 30 minutes, check:**

```bash
# Check app is up
curl https://project-baobab.vercel.app/api/health
# Should return 200 OK

# Check databases responding
curl https://project-baobab.vercel.app/api/guides?limit=1
# Should return data from PostgreSQL

# Check search working
curl "https://project-baobab.vercel.app/api/search?q=passport&index=guides"
# Should return Meilisearch results
```

**Dashboard Monitoring:**
- [ ] Vercel error rate < 0.1%
- [ ] Response time < 200ms
- [ ] Meilisearch latency < 100ms
- [ ] No spike in errors

**Slack Updates:**
- Post status every hour
- Tag any anomalies
- Log any issues for post-mortem

### Day 1-2 (Close Monitoring)

**Daily Checklist:**
- [ ] Error rate stable
- [ ] Response times normal
- [ ] No database issues
- [ ] Search results accurate
- [ ] All APIs responding
- [ ] Ads tracking working
- [ ] Directory functionality intact
- [ ] Team feedback positive

**If Issues Occur:**
1. Document error/issue
2. Check logs in Vercel
3. Refer to troubleshooting guide
4. Decide: Fix or rollback?
5. If rollback, use procedures in DEPLOYMENT_COORDINATION.md

### Week 1 (Ongoing Monitoring)

**Daily:**
- Check dashboards
- Monitor error logs
- Get team feedback
- Update status

**This Week:**
- [ ] Test custom domain when DNS ready
- [ ] Verify all features working
- [ ] Collect performance baseline
- [ ] Plan Phase 3 content

---

## Troubleshooting

### Common Issues During Deployment

| Issue | Symptom | Fix |
|-------|---------|-----|
| **PostgreSQL connection fails** | "ECONNREFUSED" errors | Verify connection string is correct, test with psql |
| **Meilisearch not responding** | Search returns 500 | Check API key, verify MEILISEARCH_HOST is correct |
| **Build fails** | "Build failed" in Vercel | Check build logs, ensure all dependencies installed |
| **Tests fail** | "X tests failed" | Run tests locally, check baseURL in playwright.config.ts |
| **Data missing** | Guides/directories not showing | Check migration ran successfully, verify data in Prisma Studio |

### Rollback Decision Tree

```
Issue found?
├─ Yes → Severity?
│   ├─ Critical (> 1% error rate) → ROLLBACK
│   ├─ High (database issues) → ROLLBACK
│   ├─ Medium (minor functionality) → FIX IN PLACE
│   └─ Low (cosmetic) → MONITOR
└─ No → Continue monitoring
```

### Quick Rollback

```bash
# In Vercel Dashboard:
1. Go to Deployments
2. Find last working deployment
3. Click "Promote to Production"

OR via CLI:
vercel rollback

# Verify rollback:
curl https://project-baobab.vercel.app/
# Should be back to previous version
```

---

## Success Criteria

✅ **Deployment Successful When:**

- [x] Build completes without errors
- [x] 54 E2E tests passing
- [x] Homepage loads
- [x] Search works with Meilisearch
- [x] APIs respond with PostgreSQL data
- [x] Ads tracking operational
- [x] Directory functionality works
- [x] Error rate < 0.1%
- [x] Response time < 200ms
- [x] No console errors
- [x] Mobile responsive
- [x] Team notified and satisfied

---

## Communication Template

### Start of Deployment
```
🚀 STARTING PRODUCTION DEPLOYMENT
Time: [Time]
Expected Duration: ~2 hours
Status Channel: #baobab-deployment
Do NOT deploy or push during this window
```

### After Each Phase
```
✓ Phase X: [Phase Name] COMPLETE
- Checkpoint: [What was verified]
- Next: Phase Y starting
```

### Issues Found
```
⚠️ ISSUE FOUND: [Description]
Severity: [Critical/High/Medium/Low]
Action: [Investigating/Fixing/Monitoring/Rolled Back]
ETA: [Time to resolution]
```

### Deployment Complete
```
✅ DEPLOYMENT COMPLETE
Time: [Duration] hours
Status: [Success/Partial/Rollback]
Next: Phase 3 content creation starts [Date]
```

---

## Contact List

**Primary Deployer:** [Name] — [Phone] — [Slack]  
**Backup Deployer:** [Name] — [Phone] — [Slack]  
**Tech Lead:** [Name] — [Phone] — [Slack]  
**Product Lead:** [Name] — [Phone] — [Slack]

**Support Contacts:**
- Vercel Support: support@vercel.com
- Supabase Support: support@supabase.com
- Meilisearch Support: support@meilisearch.com

---

## Sign-Off

- [ ] Primary Deployer: _________________________ Date: _________
- [ ] Backup Deployer: _________________________ Date: _________
- [ ] Tech Lead: _______________________________ Date: _________

---

**This runbook is your guide to a smooth deployment. Follow step-by-step, check off each item, and stay in communication. You've got this! 🚀**
