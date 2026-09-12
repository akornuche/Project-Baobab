# Premium Directory Workflow

## Overview

Project Baobab's premium directory system enables vendors to upgrade their listings with tiered features and benefits, generating revenue while providing value to businesses seeking professional services.

## Pricing Tiers

Four tiers available with progressive features:

| Tier | Monthly | Annual | Key Features |
|------|---------|--------|-------------|
| **Free** | ₦0 | ₦0 | Basic info, standard visibility, 1 contact method |
| **Basic** | ₦5,000 | ₦50,000 | Enhanced ranking, 5 contacts, photo gallery (5), featured badge |
| **Premium** | ₦15,000 | ₦150,000 | Top placement, unlimited contacts, photos (50), analytics, video, verified badge |
| **Enterprise** | ₦50,000 | ₦500,000 | Guaranteed top, dedicated manager, white-label, API access, 24/7 support |

Annual billing saves 2 months compared to monthly.

## Database Schema

### DirectoryListing (Extended)
```typescript
{
  // ... existing fields ...
  premiumTier: "free" | "basic" | "premium" | "enterprise"
  premiumStartDate?: DateTime
  premiumEndDate?: DateTime
  premiumAutoRenew: boolean
  rating: number (0-5)
  reviewCount: number
  impressions: number
  clicks: number
  subscriptions: DirectorySubscription[]
  reviews: DirectoryReview[]
}
```

### DirectorySubscription
Tracks subscription lifecycle:
```typescript
{
  id: string
  listingId: string
  tier: string
  startDate: DateTime
  endDate: DateTime
  autoRenew: boolean
  amountPaid?: number
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  transactionId?: string
  invoiceUrl?: string
  cancelledAt?: DateTime
  cancellationReason?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

### DirectoryReview
User reviews for vendors:
```typescript
{
  id: string
  listingId: string
  rating: number (1-5)
  title?: string
  comment?: string
  reviewer?: string
  email?: string
  verified: boolean
  helpful: number
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: DateTime
  updatedAt: DateTime
}
```

## Upgrade Workflow

### Step 1: User Views Listing
- See current tier (Free/Basic/Premium/Enterprise)
- See upgrade benefits
- See "Upgrade Now" button

### Step 2: Select Tier
- Display pricing tiers with benefits matrix
- Monthly vs Annual toggle (show savings)
- Select button for each tier

### Step 3: Review & Checkout
- Confirm tier and price
- Auto-renew checkbox (default: checked)
- Proceed to payment

### Step 4: Payment (Placeholder)
- Integration with payment provider (Flutterwave, Paystack, Stripe)
- Handle payment success/failure
- Generate invoice

### Step 5: Activate Subscription
- Update listing to new tier
- Set premium status
- Start/end dates configured
- Email confirmation

### Step 6: Manage Subscription
- View active subscription
- Pause/cancel option
- Renew before expiration
- Downgrade to lower tier

## API Endpoints

### Directory Listings

#### GET /api/directory/listings
Retrieve listings with filtering

**Query Parameters:**
- `category` - Filter by category
- `state` - Filter by state
- `city` - Filter by city
- `premiumOnly` - Only premium listings (true/false)
- `verifiedOnly` - Only verified listings (true/false)
- `limit` - Results per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "listings": [
    {
      "id": "listing-id",
      "name": "Acme Accounting",
      "category": "accountants",
      "premiumTier": "premium",
      "premium": true,
      "rating": 4.5,
      "reviewCount": 23,
      "subscriptions": [
        {
          "tier": "premium",
          "startDate": "2026-09-01",
          "endDate": "2026-10-01"
        }
      ]
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

#### POST /api/directory/listings
Create new listing

**Request:**
```json
{
  "name": "Acme Accounting",
  "description": "Professional accounting services",
  "category": "accountants",
  "address": "123 Main St",
  "state": "Lagos",
  "city": "Lagos",
  "phone": "+2348012345678",
  "email": "info@acme.com",
  "website": "https://acme.com"
}
```

### Subscriptions

#### GET /api/directory/subscriptions?listingId=id
Get subscriptions for a listing

**Response:**
```json
{
  "subscriptions": [
    {
      "id": "sub-id",
      "tier": "premium",
      "startDate": "2026-09-01",
      "endDate": "2026-10-01",
      "autoRenew": true,
      "paymentStatus": "COMPLETED",
      "amountPaid": 15000
    }
  ]
}
```

#### POST /api/directory/subscriptions
Create subscription (initiate upgrade)

**Request:**
```json
{
  "listingId": "listing-id",
  "tier": "premium",
  "billingPeriod": "monthly" // or "annual"
}
```

**Response:**
```json
{
  "id": "sub-id",
  "listingId": "listing-id",
  "tier": "premium",
  "startDate": "2026-09-12",
  "endDate": "2026-10-12",
  "paymentStatus": "PENDING",
  "amountPaid": 15000
}
```

#### PATCH /api/directory/subscriptions/[id]
Mark subscription as paid (from payment webhook)

**Request:**
```json
{
  "paymentStatus": "COMPLETED",
  "transactionId": "txn-1234567890",
  "invoiceUrl": "https://..."
}
```

#### DELETE /api/directory/subscriptions/[id]
Cancel subscription

**Request:**
```json
{
  "reason": "Changed business"
}
```

### Reviews

#### GET /api/directory/reviews?listingId=id
Get reviews for a listing

**Query Parameters:**
- `status` - PENDING | APPROVED | REJECTED | ALL (default: APPROVED)
- `limit` - Results per page (default: 20)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "reviews": [
    {
      "id": "review-id",
      "rating": 5,
      "title": "Excellent Service",
      "comment": "Very professional and quick response",
      "reviewer": "John Doe",
      "verified": true,
      "helpful": 12,
      "createdAt": "2026-09-10"
    }
  ],
  "total": 23,
  "limit": 20,
  "offset": 0
}
```

