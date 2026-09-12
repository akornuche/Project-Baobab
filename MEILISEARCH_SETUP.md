# Meilisearch Setup Guide

## Overview

Meilisearch is a lightweight, fast search engine used for indexing guides and directory listings in Project Baobab.

## Prerequisites

- Docker and Docker Compose installed
- Meilisearch client library: `npm install meilisearch` (already in package.json)

## Quick Start (Docker)

### 1. Start Meilisearch

```bash
docker-compose up -d meilisearch
```

This will:
- Pull the Meilisearch image (v1.11.3)
- Start Meilisearch on port 7700
- Create persistent storage in Docker volume

### 2. Verify Installation

```bash
# Check if running
docker ps | grep meilisearch

# Test connection
curl http://localhost:7700/health
```

Should return:
```json
{ "status": "available" }
```

### 3. Access Meilisearch Dashboard

Visit: http://localhost:7700 (uses default master key: `masterKey`)

## Configuration

### Environment Variables

In `.env.local`:
```env
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="masterKey"  # For development only!
NEXT_PUBLIC_MEILISEARCH_HOST="http://localhost:7700"
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY="masterKey"
```

### Indexes

Two indexes are automatically created:

#### 1. `guides` Index
Searchable attributes:
- title
- subtitle
- description
- content

Faceting attributes:
- domain
- subdomain
- verified

#### 2. `directories` Index
Searchable attributes:
- name
- description
- category
- state
- city

Faceting attributes:
- category
- state
- verified
- premium

## Seeding Meilisearch

### Automatic Seeding (on Application Start)

The application automatically initializes Meilisearch on first run. The `initMeilisearch()` function:
1. Creates indexes if they don't exist
2. Configures searchable attributes
3. Sets up faceting

### Manual Seeding from Database

After guides/directories are created in the database:

```bash
# Using Node
node scripts/seed-meilisearch.js

# Or using TypeScript compiler
npx ts-node scripts/seed-meilisearch.ts
```

## API Endpoints

### Search Guides

```bash
GET /api/search?q=passport&index=guides&limit=20&offset=0
```

Query parameters:
- `q` (required) — Search query (min 2 characters)
- `index` (optional) — Index name: `guides` or `directories` (default: guides)
- `limit` (optional) — Results per page (default: 20)
- `offset` (optional) — Pagination offset (default: 0)

Response:
```json
{
  "results": [
    {
      "id": "guide-id",
      "slug": "passport-application",
      "title": "How to Apply for a Nigerian Passport",
      "subtitle": "...",
      "description": "...",
      "domain": "Government",
      "subdomain": "Identity & Civil Documents",
      "verified": true,
      "_formatted": {
        "title": "How to Apply for a Nigerian <mark>Passport</mark>"
      }
    }
  ],
  "total": 1
}
```

### Search Directories

```bash
GET /api/search?q=accountant&index=directories&state=Lagos
```

## Client-Side Usage

### Search Component

```typescript
import { useSearch } from '@/lib/useSearch';

export function GuideSearch() {
  const { results, loading, search } = useSearch('guides');

  const handleSearch = async (query: string) => {
    await search(query);
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search guides..."
      />
      {loading && <p>Searching...</p>}
      {results.map((guide) => (
        <div key={guide.id}>{guide.title}</div>
      ))}
    </div>
  );
}
```

## Indexing New Content

When a guide or directory listing is created/updated:

### Automatic (Recommended)
Add an indexing call in your API endpoint:

```typescript
import { indexGuide, indexDirectory } from '@/lib/meilisearch-indexing';

// After creating a guide
const guide = await prisma.guide.create({ ... });
await indexGuide(guide);

// After creating a directory
const listing = await prisma.directoryListing.create({ ... });
await indexDirectory(listing);
```

### Manual Sync

To re-sync all data from database to Meilisearch:

```bash
node scripts/seed-meilisearch.js
```

This is idempotent and safe to run multiple times.

## Production Setup

### Security

In production, set a strong master key in environment variables:

```env
MEILISEARCH_MASTER_KEY="your-very-strong-secret-key-here"
```

### Create Search-Only Keys

For client-side search, create a scoped API key instead of exposing the master key:

```bash
# Via Meilisearch dashboard or CLI
# Create a key limited to search operations only
meili-cli keys create \
  --name "search-key" \
  --search \
  --indexes guides,directories
```

### Deployment Options

1. **Self-Hosted VPS**
   - Docker Compose setup on dedicated server
   - Recommended for full control

2. **Meilisearch Cloud**
   - Managed hosting
   - https://cloud.meilisearch.com
   - Auto-scaling and backups

3. **AWS/Azure/GCP**
   - Docker containers on ECS/AKS/Cloud Run
   - Configure with managed networking

### Production Environment

```env
MEILISEARCH_HOST="https://your-meilisearch-domain.com"
MEILISEARCH_API_KEY="your-master-key"
NEXT_PUBLIC_MEILISEARCH_HOST="https://your-meilisearch-domain.com"
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY="your-search-only-key"
```

## Monitoring

### Health Check

```bash
curl http://localhost:7700/health
```

### Stats

```bash
curl -H "Authorization: Bearer masterKey" http://localhost:7700/stats
```

### Index Information

```bash
curl -H "Authorization: Bearer masterKey" http://localhost:7700/indexes/guides
```

## Troubleshooting

### Meilisearch Not Running

```bash
# Check Docker
docker ps

# View logs
docker logs baobab-meilisearch

# Restart
docker restart baobab-meilisearch
```

### Search Not Working

1. Verify Meilisearch is running: `curl http://localhost:7700/health`
2. Check indexes exist: Visit dashboard or check logs
3. Verify data is indexed: Run `node scripts/seed-meilisearch.js`
4. Check environment variables in `.env`

### Slow Search Performance

- Ensure database is populated with enough guides
- Consider adding more indexing attributes
- Monitor Meilisearch resource usage (CPU, memory)

## Performance Tips

1. **Pagination** — Always use limit/offset for large result sets
2. **Faceting** — Use facets to narrow searches (domain, state, etc.)
3. **Caching** — Frontend can cache recent searches (5-10 min TTL)
4. **Batch Indexing** — When seeding large datasets, batch in chunks of 1000

## Stopping Meilisearch

```bash
docker-compose down meilisearch

# Remove volume data (careful!)
docker-compose down -v meilisearch
```

## Next Steps

1. ✅ Start Meilisearch with `docker-compose up -d meilisearch`
2. ✅ Seed data: `node scripts/seed-meilisearch.js`
3. ✅ Test search: `curl "http://localhost:7700/search?q=passport"`
4. ✅ Create guides (Phase 3)
5. ✅ Configure production deployment (Phase 5a)

---

**Status:** Setup Complete ✅
**Next Phase:** 1c - Display Ads Infrastructure
