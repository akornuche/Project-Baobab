/**
 * Seed Meilisearch with guides and directories from database
 * JavaScript version for easier execution across platforms
 */

const { PrismaClient } = require('@prisma/client');
const { MeiliSearch } = require('meilisearch');

const prisma = new PrismaClient();
const MEILISEARCH_HOST = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
const MEILISEARCH_API_KEY = process.env.MEILISEARCH_API_KEY || 'masterKey';

const meiliClient = new MeiliSearch({
  host: MEILISEARCH_HOST,
  apiKey: MEILISEARCH_API_KEY,
});

async function seedMeilisearch() {
  try {
    console.log(`\n📚 Connecting to Meilisearch at ${MEILISEARCH_HOST}...`);

    // Test connection
    const health = await meiliClient.health();
    console.log(`✓ Meilisearch is ${health.status}`);

    // Get existing indexes
    const indexes = await meiliClient.getIndexes();
    const indexNames = indexes.results.map((index) => index.uid);

    // Create guides index if missing
    if (!indexNames.includes('guides')) {
      console.log('📝 Creating "guides" index...');
      await meiliClient.createIndex('guides', { primaryKey: 'id' });
    }

    // Create directories index if missing
    if (!indexNames.includes('directories')) {
      console.log('📝 Creating "directories" index...');
      await meiliClient.createIndex('directories', { primaryKey: 'id' });
    }

    // Configure guides index
    console.log('⚙️  Configuring guides index...');
    await meiliClient.index('guides').updateSearchableAttributes(['title', 'subtitle', 'description', 'content']);
    await meiliClient
      .index('guides')
      .updateAttributesForFaceting(['domain', 'subdomain', 'verified']);

    // Configure directories index
    console.log('⚙️  Configuring directories index...');
    await meiliClient
      .index('directories')
      .updateSearchableAttributes(['name', 'description', 'category', 'state', 'city']);
    await meiliClient
      .index('directories')
      .updateAttributesForFaceting(['category', 'state', 'verified', 'premium']);

    // Fetch guides from database
    console.log('\n📖 Fetching guides from database...');
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
        content: typeof guide.content === 'string' ? guide.content.substring(0, 1000) : '',
        domain: guide.domain.name,
        subdomain: guide.subdomain.name,
        verified: guide.lastVerified ? true : false,
        publishedAt: guide.publishedAt ? guide.publishedAt.toISOString() : '',
      }));

      console.log(`📤 Indexing ${guidesData.length} guides...`);
      
      // Batch index in chunks of 1000
      for (let i = 0; i < guidesData.length; i += 1000) {
        const batch = guidesData.slice(i, i + 1000);
        await meiliClient.index('guides').addDocuments(batch);
        console.log(`   → Indexed ${Math.min(i + 1000, guidesData.length)} / ${guidesData.length}`);
      }
      
      console.log(`✅ Added ${guidesData.length} guides to index`);
    } else {
      console.log('⊘ No guides to index');
    }

    // Fetch directories from database
    console.log('\n📋 Fetching directory listings from database...');
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
      
      // Batch index in chunks of 1000
      for (let i = 0; i < directoriesData.length; i += 1000) {
        const batch = directoriesData.slice(i, i + 1000);
        await meiliClient.index('directories').addDocuments(batch);
        console.log(`   → Indexed ${Math.min(i + 1000, directoriesData.length)} / ${directoriesData.length}`);
      }
      
      console.log(`✅ Added ${directoriesData.length} directory listings to index`);
    } else {
      console.log('⊘ No directories to index');
    }

    console.log('\n✨ Meilisearch seeding completed successfully!');
    console.log(`   - Guides indexed: ${guides.length}`);
    console.log(`   - Directories indexed: ${directories.length}`);
    console.log(`   - Total: ${guides.length + directories.length} items\n`);
  } catch (error) {
    console.error('❌ Error seeding Meilisearch:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedMeilisearch();
