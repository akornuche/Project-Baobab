/**
 * Meilisearch Indexing Utilities
 * Provides functions to index and sync content to Meilisearch
 */

import { Guide, DirectoryListing } from '@prisma/client';
import { getMeiliClient } from './meilisearch';

interface GuideDocument {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  domain: string;
  subdomain: string;
  verified: boolean;
  publishedAt: string;
}

interface DirectoryDocument {
  id: string;
  name: string;
  description: string;
  category: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  verified: boolean;
  premium: boolean;
}

/**
 * Index a single guide
 */
export async function indexGuide(guide: any): Promise<void> {
  const client = getMeiliClient();
  if (!client) {
    console.warn('Meilisearch client not available');
    return;
  }

  try {
    const guideDoc: GuideDocument = {
      id: guide.id,
      slug: guide.slug,
      title: guide.title,
      subtitle: guide.subtitle || '',
      description: guide.description || '',
      content: guide.content || '',
      domain: guide.domain?.name || '',
      subdomain: guide.subdomain?.name || '',
      verified: guide.lastVerified ? true : false,
      publishedAt: guide.publishedAt?.toISOString() || '',
    };

    await client.index('guides').addDocuments([guideDoc]);
    console.log(`✓ Indexed guide: ${guide.title}`);
  } catch (error) {
    console.error('Failed to index guide:', error);
  }
}

/**
 * Index a single directory listing
 */
export async function indexDirectory(listing: DirectoryListing): Promise<void> {
  const client = getMeiliClient();
  if (!client) {
    console.warn('Meilisearch client not available');
    return;
  }

  try {
    const dirDoc: DirectoryDocument = {
      id: listing.id,
      name: listing.name,
      description: listing.description || '',
      category: listing.category,
      state: listing.state,
      city: listing.city,
      phone: listing.phone || '',
      email: listing.email || '',
      website: listing.website || '',
      verified: listing.verified,
      premium: listing.premium,
    };

    await client.index('directories').addDocuments([dirDoc]);
    console.log(`✓ Indexed listing: ${listing.name}`);
  } catch (error) {
    console.error('Failed to index directory:', error);
  }
}

/**
 * Remove a guide from index
 */
export async function removeGuideIndex(guideId: string): Promise<void> {
  const client = getMeiliClient();
  if (!client) return;

  try {
    await client.index('guides').deleteDocument(guideId);
    console.log(`✓ Removed guide from index: ${guideId}`);
  } catch (error) {
    console.error('Failed to remove guide from index:', error);
  }
}

/**
 * Remove a directory from index
 */
export async function removeDirectoryIndex(directoryId: string): Promise<void> {
  const client = getMeiliClient();
  if (!client) return;

  try {
    await client.index('directories').deleteDocument(directoryId);
    console.log(`✓ Removed directory from index: ${directoryId}`);
  } catch (error) {
    console.error('Failed to remove directory from index:', error);
  }
}

/**
 * Batch index multiple guides
 */
export async function indexGuideBatch(guides: any[], batchSize: number = 1000): Promise<void> {
  const client = getMeiliClient();
  if (!client) {
    console.warn('Meilisearch client not available');
    return;
  }

  try {
    const docs = guides.map((guide) => ({
      id: guide.id,
      slug: guide.slug,
      title: guide.title,
      subtitle: guide.subtitle || '',
      description: guide.description || '',
      content: guide.content || '',
      domain: guide.domain?.name || '',
      subdomain: guide.subdomain?.name || '',
      verified: guide.lastVerified ? true : false,
      publishedAt: guide.publishedAt?.toISOString() || '',
    }));

    // Batch process in chunks
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);
      await client.index('guides').addDocuments(batch);
      console.log(`✓ Indexed batch: ${i + batch.length} / ${docs.length} guides`);
    }

    console.log(`✓ Batch indexing complete: ${docs.length} guides indexed`);
  } catch (error) {
    console.error('Failed to batch index guides:', error);
  }
}

/**
 * Batch index multiple directories
 */
export async function indexDirectoryBatch(
  listings: DirectoryListing[],
  batchSize: number = 1000
): Promise<void> {
  const client = getMeiliClient();
  if (!client) {
    console.warn('Meilisearch client not available');
    return;
  }

  try {
    const docs = listings.map((listing) => ({
      id: listing.id,
      name: listing.name,
      description: listing.description || '',
      category: listing.category,
      state: listing.state,
      city: listing.city,
      phone: listing.phone || '',
      email: listing.email || '',
      website: listing.website || '',
      verified: listing.verified,
      premium: listing.premium,
    }));

    // Batch process in chunks
    for (let i = 0; i < docs.length; i += batchSize) {
      const batch = docs.slice(i, i + batchSize);
      await client.index('directories').addDocuments(batch);
      console.log(`✓ Indexed batch: ${i + batch.length} / ${docs.length} directories`);
    }

    console.log(`✓ Batch indexing complete: ${docs.length} directories indexed`);
  } catch (error) {
    console.error('Failed to batch index directories:', error);
  }
}

/**
 * Clear all guides from index
 */
export async function clearGuidesIndex(): Promise<void> {
  const client = getMeiliClient();
  if (!client) return;

  try {
    await client.index('guides').deleteAllDocuments();
    console.log('✓ Cleared guides index');
  } catch (error) {
    console.error('Failed to clear guides index:', error);
  }
}

/**
 * Clear all directories from index
 */
export async function clearDirectoriesIndex(): Promise<void> {
  const client = getMeiliClient();
  if (!client) return;

  try {
    await client.index('directories').deleteAllDocuments();
    console.log('✓ Cleared directories index');
  } catch (error) {
    console.error('Failed to clear directories index:', error);
  }
}
