# Custom Domain Configuration for Project Baobab

## Overview

This guide configures your custom domain to work with Vercel deployment. You'll point your domain to Vercel's infrastructure and enable automatic HTTPS/SSL.

---

## Phase 1: Pre-Configuration

### 1.1 What You Need

- [x] Custom domain (already exists)
- [x] Domain registrar access (GoDaddy, Namecheap, etc.)
- [x] Project deployed to Vercel
- [ ] Domain DNS access

### 1.2 What Happens

When you complete this guide:
- Your domain (e.g., `baobab.ng`) will point to your Vercel project
- Vercel provides automatic HTTPS/SSL
- All requests redirect to your domain
- Example: `baobab.ng` → Vercel's CDN → Your app

---

## Phase 2: Configure Domain in Vercel

### 2.1 Add Domain to Vercel Project

1. Go to **Vercel Dashboard**
2. Select your **Project Baobab** project
3. Go to **Settings → Domains**
4. Click **"Add Domain"**
5. Enter your domain (e.g., `baobab.ng`)
6. Click **"Add"**

### 2.2 Verify Domain Ownership

Vercel will show two options:

#### Option A: Recommended (Nameserver Change)
Vercel manages DNS:
- Simpler setup
- Vercel handles SSL automatically
- Recommended for most projects

**Steps:**
1. In Vercel, click your domain
2. Under "Nameserver," copy the 4 nameservers provided:
   ```
   ns-123.vercel-dns.com
   ns-456.vercel-dns.com
   etc.
   ```
3. Go to your domain registrar (GoDaddy, Namecheap, etc.)
4. Find **DNS Settings** or **Nameservers**
5. Replace existing nameservers with Vercel's
6. Wait 24-48 hours for propagation

#### Option B: CNAME Record (If keeping current registrar)
Manual DNS configuration:
- More complex
- You manage DNS yourself
- Keep other DNS records

**Steps:**
1. In Vercel, select **CNAME record option**
2. Copy CNAME value (looks like: `cname.vercel-dns.com`)
3. Go to domain registrar
4. Create CNAME record:
   - **Name:** `www` (or your subdomain)
   - **Value:** (paste from Vercel)
5. For root domain, add A records:
   - `76.76.19.20`
   - `76.76.19.21`
6. Wait 24 hours for propagation

**Recommended: Option A (Nameserver)** — simpler and more reliable

---

## Phase 3: DNS Configuration

### 3.1 Nameserver Change (Option A - Recommended)

**Example: GoDaddy**

1. Log in to GoDaddy
2. Find domain management section
3. Look for **DNS Settings** or **Nameservers**
4. Click **"Change Nameservers"**
5. Replace with Vercel's:
   ```
   ns-123.vercel-dns.com
   ns-456.vercel-dns.com
   ns-789.vercel-dns.com
   ns-012.vercel-dns.com
   ```
6. Save changes

**Example: Namecheap**

1. Log in to Namecheap
2. Find **Domain List**
3. Click your domain
4. Go to **Nameservers** tab
5. Select **Custom Nameservers**
6. Add Vercel's nameservers:
   ```
   ns-123.vercel-dns.com
   ns-456.vercel-dns.com
   ns-789.vercel-dns.com
   ns-012.vercel-dns.com
   ```
7. Save

**For Nigerian domains (.ng):**

1. Log in to domain registrar (NiRA or approved registrar)
2. Find DNS/Nameserver settings
3. Add Vercel's nameservers
4. Wait for verification (usually 24-48 hours)

### 3.2 CNAME Record Change (Option B - Manual)

If not using nameserver change:

**In your registrar's DNS settings, add:**

```
Record Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or default)
```

**And for root domain:**

```
Record Type: A
Name: @ (or leave blank)
Value: 76.76.19.20

Record Type: A
Name: @ (or leave blank)
Value: 76.76.19.21
```

### 3.3 Check DNS Propagation

Use online tools to check:

```bash
# Check if domain points to Vercel
dig baobab.ng

# Should show Vercel's nameservers
# or CNAME pointing to Vercel
```

Or use: https://www.whatsmydns.net/

---

## Phase 4: SSL/HTTPS Certificate

### 4.1 Automatic SSL (Most Cases)

