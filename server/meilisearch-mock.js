/**
 * Mock Meilisearch Server for Development
 * Runs on port 7700 and provides a minimal API for testing
 */

const http = require('http');
const url = require('url');

// In-memory storage for indexes and documents
const storage = {
  indexes: {},
  settings: {},
};

// Initialize with empty indexes
function initIndexes() {
  storage.indexes['guides'] = {};
  storage.indexes['directories'] = {};
  storage.settings['guides'] = {
    searchableAttributes: ['title', 'subtitle', 'description', 'content'],
    filterableAttributes: ['domain', 'subdomain', 'verified'],
  };
  storage.settings['directories'] = {
    searchableAttributes: ['name', 'description', 'category', 'state', 'city'],
    filterableAttributes: ['category', 'state', 'verified', 'premium'],
  };
}

// Helper: Parse JSON from request
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

// Helper: Simple search
function simpleSearch(indexName, query) {
  const index = storage.indexes[indexName] || {};
  const results = [];

  for (const [id, doc] of Object.entries(index)) {
    let match = false;
    if (query) {
      const searchableAttrs = storage.settings[indexName]?.searchableAttributes || [];
      match = searchableAttrs.some((attr) => {
        const value = doc[attr];
        return value && value.toString().toLowerCase().includes(query.toLowerCase());
      });
    } else {
      match = true;
    }

    if (match) {
      results.push(doc);
    }
  }

  return results;
}

// Create server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Health check
    if (pathname === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    // GET /indexes - List indexes
    if (pathname === '/indexes' && req.method === 'GET') {
      const indexes = Object.keys(storage.indexes).map((uid) => ({
        uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        primaryKey: 'id',
      }));
      res.writeHead(200);
      res.end(JSON.stringify({ results: indexes, total: indexes.length }));
      return;
    }

    // POST /indexes - Create index
    if (pathname === '/indexes' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!storage.indexes[body.uid]) {
        storage.indexes[body.uid] = {};
      }
      res.writeHead(201);
      res.end(JSON.stringify({ uid: body.uid, primaryKey: body.primaryKey || 'id' }));
      return;
    }

    // GET /indexes/:uid - Get index
    const indexMatch = pathname.match(/^\/indexes\/([^/]+)$/);
    if (indexMatch && req.method === 'GET') {
      const indexName = indexMatch[1];
      if (storage.indexes[indexName]) {
        res.writeHead(200);
        res.end(JSON.stringify({ uid: indexName, primaryKey: 'id' }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Index not found' }));
      }
      return;
    }

    // PUT /indexes/:uid/settings/searchable-attributes
    const searchableMatch = pathname.match(/^\/indexes\/([^/]+)\/settings\/searchable-attributes$/);
    if (searchableMatch && req.method === 'PUT') {
      const indexName = searchableMatch[1];
      const body = await parseBody(req);
      if (storage.settings[indexName]) {
        storage.settings[indexName].searchableAttributes = body;
      }
      res.writeHead(200);
      res.end(JSON.stringify(body));
      return;
    }

    // PUT /indexes/:uid/settings/attributes-for-faceting
    const facetMatch = pathname.match(/^\/indexes\/([^/]+)\/settings\/attributes-for-faceting$/);
    if (facetMatch && req.method === 'PUT') {
      const indexName = facetMatch[1];
      const body = await parseBody(req);
      if (storage.settings[indexName]) {
        storage.settings[indexName].filterableAttributes = body;
      }
      res.writeHead(200);
      res.end(JSON.stringify(body));
      return;
    }

    // POST /indexes/:uid/documents - Add documents
    const docsMatch = pathname.match(/^\/indexes\/([^/]+)\/documents$/);
    if (docsMatch && req.method === 'POST') {
      const indexName = docsMatch[1];
      const body = await parseBody(req);

      if (Array.isArray(body)) {
        body.forEach((doc) => {
          storage.indexes[indexName][doc.id || doc._id] = doc;
        });
      } else {
        storage.indexes[indexName][body.id || body._id] = body;
      }

      res.writeHead(202);
      res.end(JSON.stringify({ status: 'received' }));
      return;
    }

    // POST /indexes/:uid/search - Search
    const searchMatch = pathname.match(/^\/indexes\/([^/]+)\/search$/);
    if (searchMatch && req.method === 'POST') {
      const indexName = searchMatch[1];
      const body = await parseBody(req);
      const hits = simpleSearch(indexName, body.q);

      res.writeHead(200);
      res.end(
        JSON.stringify({
          hits,
          query: body.q,
          processingTimeMs: 10,
          limit: body.limit || 20,
          offset: body.offset || 0,
          estimatedTotalHits: hits.length,
        })
      );
      return;
    }

    // Default 404
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not found' }));
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ message: 'Internal server error', error: error.message }));
  }
});

initIndexes();

const PORT = 7700;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Mock Meilisearch Server (Dev)        ║
║   Listening on http://localhost:7700   ║
╚════════════════════════════════════════╝
  `);
});
