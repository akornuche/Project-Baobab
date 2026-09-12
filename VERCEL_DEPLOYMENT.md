# Vercel Deployment Guide - Project Baobab

## Overview

Project Baobab can be deployed to Vercel for hosting while continuing development. Vercel provides:
- Zero-config Next.js deployment
- Automatic previews for pull requests
- CI/CD integration
- Free tier available
- Easy rollbacks

## Prerequisites

1. **GitHub Account** — Already have (Project-Baobab repo)
2. **Vercel Account** — Create at https://vercel.com
3. **Environment Variables** — Need to configure

## Step 1: Create Vercel Account & Link GitHub

1. Go to https://vercel.com/signup
2. Sign up with GitHub account
3. Authorize Vercel to access repositories
4. Select `Project-Baobab` repository

## Step 2: Configure Environment Variables

Vercel needs environment variables for:
- Database (development uses SQLite, production uses PostgreSQL)
- Meilisearch
- Other services

### In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add the following:

```env
# Database (for development/staging)
DATABASE_URL="file:./dev.db"

# Meilisearch
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="masterKey"
NEXT_PUBLIC_MEILISEARCH_HOST="http://localhost:7700"
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY="masterKey"

# Analytics (when ready)
NEXT_PUBLIC_GA4_ID="G-XXXXXX"

# Other services (placeholders for now)
SENDGRID_API_KEY="stub"
SENDGRID_FROM_EMAIL="dev@baobab.local"
```

### Important Notes:

- **SQLite is NOT suitable for production** (single-process, no concurrency)
- For production deployment, we'll need PostgreSQL
- Vercel will host the app, but database needs external hosting

## Step 3: Deploy to Vercel

### Option A: Direct Deployment (Easiest)

1. In Vercel, click "Import Project"
2. Select your GitHub repository
3. Vercel auto-detects Next.js
4. Click "Deploy"

Vercel will:
- Auto-install dependencies
- Run `npm run build`
- Deploy to production URL
- Enable automatic deployments on push to master

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 4: Configure Production Database

For production deployment, you need PostgreSQL:

### Option 1: Vercel Postgres (Easiest)
```bash
vercel env pull
```
This pulls environment variables, including database URL if using Vercel Postgres.

### Option 2: External PostgreSQL
Providers:
- **Supabase** (PostgreSQL + Auth) — https://supabase.com
- **Railway** — https://railway.app (PostgreSQL)
- **Heroku Postgres** — https://www.heroku.com/postgres
- **AWS RDS** — https://aws.amazon.com/rds/postgresql/

Choose one and set `DATABASE_URL` to its connection string.

### Option 3: Keep SQLite for Development
For now, SQLite works fine for:
- Development/staging
- Testing workflows
- Small-scale testing

Just know it won't scale to production traffic.

## Step 5: Set Up External Meilisearch (Production)

For production, you need a hosted Meilisearch instance:

### Option 1: Meilisearch Cloud
- Official managed hosting
- https://cloud.meilisearch.com
- $9/month minimum
- Auto-scaling included

### Option 2: Self-Hosted
- Docker on VPS
- AWS EC2
- Railway, Render, or similar

### Option 3: Development Only
For now, keep localhost Meilisearch. Production will need external instance.

## Step 6: Continuous Deployment

Vercel automatically:
- Deploys on push to master
- Creates preview deployments for pull requests
- Runs builds and tests
- Shows deployment status in GitHub

### Enable Preview Deployments:
Settings → Git → Automatic deployment: "Yes"

## Deployment Workflow

### During Development:
```
Local Development
    ↓
Commit to GitHub
    ↓
Vercel Auto-deploys
    ↓
Preview URL available
    ↓
Merge to master
    ↓
Production deployment
```

### To Deploy:
```bash
# Make changes locally
git add .
git commit -m "Feature: add new guide"
git push origin feature-branch

# Create PR → Vercel creates preview
# Review → Merge to master → Vercel deploys to production
```

## Environment Configuration by Stage

### Local Development
```env
DATABASE_URL="file:./dev.db"
MEILISEARCH_HOST="http://localhost:7700"
NODE_ENV="development"
```

### Vercel Preview (Pull Requests)
```env
DATABASE_URL="file:./dev.db"  # or staging DB
MEILISEARCH_HOST="https://staging-meilisearch.example.com"
NODE_ENV="development"
```

### Vercel Production
```env
DATABASE_URL="postgresql://user:pass@prod.db.example.com/baobab"
MEILISEARCH_HOST="https://meilisearch.example.com"
NODE_ENV="production"
```

## Monitoring & Debugging

### View Logs:
```bash
# Stream logs
vercel logs

# View build logs
vercel logs --follow
```

### Monitor Performance:
- Vercel Analytics (auto-enabled)
- Core Web Vitals
- Performance metrics

## Rollback

If deployment goes wrong:

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback
```

Or in Vercel Dashboard: Settings → Deployments → Promote/Rollback

## Cost Estimate

| Service | Cost | Notes |
|---------|------|-------|
| Vercel | Free | Includes generous free tier |
| PostgreSQL | $15-50/mo | Depending on provider |
| Meilisearch | $9+/mo | Or self-host free |
| **Total** | **$24-60/mo** | Minimal for MVP |

## Important Before Going Live

✅ Do before production deployment:
- [ ] Switch to PostgreSQL
- [ ] Set up external Meilisearch
- [ ] Configure proper environment variables
- [ ] Run E2E tests: `npm run test:e2e`
- [ ] Set up monitoring/alerts
- [ ] Configure backups
- [ ] Set up CDN for media

⚠️ Current Limitations:
- SQLite doesn't scale
- Meilisearch on localhost only works locally
- No authentication/authorization yet (add before launch)

## Deploy Right Now (For Development)

To get something live immediately while developing:

```bash
# 1. Create Vercel account at vercel.com
# 2. Connect GitHub repo
# 3. Set environment variables (DATABASE_URL, etc.)
# 4. Click "Deploy"
```

Takes ~2-5 minutes. Your app will be live at:
```
https://project-baobab.vercel.app
```

## Recommended Deployment Schedule

**Week 1-2 (Now):**
- Deploy to Vercel (this week)
- Use SQLite + localhost Meilisearch
- Continue content creation
- Use preview deployments for testing

**Week 3-4:**
- Set up PostgreSQL (Supabase/Railway)
- Set up Meilisearch Cloud
- Update environment variables
- Redeploy with production services

**Week 5+:**
- Monitor performance
- Optimize for production
- Set up analytics
- Prepare for launch

## Quick Reference

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to staging/preview
vercel

# Deploy to production
vercel --prod

# View deployments
vercel ls

# Rollback
vercel rollback

# View logs
vercel logs

# Pull env variables
vercel env pull
```

## Next Steps

1. **Create Vercel account** — 5 min
2. **Connect GitHub repo** — 2 min
3. **Configure environment variables** — 5 min
4. **Deploy** — 1 click
5. **Share preview URL** — Instantly available

**Estimated time to live: 15 minutes**

---

**Note:** This setup is perfect for development and staging. As you approach launch, you'll upgrade to production-grade services (PostgreSQL, Meilisearch Cloud, etc.).

Ready to deploy? Start at https://vercel.com