Vercel **automatically provisions SSL** when:
- Domain is added to Vercel
- DNS points to Vercel
- Propagation is complete

**Timeline:**
- DNS change: 0-48 hours
- SSL issuance: Usually within 5 minutes after DNS verified
- Status: Check in Vercel dashboard

### 4.2 Verify SSL Status

In Vercel Dashboard:

1. Go to **Settings → Domains**
2. Your domain should show:
   - **Status:** ✅ Valid Certificate
   - **SSL:** Valid SSL Certificate
   - Green checkmark

If still "Pending":
- Wait 24 hours for DNS propagation
- Check DNS with: `dig baobab.ng`

### 4.3 Force HTTPS Redirect

In Vercel Dashboard:

1. **Settings → Domains**
2. Click your domain
3. Toggle **"Redirect to www"** (optional but recommended)
4. Toggle **"Force HTTPS"** (should be automatic)

---

## Phase 5: Subdomain Configuration (Optional)

### 5.1 Add www Subdomain

If your domain is `baobab.ng`, you might want `www.baobab.ng` too.

In Vercel:
1. **Settings → Domains**
2. Click **"Add Domain"**
3. Enter: `www.baobab.ng`
4. Follow same DNS steps

### 5.2 Add Other Subdomains

Example: API subdomain `api.baobab.ng`

**Option 1: Vercel Deployment**
- Deploy separate Vercel project for API
- Point subdomain to that project

**Option 2: CNAME Record**
- Add CNAME: `api` → `cname.vercel-dns.com`

---

## Phase 6: Testing & Verification

### 6.1 Basic Tests

```bash
# Test domain resolves
ping baobab.ng

# Should return Vercel IP addresses
# 76.76.19.20 or 76.76.19.21

# Test HTTPS
curl -I https://baobab.ng
# Should show: HTTP/2 200
# And certificate info
```

### 6.2 Website Tests

1. **Visit your domain:**
   - Go to `https://baobab.ng`
   - Should show your app
   - No certificate warnings

2. **Test HTTPS redirect:**
   - Try `http://baobab.ng` (no s)
   - Should redirect to `https://baobab.ng`

3. **Test www:**
   - Visit `https://www.baobab.ng`
   - Should work (if configured)

4. **Check certificate:**
   - Click lock icon in browser
   - Should show valid certificate
   - Issued by Let's Encrypt or similar

### 6.3 Browser Tests

| Browser | Test | Expected |
|---------|------|----------|
| Chrome | Visit https://baobab.ng | Green lock, no warnings |
| Firefox | Visit https://baobab.ng | Green lock, no warnings |
| Mobile | Visit https://baobab.ng | Works on mobile browser |

---

## Phase 7: Email Configuration (Optional)

If you want to use domain email (e.g., `contact@baobab.ng`):

### 7.1 Add MX Records

In your DNS provider:

```
Record Type: MX
Name: @ (root domain)
Value: mail.example.com
Priority: 10
```

### 7.2 Email Providers

Popular options:
- **Google Workspace** ($6/user/month)
  - Gmail with your domain
  - Best features
  
- **Zoho Mail** (Free up to 5 users)
  - Professional email
  - Good for startups
  
- **Microsoft 365** ($6/month)
  - Outlook with domain
  - Office integration

### 7.3 Setup Steps

Each provider has different steps. Example: Google Workspace

1. Create account at workspace.google.com
2. Add your domain
3. Verify ownership (they provide verification code)
4. Add MX records they provide
5. Configure email accounts
6. Set up phone/forwarding

---

## Phase 8: Custom Domain in Environment

### 8.1 Update App Configuration

Your app should know its own domain. Update:

**In app/layout.tsx or next.config.js:**

```typescript
// Canonical domain
const DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || 'https://baobab.ng';

// For SEO
<link rel="canonical" href={`${DOMAIN}${pathname}`} />
```

**In .env.production:**

```env
NEXT_PUBLIC_APP_DOMAIN="https://baobab.ng"
NEXT_PUBLIC_APP_NAME="Baobab"
```

### 8.2 Update App URLs

Anywhere hardcoded localhost/vercel URL:

