# Vercel Deployment Checklist

## Quick Start (15 minutes)

### Step 1: Prepare GitHub (Already Done ✅)
- [x] Project is in Git
- [x] All code committed and pushed
- [x] Repository is public (or you have access)

### Step 2: Create Vercel Account (5 minutes)
- [ ] Go to https://vercel.com
- [ ] Click "Sign Up"
- [ ] Choose "Continue with GitHub"
- [ ] Authorize Vercel to access your repos

### Step 3: Import Project (2 minutes)
- [ ] In Vercel, click "Add New → Project"
- [ ] Select "Project-Baobab" from GitHub
- [ ] Click "Import"

### Step 4: Configure Environment (5 minutes)
In the "Environment Variables" section, add:

```
DATABASE_URL = file:./dev.db
MEILISEARCH_HOST = http://localhost:7700
MEILISEARCH_API_KEY = masterKey
NEXT_PUBLIC_MEILISEARCH_HOST = http://localhost:7700
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY = masterKey
NEXT_PUBLIC_GA4_ID = (leave blank for now)
SENDGRID_API_KEY = stub
SENDGRID_FROM_EMAIL = dev@baobab.local
```

### Step 5: Deploy (1 click)
- [ ] Click "Deploy"
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Get your production URL

## After Deployment

### Verify It Works
- [ ] Visit your Vercel URL
- [ ] Check homepage loads
- [ ] Test search functionality
- [ ] Test a calculator

### Run E2E Tests Against Live URL
```bash
# Update BASE_URL in playwright.config.ts to your Vercel URL
npm run test:e2e
```

### Monitor Build
- [ ] Check build logs in Vercel dashboard
- [ ] Set up Vercel alerts (Settings → Notifications)

## Production Upgrade (Later)

Before going fully public:

- [ ] Set up PostgreSQL (Supabase or Railway)
- [ ] Update DATABASE_URL in Vercel env
- [ ] Set up Meilisearch Cloud
- [ ] Update MEILISEARCH_HOST in Vercel env
- [ ] Configure custom domain (if needed)
- [ ] Set up monitoring and alerts

## Continuous Deployment Setup

Vercel automatically deploys when you push to master:

```bash
# Your normal workflow
git commit -m "Feature: add new guide"
git push

# Vercel automatically:
# 1. Builds the project
# 2. Runs tests (if configured)
# 3. Deploys to production
# 4. Shows deployment status in GitHub
```

## Preview Deployments

For each pull request:
- Vercel creates a unique preview URL
- Perfect for testing before merging
- Share preview URL with team

```bash
# Create a feature branch
git checkout -b feature/new-guide

# Make changes and commit
git commit -m "Add new guide"
git push origin feature/new-guide

# Create PR → Vercel creates preview
# Test → Merge to master → Production deployment
```

## Rollback If Needed

In Vercel Dashboard:
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

Or from CLI:
```bash
vercel ls          # List deployments
vercel rollback    # Rollback to previous
```

## Environment by Deployment

### Local (`npm run dev`)
- SQLite database
- Localhost Meilisearch
- Development mode

### Vercel Preview (Pull Requests)
- SQLite database
- Localhost Meilisearch
- Preview URL provided

### Vercel Production (Master branch)
- SQLite database (for now)
- Localhost Meilisearch (for now)
- Production URL at vercel.app

### Future Production (After upgrades)
- PostgreSQL database
- Meilisearch Cloud
- Custom domain
- CDN + Analytics

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Verify `package.json` has all dependencies
3. Check environment variables are set
4. Run `npm run build` locally to verify

### Environmental Variable Issues
1. Make sure variables are set in Vercel dashboard
2. Rebuild deployment after adding/changing variables
3. Check `.env.example` to ensure all vars are defined

### Database Connection Fails
1. SQLite should work automatically
2. For PostgreSQL: verify DATABASE_URL is correct
3. Test connection locally first: `npx prisma studio`

### Meilisearch Doesn't Work
1. For development: run `docker-compose up meilisearch` locally
2. For production: set up Meilisearch Cloud
3. Verify MEILISEARCH_HOST and MEILISEARCH_API_KEY are correct

## Success Indicators

✅ Deployment successful when:
- Build completes without errors
- Vercel shows "Ready" status
- Homepage loads at your URL
- E2E tests pass against live URL

## URLs to Know

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Your Live App:** Will be shown after first deployment
- **Build Logs:** In project settings → Deployments

## Next Steps After Deployment

1. ✅ Verify homepage works
2. ✅ Run E2E tests against live URL
3. ✅ Share URL with team for testing
4. ✅ Continue content creation
5. ⏭️ Set up PostgreSQL and Meilisearch Cloud (when ready)
6. ⏭️ Configure custom domain (before launch)
7. ⏭️ Set up monitoring and alerts (before launch)

---

**Ready to deploy?** Follow the 5 steps above. Should take ~15 minutes and your app will be live!
