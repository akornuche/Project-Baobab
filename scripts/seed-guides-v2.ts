import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample of expanded guides (first 12 to demonstrate the pattern)
const guidesData = [
  {
    title: 'How to Apply for a UK Visa from Nigeria',
    slug: 'uk-visa-application-nigeria',
    subtitle: 'Complete guide to UK visitor, work, and study visa applications',
    description: 'Learn the step-by-step process, requirements, and costs for applying for a UK visa from Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'immigration-travel',
    content: {
      quickAnswer: 'UK visa applications are processed online at visa.ukvisas.gov.uk. Most visitor visas take 3-8 weeks. Fees range from £163-£719 depending on visa type. You need a valid passport, proof of funds, and accommodation details.',
      overview: 'The UK offers several visa categories: visitor (tourist), work, study, family. Each has different requirements and processing times.',
      definitions: 'A UK visa is official permission to enter and stay in the UK for a specific purpose.',
      requirements: ['Valid Nigerian passport (minimum 6 months validity)', 'Proof of accommodation', 'Bank statements (last 3-6 months)', 'Employment letter', 'Return flight booking', 'Travel insurance'],
      timeline: ['Create UK visas account online', 'Complete online application form', 'Pay visa fee', 'Schedule biometric appointment', 'Attend VAC appointment', 'Receive decision (3-8 weeks standard)'],
      regulatory: 'UK visas are regulated by UK Visas and Immigration (UKVI).',
      costEstimate: '£163-£719 depending on visa type + VAC service fee (₦15,000-₦25,000)',
      commonMistakes: ['Incomplete application forms', 'Insufficient proof of funds', 'Missing required documents', 'Wrong visa category'],
      relatedGuides: [{ title: 'How to Apply for a Nigerian Passport', link: '/guides/nigerian-passport-application' }],
    },
    sources: [{ title: 'UK Visas and Immigration', url: 'https://www.gov.uk/visas-immigration', verified: true }],
    reviewerName: 'Tunde Adeyemi, Immigration Lawyer',
  },
  {
    title: 'How to Register a Limited Liability Company (LLC) in Nigeria',
    slug: 'register-llc-nigeria',
    subtitle: 'Complete guide to forming an LLC with CAC',
    description: 'Step-by-step process for registering a Limited Liability Company in Nigeria.',
    domainSlug: 'government',
    subdomainSlug: 'business-registration',
    content: {
      quickAnswer: 'LLC registration with CAC takes 5-7 working days and costs ₦50,000-₦100,000. You need 2+ shareholders, a business name, and CAC forms.',
      overview: 'An LLC is a private company with separate legal identity. Shareholders have limited liability.',
      definitions: 'A Limited Liability Company (LLC) is a legal business entity separate from its owners.',
      requirements: ['2-50 shareholders', 'Minimum share capital of ₦10,000', 'Registered office address', 'Valid identification for shareholders', 'CAC registration forms', 'Memorandum & Articles of Association'],
      timeline: ['Verify available business name on CAC portal', 'Prepare required documents', 'Submit online via CAC portal', 'Pay registration fee', 'Receive provisional approval (24-48 hours)', 'Receive Certificate of Incorporation (5-7 days)'],
      regulatory: 'LLCs are regulated by CAC under Companies and Allied Matters Act (CAMA) 2020.',
      costEstimate: '₦50,000-₦100,000',
      commonMistakes: ['Choosing unavailable business name', 'Incomplete shareholder information', 'Invalid office address'],
      relatedGuides: [{ title: 'How to Register a Business Name with CAC', link: '/guides/cac-business-name' }],
    },
    sources: [{ title: 'Corporate Affairs Commission', url: 'https://www.cac.gov.ng', verified: true }],
    reviewerName: 'Chioma Okafor, Corporate Lawyer',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding expanded guides...');
  console.log(`📚 Total guides: ${guidesData.length}`);

  let created = 0;
  let skipped = 0;

  try {
    for (const guideData of guidesData) {
      console.log(`📝 Processing: ${guideData.title}`);

      const domain = await prisma.domain.findUnique({
        where: { slug: guideData.domainSlug },
      });

      const subdomain = await prisma.subdomain.findUnique({
        where: { slug: guideData.subdomainSlug },
      });

      if (!domain || !subdomain) {
        console.warn(`⚠️  Domain or subdomain not found, skipping...`);
        skipped++;
        continue;
      }

      const existing = await prisma.guide.findUnique({
        where: { slug: guideData.slug },
      });

      if (existing) {
        console.log(`   ⏭️  Already exists`);
        skipped++;
        continue;
      }

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

    console.log(`\n✨ Complete!`);
    console.log(`✅ Created: ${created}, ⏭️  Skipped: ${skipped}`);

    const total = await prisma.guide.count({ where: { published: true } });
    console.log(`\n📊 Total published guides: ${total}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedGuides();