#### POST /api/directory/reviews
Submit a review

**Request:**
```json
{
  "listingId": "listing-id",
  "rating": 5,
  "title": "Great work!",
  "comment": "Very professional and responsive",
  "reviewer": "Jane Doe",
  "email": "jane@example.com"
}
```

## Pricing Configuration

Located in `lib/directory-pricing.ts`:

```typescript
const DIRECTORY_PRICING = {
  currency: 'NGN',
  freeTrialDays: 14,
  tiers: {
    free: { ... },
    basic: { ... },
    premium: { ... },
    enterprise: { ... }
  }
}

// Helper functions:
getTierPricing(tierId, billingPeriod)
compareTiers()
calculateSubscriptionEndDate(startDate, billingPeriod)
isSubscriptionActive(startDate, endDate)
getDaysRemaining(endDate)
formatPrice(amount, currency)
calculateSubscriptionCost(tierId, billingPeriod, discountPercentage)
```

## User Flows

### For New Vendors (Free Trial)
1. Create free listing
2. Automatically qualify for 14-day premium trial
3. At day 12, email reminder to upgrade
4. After trial, revert to free tier or upgrade

### For Existing Free Vendors
1. View "Upgrade" button on listing
2. Choose tier and billing period
3. Pay via payment provider
4. Receive confirmation email
5. Listing updated with badge and features

### For Active Premium Vendors
1. View current subscription status
2. Renew before expiration (30-day reminder)
3. Manage auto-renewal setting
4. Downgrade (lose premium features) or upgrade
5. Cancel with reason (prevents accidental cancellations)

## Business Logic

### Auto-Renewal
- Default: enabled for all subscriptions
- Renewal happens at end date if enabled
- If payment fails, retry with backoff strategy
- Email notification before and after renewal

### Cancellation
- Refund policy: Pro-rata based on days used
- Cancellation reason captured for feedback
- Listing reverts to free tier immediately
- Data retained for 30 days before deletion

### Upgrade/Downgrade
- Downgrade: immediate effect, pro-rata credit applied
- Upgrade: immediate effect, additional charge prorated
- Credit applied to next billing cycle

### Tier Activation
When subscription payment is completed:
1. Update `DirectoryListing.premiumTier`
2. Set `DirectoryListing.premium = true` (if not free tier)
3. Set `premiumStartDate` and `premiumEndDate`
4. Index to Meilisearch with premium priority boost
5. Send confirmation email

## Revenue Model

### Pricing Revenue
- Monthly subscriptions: recurring MGN
- Annual subscriptions: upfront NGN
- Average tier mix: 60% Basic, 30% Premium, 10% Enterprise

### Example Monthly Revenue
Assuming 100 paid subscriptions:
- 60 Basic @ ₦5,000 = ₦300,000
- 30 Premium @ ₦15,000 = ₦450,000
- 10 Enterprise @ ₦50,000 = ₦500,000
- **Total: ₦1,250,000/month**

### Future Revenue
- Lead generation (vendor pays per qualified lead)
- Featured placement premium
- API licensing for vendors

## Implementation Timeline

### Phase 2a (This Phase)
- ✅ Database schema with premium fields
- ✅ Pricing configuration system
- ✅ Subscription management API
- ✅ Review system API

### Phase 2b (Testing)
- [ ] E2E tests for subscription flow
- [ ] Payment integration tests
- [ ] Review moderation tests

### Phase 3 (Content)
- [ ] Update directory page with tier display
- [ ] Upgrade UI component
- [ ] Subscription management dashboard

### Phase 5a (Deployment)
- [ ] Configure payment provider (Flutterwave/Paystack)
- [ ] Set up payment webhooks
- [ ] Configure email notifications
- [ ] Admin dashboard for subscriptions

## Future Enhancements

1. **Promotional Codes**
   - Discount codes for seasonal campaigns
   - Partner affiliate codes
   - Volume discounts

2. **Payment Methods**
   - Multiple payment gateways
   - Bank transfer option
   - BNPL (Buy Now Pay Later)

3. **Usage Analytics**
   - Views per pricing tier
   - Conversion rate by tier
   - Churn analysis

4. **Vendor Dashboard**
   - Performance metrics
   - Lead management
   - Subscription management
   - Invoice history

5. **Advanced Features**
   - A/B testing for pricing
   - Dynamic pricing by vendor tier
   - Loyalty rewards program

## Troubleshooting

### Subscription Not Activating
1. Verify payment status is COMPLETED
2. Check listing ID exists
3. Ensure tier is valid
4. Check database migration ran

### Reviews Not Showing
1. Verify status is APPROVED (not PENDING)
2. Check listing ID matches
3. Verify review count calculation

### Pricing Calculation Issues
1. Check `lib/directory-pricing.ts` for tier definitions
2. Verify billing period is 'monthly' or 'annual'
3. Test with `getTierPricing()` helper

---

**Status:** Infrastructure Complete ✅
**Next Phase:** 2b - End-to-End Testing Framework
**Estimated Time:** 2-3 days
