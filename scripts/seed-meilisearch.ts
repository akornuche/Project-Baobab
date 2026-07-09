/**
 * Seed Meilisearch with guides and directories from database
 */

import { PrismaClient } from '@prisma/client';
import { Meilisearch } from 'meilisearch';

const prisma = new PrismaClient();
const MEILISEARCH_URL = process.env.MEILISEARCH_URL || 'http://localhost:7700';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || '';

const meiliClient = new Meilisearch({
  host: MEILISEARCH_URL,
  apiKey: MEILISEARCH_API_KEY,
});

async function seedMeilisearch() {
  try {
    console.log(`📚 Connecting to Meilisearch at ${MEILISEARCH_URL}...`);

    // Create indexes if they don't exist
    const indexes = await meiliClient.getIndexes();
    const indexNames = (indexes.results as any[]).map((index: any) => index.uid);

    if (!indexNames.includes('guides')) {
      console.log('📝 Creating "guides" index...');
      await meiliClient.createIndex('guides', { primaryKey: 'id' });
    }

    if (!indexNames.includes('directories')) {
      console.log('📝 Creating "directories" index...');
      await meiliClient.createIndex('directories', { primaryKey: 'id' });
    }

    // Configure guides index
    console.log('⚙️  Configuring guides index...');
    await meiliClient
      .index('guides')
      .updateSearchableAttributes(['title', 'subtitle', 'description', 'content']);

    // Configure directories index
    console.log('⚙️  Configuring directories index...');
    await meiliClient
      .index('directories')
      .updateSearchableAttributes(['name', 'description', 'category', 'state', 'city']);

    // Fetch and seed guides
    console.log('📖 Fetching guides from database...');
    const guides = await prisma.guide.findMany({
      where: { isDeleted: false, published: true },
      include: {
        domain: true,
        subdomain: true,
      },
    });

    if (guides.length > 0) {
      const guidesData = guides.map((guide) => ({
        id: guide.id,
        slug: guide.slug,
        title: guide.title,
        subtitle: guide.subtitle || '',
        description: guide.description || '',
        content: guide.content || '',
        domain: guide.domain.name,
        subdomain: guide.subdomain.name,
        verified: guide.lastVerified ? true : false,
        publishedAt: guide.publishedAt?.toISOString() || '',
      }));

      console.log(`📤 Indexing ${guidesData.length} guides...`);
      await meiliClient.index('guides').addDocuments(guidesData);
      console.log(`✅ Added ${guidesData.length} guides to index`);
    }

    // Fetch and seed directories
    console.log('📋 Fetching directory listings from database...');
    const directories = await prisma.directoryListing.findMany({
      where: { isDeleted: false },
    });

    if (directories.length > 0) {
      const directoriesData = directories.map((dir) => ({
        id: dir.id,
        name: dir.name,
        description: dir.description || '',
        category: dir.category,
        state: dir.state,
        city: dir.city,
        phone: dir.phone || '',
        email: dir.email || '',
        website: dir.website || '',
        verified: dir.verified,
        premium: dir.premium,
      }));

      console.log(`📤 Indexing ${directoriesData.length} directory listings...`);
      await meiliClient.index('directories').addDocuments(directoriesData);
      console.log(`✅ Added ${directoriesData.length} directory listings to index`);
    }

    console.log('\n✨ Meilisearch seeding completed successfully!');
    console.log(`   - ${guides.length} guides indexed`);
    console.log(`   - ${directories.length} directory listings indexed`);
  } catch (error) {
    console.error('❌ Error seeding Meilisearch:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedMeilisearch();
