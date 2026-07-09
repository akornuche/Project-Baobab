import { PrismaClient } from '@prisma/client';

interface GuideData {
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  domainSlug: string;
  subdomainSlug: string;
  content: {
    quickAnswer: string;
    overview: string;
    definitions: string;
    requirements: string[];
    timeline: string[];
    regulatory: string;
    costEstimate?: string;
    commonMistakes: string[];
    relatedGuides: Array<{ title: string; link: string }>;
  };
  sources: Array<{ title: string; url: string; verified: boolean }>;
  reviewerName: string;
}

const guidesData: GuideData[] = [

  // Add remaining 59 guides here...
];

const prisma = new PrismaClient();
  console.log('🌱 Seeding complete guide dataset...');
  console.log(`📚 Total guides to seed: ${guidesData.length}`);

  let created = 0;
  let skipped = 0;

  try {
    for (const guideData of guidesData) {
      console.log(`📝 Processing: ${guideData.title}`);

      // Get domain and subdomain
      const domain = await prisma.domain.findUnique({
        where: { slug: guideData.domainSlug },
      });

      const subdomain = await prisma.subdomain.findUnique({
        where: { slug: guideData.subdomainSlug },
      });

      if (!domain || !subdomain) {
        console.warn(
          `⚠️  Skipping ${guideData.title} - domain or subdomain not found`
        );
        skipped++;
        continue;
      }

      // Check if guide already exists
      const existing = await prisma.guide.findUnique({
        where: { slug: guideData.slug },
      });

      if (existing) {
        console.log(`   ⏭️  Already exists, skipping...`);
        skipped++;
        continue;
      }

      // Get or create reviewer user
      let reviewer = await prisma.user.findFirst({
        where: { name: guideData.reviewerName },
      });

      if (!reviewer) {
        reviewer = await prisma.user.create({
          data: {
            name: guideData.reviewerName,
            email: `${guideData.reviewerName.toLowerCase().replace(/\s+/g, '.')}@baobab.ng`,
            role: 'reviewer',
          },
        });
      }

      // Create guide
      const guide = await prisma.guide.create({
        data: {
          title: guideData.title,
          slug: guideData.slug,
          subtitle: guideData.subtitle,
          description: guideData.description,
          content: JSON.stringify(guideData.content),
          domainId: domain.id,
          subdomainId: subdomain.id,
          reviewerId: reviewer.id,
          published: true,
          publishedAt: new Date(),
          lastVerified: new Date(),
        },
      });

      // Create sources
      for (const source of guideData.sources) {
        await prisma.guideSource.create({
          data: {
            title: source.title,
            url: source.url,
            verified: source.verified,
            guideId: guide.id,
          },
        });
      }

      created++;
      console.log(`   ✅ Created`);
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);

    // Get final statistics
    const totalGuides = await prisma.guide.count({
      where: { published: true },
    });
    console.log(`\n📊 Total published guides: ${totalGuides}`);
  } catch (error) {
    console.error('❌ Error seeding guides:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCompleteGuides();
