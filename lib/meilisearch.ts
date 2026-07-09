import { MeiliSearch } from 'meilisearch';

const MEILISEARCH_URL = process.env.MEILISEARCH_URL || 'http://localhost:7700';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

let meiliClient: MeiliSearch | null = null;

export function getMeiliClient() {
  if (!meiliClient && MEILISEARCH_URL) {
    try {
      meiliClient = new MeiliSearch({
        host: MEILISEARCH_URL,
        apiKey: MEILISEARCH_API_KEY,
      });
    } catch (error) {
      console.error('Failed to create Meilisearch client:', error);
    }
  }
  return meiliClient;
}

export async function initMeilisearch() {
  const client = getMeiliClient();
  if (!client) return;

  try {
    // Create indexes if they don't exist
    const indexes = await client.getIndexes();
    const indexNames = indexes.results.map((index) => index.uid);

    if (!indexNames.includes('guides')) {
      await client.createIndex('guides', { primaryKey: 'id' });
      console.log('Created index: guides');
    }

    if (!indexNames.includes('directories')) {
      await client.createIndex('directories', { primaryKey: 'id' });
      console.log('Created index: directories');
    }

    // Configure search settings
    await client.index('guides').updateSearchableAttributes(['title', 'subtitle', 'description', 'content']);
    await client.index('directories').updateSearchableAttributes(['name', 'description', 'category', 'state', 'city']);

    await client.index('guides').updateAttributesForFaceting(['domain', 'subdomain', 'verified']);
    await client.index('directories').updateAttributesForFaceting(['category', 'state', 'verified', 'premium']);

    console.log('Meilisearch initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Meilisearch:', error);
  }
}