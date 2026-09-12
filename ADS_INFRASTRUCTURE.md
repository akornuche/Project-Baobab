# Display Ads Infrastructure

## Overview

Project Baobab includes a complete display ads management system supporting:
- Ad campaign management
- Multiple ad zones (header, sidebar, content, footer, in-feed)
- Standard ad sizes (leaderboard, medium rectangle, skyscraper, square, half-page)
- Impression and click tracking
- Performance analytics
- Campaign status management

## Database Schema

### AdCampaign
Represents an advertising campaign:
```typescript
{
  id: string
  title: string
  description?: string
  advertiserName: string
  advertiserEmail?: string
  advertiserPhone?: string
  advertiserUrl?: string
  startDate: DateTime
  endDate: DateTime
  budget?: number (NGN)
  status: "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED"
  totalImpressions: number
  totalClicks: number
  createdAt: DateTime
  updatedAt: DateTime
  isDeleted: boolean
  ads: Advertisement[]
}
```

### Advertisement
Individual advertisement within a campaign:
```typescript
{
  id: string
  campaignId: string
  title: string
  imageUrl?: string
  linkUrl?: string
  altText?: string
  zone: "header" | "sidebar" | "content" | "footer" | "infeed"
  size: "leaderboard" | "medium_rectangle" | "skyscraper" | "square" | "half_page"
  priority: number (0-100, higher shows first)
  impressions: number
  clicks: number
  ctr: number (calculated click-through rate)
  status: "ACTIVE" | "PAUSED" | "COMPLETED"
  createdAt: DateTime
  updatedAt: DateTime
  isDeleted: boolean
  impressionEvents: AdImpression[]
  clickEvents: AdClick[]
}
```

### AdImpression
Records each time an ad is displayed:
```typescript
{
  id: string
  adId: string
  userAgent?: string
  referrer?: string
  ipHash?: string (SHA-256 hashed for privacy)
  createdAt: DateTime
}
```

### AdClick
Records each time an ad is clicked:
```typescript
{
  id: string
  adId: string
  userAgent?: string
  referrer?: string
  ipHash?: string (SHA-256 hashed for privacy)
  createdAt: DateTime
}
```

## API Endpoints

### Campaign Management

#### GET /api/ads/campaigns
Retrieve all campaigns with pagination and filtering

**Query Parameters:**
- `status` (optional): Filter by campaign status (DRAFT, ACTIVE, PAUSED, COMPLETED)
- `limit` (optional): Results per page (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "campaigns": [
    {
      "id": "campaign-id",
      "title": "Q3 2026 Campaign",
      "advertiserName": "Acme Corp",
      "status": "ACTIVE",
      "totalImpressions": 1500,
      "totalClicks": 45,
      "ads": [...]
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

#### POST /api/ads/campaigns
Create a new ad campaign

**Request Body:**
```json
{
  "title": "Summer Campaign",
  "description": "Campaign for summer products",
  "advertiserName": "Acme Corp",
  "advertiserEmail": "campaigns@acme.com",
  "advertiserPhone": "+234801234567",
  "advertiserUrl": "https://acme.com",
  "startDate": "2026-09-01T00:00:00Z",
  "endDate": "2026-09-30T23:59:59Z",
  "budget": 500000
}
```

**Response:** Campaign object with ID

#### GET /api/ads/campaigns/[id]
Get a specific campaign with all ads and events

**Response:**
```json
{
  "id": "campaign-id",
  "title": "Summer Campaign",
  "status": "ACTIVE",
  "ads": [
    {
      "id": "ad-id",
      "title": "Summer Promo",
      "zone": "content",
      "size": "medium_rectangle",
      "impressions": 1500,
      "clicks": 45,
      "ctr": 3.0,
      "impressionEvents": [...],
      "clickEvents": [...]
    }
  ]
}
```

#### PUT /api/ads/campaigns/[id]
Update an existing campaign

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Campaign Name",
  "status": "PAUSED",
  "budget": 600000
}
```

#### DELETE /api/ads/campaigns/[id]
Soft delete a campaign

### Advertisement Management

#### GET /api/ads
Retrieve active ads with filtering

**Query Parameters:**
- `zone` (optional): Filter by zone (header, sidebar, content, footer, infeed)
- `size` (optional): Filter by size (leaderboard, medium_rectangle, skyscraper, square, half_page)
- `limit` (optional): Results per page (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "ads": [
    {
      "id": "ad-id",
      "title": "Ad Title",
      "imageUrl": "https://...",
      "linkUrl": "https://example.com",
      "zone": "content",
      "size": "medium_rectangle",
      "priority": 10,
      "impressions": 1500,
      "clicks": 45,
      "ctr": 3.0,
      "campaign": {...}
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

#### POST /api/ads
Create a new advertisement

**Request Body:**
```json
{
  "campaignId": "campaign-id",
  "title": "Summer Sale",
  "imageUrl": "https://example.com/ad.jpg",
  "linkUrl": "https://example.com/summer-sale",
  "altText": "Summer Sale Advertisement",
  "zone": "content",
  "size": "medium_rectangle",
  "priority": 10
}
```

### Tracking

#### POST /api/ads/track/impression
Track when an ad is displayed

**Request Body:**
```json
{
  "adId": "ad-id"
}
```

**Response:**
```json
{
  "message": "Impression tracked",
  "impressions": 1501
}
```

#### POST /api/ads/track/click
Track when an ad is clicked

**Request Body:**
```json
{
  "adId": "ad-id"
}
```

**Response:**
```json
{
  "message": "Click tracked",
  "clicks": 46,
  "linkUrl": "https://example.com/offer"
}
```

## UI Components

### AdZone
Renders ads for a specific zone

**Usage:**
```typescript
import { AdZone } from '@/components/Ad/AdZone';

export function MyPage() {
  return (
    <div>
      <AdZone zone="header" size="leaderboard" limit={3} />
      <AdZone zone="content" size="medium_rectangle" />
      <AdZone zone="sidebar" size="skyscraper" />
    </div>
  );
}
```

**Props:**
- `zone` (required): 'header' | 'sidebar' | 'content' | 'footer' | 'infeed'
- `size` (optional): Ad size (default: 'medium_rectangle')
- `limit` (optional): Maximum ads to display (default: 3)
- `className` (optional): Tailwind classes

### Ad
Renders an individual advertisement

**Usage:**
```typescript
import { Ad } from '@/components/Ad/Ad';

<Ad ad={adObject} />
```

**Props:**
- `ad` (required): Advertisement object
- `className` (optional): Tailwind classes

### DisplayAds
Wrapper component showing ads in multiple zones

**Usage:**
```typescript
import { DisplayAds } from '@/components/Ad/DisplayAds';

export function Layout() {
  return <DisplayAds />
}
```

## Ad Sizes

Standard IAB ad sizes supported:

| Size | Dimensions | Zone | Use Case |
|------|-----------|------|----------|
| **leaderboard** | 728×90 | header, footer | Full-width top/bottom |
| **medium_rectangle** | 300×250 | content, infeed, sidebar | Main content area |
| **skyscraper** | 300×600 | sidebar | Vertical sidebar |
| **square** | 250×250 | content | Flexible content |
| **half_page** | 300×600 | infeed, sidebar | Premium vertical |

## Campaign Workflow

1. **Create Campaign** → Status: DRAFT
   - Advertiser details
   - Start/end dates
   - Budget

2. **Add Advertisements** → Campaign must exist first
   - Upload creative (image)
   - Add link URL
   - Select zone and size
   - Set priority

3. **Activate Campaign** → Update status to ACTIVE
   - Ads start appearing on site
   - Tracking begins

4. **Monitor Performance**
   - Impressions tracked
   - Clicks tracked
   - CTR calculated automatically

5. **Pause/Complete Campaign**
   - Status: PAUSED (temporarily)
   - Status: COMPLETED (campaign ended)

## Privacy & Data Protection

### IP Address Hashing
- IP addresses are never stored in plain text
- Hashed using SHA-256 for privacy compliance
- Used for abuse detection and analytics

### User Data
- No PII collected beyond hashed IP
- User agent and referrer tracked for analytics
- No cookies required for basic tracking

### GDPR Compliance
- Ad tracking is minimal and privacy-focused
- Users can opt-out via privacy settings
- Data deletion available upon request

## Performance Optimization

### Ad Loading
- Async loading with suspense boundaries
- Lazy image loading
- Priority-based ad selection
- Cache-friendly responses

### Database Optimization
- Indexes on zone, size, status fields
- Efficient CTR calculation
- Batch event recording for high-traffic sites

### Metrics
- Typical ad load time: 50-100ms
- Tracking latency: <100ms
- Database queries: Well-indexed

## Admin Dashboard (Future Phase)

Future implementation will include:
- Campaign creation wizard
- Performance analytics dashboard
- Revenue tracking
- A/B testing interface
- Advertiser management portal

## Seeding Sample Ads

Add sample campaigns and ads to database:

```bash
node scripts/seed-ads.js
```

This creates:
- 2 sample campaigns (DRAFT and ACTIVE)
- 6 sample advertisements
- Sample tracking data for analytics

## Troubleshooting

### Ads Not Displaying
1. Check campaign status is ACTIVE
2. Verify ad status is ACTIVE
3. Ensure current date is within campaign dates
4. Check zone and size in AdZone component

### Tracking Not Working
1. Verify `/api/ads/track/impression` and `/api/ads/track/click` endpoints
2. Check browser console for errors
3. Verify adId is correct
4. Check database connection

### Performance Issues
1. Check database indexes
2. Monitor server load during tracking
3. Consider batching impression/click events
4. Use Redis caching for ad queries (future)

## Next Steps

1. ✅ Ad schema and models created
2. ✅ API endpoints implemented
3. ✅ Tracking infrastructure in place
4. ✅ UI components updated
5. 📋 Admin dashboard (Phase 2a+)
6. 📋 Revenue calculation (Phase 2a+)
7. 📋 A/B testing framework (future)

---

**Status:** Infrastructure Complete ✅
**Next Phase:** 2a - Premium Directory Workflow