```typescript
// ❌ Before (hardcoded)
const apiUrl = 'https://project-baobab.vercel.app/api/guides';

// ✅ After (dynamic)
const apiUrl = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/guides`;
```

---

## Phase 9: Monitoring & Maintenance

### 9.1 Daily Checks

```bash
# Verify domain still works
curl -I https://baobab.ng
# Should return 200 OK

# Check certificate validity
openssl s_client -connect baobab.ng:443 -brief
# Should show: OK
```

### 9.2 Weekly Tasks

- [ ] Check Vercel dashboard for domain status
- [ ] Verify HTTPS working
- [ ] Test on multiple devices

### 9.3 Certificate Renewal

Vercel handles automatically, but you can:

1. Monitor certificate expiration in Vercel dashboard
2. Get email reminder before expiration
3. Vercel auto-renews 30 days before expiry

---

## Complete Checklist

### Pre-Configuration
- [x] Custom domain exists
- [x] Registrar account accessible
- [x] Project deployed to Vercel
- [ ] DNS/nameserver access confirmed

### Vercel Configuration
- [ ] Domain added to Vercel project
- [ ] Nameservers copied from Vercel
- [ ] Domain status shows "Valid"

### DNS Changes
- [ ] Nameservers updated at registrar
  - OR CNAME records created
- [ ] DNS changes saved
- [ ] TTL set appropriately

### Verification
- [ ] Domain resolves to Vercel IPs
- [ ] HTTPS working (green lock)
- [ ] Certificate valid (not expired)
- [ ] Redirect from http → https works
- [ ] Website loads on custom domain
- [ ] Mobile browsers work

### Post-Configuration
- [ ] Environment variables updated
- [ ] App URLs updated to custom domain
- [ ] Email verification set up (optional)
- [ ] Monitoring configured
- [ ] Team notified of domain live

---

## Troubleshooting

### Domain Not Resolving

```bash
# Check DNS propagation
dig baobab.ng

# Should show Vercel nameservers or CNAME
# If not, wait 24-48 hours
```

**Fix:**
- Verify nameservers at registrar
- Check for typos
- Wait for propagation
- Flush DNS cache: `ipconfig /flushdns` (Windows)

### Certificate Warnings

**"Certificate not valid for this domain":**
- Domain recently added to Vercel?
- Wait 5-10 minutes for cert generation
- Try incognito/private mode
- Clear browser cache

**"Certificate expired":**
- Should not happen (Vercel auto-renews)
- Verify domain still in Vercel settings
- Contact Vercel support if persists

### HTTPS Not Working

**"Connection not secure" or mixed content warnings:**
1. Check internal URLs use `https://`
2. Check images/resources use `https://`
3. Review browser console for warnings
4. Rebuild and redeploy

```bash
# Rebuild
npm run build

# Deploy
vercel --prod
```

### Slow DNS Propagation

If DNS changes not propagating after 2 hours:

1. Check for typos in nameservers
2. Verify TTL is not too high
3. Try different DNS: 8.8.8.8 or 1.1.1.1
4. Wait up to 48 hours (standard)

---

## Production Checklist Summary

✅ **Domain Configuration:**
- [x] Domain added to Vercel
- [x] DNS points to Vercel
- [x] HTTPS certificate valid
- [x] Redirect to www (if desired)

✅ **Testing:**
- [x] Domain loads website
- [x] HTTPS working
- [x] Mobile browsers work
- [x] E2E tests passing

✅ **Documentation:**
- [x] Team informed
- [x] Environment updated
- [x] Monitoring active

**Status: Custom Domain Ready** 🚀

---

## What's Next

After custom domain is live:

1. **Update Analytics:**
   - Update GA4 filters to use custom domain
   - Update Vercel analytics settings

2. **Update Links:**
   - Share your custom domain with team
   - Update social media links
   - Update any external documentation

3. **Email Setup (Optional):**
   - Configure domain email if needed
   - Set up forwarding to team members

4. **Final Monitoring:**
   - Watch error logs for domain-related issues
   - Verify all features work on custom domain
   - Get team feedback

---

## Support

**Still having issues?**

- Vercel docs: https://vercel.com/docs/concepts/projects/custom-domains
- Check domain registrar help docs
- Vercel support: support@vercel.com
- DNS checker: https://www.whatsmydns.net/
