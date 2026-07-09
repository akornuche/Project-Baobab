import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Priority 3 Remaining Guides - Batch 3 (Guides 52-56)
const priority3Batch3 = [
  {
    title: 'How to Start a Transportation/Logistics Business in Nigeria',
    slug: 'transportation-logistics-business',
    subtitle: 'Complete guide to launching a transportation or logistics business',
    description: 'Learn how to start a transportation or logistics business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Transportation/logistics business requires vehicles, drivers, registration, insurance. Costs: ₦5M-₦20M. Timeline: 3-6 months. Key clients: e-commerce, retailers, manufacturers.',
      overview: 'Transportation and logistics is critical to Nigeria\'s economy. Opportunities include last-mile delivery, freight transport, warehousing, and supply chain management. Success requires technology, reliability, and customer service.',
      definitions: 'Transportation/logistics business provides movement of goods and people. In Nigeria, key segments include e-commerce delivery, freight, and supply chain management.',
      requirements: ['Vehicles', 'Valid driver licenses', 'Vehicle insurance', 'Business registration', 'GPS tracking system', 'Payment infrastructure', 'Customer service system'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Purchase vehicles', 'Hire and train staff', 'Obtain insurance', 'Implement tracking system', 'Launch operations', 'Scale with more vehicles'],
      regulatory: 'Transportation businesses must register with CAC. Vehicles require FRSC registration. Transporters must comply with road safety regulations. Logistics businesses may need NACCIA registration.',
      costEstimate: '₦5M-₦20M depending on vehicle type and quantity',
      commonMistakes: ['Skipping vehicle maintenance', 'Not having proper insurance', 'Poor route planning', 'Ignoring customer feedback'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Register a Vehicle', link: '/guides/register-vehicle-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Shippers Council', url: 'https://nsc.gov.ng', verified: true }],
    reviewerName: 'Mr. Paul Okon, Logistics Consultant',
  },
  {
    title: 'How to Start a Hospitality Business in Nigeria',
    slug: 'hospitality-business',
    subtitle: 'Complete guide to opening a hotel, restaurant, or event venue',
    description: 'Learn how to start a hospitality business in Nigeria including hotels, restaurants, and event spaces',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Hospitality includes hotels, restaurants, and event venues. Required: location, licenses, staff, systems. Costs: ₦10M-₦100M+. Timeline: 6-18 months.',
      overview: 'Nigeria\'s hospitality industry is growing with increasing domestic and international tourism. Opportunities exist in budget hotels, mid-range hotels, restaurants, and event spaces. Lagos, Abuja, and Port Harcourt are key markets.',
      definitions: 'Hospitality business provides accommodation, food, and entertainment services. In Nigeria, this includes hotels, restaurants, caterers, and event venues.',
      requirements: ['Location', 'Business registration', 'NAFDAC license (if food)', 'Building permit', 'Fire safety certificate', 'Staff', 'POS system', 'Marketing materials'],
      timeline: ['Research and planning (2-3 months)', 'Register business (1 week)', 'Secure location', 'Obtain permits and licenses', 'Build/renovate facility', 'Hire and train staff', 'Launch operations', 'Market aggressively'],
      regulatory: 'Hospitality businesses must register with CAC. Food service requires NAFDAC. Hotels require building permits and fire safety certification. Licensing varies by state.',
      costEstimate: '₦10M-₦100M+ depending on size and location',
      commonMistakes: ['Underestimating operating costs', 'Skipping permits', 'Poor staff training', 'Not researching competition'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Get a Building Permit', link: '/guides/building-permit-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Tourism Development Corporation', url: 'https://ntdc.gov.ng', verified: true }],
    reviewerName: 'Mrs. Funmilayo Adebayo, Hospitality Consultant',
  },
  {
    title: 'How to Start an Agricultural Business in Nigeria',
    slug: 'agricultural-business',
    subtitle: 'Complete guide to launching an agribusiness in Nigeria',
    description: 'Learn how to start a successful agricultural business in Nigeria including farming, processing, and distribution',
    domainSlug: 'business',
    subdomainSlug: 'starting-business',
    content: {
      quickAnswer: 'Agricultural business includes farming, processing, and distribution. Required: land, inputs, labor, market. Costs: ₦500,000-₦50M. Timeline: 3-12 months to first harvest/sale.',
      overview: 'Agriculture is Nigeria\'s largest sector with huge potential for agribusiness. Opportunities exist in crop farming, livestock, fish farming, food processing, and agro-distribution. Government and private sector offer support programs.',
      definitions: 'Agribusiness is business activities related to farming, including production, processing, distribution, and marketing of agricultural products.',
      requirements: ['Land (owned or leased)', 'Seeds/inputs', 'Labor', 'Storage facilities', 'Marketing plan', 'Business registration', 'Access to finance'],
      timeline: ['Research and planning (1-2 months)', 'Register business (1 week)', 'Secure land', 'Prepare land and purchase inputs', 'Plant/hatch', 'Manage crop/livestock', 'Harvest/sell', 'Scale operations'],
      regulatory: 'Agricultural businesses must register with CAC. Food products require NAFDAC. Land use compliance required. Some activities require environmental clearance.',
      costEstimate: '₦500,000-₦50M depending on scale and type',
      commonMistakes: ['Poor land selection', 'Ignoring market demand', 'Inadequate storage', 'Not planning for rainy season'],
      relatedGuides: [
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
        { title: 'How to Register Land', link: '/guides/register-land-nigeria' },
      ],
    },
    sources: [{ title: 'Federal Ministry of Agriculture', url: 'https://farm.gov.ng', verified: true }],
    reviewerName: 'Dr. Adebayo Ogunlesi, Agricultural Economist',
  },
  {
    title: 'How to Register a Franchise in Nigeria',
    slug: 'franchise-nigeria',
    subtitle: 'Complete guide to registering and operating a franchise business',
    description: 'Learn how to register and operate a franchise business in Nigeria',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Franchise registration requires CAC registration and franchise agreement. Costs: ₦500,000-₦5M franchise fee + business setup. Timeline: 3-6 months to launch.',
      overview: 'Franchising allows entrepreneurs to operate under established brands in Nigeria. Popular franchises include food, education, fitness, and retail. Success depends on brand selection, location, and execution.',
      definitions: 'A franchise is a business arrangement where the franchisee operates under the brand and systems of the franchisor in exchange for fees and royalties.',
      requirements: ['Franchise agreement', 'Franchise fee payment', 'Business registration (CAC)', 'Location', 'Staff', 'Systems and training', 'Marketing budget'],
      timeline: ['Research and select franchise (1-2 months)', 'Sign franchise agreement and pay fee', 'Register business (1 week)', 'Select and prepare location', 'Complete franchisor training', 'Launch operations', 'Market locally'],
      regulatory: 'Franchise businesses must register with CAC. Industry-specific licenses required (food, health, etc.). Franchise agreements are legally binding contracts.',
      costEstimate: '₦500,000-₦5M+ depending on franchise type',
      commonMistakes: ['Choosing wrong franchise for market', 'Skipping due diligence on franchisor', 'Not reading franchise agreement carefully', 'Underestimating operating costs'],
      relatedGuides: [
        { title: 'How to Register a Business Name', link: '/guides/cac-business-name' },
        { title: 'How to Start a Business', link: '/guides/start-business-nigeria' },
      ],
    },
    sources: [{ title: 'Nigerian Franchise Association', url: 'https://nfa.org.ng', verified: true }],
    reviewerName: 'Mrs. Grace Eze, Franchise Consultant',
  },
  {
    title: 'How to Manage Business Insurance in Nigeria',
    slug: 'manage-business-insurance',
    subtitle: 'Complete guide to business insurance coverage in Nigeria',
    description: 'Learn how to manage business insurance in Nigeria including property, liability, and workers compensation',
    domainSlug: 'business',
    subdomainSlug: 'registration',
    content: {
      quickAnswer: 'Business insurance includes property, liability, workers compensation. Required: risk assessment, insurance broker, policy renewal. Costs: 1-3% of annual revenue.',
      overview: 'Business insurance protects against risks like property damage, liability claims, and employee injuries. In Nigeria, insurance is regulated by NAICOM. Key policies include fire, burglary, third-party liability, and group health.',
      definitions: 'Business insurance provides financial protection against risks. Key types include property insurance (fire, flood), liability insurance (third-party claims), and workers compensation (employee injuries).',
      requirements: ['Risk assessment', 'Business registration', 'Asset valuation', 'Insurance broker', 'Policy documentation', 'Renewal schedule'],
      timeline: ['Conduct risk assessment (1-2 weeks)', 'Consult insurance broker', 'Compare quotes from multiple insurers', 'Select policy and pay premium', 'Receive insurance certificate', 'Maintain coverage and renew annually'],
      regulatory: 'Business insurance is regulated by NAICOM. Certain industries require specific coverage (construction, transport). Workers compensation is mandatory for businesses with employees.',
      costEstimate: '1-3% of annual revenue depending on industry and coverage',
      commonMistakes: ['Underinsuring assets', 'Not reviewing policies annually', 'Ignoring exclusions in policy', 'Not reporting claims promptly'],
      relatedGuides: [
        { title: 'How to Start an Insurance Brokerage', link: '/guides/start-insurance-brokerage' },
        { title: 'How to Register a Business', link: '/guides/start-business-nigeria' },
      ],
    },
    sources: [{ title: 'NAICOM Portal', url: 'https://www.naicom.gov.ng', verified: true }],
    reviewerName: 'Mr. Kayode Ajayi, Insurance Consultant',
  },
];

async function seedGuides() {
  console.log('🌱 Seeding Priority 3 Remaining Guides (Batch 3)...');
  console.log(`📚 Total guides to seed: ${priority3Batch3.length}`);

  let created = 0;
  let skipped = 0;
  let errors = 0;

  try {
    for (const guideData of priority3Batch3) {
      console.log(`📝 Processing: ${guideData.title}`);

      try {
        const domain = await prisma.domain.findUnique({
          where: { slug: guideData.domainSlug },
        });

        const subdomain = await prisma.subdomain.findUnique({
          where: { slug: guideData.subdomainSlug },
        });

        if (!domain || !subdomain) {
          console.warn(`   ⚠️  Domain/subdomain not found, skipping...`);
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
      } catch (error) {
        console.error(`   ❌ Error: ${(error as Error).message}`);
        errors++;
      }
    }

    console.log(`\n✨ Seeding complete!`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);

    const totalGuides = await prisma.guide.count({
      where: { published: true },
    });
    console.log(`\n📊 Total published guides: ${totalGuides}`);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedGuides();
