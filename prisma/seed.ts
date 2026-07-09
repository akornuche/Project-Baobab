import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Domains
  const domains = [
    { name: 'Government', slug: 'government', description: 'Government services and processes', order: 1 },
    { name: 'Business', slug: 'business', description: 'Business registration and compliance', order: 2 },
    { name: 'Education', slug: 'education', description: 'Education and academic services', order: 3 },
  ];

  const createdDomains = [];
  for (const domain of domains) {
    const created = await prisma.domain.upsert({
      where: { slug: domain.slug },
      update: {},
      create: domain,
    });
    createdDomains.push(created);
    console.log(`Created domain: ${created.name}`);
  }

  // Create Subdomains for Government (Business Registration)
  const governmentBusinessSubdomains = [
    { name: 'Business Registration', slug: 'business-registration', description: 'Business registration with CAC', domainId: createdDomains[0].id, order: 1 },
    { name: 'Identity & Civil Documents', slug: 'identity-civil', description: 'Passport, NIN, birth/marriage certificates', domainId: createdDomains[0].id, order: 2 },
    { name: 'Taxes', slug: 'taxes', description: 'Personal and business taxes', domainId: createdDomains[0].id, order: 3 },
    { name: 'Immigration & Travel', slug: 'immigration-travel', description: 'Visas, citizenship, travel documents', domainId: createdDomains[0].id, order: 4 },
  ];

  for (const subdomain of governmentBusinessSubdomains) {
    const created = await prisma.subdomain.upsert({
      where: { slug: subdomain.slug },
      update: {},
      create: subdomain,
    });
    console.log(`Created subdomain: ${created.name}`);
  }

  // Create Subdomains for Business
  const businessSubdomains = [
    { name: 'Starting a Business', slug: 'starting-business', description: 'Business startup checklist and guides', domainId: createdDomains[1].id, order: 1 },
    { name: 'Registration', slug: 'registration', description: 'Business registration and licensing', domainId: createdDomains[1].id, order: 2 },
    { name: 'Tax & Compliance', slug: 'tax-compliance', description: 'VAT, PAYE, and tax compliance', domainId: createdDomains[1].id, order: 3 },
    { name: 'Banking', slug: 'banking', description: 'Business banking and finance', domainId: createdDomains[1].id, order: 4 },
  ];

  for (const subdomain of businessSubdomains) {
    const created = await prisma.subdomain.upsert({
      where: { slug: subdomain.slug },
      update: {},
      create: subdomain,
    });
    console.log(`Created subdomain: ${created.name}`);
  }

  // Create Subdomains for Education
  const educationSubdomains = [
    { name: 'WAEC/NECO', slug: 'waec-neco', description: 'West African exams and certifications', domainId: createdDomains[2].id, order: 1 },
    { name: 'JAMB/Admission', slug: 'jamb-admission', description: 'University admission and exams', domainId: createdDomains[2].id, order: 2 },
    { name: 'Scholarships', slug: 'scholarships', description: 'Scholarship applications and opportunities', domainId: createdDomains[2].id, order: 3 },
    { name: 'NYSC', slug: 'nysc', description: 'National Youth Service Corps', domainId: createdDomains[2].id, order: 4 },
  ];

  for (const subdomain of educationSubdomains) {
    const created = await prisma.subdomain.upsert({
      where: { slug: subdomain.slug },
      update: {},
      create: subdomain,
    });
    console.log(`Created subdomain: ${created.name}`);
  }

  // Create official sources
  const sources = [
    { url: 'https://cac.gov.ng', title: 'Corporate Affairs Commission' },
    { url: 'https://firsnigeria.gov.ng', title: 'Federal Inland Revenue Service' },
    { url: 'https://waec.ng', title: 'West African Examinations Council' },
    { url: 'https://nejdc.gov.ng', title: 'National Economic Council' },
  ];

  // Create sample users
  const users = [
    { email: 'admin@baobab.ng', name: 'Baobab Admin', role: 'ADMIN' },
    { email: 'editor@baobab.ng', name: 'Baobab Editor', role: 'EDITOR' },
    { email: 'reviewer@baobab.ng', name: 'Baobab Reviewer', role: 'REVIEWER' },
  ];

  const createdUsers = [];
  for (const userData of users) {
    const created = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
    createdUsers.push(created);
    console.log(`Created user: ${userData.email}`);
  }

  // Create sample guide for testing
  const guide = await prisma.guide.upsert({
    where: { slug: 'cac-business-name' },
    update: {},
    create: {
      slug: 'cac-business-name',
      title: 'How to Register a Business Name with CAC',
      subtitle: 'Complete guide to registering your business with the Corporate Affairs Commission',
      description: 'Learn how to register your business name with CAC in Nigeria with step-by-step instructions',
      content: JSON.stringify({
        quickAnswer: 'CAC Business Name registration costs ₦50,000 and takes 3-7 days',
        overview: 'Registering your business name with CAC is the first legal step in formalizing your business in Nigeria.',
        definitions: [
          { term: 'CAC', definition: 'Corporate Affairs Commission - the regulatory body for business registration' },
          { term: 'Business Name', definition: 'The simplest form of business structure in Nigeria' }
        ],
        requirements: ['Valid phone number', 'Email address', 'NIN number'],
        timeline: ['Submit name search', 'Complete Form A', 'Pay registration fee', 'Submit documents'],
        regulatory: 'Governed by Companies and Allied Matters Act (CAMA) 2020',
        commonMistakes: ['Using the wrong form', 'Not having name alternatives']
      }),
      domainId: createdDomains[0].id,
      subdomainId: (await prisma.subdomain.findUnique({ where: { slug: 'business-registration' } }))!.id,
      reviewerId: createdUsers[2].id,
      lastVerified: new Date('2026-07-01'),
      published: true,
      publishedAt: new Date('2026-07-01'),
      isDeleted: false,
    },
  });
  console.log(`Created guide: ${guide.title}`);

  // Create tools for the guide
  const cacTool = await prisma.tool.upsert({
    where: { guideId: guide.id },
    update: {},
    create: {
      guideId: guide.id,
      name: 'CAC Registration Cost Estimator',
      type: 'calculator',
      inputs: JSON.stringify({
        entity_type: { type: 'select', label: 'Entity Type' },
        share_capital: { type: 'number', label: 'Share Capital' },
        use_agent: { type: 'boolean', label: 'Use Agent' },
      }),
      outputs: JSON.stringify({
        total: { type: 'number', label: 'Total Cost' },
        breakdown: { type: 'object', label: 'Cost Breakdown' },
        time: { type: 'string', label: 'Timeline' }
      }),
      logic: 'cac-estimator',
    },
  });
  console.log(`Created tool: ${cacTool.name}`);

  // Create directory listings
  const directoryListings = [
    {
      name: 'Baobab Legal Services',
      description: 'Expert CAC registration services',
      category: 'registration-agent',
      state: 'Lagos',
      city: 'Lagos',
      phone: '+2348012345678',
      email: 'contact@baobablegal.com',
      website: 'https://baobablegal.com',
      verified: true,
      premium: false,
    },
    {
      name: 'Accredited Business Agents',
      description: 'Professional business registration services',
      category: 'registration-agent',
      state: 'Abuja',
      city: 'Abuja',
      phone: '+2348098765432',
      email: 'info@aba.gov.ng',
      website: 'https://aba.gov.ng',
      verified: true,
      premium: true,
    },
  ];

  for (const listing of directoryListings) {
    const created = await prisma.directoryListing.upsert({
      where: { id: listing.email },
      update: {},
      create: {
        id: listing.email, // Using email as ID for simplicity
        name: listing.name,
        description: listing.description,
        category: listing.category,
        state: listing.state,
        city: listing.city,
        phone: listing.phone,
        email: listing.email,
        website: listing.website,
        verified: listing.verified,
        premium: listing.premium,
      },
    });
    console.log(`Created directory listing: ${created.name}`);
  }

  // Create official sources (without guide relation for now)
  for (const source of sources) {
    const created = await prisma.guideSource.upsert({
      where: { id: source.url },
      update: {},
      create: {
        id: source.url, // Using URL as ID
        guideId: guide.id,
        url: source.url,
        title: source.title,
        verified: true,
      },
    });
    console.log(`Created source: ${source.title}`);
  }

  console.log('\nSeed data created successfully!');
  console.log(`- ${domains.length} domains created`);
  console.log(`- ${createdDomains.length * 4} subdomains created (4 per domain)`);
  console.log(`- ${users.length} users created`);
  console.log(`- ${sources.length} official sources created`);
  console.log('- Sample guide and tool created');
  console.log(`- ${directoryListings.length} directory listings created`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });