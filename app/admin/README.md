# Baobab Admin Dashboard

## Overview

This is the admin dashboard for Baobab, providing content management capabilities for guides, directory listings, and email subscribers.

## Available Pages

### `/admin/guides`
- View all guides (published and draft)
- Search guides by title or category
- Publish/unpublish guides
- Edit guide details
- View guide statistics

**Features**:
- ✅ Guide listing with category, status, author
- ✅ Search functionality
- ✅ Publish/unpublish toggle
- ✅ Edit links
- ✅ Statistics dashboard (total, published, draft)

### `/admin/directories` (planned)
- View all directory listings
- Verify/unverify listings
- Premium status management
- Search listings

### `/admin/subscribers` (planned)
- View all email subscribers
- Manage subscriptions
- Export subscriber data
- Analyze signups

## Access

**Development**: Available at `/admin` routes  
**Production**: Requires authentication (TBD)

## Next Steps

1. `/admin/directories` - Directory management page
2. `/admin/subscribers` - Email management page
3. Authentication system
4. Role-based access control
5. Analytics dashboard

## Database Models

- `Guide` - Content guides
- `DirectoryListing` - Service providers
- `EmailSubscriber` - Newsletter subscribers

---

*Admin Dashboard Version*: 1.0  
*Last Updated*: 2024
